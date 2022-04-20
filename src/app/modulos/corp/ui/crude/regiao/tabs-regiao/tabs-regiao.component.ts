import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CrudeRegiaoDetalheComponent } from '../crude-regiao-detalhe/crude-regiao-detalhe.component';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs-regiao',
  templateUrl: './tabs-regiao.component.html',
  styleUrls: ['./tabs-regiao.component.scss']
})
export class TabsRegiaoComponent implements OnInit {

  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadReg', { static: true }) cadReg: CrudeRegiaoDetalheComponent;


  public tabIndex: number;

  public innerText: string;

  public nomeTabSelecionada: string = 'regiao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public route: ActivatedRoute
  ) {
    this.tabIndex = 0;
  }

  ngOnInit() {
    this.criarBreadCrumbs();
    //this.cadastroEmEdicao = false;
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + " " + id);
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
