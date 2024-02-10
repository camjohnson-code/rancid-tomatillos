import React, { useState } from 'react';
import './SearchBar.css';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

const SearchBar = ({ movies, setMovie, updateSingleMovie, badge }) => {
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
                {searchQuery.length > 0 && <h2 className="search-title" tabIndex='0'>{badge}</h2>}
                {searchQuery && filteredMovies.length === 0 && (
                    <p>No results found</p>
                )}
                <div className="movie-cards-container">
                    {searchQuery && filteredMovies.map(movie => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <Card 
                                averageRating={movie.averageRating}
                                backdropPath={movie.backdrop_path}
                                id={movie.id}
                                key={movie.id}
                                releaseDate={movie.release_date}
                                title={movie.title}
                                setMovie={setMovie}
                                allMovies={movies}
                                updateSingleMovie={updateSingleMovie}
                            /> 
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;

