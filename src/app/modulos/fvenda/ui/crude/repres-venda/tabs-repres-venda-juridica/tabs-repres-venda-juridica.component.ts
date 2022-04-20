import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CrudeRepresVendaJuridicaDetalheComponent } from '../crude-repres-venda-juridica-detalhe/crude-repres-venda-juridica-detalhe.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs-repres-venda-juridica',
  templateUrl: './tabs-repres-venda-juridica.component.html',
  styleUrls: ['./tabs-repres-venda-juridica.component.scss']
})
export class TabsRepresVendaJuridicaComponent implements OnInit {

  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadPF', { static: true }) cadPF: CrudeRepresVendaJuridicaDetalheComponent;


  public tabIndex: number;

  public innerText: string;

  public nomeTabSelecionada: string = 'dadospessoais';

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
