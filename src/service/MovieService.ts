import { Movie } from '../model/movie';
import { Provider } from '../model/provider';
import { ENDPOINTS, API_KEY, BASE_URL_IMG, ERROR_MESSAGES } from '../const/api';

export class MovieService {
    private static instance: MovieService;
    private selectedMovieId: number | null = null;

    private constructor() {}

    public static getInstance(): MovieService {
        if (!MovieService.instance) {
            MovieService.instance = new MovieService();
        }
        return MovieService.instance;
    }

    public setSelectedMovieId(movieId: number): void {
        this.selectedMovieId = movieId;
    }

    public getSelectedMovieId(): number | null {
        return this.selectedMovieId;
    }

    async searchMovies(query: string): Promise<Movie[]> {
        const url = `${ENDPOINTS.movie.search}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr`;
        return this.fetchMovies(url);
    }

    async getMovieDetails(movieId: number): Promise<Movie> {
        const url = this.buildMovieDetailsUrl(movieId);
        return this.fetchMovieDetails(url);
    }

    async getProviders(movieId: number): Promise<Provider[]> {
        const url = this.buildProvidersUrl(movieId);
        return this.fetchProviders(url);
    }

    private buildMovieDetailsUrl(movieId: number): string {
        return `${ENDPOINTS.movie.details(movieId)}?api_key=${API_KEY}&language=fr`;
    }

    private buildProvidersUrl(movieId: number): string {
        return `${ENDPOINTS.movie.providers(movieId)}?api_key=${API_KEY}&language=fr`;
    }

    private async fetchMovies(url: string): Promise<Movie[]> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(ERROR_MESSAGES.httpError(response.status));
            }
            const data = await response.json();
            if (!data.results) {
                throw new Error(ERROR_MESSAGES.noResults);
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
            throw error; 
        }
    }

    private async fetchMovieDetails(url: string): Promise<Movie> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(ERROR_MESSAGES.httpError(response.status));
            }
            const data = await response.json();
            if (!data) {
                throw new Error(ERROR_MESSAGES.noDetails);
            }
            return new Movie(
                data.id,
                data.title,
                data.poster_path ? `${BASE_URL_IMG}${data.poster_path}` : null,
                data.overview || 'Pas de résumé disponible',
                data.release_date || 'Date non spécifiée'
            );
        } catch (error) {
            throw error; 
        }
    }

    private async fetchProviders(url: string): Promise<Provider[]> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(ERROR_MESSAGES.httpError(response.status));
            }
            const data = await response.json();
            const providers = data.results?.FR?.flatrate || [];
            if (providers.length === 0) {
                console.warn(ERROR_MESSAGES.noProviders);
            }
            return providers.map((provider: any) =>
                new Provider(
                    provider.provider_id,        
                    provider.provider_name,      
                    provider.logo_path ? `${BASE_URL_IMG}${provider.logo_path}` : '' 
                )
            );
        } catch (error) {
            throw error; 
        }
    }
}
