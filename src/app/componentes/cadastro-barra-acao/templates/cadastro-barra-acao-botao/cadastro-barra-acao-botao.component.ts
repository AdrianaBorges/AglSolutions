import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cadastro-barra-acao-botao',
  templateUrl: './cadastro-barra-acao-botao.component.html',
  styleUrls: ['./cadastro-barra-acao-botao.component.scss']
})
export class CadastroBarraAcaoBotaoComponent implements OnInit {

  @Input('id') id: string;
  @Input('icone') icone: string;
  @Input('titulo') titulo: string;
  @Input('rotaFilha_tooltip') rotaFilha_tooltip: string;
  @Input('rotaFilha_url') rotaFilha_url: string;

  constructor() { }

  ngOnInit() {
  }

}
