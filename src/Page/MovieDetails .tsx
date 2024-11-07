import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { MovieService } from '../service/MovieService';
import { Movie, Provider } from '../model/models';

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

    const getProviderNames = () => {
    const providerNames = providers.map(provider => provider.providerName);
    const requiredProviders = ['Netflix', 'Amazon Video', 'Disney Plus'];

    return requiredProviders.map(provider => {
        return providerNames.includes(provider) 
        ? provider 
        : `${provider} (Indisponible)`;
    });
    };

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
            {getProviderNames().map((provider, index) => (
                <li key={index}>{provider}</li>
            ))}
            </ul>
        </>
        ) : (
        <p>Chargement des détails du film...</p>
        )}
    </div>
    );
};
