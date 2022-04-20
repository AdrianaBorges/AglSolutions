import { 
  Component, OnInit, 
  Input } from '@angular/core';

@Component({
  selector: 'app-grid-pesquisa-botao-acao-linha',
  templateUrl: './grid-pesquisa-botao-acao-linha.component.html',
  styleUrls: ['./grid-pesquisa-botao-acao-linha.component.scss']
})
export class GridPesquisaBotaoAcaoLinhaComponent {
  
  @Input('id') id: string;
  @Input('icone') icone: string;
  @Input('titulo') titulo: string;
  @Input('rotaFilha_tooltip') rotaFilha_tooltip: string;
  @Input('rotaFilha_url') rotaFilha_url: string;

  // public itemTemplate: TemplateRef<any>;

  // constructor(private templateRef: TemplateRef<any>) {
  //   this.itemTemplate = this.templateRef;
  // }

  constructor() { }

  // ngOnInit() {
  // }

}
