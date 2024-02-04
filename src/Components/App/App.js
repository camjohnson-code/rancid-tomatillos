import logo from '../../logo.svg';
import './App.css';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import movieData from '../../Movie-test-data';
import { useState, useEffect } from 'react';
import AllMovies from '../Movies Display/All-Movies';
import SingleMoviePage from '../Single Movie Page/SingleMovie';

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
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDataFromApis = async () => {
      try {
        const movieEndpoint = 'movies'; 

        const [movieResult] = await Promise.all([
          fetchData(movieEndpoint)
        ]);
        setMovies(movieResult.movies);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchDataFromApis();
  }, []); 
  
  useEffect(() => {
   if (movies.length > 0) {
    const popularMovies = movies
    .slice()
    .sort((a, b) => b.average_rating - a.average_rating)
    .slice(0, 14);
    
     }
    setLoading(false);
     }, [movies]);
    
    const getRandomMovies = (movies) => {
      const randomMovies = movies.slice();
      
      for (let i = randomMovies.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomMovies[i], randomMovies[j]] = [randomMovies[j], randomMovies[i]];
      }
      return randomMovies;
    };
    
  const randomMovies = getRandomMovies(movies);
  const allMovies = movies

return (
  <div className='App'>
    {!movies && <h1 tabIndex='0'>Rancid Tomatillos</h1>}
    
    {loading && <p>Loading...</p>}

    {movies && !loading && (
      <>
        <SingleMoviePage
          title={movies.title}
          tagline={movies.tagline}
          overview={movies.overview}
          releaseDate={movies.release_date}
          rating={movies.average_rating}
          genres={movies.genres}
          runtime={movies.runtime}
          backdropPath={movies.backdrop_path}
          setMovie={setMovies}
        />
        <Carousel
          movies={popularMovies}
          badge='Popular'
          setMovie={setMovies}
          dummyMovie={dummyMovie}
        />
        <Carousel
          movies={randomMovies}
          badge='Recommended'
          setMovie={setMovies}
          dummyMovie={dummyMovie}
        />
        <AllMovies
          movies={allMovies}
          badge='All'
          setMovie={setMovies}
          dummyMovie={dummyMovie}
        />
      </>
    )}
  </div>
);

};

export default App;