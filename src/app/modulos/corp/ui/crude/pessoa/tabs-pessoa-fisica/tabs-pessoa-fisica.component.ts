import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

//CRUDEs e LISTAGENS
import { CrudePessoaFisicaComponent } from '../crude-pessoa-fisica/crude-pessoa-fisica.component';
import { CrudePessoaDocumentoListagemComponent } from '../../pessoa-documento/crude-pessoa-documento-listagem/crude-pessoa-documento-listagem.component';

import { TabStripComponent } from '@progress/kendo-angular-layout';
//Kendo
//import { TabStripComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'tabs-pessoa-fisica',
  templateUrl: './tabs-pessoa-fisica.component.html',
  styleUrls: ['./tabs-pessoa-fisica.component.scss']
})
export class CrudePessoaFisicaTabsComponent implements OnInit {

  //@ViewChild('kendoTab') kendoTab: TabStripComponent;
  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  //@ViewChild('gridPesquisaDocumento') gridPesquisaDocumento: CrudePessoaDocumentoListagemComponent;
  @ViewChild('cadPF', { static: true }) cadPF: CrudePessoaFisicaComponent;


  //private cadastroEmEdicao: boolean;
  //@ViewChild('kendoTabStripInstance') kendoTabStripInstance: TabStripComponent;
  public tabIndex: number;

  public innerText: string;

  public nomeTabSelecionada: string = 'dadospessoais';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
  ){
    this.tabIndex = 0;
  }

  ngOnInit() {
    this.criarBreadCrumbs();
    //this.cadastroEmEdicao = false;
  }

  private criarBreadCrumbs() {
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1],//'Pessoa',
        url: '/modulos/corp/pessoa'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Edição',
        url: null
      }
    ]);
  }

  tabSelecionada(tabIndex: number): boolean {
    if(tabIndex == this.tabIndex){
      return true;
    }else {
      return false;
    }
  }

  onTabSelect($event){
    this.tabIndex = $event.index;
  }

  // onCadastroEmEdicao(cadastroEmEdicao){
  //   //Foi necessário colocar o setTimeout para não dar erro de refresh na view devido ao ciclo de vida do angular
  //   //setTimeout(() => this.cadastroEmEdicao = cadastroEmEdicao, 0);
  // }

}
