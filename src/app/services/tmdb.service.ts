import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Filmes
  getPopularMovies(page = 1) {
    return this.http.get<any[]>(`${this.baseUrl}/filmes/populares/?page=${page}`);
  }

  searchMovies(query: string) {
    const params = new HttpParams().set('query', query);
    return this.http.get<any[]>(`${this.baseUrl}/filmes/search/`, { params });
  }

  getMovieGenres() {
    return this.http.get<any[]>(`${this.baseUrl}/generos/filmes/`);
  }

  getMoviesByGenre(genreId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/generos/filmes/${genreId}/`);
  }

  // Séries
  getPopularSeries(page = 1) {
    return this.http.get<any[]>(`${this.baseUrl}/series/populares/?page=${page}`);
  }

  searchSeries(query: string) {
    const params = new HttpParams().set('query', query);
    return this.http.get<any[]>(`${this.baseUrl}/series/search/`, { params });
  }

  getSeriesGenres() {
    return this.http.get<any[]>(`${this.baseUrl}/generos/series/`);
  }

  getSeriesByGenre(genreId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/generos/series/${genreId}/`);
  }

  getAnimes() {
    return this.http.get<any[]>(`${this.baseUrl}/animes/`)
  }

  getRealities() {
    return this.http.get<any[]>(`${this.baseUrl}/realities/`)
  }

  getFilmeDetalhes(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/filmes/${id}/`);
  }

  getSerieDetalhes(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/series/${id}/`);
  }
  
}
