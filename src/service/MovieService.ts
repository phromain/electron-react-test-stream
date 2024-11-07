import { Movie, Provider } from '../model/models';
import { ENDPOINTS, API_KEY} from '../const/api';

/* const API_KEY = process.env.REACT_APP_API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY ou BASE_URL non définis dans .env");
} */

export class MovieService {
    async searchMovies(query: string): Promise<Movie[]> {
        const url = `${ENDPOINTS.movie.search}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr`;
        const response = await fetch(url);
        const data = await response.json();

        return data.results.map((item: any) => 
            new Movie(
                item.id,
                item.title,
                item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
                item.overview || 'Pas de résumé disponible',
                item.release_date || 'Date non spécifiée'
            )
        );
    }

    async getMovieDetails(movieId: number): Promise<Movie> {
        const url = `${ENDPOINTS.movie.details(movieId)}?api_key=${API_KEY}&language=fr`;
        const response = await fetch(url);
        const data = await response.json();

        return new Movie(
            data.id,
            data.title,
            data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
            data.overview || 'Pas de résumé disponible',
            data.release_date || 'Date non spécifiée'
        );
    }

    async getProviders(movieId: number): Promise<Provider[]> {
        const url = `${ENDPOINTS.movie.providers(movieId)}?api_key=${API_KEY}&language=fr`;
        const response = await fetch(url);
        const data = await response.json();

        const providers = data.results?.FR?.flatrate || [];
        return providers.map((provider: any) =>
            new Provider(provider.provider_id, provider.provider_name)
        );
    }
}
