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
import { ApiSeguradoService } from '../../../../api/api-segurado.service';
import { ApiTipoPessoaService } from '../../../../../corp/api/api-tipo-pessoa.service';
import { GridRotaCadastro } from '../../../../../../componentes/grid-pesquisa/grid-rota-cadastro';


@Component({
  selector: 'app-crude-segurado-listagem',
  templateUrl: './crude-segurado-listagem.component.html',
  styleUrls: ['./crude-segurado-listagem.component.scss']
})
export class CrudeSeguradoListagemComponent implements OnInit {

  public gridRotasCadastro: GridRotaCadastro[] = [
    {
      nomeCampo: 'inCodTipoPessoa',
      valorCampo: 1,
      rota: '/modulos/eseg/segurado/fisica',
      textoBotaoCriarNovo: 'Física'
    },
    {
      nomeCampo: 'inCodTipoPessoa',
      valorCampo: 2,
      rota: '/modulos/eseg/segurado/juridica',
      textoBotaoCriarNovo: 'Jurídica'
    }
  ];

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiService: ApiSeguradoService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoPessoaService: ApiTipoPessoaService,
    private formB: FormBuilder
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }

  public gridPesquisaBotaoDetalhesClick(botao: GridPesquisaBotaoDetalhes) {
    console.log(`Clicou no botão de id = ${botao.id}, obj = `, botao.objetoSelecionado);
  }

  private criarBreadCrumbs() {
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0], //'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Segurado',
        url: null
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2], //'Listagem',
        url: null
      }
    ]);
  }

  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaTipoPessoa: [[]],
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiService.getColunasGrid()
  }
  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

}
