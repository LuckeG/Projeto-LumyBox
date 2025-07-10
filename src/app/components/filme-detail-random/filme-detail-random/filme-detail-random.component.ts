// filme-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../../services/tmdb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-filme-detail',
  templateUrl: './filme-detail-random.component.html',
  styleUrls: ['./filme-detail-random.component.sass'],
  imports: [CommonModule],
})
export class FilmeDetailRandomComponent implements OnInit {
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
    // Escuta mudanças no ID da URL e recarrega os dados
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      if (id) {
        this.carregarDetalhes(id);
      }
    });

    // Carrega os dados para sorteio apenas uma vez
    this.tmdbService.getTodosFilmesOuSeries().subscribe(dados => {
      this.todosItens = dados;
    });
  }

  carregarDetalhes(id: number) {
    this.tmdbService.getFilmeRandomDetalhes(id).subscribe(data => {
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

    console.log('Item sorteado:', item);

    this.lastSortedId = item.id;

    if (item.media_type === 'movie') {
      this.router.navigate(['/filmes-random', item.id]);
    } else if (item.media_type === 'tv') {
      this.router.navigate(['/series-random', item.id]);
    } else {
      console.warn('Tipo de mídia desconhecido:', item.media_type);
    }
  }

}

