
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = process.env.REACT_APP_API_KEY;
export const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500';

export const ENDPOINTS = {
    movie: {
        // Exemple d'URL : https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query=matrix
        search: `${BASE_URL}/search/movie`,
        // Exemple d'URL : https://api.themoviedb.org/3/movie/603?api_key={API_KEY}&language=fr
        details: (movieId: number) => `${BASE_URL}/movie/${movieId}`,
        // Exemple d'URL : https://api.themoviedb.org/3/movie/603/watch/providers?api_key={API_KEY}&language=fr
        providers: (movieId: number) => `${BASE_URL}/movie/${movieId}/watch/providers`
    }
};

export const ERROR_MESSAGES = {
    httpError: (status: number) => `Erreur HTTP: ${status}`,
    noResults: 'Aucun résultat trouvé',
    noDetails: 'Détails du film non trouvés',
    noProviders: 'Aucun fournisseur trouvé pour ce film.'
};
