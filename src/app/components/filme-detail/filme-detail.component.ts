// filme-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-filme-detail',
  templateUrl: './filme-detail.component.html',
  styleUrls: ['./filme-detail.component.sass'],
  imports: [CommonModule],
})
export class FilmeDetailComponent implements OnInit {
  filme: any;
  todosItens: any[] = [];
  lastSortedId: number | null = null;  // declarada publicamente

  getBackgroundUrl(): string {
  if (this.filme?.backdrop_path) {
    return `https://image.tmdb.org/t/p/original${this.filme.backdrop_path}`;
  }
  if (this.filme?.poster_path) {
    return `https://image.tmdb.org/t/p/original${this.filme.poster_path}`;
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

    // carrega todos os filmes e séries para sorteio
    this.tmdbService.getTodosFilmesOuSeries().subscribe(dados => {
      this.todosItens = dados;
    });
  }

  carregarDetalhes(id: number) {
    this.tmdbService.getFilmeDetalhes(id).subscribe(data => {
      this.filme = data;
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
    } while (item.id === this.filme?.id);

    this.lastSortedId = item.id;
    const tipo = item.title ? 'filmes' : 'series';
    this.router.navigate([`/${tipo}`, item.id]);
  }
}

