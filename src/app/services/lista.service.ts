import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListaService {
  private atualizarListaSource = new Subject<void>();
  atualizarLista$ = this.atualizarListaSource.asObservable();

  emitirAtualizacao() {
    this.atualizarListaSource.next();
  }
}
