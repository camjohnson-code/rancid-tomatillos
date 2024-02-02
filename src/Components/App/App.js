import logo from '../../logo.svg';
import './App.css';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import movieData from '../../Movie-test-data';
import { useState } from 'react';

function App() {

  const [movies, setMovies] = useState(movieData.movies)

  return (
    <div className='App'>
      <h1>Rancid Tomatillos</h1>
      <Carousel movies={movies} badge="Popular"/>
      <Carousel movies={movies} badge="Recommended"/>
    </div>
  );
}

export default App;
