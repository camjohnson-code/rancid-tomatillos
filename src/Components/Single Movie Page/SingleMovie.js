import './SingleMovie.css';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import PropTypes from 'prop-types';

const SingleMoviePage = ({
  title,
  tagline,
  overview,
  releaseDate,
  rating,
  genres,
  runtime,
  backdropPath,
  setMovie,
}) => {
  const movieStyle = {
    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 50%, transparent), url(${backdropPath})`,
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours} hours ${minutes} minutes`;
  };

  const formatGenres = (genres) => {
    return genres.join(', ');
  };

  return (
    <div className='single-movie' style={movieStyle}>
      <div className='movie-info'>
        <button className='x-button'><IoCloseCircle className='close-icon' onClick={() => setMovie('')} /></button>
        <h2 className='movie-title'>{title}</h2>
        <p className='tagline'>{tagline}</p>
        <p className='overview'>{overview}</p>
        <p className='release-date'>{formatDate(releaseDate)}</p>
        <p className='rating'>
          <FaStar /> {rating} / 10
        </p>
        <p className='genres'>{formatGenres(genres)}</p>
        <p className='runtime'>{formatRuntime(runtime)}</p>
      </div>
    </div>
  );
};

export default SingleMoviePage;


SingleMoviePage.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  genres: PropTypes.array.isRequired,
  runtime: PropTypes.number.isRequired,
  backdropPath: PropTypes.string.isRequired,
  setMovie: PropTypes.func.isRequired,
}