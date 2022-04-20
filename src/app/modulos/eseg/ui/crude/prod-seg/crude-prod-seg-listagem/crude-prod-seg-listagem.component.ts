import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';

//1) Componentes Angular essenciais para uma página
import { FormBuilder, FormGroup } from '@angular/forms';

//2) Serviços do projeto essenciais
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

//3) Outros Componentes do projeto
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaBotaoDetalhes } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa-botao-detalhes';

//import { InputModalPesquisaComponent } from '../../../../../componentes/input-modal-pesquisa/input-modal-pesquisa.component';

//4) APIs
import { ApiProdSegService } from '../../../../api/api-prod-seg.service';
import { ApiTipoSeguroService } from '../../../../api/api-tipo-seguro.service';
import { ApiSeguradoraService } from '../../../../api/api-seguradora.service';
import { GridRotaCadastro } from '../../../../../../componentes/grid-pesquisa/grid-rota-cadastro';

@Component({
  selector: 'app-crude-prod-seg-listagem',
  templateUrl: './crude-prod-seg-listagem.component.html',
  styleUrls: ['./crude-prod-seg-listagem.component.scss']
})
export class CrudeProdSegListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/eseg/prod-seg';

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiProdSegService: ApiProdSegService,
    public apiSeguradoraService: ApiSeguradoraService,
    public apiTipoSeguroService: ApiTipoSeguroService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }
  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
    /*
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0], //'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Pagador',
        url: null
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2], //'Listagem',
        url: null
      }
    ]);
    */
  }

  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaSeguradora: [[]],
      listaTipoSeguro: [[]],
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiProdSegService.getColunasGrid()
  }
  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

}
