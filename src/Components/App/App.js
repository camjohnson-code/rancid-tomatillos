import logo from '../../logo.svg';
import './App.css';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import movieData from '../../Movie-test-data';
import { useState } from 'react';
import AllMovies from '../Movies Display/All-Movies';

const App = () => {
  const [movies, setMovies] = useState(movieData.movies);

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
      <h1 tabindex='0'>Rancid Tomatillos</h1>
      <Carousel movies={popularMovies} badge='Popular' />
      <Carousel movies={recommendedMovies} badge='Recommended' />
      <AllMovies movies={allMovies} badge='All' />
    </div>
  );
};

export default App;
