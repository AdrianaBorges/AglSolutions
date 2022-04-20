import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aguarde-carregando',
  templateUrl: './aguarde-carregando.component.html',
  styleUrls: ['./aguarde-carregando.component.scss']
})
export class AguardeCarregandoComponent implements OnInit {

  public exibirAguarde: boolean;

  constructor() { 
    this.exibirAguarde = false;
  }

  ngOnInit() {

  }

  public exibir(){
    this.exibirAguarde = true;
  }

  public esconder(){
    this.exibirAguarde = false;
  }

}
