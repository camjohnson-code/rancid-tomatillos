import React from 'react';
import Card from '../Card/Card';
import Carousel from 'react-multi-carousel';
import movieData from '../../Movie-test-data';
import 'react-multi-carousel/lib/styles.css';
import "./All-Movies.css"

const AllMovies = ({ movies, badge }) => {
  const cardElements = movies.map((movie) => (
    <Card
      averageRating={movie.averageRating}
      backdropPath={movie.backdrop_path}
      id={movie.id}
      key={movie.id}
      releaseDate={movie.release_date}
      title={movie.title}
      tabindex='0'
    />
  ));

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const isMobile = window.innerWidth <= 464;

  return (<div>
    <hr></hr>
    <h2>{badge} Movies</h2>
    <div class="posterContainer">
      <card class="moviePosters">{cardElements}</card>
    </div>
    </div>
  );
};

export default AllMovies;
