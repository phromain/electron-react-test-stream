import React, { useState } from 'react';
import { MovieService } from '../service/MovieService';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../model/movie';

const movieService = new MovieService();

export const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null); 
    const [noResults, setNoResults] = useState(false); 
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (query.trim() === '') return;

        try {
            setError(null);
            setNoResults(false);
            const results = await movieService.searchMovies(query);
            setMovies(results);

            if (results.length === 0) {
                setNoResults(true); 
            } else {
                navigate('/movies', { state: { movies: results } });
            }
        } catch (error) {
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
            <br />
            {error && <p className="error-message">{error}</p>}
            {noResults && <p className="no-results-message">Aucun film trouvé pour cette recherche.</p>} 
        </div>
    );
};
