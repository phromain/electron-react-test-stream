import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { MovieService } from '../service/MovieService';
import { Movie } from '../model/movie';
import { Provider } from '../model/provider';
import { providerUrl, providerNameMapping } from '../const/providerUrl';

const movieService = new MovieService();

export const MovieDetail: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (movieId) {
                try {
                    setError(null); 
                    const movieData = await movieService.getMovieDetails(parseInt(movieId));
                    const providerData = await movieService.getProviders(parseInt(movieId));

                    setMovie(movieData);
                    setProviders(providerData);
                } catch (error) {
                    console.error('Erreur lors de la récupération des détails du film:', error);
                    setError('Service indisponible, veuillez réessayer plus tard.');
                }
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

    const getProviderUrl = (providerName: string): string | undefined => {
        const providerKey = providerNameMapping[providerName];
        return providerUrl[providerKey];
    };

    return (
        <div className="MovieDetail">
            <button className="return-btn" onClick={handleBackClick}>Retour</button> 

            {error ? (
                <p className="error-message">{error}</p> 
            ) : movie ? (
                <>
                    <h2>{movie.title}</h2>

                    <div className="movie-providers">
                        {providers.length === 0 ? (
                            <p>Indisponible pour le moment</p>
                        ) : (
                            providers.map((provider, index) => {
                                const providerLink = getProviderUrl(provider.providerName);

                                return (
                                    <a key={index} href={providerLink} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={provider.posterPath}
                                            alt={provider.providerName}
                                            width="50"
                                            height="50"
                                            className="provider-logo"
                                        />
                                    </a>
                                );
                            })
                        )}
                    </div>

                    {movie.posterPath && <img src={movie.posterPath} alt={movie.title} width="200" />}
                    <p>{movie.overview}</p>

                    <p>Date de sortie : {movie.releaseDate ? formatReleaseDate(movie.releaseDate) : 'Non spécifiée'}</p>
                </>
            ) : (
                <p>Chargement des détails du film...</p>
            )}
        </div>
    );
};
