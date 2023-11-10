import { Injectable } from '@angular/core';
import Contato from '../entities/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  public lista_contatos : Contato[] = [];

  constructor() {
    let c1 : Contato = new Contato("Carlos Eduardo", 91094415);
    let c2 : Contato = new Contato("Jotair", 91094499);
    let c3 : Contato = new Contato("Giovane Galvão", 91091112);
    let c4 : Contato = new Contato("Josiel Kulk", 91091234);
    this.lista_contatos.push(c1);
    this.lista_contatos.push(c2);
    this.lista_contatos.push(c3);
    this.lista_contatos.push(c4);
  }

  cadastrar(contato : Contato){
    this.lista_contatos.push(contato);
  }

  obterTodos() : Contato[]{
    return this.lista_contatos;
  }

  obterPorIndice(indice : number) : Contato{
    return this.lista_contatos[indice];
  }

  editar(indice: number, contato: Contato){
    this.lista_contatos[indice] = contato;
  }

  excluir(indice: number){
    this.lista_contatos.splice(indice, 1);
  }


}
