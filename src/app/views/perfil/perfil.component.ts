import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.sass'],
    standalone: true,
  imports: [CommonModule]
})
export class PerfilComponent {
  public username: string | null = null;

  profileImageUrl: string | null = null;

  user = {
    name: ' ',
    indications: 5
  };

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

  constructor(private router: Router) {
    const savedName = localStorage.getItem('username');
    console.log('Username do localStorage:', this.username);
    this.user.name = savedName ? savedName : 'Visitante';

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      this.profileImageUrl = savedImage;
    }
  }

   goBack(): void {
      this.router.navigate(['/home']);
    }

  onFileSelected(event: Event): void{
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log('Arquivo selecionado:', file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
        localStorage.setItem('profileImage', this.profileImageUrl);
        console.log('Imagem carregada:', this.profileImageUrl);
      };
      reader.readAsDataURL(file);
    }
  }
}
