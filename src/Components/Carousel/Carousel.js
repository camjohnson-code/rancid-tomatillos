import React from 'react';
import './Carousel.css';
import Card from '../Card/Card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PropTypes from 'prop-types';

const MyCarousel = ({
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
      setMovie={setMovie}
      allMovies={allMovies}
      updateSingleMovie={updateSingleMovie}
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

  return (
    <div>
      <h2 tabIndex='0' className={`${badge}-movies`} >{badge.charAt(0).toUpperCase() + badge.slice(1)} Movies</h2>
      <Carousel
        className='carousel'
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        customTransition='all 500ms ease-in-out'
        transitionDuration={500}
        containerClass='carousel-container'
        removeArrowOnDeviceType={['tablet', 'mobile']}
        devicetype={isMobile ? 'mobile' : 'desktop'}
        dotListClass='custom-dot-list-style'
        itemClass='carousel-item-padding-40-px'
      >
        {cardElements}
      </Carousel>
    </div>
  );
};

export default MyCarousel;

MyCarousel.propTypes = {
  badge: PropTypes.string.isRequired,
};
