import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

//CRUDEs e LISTAGENS
import { CrudeSequenciaDetalheComponent } from '../crude-sequencia-detalhe/crude-sequencia-detalhe.component';
import { CrudeSequenciaValorListagemComponent } from '../../sequencia-valor/crude-sequencia-valor-listagem/crude-sequencia-valor-listagem.component';

import { TabStripComponent } from '@progress/kendo-angular-layout';
//Kendo
//import { TabStripComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-tabs-sequencia',
  templateUrl: './tabs-sequencia.component.html',
  styleUrls: ['./tabs-sequencia.component.scss']
})
export class TabsSequenciaComponent implements OnInit {
  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadPF', { static: true }) cadPF: CrudeSequenciaDetalheComponent;


  //private cadastroEmEdicao: boolean;
  //@ViewChild('kendoTabStripInstance') kendoTabStripInstance: TabStripComponent;
  public tabIndex: number;

  public innerText: string;

  public nomeTabSelecionada: string = 'sequencia';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
  ) {
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
        url: '/modulos/corp/sequencia'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Edição',
        url: null
      }
    ]);
  }

  tabSelecionada(tabIndex: number): boolean {
    if (tabIndex == this.tabIndex) {
      return true;
    } else {
      return false;
    }
  }

  onTabSelect($event) {
    this.tabIndex = $event.index;
  }

}
