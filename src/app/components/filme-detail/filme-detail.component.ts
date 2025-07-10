// filme-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListaService } from 'app/services/lista.service';

@Component({
  selector: 'app-filme-detail',
  templateUrl: './filme-detail.component.html',
  styleUrls: ['./filme-detail.component.sass'],
  imports: [CommonModule, FormsModule],
})
export class FilmeDetailComponent implements OnInit {
  filme: any;
  todosItens: any[] = [];

  mostrarFormularioIndicar = false;
  nomeUsuario = '';
  sugestoesUsuarios: any[] = [];
  usuarioSelecionado: any | null = null;
  mensagemSucesso = '';
  mensagemErro = '';
  mensagemLista = '';

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
    this.tmdbService.getFilmeDetalhes(id).subscribe(data => {
      this.filme = data;
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

    this.tmdbService.enviarIndicacao(this.filme?.id, this.usuarioSelecionado.id).subscribe({
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
    const itemId = this.filme?.id;
    const usuarioId = Number(localStorage.getItem('uid'));

    if (!itemId || usuarioId) return;

    const body = {
      itemId: itemId,
      tipo: 'filme'
    };

    console.log('Body a enviar:', body);

    this.tmdbService.adicionarMinhaLista(itemId, usuarioId, 'filme').subscribe({
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

