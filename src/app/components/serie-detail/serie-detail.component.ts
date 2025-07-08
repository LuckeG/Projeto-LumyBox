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
    console.log('ID carregado:', id);
    this.tmdbService.getSerieDetalhes(id).subscribe(data => {
      console.log('Dados da serie:', data);
      this.serie = data;
    });
  }
}
