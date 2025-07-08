import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TmdbService } from 'app/services/tmdb.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class HomeComponent implements OnInit {
  tipo: 'filmes' | 'series' = 'filmes';
  query = '';
  categorias: any[] = [];
  selecionado: string = 'Categorias';
  movies: any[] = [];

  paginaAtual = 1;

  constructor(private tmdb: TmdbService, private router: Router) {}

  ngOnInit(): void {
    console.log('Componente Home Iniciado');
    this.carregarPopulares();
    this.carregarCategorias();
  }

  carregarPopulares() {
    this.paginaAtual = 1;  // resetar página ao recarregar
    const req = this.tipo === 'filmes'
      ? this.tmdb.getPopularMovies(this.paginaAtual)
      : this.tmdb.getPopularSeries(this.paginaAtual);
    req.subscribe(res => {
      this.movies = this.formatar(res);
    });
  }

  carregarMais() {
    this.paginaAtual++;
    const req = this.tipo === 'filmes'
      ? this.tmdb.getPopularMovies(this.paginaAtual)
      : this.tmdb.getPopularSeries(this.paginaAtual);
    req.subscribe(res => {
      this.movies = [...this.movies, ...this.formatar(res)]
    });
  }

  carregarCategorias() {
    const req = this.tipo === 'filmes' ? this.tmdb.getMovieGenres() : this.tmdb.getSeriesGenres();
    req.subscribe(res => {
      this.categorias = res;
    });
  }

  filtrarPorCategoria(event: any) {
    const genreId = event.target.value;
    if (!genreId) return;
    const req = this.tipo === 'filmes'
      ? this.tmdb.getMoviesByGenre(genreId)
      : this.tmdb.getSeriesByGenre(genreId);
    req.subscribe(res => {
      this.movies = this.formatar(res);
    });
  }

  buscar() {
    if (!this.query.trim()) {
      this.carregarPopulares();
      return;
    }
    const req = this.tipo === 'filmes'
      ? this.tmdb.searchMovies(this.query)
      : this.tmdb.searchSeries(this.query);
    req.subscribe(res => {
      this.movies = this.formatar(res);
    });
  }

  alterarTipo(tipo: 'filmes' | 'series') {
    this.tipo = tipo;
    console.log('Tipo alterado para:', this.tipo);
    this.query = '';
    this.selecionado = 'Categorias';
    this.carregarPopulares();
    this.carregarCategorias();
  }

  formatar(lista: any[]) {
    return lista.map(item => ({
      id: item.id,
      title: item.title || item.name,
      img: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'https://via.placeholder.com/300x450?text=Sem+Imagem'
    }));
  }

verDetalhes(id: number | undefined) {
  console.log('ID clicado:', id);
  if (id !== undefined && id !== null) {
    const rota = this.tipo === 'filmes' ? '/filmes' : '/series';
    this.router.navigate([rota, id]);
  } else {
    console.warn('ID inválido:', id);
  }
}

}