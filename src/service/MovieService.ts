import { Movie } from '../model/movie';
import { Provider } from '../model/provider';
import { ENDPOINTS, API_KEY, BASE_URL_IMG } from '../const/api';

export class MovieService {
    async searchMovies(query: string): Promise<Movie[]> {
        const url = `${ENDPOINTS.movie.search}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr`;
        
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (!data.results) {
                throw new Error('Aucun résultat trouvé');
            }

            return data.results.map((item: any) => 
                new Movie(
                    item.id,
                    item.title,
                    item.poster_path ? `${BASE_URL_IMG}${item.poster_path}` : null,
                    item.overview || 'Pas de résumé disponible',
                    item.release_date || 'Date non spécifiée'
                )
            );
        } catch (error) {
            //console.error('Erreur lors de la recherche des films:', error);
            throw error; 
        }
    }

    async getMovieDetails(movieId: number): Promise<Movie> {
        const url = `${ENDPOINTS.movie.details(movieId)}?api_key=${API_KEY}&language=fr`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (!data) {
                throw new Error('Détails du film non trouvés');
            }

            return new Movie(
                data.id,
                data.title,
                data.poster_path ? `${BASE_URL_IMG}${data.poster_path}` : null,
                data.overview || 'Pas de résumé disponible',
                data.release_date || 'Date non spécifiée'
            );
        } catch (error) {
            //console.error('Erreur lors de la récupération des détails du film:', error);
            throw error; 
        }
    }

    async getProviders(movieId: number): Promise<Provider[]> {
        const url = `${ENDPOINTS.movie.providers(movieId)}?api_key=${API_KEY}&language=fr`;

        try {
            const response = await fetch(url);


            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            const providers = data.results?.FR?.flatrate || [];

            if (providers.length === 0) {
                console.warn('Aucun fournisseur trouvé pour ce film.');
            }

            //console.log('Fournisseurs pour FR :', providers);

            return providers.map((provider: any) =>
                new Provider(
                    provider.provider_id,        
                    provider.provider_name,      
                    provider.logo_path ? `${BASE_URL_IMG}${provider.logo_path}` : '' 
                )
            );
        } catch (error) {
            //console.error('Erreur lors de la récupération des fournisseurs:', error);
            throw error; 
        }
    }
}
