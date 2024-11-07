import React, { useState } from 'react';
import { MovieService } from '../service/MovieService';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../model/movie';

const movieService = new MovieService();

export const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (query.trim() === '') return;

        try {
            setError(null); 
            const results = await movieService.searchMovies(query);
            setMovies(results);

            if (results.length > 0) {
                navigate('/movies', { state: { movies: results } });
            }
        } catch (error) {
            console.error('Erreur lors de la recherche des films:', error);
            setError('Service indisponible, veuillez réessayer plus tard.');
        }
    };

    return (
        <div className="MovieSearch">
            <h2>Votre film est à portée de main sur ces plateformes</h2>

            <input
                type="text"
                placeholder="Rechercher un film"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>Rechercher</button>

            {error && <p className="error-message">{error}</p>} 
        </div>
    );
};
