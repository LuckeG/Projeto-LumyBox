import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent {
  movies = [
    { title: 'From', img: 'assets/imagens/movies/from.png' },
    { title: 'Casamento às Cegas', img: 'assets/imagens/movies/casamento-cegas.png' },
    { title: 'Novocaine', img: 'assets/imagens/movies/novocaine.png' },
    { title: 'Nós', img: 'assets/imagens/movies/nos.png' },
    { title: 'Casamento Sangrento', img: 'assets/imagens/movies/casamento-sangrento.png' },
    { title: 'Blink Twice', img: 'assets/imagens/movies/blink-twice.png' },
    { title: 'Black Clover', img: 'assets/imagens/movies/black-clover.png' },
    { title: 'Cartas para Julieta', img: 'assets/imagens/movies/cartas-julieta.png' },
    { title: 'Inferno na Palha', img: 'assets/imagens/movies/inferno-palha.png' },
    { title: 'A Batalha dos 100', img: 'assets/imagens/movies/batalha.png' },
    { title: 'Soltos em Floripa', img: 'assets/imagens/movies/soltos.png' },
    { title: 'Alice in Borderland', img: 'assets/imagens/movies/alice.png' }
  ];
}