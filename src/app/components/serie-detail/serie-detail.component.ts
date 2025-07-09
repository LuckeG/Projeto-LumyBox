import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service'; // ou outro serviço
import { Router } from '@angular/router';
@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.component.html',
  styleUrls: ['./serie-detail.component.sass'],
  imports: [CommonModule],
})
export class SerieDetailComponent implements OnInit {
  serie: any;
  todosItens: any[] = [];
  lastSortedId: number | null = null;

  getBackgroundUrl(): string {
  if (this.serie?.backdrop_path) {
    return `https://image.tmdb.org/t/p/original${this.serie.backdrop_path}`;
  }
  if (this.serie?.poster_path) {
    return `https://image.tmdb.org/t/p/original${this.serie.poster_path}`;
  }
  return '';
}

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private router: Router
  ) {}

    voltar() {
    this.router.navigate(['/home']);
}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarDetalhes(id);

    // carrega todos para sorteio
    this.tmdbService.getTodosFilmesOuSeries().subscribe(dados => {
      this.todosItens = dados;
    });
  }

    carregarDetalhes(id: number) {
    this.tmdbService.getSerieDetalhes(id).subscribe(data => {
      this.serie = data;
    });
  }

    sortearOutro() {
      if (this.todosItens.length === 0) return;

      let item;
      let tentativas = 0;

    do {
      const index = Math.floor(Math.random() * this.todosItens.length);
      item = this.todosItens[index];
      tentativas++;
      if (tentativas > 10) break;
    } while (item.id === this.serie?.id);

    this.lastSortedId = item.id;
    const tipo = item.title ? 'filmes' : 'series';
    this.router.navigate([`/${tipo}`, item.id]);
  }
}
