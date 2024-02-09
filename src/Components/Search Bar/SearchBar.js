import React, { useState } from 'react';
import './SearchBar.css';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

const SearchBar = ({ movies, setMovie, allMovies, updateSingleMovie }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filteredMovie = movies.filter(movie => 
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMovies(filteredMovie);
    };

    return (
        <div className='SearchBar'>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={handleSearch}
            />
            <div className="search-results">
                {filteredMovies.map(movie => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
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
                        onClick={(event) => {
                            const movieID = allMovies.find(
                              (movie) => movie.title === event.target.nextElementSibling.innerText
                            ).id;
                            updateSingleMovie(movieID);
                          }}/> 
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;

