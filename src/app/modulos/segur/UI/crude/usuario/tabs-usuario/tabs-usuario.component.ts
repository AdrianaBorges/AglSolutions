import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CrudeGruposDoUsuarioListagemComponent } from '../../grupos-do-usuario/crude-grupos-do-usuario-listagem/crude-grupos-do-usuario-listagem.component';

@Component({
  selector: 'app-tabs-usuario',
  templateUrl: './tabs-usuario.component.html',
  styleUrls: ['./tabs-usuario.component.scss']
})
export class TabsUsuarioComponent implements OnInit {

  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadGU', { static: true }) cadGU: CrudeGruposDoUsuarioListagemComponent;

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
        url: '/modulos/segur/usuario'
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
