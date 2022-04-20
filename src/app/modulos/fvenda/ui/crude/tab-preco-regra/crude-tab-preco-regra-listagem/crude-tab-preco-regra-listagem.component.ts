import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ApiCanalVendaService } from '../../../../../corp/api/api-canal-venda.service';
import { ApiCidadeService } from '../../../../../corp/api/api-cidade.service';
import { ApiGrupoClienteService } from '../../../../../corp/api/api-grupo-cliente.service';
import { ApiMicrorregiaoService } from '../../../../../corp/api/api-microrregiao.service';
import { ApiPaisService } from '../../../../../corp/api/api-pais.service';
import { ApiRegiaoService } from '../../../../../corp/api/api-regiao.service';
import { ApiUfService } from '../../../../../corp/api/api-uf.service';
import { ApiTabPrecoRegraEL01Service } from '../../../../api/api-tab-preco-regra-el01.service';


@Component({
  selector: 'app-crude-tab-preco-regra-listagem',
  templateUrl: './crude-tab-preco-regra-listagem.component.html',
  styleUrls: ['./crude-tab-preco-regra-listagem.component.scss']
})
export class CrudeTabPrecoRegraListagemComponent implements OnInit {

  public gridRotasCadastro = '/modulos/fvenda/tab-preco-regra';

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiTabPrecoRegraEL01Service: ApiTabPrecoRegraEL01Service,
    public apiPaisService: ApiPaisService,
    public apiCidadeService: ApiCidadeService,
    public apiUfService: ApiUfService,
    public apiRegiaoService: ApiRegiaoService,
    public apiMicrorregiaoService: ApiMicrorregiaoService,
    public apiGrupoClienteService: ApiGrupoClienteService,
    public apiCanalVendaService: ApiCanalVendaService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    public router: Router,
  ) {

  }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }


  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaPais: [null],
      listaUF: [null],
      listaCidade: [null],
      listaRegiao: [null],
      listaMicroRegiao: [null],
      listaGrupoCliente: [null],
      listaCanalVendas: [null],
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiTabPrecoRegraEL01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }


}
