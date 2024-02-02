import React from 'react';
import './Carousel.css';
import Card from '../Card/Card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const MyCarousel = ({ movies, badge }) => {
  const cardElements = movies.map((movie) => (
    <Card
      averageRating={movie.averageRating}
      backdropPath={movie.backdrop_path}
      id={movie.id}
      key={movie.id}
      releaseDate={movie.release_date}
      title={movie.title}
    />
  ));

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
    <h2>{badge} Movies</h2>
    <Carousel
      className='carousel'
      swipeable={false}
      draggable={true}
      showDots={false}
      responsive={responsive}
      infinite={true}
      autoPlay={isMobile ? true : false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition='all .5'
      transitionDuration={500}
      containerClass='carousel-container'
      removeArrowOnDeviceType={['tablet', 'mobile']}
      deviceType={isMobile ? 'mobile' : 'desktop'}
      dotListClass='custom-dot-list-style'
      itemClass='carousel-item-padding-40-px'
    >
      {cardElements}
    </Carousel>
    </div>
  );
};

export default MyCarousel;
