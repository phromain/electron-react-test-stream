import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Movie } from '../model/movie';
import { MovieService } from '../service/MovieService';

const movieService = MovieService.getInstance();

export const MovieList: React.FC = () => {
    const { state } = useLocation();
    const movies = state ? state.movies : [];
    const navigate = useNavigate();

    const sortedMovies = [...movies].sort((a, b) => {
        const dateA = new Date(a.releaseDate);
        const dateB = new Date(b.releaseDate);
        return dateB.getTime() - dateA.getTime(); 
    });

    const handleMovieSelect = (movieId: number) => {
        movieService.setSelectedMovieId(movieId);
        navigate(`/movies/${movieId}`);
    };

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
                    <div className="scrollable-container">
                        <div className="movie-grid">
                            {sortedMovies.map((movie: Movie) => (
                                <div key={movie.id} className="movie-item" onClick={() => handleMovieSelect(movie.id)}>
                                    {movie.posterPath ? (
                                        <img src={movie.posterPath} alt={movie.title} className="movie-poster" />
                                    ) : (
                                        <div className="movie-placeholder">Image non disponible</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p>Aucun film ne correspond à votre recherche.</p>
            )}
        </div>
    );
};
