import './SingleMovie.css';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';

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
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    return `${hours} hours ${minutes} minutes`
  }

  return (
    <div className='single-movie' style={movieStyle}>
      <div className='movie-info'>
        <IoCloseCircle className='x-button' onClick={() => setMovie('')} />
        <h2 className='movie-title'>{title}</h2>
        <p>{tagline}</p>
        <p className='overview'>{overview}</p>
        <p>{formatDate(releaseDate)}</p>
        <p>
          <FaStar /> {rating} / 10
        </p>
        <p>{genres}</p>
        <p>{formatRuntime(runtime)}</p>
      </div>
    </div>
  );
};

export default SingleMoviePage;
