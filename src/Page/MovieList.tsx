import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Movie } from '../model/models';

export const MovieList: React.FC = () => {
    const { state } = useLocation();
    const movies = state ? state.movies : [];
    const navigate = useNavigate();

    const sortedMovies = [...movies].sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateB.getTime() - dateA.getTime(); 
    });

    const goBack = () => {
    navigate(-1);  
    };

    return (
    <div className="MovieList">
        <button className="return-btn" onClick={goBack}>
        Retour à la recherche
        </button>

        {sortedMovies.length > 0 ? (
        <>
            <h2>Résultats :</h2>
            <ul>
            {sortedMovies.map((movie: Movie) => (
                <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                    <h3>
                    {movie.title} 
                    {movie.releaseDate && ` (${new Date(movie.releaseDate).getFullYear()})`}
                    </h3>
                </Link>
                </li>
            ))}
            </ul>
        </>
        ) : (
        <p>Aucun film ne correspond à votre recherche.</p>
        )}
    </div>
    );
};
