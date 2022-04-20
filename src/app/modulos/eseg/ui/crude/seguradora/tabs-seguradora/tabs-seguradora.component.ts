import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

//CRUDEs e LISTAGENS
import { CrudeSeguradoraDetalheComponent } from '../crude-seguradora-detalhe/crude-seguradora-detalhe.component';
import { CrudeAssistSegListagemComponent } from '../../assist-seg/crude-assist-seg-listagem/crude-assist-seg-listagem.component';
import { CrudeAssistSegDetalheComponent } from '../../assist-seg/crude-assist-seg-detalhe/crude-assist-seg-detalhe.component';
import { CrudeCoberturaSegDetalheComponent } from '../../cobertura-seg/crude-cobertura-seg-detalhe/crude-cobertura-seg-detalhe.component';
import { CrudeCoberturaSegListagemComponent } from '../../cobertura-seg/crude-cobertura-seg-listagem/crude-cobertura-seg-listagem.component';
import { CrudeSorteioSegListagemComponent } from '../../sorteio-seg/crude-sorteio-seg-listagem/crude-sorteio-seg-listagem.component';
import { CrudeSorteioSegDetalheComponent } from '../../sorteio-seg/crude-sorteio-seg-detalhe/crude-sorteio-seg-detalhe.component';


import { TabStripComponent } from '@progress/kendo-angular-layout';
//Kendo
//import { TabStripComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-tabs-seguradora',
  templateUrl: './tabs-seguradora.component.html',
  styleUrls: ['./tabs-seguradora.component.scss']
})
export class TabsSeguradoraComponent implements OnInit {
  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadPF', { static: true }) cadPF: CrudeSeguradoraDetalheComponent;


  //private cadastroEmEdicao: boolean;
  //@ViewChild('kendoTabStripInstance') kendoTabStripInstance: TabStripComponent;
  public tabIndex: number;

  public innerText: string;

  //public nomeTabSelecionada: string = 'empresa';

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
        url: '/modulos/eseg/seguradora'
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
