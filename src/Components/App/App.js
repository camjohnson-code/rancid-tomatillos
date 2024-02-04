import logo from '../../logo.svg';
import './App.css';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import movieData from '../../Movie-test-data';
import { useState, useEffect } from 'react';
import AllMovies from '../Movies Display/All-Movies';

const fetchData = (endPoint) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${endPoint}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(`Successfully fetched data for ${endPoint}:`, data);
      return data;
    })
    .catch((error) => {
      console.error(`Error fetching data for ${endPoint}:`, error);
      throw error;
    });
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(true)

  useEffect(() => {
    const fetchDataFromApis = async () => {
      try {
        const movieEndpoint = 'movies'; 

        const [movieResult] = await Promise.all([
          fetchData(movieEndpoint)
        ]);
        setMovies(movieResult.movies);
      } catch (error) {
        setError(true);
      }
    };

    fetchDataFromApis();
  }, []); 
  

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
      {error && <h3>Oops! Please try again later.</h3>}
      <Carousel movies={popularMovies} badge='Popular' />
      <Carousel movies={recommendedMovies} badge='Recommended' />
      <AllMovies movies={allMovies} badge='All' />
    </div>
  );
};

export default App;