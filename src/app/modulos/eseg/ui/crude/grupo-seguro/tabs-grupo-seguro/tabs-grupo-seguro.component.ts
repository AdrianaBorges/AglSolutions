import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

//CRUDEs e LISTAGENS
import { CrudeGrupoSeguroDetalheComponent } from '../crude-grupo-seguro-detalhe/crude-grupo-seguro-detalhe.component';
import { CrudeRamoSeguroDetalheComponent } from '../../ramo-seguro/crude-ramo-seguro-detalhe/crude-ramo-seguro-detalhe.component';
import { CrudeRamoSeguroListagemComponent } from '../../ramo-seguro/crude-ramo-seguro-listagem/crude-ramo-seguro-listagem.component';


import { TabStripComponent } from '@progress/kendo-angular-layout';
//Kendo
//import { TabStripComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-tabs-grupo-seguro',
  templateUrl: './tabs-grupo-seguro.component.html',
  styleUrls: ['./tabs-grupo-seguro.component.scss']
})
export class TabsGrupoSeguroComponent implements OnInit {
  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadPF', { static: true }) cadPF: CrudeGrupoSeguroDetalheComponent;


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
        url: '/modulos/eseg/grupo-seguro'
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
