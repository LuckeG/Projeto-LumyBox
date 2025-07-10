import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaService } from 'app/services/lista.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.sass'],
  standalone: true,
  imports: [CommonModule]
})
export class PerfilComponent implements OnInit{
  public username: string | null = null;

  photoURL: string | null = null;
  mostrarIndicacoes = false;
  movies: any[] = [];

  user = {
    name: ' ',
    indications: ''
  };

  constructor(private router: Router, private http: HttpClient, private listaService: ListaService) {
    const savedName = localStorage.getItem('username');
    console.log('Username do localStorage:', savedName);
    this.user.name = savedName ? savedName : 'Visitante';

    const savedImage = localStorage.getItem('photoURL');
    console.log('Photo URL do localStorage:', savedImage);
    if (savedImage) {
      this.photoURL = savedImage;
    }
  }

  ngOnInit() {
    this.carregarMinhaLista(); // carrega lista ao iniciar o perfil

    this.listaService.atualizarLista$.subscribe(() => {
      console.log('Evento de atualização recebido no perfil');
      this.carregarMinhaLista(); // atualiza automaticamente quando receber evento
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log('Arquivo selecionado:', file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoURL = reader.result as string;
        localStorage.setItem('photoURL', this.photoURL);
        console.log('Imagem carregada:', this.photoURL);
      };
      reader.readAsDataURL(file);
    }
  }

  logout(): void {
    localStorage.removeItem('username');
    //localStorage.removeItem('photoURL');
    localStorage.removeItem('email')
    localStorage.removeItem('uid');

    this.router.navigate(['/login']);
  }

  carregarIndicacoes() {
    const token = localStorage.getItem('token');

    this.http.get<any[]>('http://localhost:8000/api/indicacoes/recebidas/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        this.movies = data.map(indicacao => ({
          title: indicacao.title,
          img: indicacao.poster_path
            ? `https://image.tmdb.org/t/p/w500${indicacao.poster_path}`
            : 'assets/imagens/default-poster.png'
        }));
        this.mostrarIndicacoes = true;
      },
      error: (error) => {
        console.error('Erro ao carregar indicações:', error)
        this.mostrarIndicacoes = false;
      }
    })
  }

  carregarMinhaLista() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<any[]>('http://localhost:8000/api/lista/', { headers }).subscribe({
      next: (lista) => {
        const detalhesRequests = lista.map(item => {
          const url = item.tipo === 'filme'
            ? `http://localhost:8000/api/filmes/${item.item_id}/`
            : `http://localhost:8000/api/series/${item.item_id}/`;

          return this.http.get<any>(url, { headers });
        });

        Promise.all(detalhesRequests.map(req => req.toPromise())).then(detalhes => {
          this.movies = detalhes.map(m => ({
            title: m.title || m.name,
            img: m.poster_path
              ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
              : 'assets/imagens/default-poster.png'
          }));
        });
      },
      error: (err) => {
        console.error('Erro ao carregar lista:', err);
      }
    });
  }


}
