import logo from '../../logo.svg';
import './App.css';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import movieData from '../../Movie-test-data';
import { useEffect, useState } from 'react';
import AllMovies from '../Movies Display/All-Movies';
import SingleMoviePage from '../Single Movie Page/SingleMovie';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then((response) => response.json())
      .then((movies) => setMovies(movies.movies))
      .catch((error) => setError(true));
  }, []);

  const updateSingleMovie = (id) => {
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
      .then((response) => response.json())
      .then((movie) => {
        setMovie(movie.movie);
      })
      .catch((error) => setError(true));
  };

  const getRandomMovies = (movies) => {
    const randomMovies = movies.slice();

    for (let i = randomMovies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomMovies[i], randomMovies[j]] = [randomMovies[j], randomMovies[i]];
    }
    return randomMovies;
  };

  const getPopularMovies = () => {
    return movies
      .slice()
      .sort((a, b) => b.average_rating - a.average_rating)
      .slice(0, 14);
  };

  const getRecommendedMovies = () => {
    return getRandomMovies(movies).slice(0, 14);
  };

  const getAllMovies = () => {
    return movies.sort((a, b) => a.title.localeCompare(b.title));
  };

  return (
    <div className='App'>
      {!movie && <h1 tabIndex='0' className='title'>Rancid Tomatillos</h1>}
      {error && <h3 className='error'>Oops! Please try again later.</h3>}
      {movie && (
        <SingleMoviePage
          title={movie.title}
          tagline={movie.tagline}
          overview={movie.overview}
          releaseDate={movie.release_date}
          rating={movie.average_rating}
          genres={movie.genres}
          runtime={movie.runtime}
          backdropPath={movie.backdrop_path}
          setMovie={setMovie}
        />
      )}
      {!movie && (
        <Carousel
          movies={getPopularMovies()}
          badge='popular'
          setMovie={setMovie}
          allMovies={movies}
          updateSingleMovie={updateSingleMovie}
        />
      )}
      {!movie && (
        <Carousel
          movies={getRecommendedMovies()}
          badge='recommended'
          setMovie={setMovie}
          allMovies={movies}
          updateSingleMovie={updateSingleMovie}
        />
      )}
      {!movie && (
        <AllMovies
          movies={getAllMovies()}
          badge='all'
          setMovie={setMovie}
          allMovies={movies}
          updateSingleMovie={updateSingleMovie}
        />
      )}
    </div>
  );
};

export default App;
