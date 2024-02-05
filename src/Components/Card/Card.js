import './Card.css';
import PropTypes from 'prop-types';

const Card = ({
  movies,
  averageRating,
  backdropPath,
  id,
  releaseDate,
  title,
  setMovie,
  allMovies,
  updateSingleMovie,
}) => {
  const cardStyle = {
    backgroundImage: `url(${backdropPath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '200px',
    height: '300px',
    borderRadius: '10px',
  };

  return (
    <div className='card'>
      <div
        style={cardStyle}
        className='poster'
        onClick={(event) => {
          const movieID = allMovies.find(
            (movie) => movie.title === event.target.nextElementSibling.innerText
          ).id;
          updateSingleMovie(movieID);
        }}
      ></div>
      <p className='title' tabIndex='0'>
        {title}
      </p>
    </div>
  );
};

export default Card;

Card.propTypes = {
  movies: PropTypes.array.isRequired,
  averageRating: PropTypes.number.isRequired,
  backdropPath: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  releaseDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setMovie: PropTypes.func.isRequired,
  allMovies: PropTypes.array.isRequired,
  updateSingleMovie: PropTypes.func.isRequired,
};
