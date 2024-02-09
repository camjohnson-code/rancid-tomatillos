import './SingleMovie.css';
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';

const SingleMoviePage = ({ setMovie }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovieDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
      .then(response => response.json())
      .then(data => setMovieDetails(data.movie))
      .catch(() => setError(true));
  }, [id]);

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
    navigate('/movies')
  };

  if (error) {
    return <h3 className='error'>Oops! Please try again later.</h3>;
  }


  return (
    <div className='single-movie' style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 50%, transparent), url(${movie?.backdrop_path})` }}>
      <div className='movie-info'>
        <IoCloseCircle className='x-button' onClick={handleGoBack} />
        <h2 className='movie-title'>{movie?.title}</h2>
        <p>{movie?.tagline}</p>
        <p className='overview'>{movie?.overview}</p>
        <p>{formatDate(movie?.release_date)}</p>
        <p><FaStar /> {movie?.average_rating} / 10</p>
        <p>{formatGenres(movie?.genres)}</p>
        <p>{formatRuntime(movie?.runtime)}</p>
      </div>
    </div>
  );
};

SingleMoviePage.propTypes = {
  setMovie: PropTypes.func,
};

export default SingleMoviePage;
