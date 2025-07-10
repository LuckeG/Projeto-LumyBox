import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service'; // ou outro serviço
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListaService } from 'app/services/lista.service';

@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.component.html',
  styleUrls: ['./serie-detail.component.sass'],
  imports: [CommonModule, FormsModule],
})
export class SerieDetailComponent implements OnInit {
  serie: any;
  todosItens: any[] = [];

  mostrarFormularioIndicar = false;
  nomeUsuario = '';
  sugestoesUsuarios: any[] = [];
  usuarioSelecionado: any | null = null;
  mensagemSucesso = '';
  mensagemErro = '';
  mensagemLista = '';

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
    private router: Router,
    private listaService: ListaService,
  ) {}

    voltar() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarDetalhes(id);
  }

    carregarDetalhes(id: number) {
    this.tmdbService.getSerieDetalhes(id).subscribe(data => {
      this.serie = data;
    });
  }

  toggleIndicar() {
    this.mostrarFormularioIndicar = !this.mostrarFormularioIndicar;
    if (!this.mostrarFormularioIndicar) {
      this.limparFormularioIndicar();
    }
  }

  limparFormularioIndicar() {
    this.nomeUsuario = '';
    this.sugestoesUsuarios = [];
    this.usuarioSelecionado = null;
    this.mensagemSucesso = '';
    this.mensagemErro = '';
  }

  buscarUsuarios(){
    if (this.nomeUsuario.length < 2) {
      this.sugestoesUsuarios = [];
      return;
    }

    this.tmdbService.buscarUsuarios(this.nomeUsuario).subscribe({
      next: usuarios => {
        this.sugestoesUsuarios = usuarios;
      },
      error: () => {
        this.sugestoesUsuarios = [];
      }
    });
  }

  selecionarUsuario(user: any) {
    console.log('Usuario selecionado:', user);
    this.usuarioSelecionado = user;
    this.nomeUsuario = user.username;
    this.sugestoesUsuarios = [];
  }

  enviarIndicacao() {
    if (!this.usuarioSelecionado) {
      this.mensagemErro = 'Selecione um usuário válido.';
      return;
    }

    this.tmdbService.enviarIndicacao(this.serie?.id, this.usuarioSelecionado.id).subscribe({
      next: () => {
        const user = this.usuarioSelecionado;
        this.mensagemSucesso = `Indicação enviada para ${user.username}!`;
        this.toggleIndicar();
      },
      error: () => {
        this.mensagemErro = 'Erro ao enviar a indicação. Tente novamente.';
      }
    });
  }

    adicionarMinhaLista(){
    const itemId = this.serie?.id;
    const usuarioId = Number(localStorage.getItem('uid'));

    if (!itemId || usuarioId) return;

    const body = {
      itemId: itemId,
      tipo: 'serie'
    };

    console.log('Body a enviar:', body);

    this.tmdbService.adicionarMinhaLista(itemId, usuarioId, 'serie').subscribe({
      next: () => {
        this.mensagemLista = 'Adicionado a sua lista com sucesso';
        this.listaService.emitirAtualizacao();
      },
      error: (error) => {
        console.error('Erro ao adicionar a lista:', error);
        if (error.error) {
          console.error('Detalhes do erro:', error.error);
        }
        this.mensagemLista = 'Erro ao adicionar a lista';
      }
    });
  }
}
