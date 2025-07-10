import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  adicionarMinhaLista(itemId: number, usuarioId: number, tipo: 'filme' | 'serie') {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const body = { item_id: itemId, tipo: tipo };

    console.log('Body no serviço:', body);

    return this.http.post(`${this.baseUrl}/lista/adicionar/`, body, { headers });
}

  enviarIndicacao(idFilmeOuSerie: number, idUsuarioDestinatario: number) {
    const token = localStorage.getItem('token'); // ou onde guarda o token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      item_id: idFilmeOuSerie,
      usuario_destino: idUsuarioDestinatario
    };

    return this.http.post(`${this.baseUrl}/indicacoes/`, body, { headers });
  }


  buscarUsuarios(nome: string) {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<any[]>(`${this.baseUrl}/usuarios/buscar/`, { params });
  }

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

  getFilmeRandomDetalhes(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/filmes-random/${id}/`);
  }

  getSerieRandomDetalhes(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/series-random/${id}/`);
  }

  getTodosFilmesOuSeries() {
    const filmes$ = this.getPopularMovies(1).pipe(
      map(filmes => filmes.map(f => ({ ...f, media_type: 'movie' })))
    );

    const series$ = this.getPopularSeries(1).pipe(
      map(series => series.map(s => ({ ...s, media_type: 'tv' })))
    );

    return forkJoin([filmes$, series$]).pipe(
      map(([filmes, series]) => [...filmes, ...series])
    );
  }
}
