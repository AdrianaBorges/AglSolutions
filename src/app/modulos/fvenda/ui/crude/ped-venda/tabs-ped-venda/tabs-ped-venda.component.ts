import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CrudePedVendaDetalheComponent } from '../crude-ped-venda-detalhe/crude-ped-venda-detalhe.component';

@Component({
  selector: 'app-tabs-ped-venda',
  templateUrl: './tabs-ped-venda.component.html',
  styleUrls: ['./tabs-ped-venda.component.scss']
})
export class TabsPedVendaComponent implements OnInit {


  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cad', { static: true }) cad: CrudePedVendaDetalheComponent;


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
    console.log('$event.index = ', $event.index)
  }




}
