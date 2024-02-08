import React from 'react';
import Card from '../Card/Card';
import movieData from '../../Movie-test-data';
import 'react-multi-carousel/lib/styles.css';
import './All-Movies.css';
import PropTypes from 'prop-types';
import LoadingCard from '../Loading Card/LoadingCard';

const AllMovies = ({
  movies,
  badge,
  setMovie,
  allMovies,
  updateSingleMovie,
}) => {
  const cardElements = movies.map((movie) => (
    <Card
      averageRating={movie.averageRating}
      backdropPath={movie.backdrop_path}
      id={movie.id}
      key={movie.id}
      releaseDate={movie.release_date}
      title={movie.title}
      tabIndex='0'
      setMovie={setMovie}
      movies={movies}
      allMovies={allMovies}
      updateSingleMovie={updateSingleMovie}
    />
  ));

  const loadingCards = [
    <LoadingCard />,
    <LoadingCard />,
    <LoadingCard />,
    <LoadingCard />,
    <LoadingCard />,
    <LoadingCard />,
  ];

  return (
    <div>
      <hr></hr>
      <h2>{badge} Movies</h2>
      <div className='posterContainer'>
        <div className='moviePosters'>{movies ? cardElements : loadingCards}</div>
      </div>
    </div>
  );
};

export default AllMovies;

AllMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  badge: PropTypes.string.isRequired,
  setMovie: PropTypes.func.isRequired,
  allMovies: PropTypes.array.isRequired,
  updateSingleMovie: PropTypes.func.isRequired,
};
