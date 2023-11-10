import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Contato from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  nome: string;
  telefone: number;
  contato: Contato;
  indice: number;
  edicao: boolean = true;

  constructor(private router: Router,
    private firebase: FirebaseService) { }

  ngOnInit() {
    this.contato = history.state.contato;
    this.nome = this.contato.nome;
    this.telefone = this.contato.telefone;
  }

  habilitar(){
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  editar(){
    let novo: Contato = new Contato(this.nome, this.telefone);
    this.firebase.update(novo, this.contato.id);
    this.router.navigate(["/home"]);
  }

  excluir(){
    this.firebase.delete(this.contato);
    this.router.navigate(["/home"]);
  }

}
