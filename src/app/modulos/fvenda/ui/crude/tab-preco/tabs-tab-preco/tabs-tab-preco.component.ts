import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CrudeTabPrecoDetalheComponent } from '../crude-tab-preco-detalhe/crude-tab-preco-detalhe.component';

@Component({
  selector: 'app-tabs-tab-preco',
  templateUrl: './tabs-tab-preco.component.html',
  styleUrls: ['./tabs-tab-preco.component.scss']
})
export class TabsTabPrecoComponent implements OnInit {


  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cad', { static: true }) cad: CrudeTabPrecoDetalheComponent;


  public tabIndex: number;

  public innerText: string;


  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private route: ActivatedRoute,
  ) {
    this.tabIndex = 0;
  }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
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
