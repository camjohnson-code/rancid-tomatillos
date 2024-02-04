import logo from '../../logo.svg';
import './App.css';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import movieData from '../../Movie-test-data';
import { useState } from 'react';
import AllMovies from '../Movies Display/All-Movies';
import SingleMoviePage from '../Single Movie Page/SingleMovie';

const App = () => {
  const dummyMovie = {
    id: 1,
    title: 'Fake Movie Title',
    poster_path:
      'https://image.tmdb.org/t/p/original//7G2VvG1lU8q758uOqU6z2Ds0qpA.jpg',
    backdrop_path:
      'https://image.tmdb.org/t/p/original//oazPqs1z78LcIOFslbKtJLGlueo.jpg',
    release_date: '2019-12-04',
    overview:
      'Some overview that is full of buzzwords to attempt to entice you to watch this movie! Explosions! Drama! True love! Robots! A cute dog!',
    average_rating: 6,
    genres: ['Drama'],
    budget: 63000000,
    revenue: 100853753,
    runtime: 139,
    tagline: "It's a movie!",
  };
  

  const [movies, setMovies] = useState(movieData.movies);
  const [movie, setMovie] = useState('');

  const getRandomMovies = (movies) => {
    const randomMovies = movies.slice();

    for (let i = randomMovies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomMovies[i], randomMovies[j]] = [randomMovies[j], randomMovies[i]];
    }
    return randomMovies;
  };

  const popularMovies = movies
    .slice()
    .sort((a, b) => b.average_rating - a.average_rating)
    .slice(0, 14);

  const recommendedMovies = getRandomMovies(movies).slice(0, 14);

  const allMovies = movies;

  return (
    <div className='App'>
      {!movie && <h1 tabIndex='0'>Rancid Tomatillos</h1>}
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
          movies={popularMovies}
          badge='Popular'
          setMovie={setMovie}
          dummyMovie={dummyMovie}
        />
      )}
      {!movie && (
        <Carousel
          movies={recommendedMovies}
          badge='Recommended'
          setMovie={setMovie}
          dummyMovie={dummyMovie}
        />
      )}
      {!movie && (
        <AllMovies
          movies={allMovies}
          badge='All'
          setMovie={setMovie}
          dummyMovie={dummyMovie}
        />
      )}
    </div>
  );
};

export default App;
