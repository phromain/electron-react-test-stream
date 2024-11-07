
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = '2b1acfbaf173e0e51b7a5e4a02d8403b';

export const ENDPOINTS = {
    movie: {
        // Recherche de film
        // Exemple d'URL : `${ENDPOINTS.movie.search}?api_key=${API_KEY}&query=matrix`
        search: `${BASE_URL}/search/movie`,

        // Détails d'un film spécifique
        // Exemple d'URL : `${ENDPOINTS.movie.details(603)}?api_key=${API_KEY}&language=fr`
        details: (movieId: number) => `${BASE_URL}/movie/${movieId}`,

        // Fournisseurs (providers) pour un film spécifique
        // Exemple d'URL : `${ENDPOINTS.movie.providers(603)}?api_key=${API_KEY}&language=fr`
        providers: (movieId: number) => `${BASE_URL}/movie/${movieId}/watch/providers`
    }
};
