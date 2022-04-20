import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CrudeGrupoDeUsuarioListagemComponent } from '../crude-grupo-de-usuario-listagem/crude-grupo-de-usuario-listagem.component';

@Component({
  selector: 'app-tabs-grupo-de-usuario',
  templateUrl: './tabs-grupo-de-usuario.component.html',
  styleUrls: ['./tabs-grupo-de-usuario.component.scss']
})
export class TabsGrupoDeUsuarioComponent implements OnInit {
  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadGU', { static: true }) cadGU: CrudeGrupoDeUsuarioListagemComponent;

  public tabIndex: number;

  public innerText: string;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
  ){
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
        url: '/modulos/segur/grupo-de-usuario'
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

}
