import React, { useState } from 'react';
import { MovieService } from '../service/MovieService';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../model/movie';

const movieService = new MovieService();

export const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
    if (query.trim() === '') return;

    const results = await movieService.searchMovies(query);
    setMovies(results);

    if (results.length > 0) {
        navigate('/movies', { state: { movies: results } });
    }
    };

    return (
    <div className="MovieSearch">
        <h2>Netflix, Disney + ou Amazon Video ?</h2>

        <input
        type="text"
        placeholder="Rechercher un film"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>
        Rechercher
        </button>

    </div>
    );
};
