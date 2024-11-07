import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { MovieService } from '../service/MovieService';
import { Movie } from '../model/movie';
import { Provider } from '../model/provider';

const movieService = new MovieService();

export const MovieDetail: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [providers, setProviders] = useState<Provider[]>([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (movieId) {
                const movieData = await movieService.getMovieDetails(parseInt(movieId));
                const providerData = await movieService.getProviders(parseInt(movieId));

                setMovie(movieData);
                setProviders(providerData);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    const handleBackClick = () => {
        navigate(-1); 
    };

    const formatReleaseDate = (releaseDate: string) => {
        const date = new Date(releaseDate);
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="MovieDetail">
            <button className="return-btn" onClick={handleBackClick}>Retour</button> 

            {movie ? (
                <>
                    <h2>{movie.title}</h2>
                    {movie.posterPath && <img src={movie.posterPath} alt={movie.title} width="200" />}
                    <p>{movie.overview}</p>

                    <p>Date de sortie : {movie.releaseDate ? formatReleaseDate(movie.releaseDate) : 'Non spécifiée'}</p>

                    <h3>Fournisseurs de streaming :</h3>
                    <ul>
                        {providers.map((provider, index) => (
                            <li key={index}>
                                <img
                                    src={provider.posterPath}
                                    alt={provider.providerName}
                                    width="50"
                                    height="50"
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Chargement des détails du film...</p>
            )}
        </div>
    );
};
