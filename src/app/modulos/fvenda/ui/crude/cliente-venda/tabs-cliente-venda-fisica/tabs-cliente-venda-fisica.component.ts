import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CrudeClienteVendaFisicaDetalheComponent } from '../crude-cliente-venda-fisica-detalhe/crude-cliente-venda-fisica-detalhe.component';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs-cliente-venda-fisica',
  templateUrl: './tabs-cliente-venda-fisica.component.html',
  styleUrls: ['./tabs-cliente-venda-fisica.component.scss']
})
export class TabsClienteVendaFisicaComponent implements OnInit {


  @Input('app') app: any;
  @Input('tab') tab: any;
  @Input('content') content: any;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadPF', { static: true }) cadPF: CrudeClienteVendaFisicaDetalheComponent;


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
