import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

//CRUDEs e LISTAGENS
import { CrudeSeguradoJuridicaComponent } from '../crude-segurado-juridica/crude-segurado-juridica.component';


import { TabStripComponent } from '@progress/kendo-angular-layout';
//Kendo
//import { TabStripComponent } from '@progress/kendo-angular-layout';
@Component({
  selector: 'app-tabs-segurado-juridica',
  templateUrl: './tabs-segurado-juridica.component.html',
  styleUrls: ['./tabs-segurado-juridica.component.scss']
})
export class TabsSeguradoJuridicaComponent implements OnInit {
  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadPF', { static: true }) cadPF: CrudeSeguradoJuridicaComponent;


  //private cadastroEmEdicao: boolean;
  //@ViewChild('kendoTabStripInstance') kendoTabStripInstance: TabStripComponent;
  public tabIndex: number;

  public innerText: string;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
  ) {
    this.tabIndex = 0;
  }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1],//'Pessoa',
        url: '/modulos/eseg/segurado'
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
