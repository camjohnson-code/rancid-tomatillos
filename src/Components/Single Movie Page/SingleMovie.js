import './SingleMovie.css';
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { Rating } from 'react-simple-star-rating';
import { useParams, useNavigate } from 'react-router-dom';

const SingleMoviePage = ({ user, movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovieDetails] = useState(null);
  const [error, setError] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [rating, setRating] = useState(0);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    getMovieDetails();
    getUserRatings();
  }, [id]);

  useEffect(() => {
    if (userRatings.length) updateMovieRating();
  }, [movie, userRatings]);

  const getMovieDetails = () => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
      .then((response) => response.json())
      .then((data) => setMovieDetails(data.movie))
      .catch(() => setError(true));
  };

  const getUserRatings = () => {
    fetch(
      `https://rancid-tomatillos.herokuapp.com/api/v2/users/${user.id}/ratings`
    )
      .then((response) => response.json())
      .then((ratings) => {
        setUserRatings(ratings.ratings);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const postUserRating = (rating) => {
    const existingRating = userRatings.find(
      (film) => film.movie_id === movie.id
    );

    if (existingRating) {
      fetch(
        `https://rancid-tomatillos.herokuapp.com/api/v2/users/${user.id}/ratings/${existingRating.id}`,
        {
          method: 'DELETE',
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete existing rating');
          }
          return postNewRating(rating);
        })
        .catch((error) => {
          setRatingError(true);
          setRating(0);
        });
    } else postNewRating(rating);
  };

  const postNewRating = (rating) => {
    fetch(
      `https://rancid-tomatillos.herokuapp.com/api/v2/users/${user.id}/ratings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie_id: movie.id,
          rating: parseInt(rating),
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Failed to post rating: ${text}`);
          });
        }
        return response.json();
      })
      .then((ratings) => {
        getUserRatings();
      })
      .catch((error) => {
        setRatingError(true);
        setRating(0);
      });
  };

  const updateMovieRating = () => {
    if (movie)
      userRatings.forEach((film) => {
        if (film.movie_id === movie.id) {
          setRating(film.rating / 2);
        }
      });
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours} hours ${minutes} minutes`;
  };

  const formatGenres = (genres) => {
    return genres ? genres.join(', ') : '';
  };

  const handleGoBack = () => {
    setMovieDetails(null);
    navigate('/movies');
  };

  const handleRating = async (rate: number) => {
    setRating(rate);
    await postUserRating(rate * 2);
  };

  if (error) return <h3 className='error'>Oops! Please try again later.</h3>;

  return (
    <div
      className='single-movie'
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 50%, transparent), url(${movie?.backdrop_path})`,
      }}
    >
      <div className='movie-info'>
        <button className='x-button'><IoCloseCircle className='close-icon' onClick={handleGoBack} /></button>
        <h2 className='movie-title'>{movie?.title}</h2>
        <Rating
          initialValue={rating}
          className='stars'
          onClick={handleRating}
          allowFraction={true}
        />
        {ratingError && <p>Something went wrong! Please try again later.</p>}
        <p>{movie?.tagline}</p>
        <p className='overview'>{movie?.overview}</p>
        <p>{formatDate(movie?.release_date)}</p>
        <p>
          <FaStar /> {movie?.average_rating} / 10
        </p>
        <p>{formatGenres(movie?.genres)}</p>
        <p>{formatRuntime(movie?.runtime)}</p>
      </div>
    </div>
  );
};

SingleMoviePage.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
};

export default SingleMoviePage;
