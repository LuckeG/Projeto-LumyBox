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
  filme: any;  // declarada publicamente

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
    console.log('ID carregado:', id);
    this.tmdbService.getFilmeDetalhes(id).subscribe(data => {
      console.log('Dados do filme:', data);
      this.filme = data;
    });
  }
}

