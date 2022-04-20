import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiRepresVendaEL01Service } from '../../../../api/api-repres-venda-el01.service';
import { ApiTipoRepresentanteService } from '../../../../../corp/api/api-tipo-representante.service';
import { ApiSituacaoCadService } from '../../../../../corp/api/api-situacao-cad.service';
import { GridRotaCadastro } from '../../../../../../componentes/grid-pesquisa/grid-rota-cadastro';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaBotaoDetalhes } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa-botao-detalhes';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelRepresVendaEL01 } from '../../../../models/model-repres-venda-EL01';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

@Component({
  selector: 'app-crude-repres-venda-listagem',
  templateUrl: './crude-repres-venda-listagem.component.html',
  styleUrls: ['./crude-repres-venda-listagem.component.scss']
})
export class CrudeRepresVendaListagemComponent implements OnInit {


  public gridRotasCadastro: GridRotaCadastro[] = [
    {
      nomeCampo: 'inCodTipoPessoaRepresentante',
      valorCampo: 1,
      rota: '/modulos/fvenda/repres-venda/fisica',
      textoBotaoCriarNovo: 'Física'
    },
    {
      nomeCampo: 'inCodTipoPessoaRepresentante',
      valorCampo: 2,
      rota: '/modulos/fvenda/repres-venda/juridica',
      textoBotaoCriarNovo: 'Jurídica'
    }
  ];

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiRepresVendaEL01Service: ApiRepresVendaEL01Service,
    public apiTipoRepresentanteService: ApiTipoRepresentanteService,
    public apiSituacaoCadService: ApiSituacaoCadService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
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
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaTipoRepresentante: [[]],
      listaSituacaoCadastral: [null],
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiRepresVendaEL01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Inativar_click(data: ModelRepresVendaEL01) {
    this.apiRepresVendaEL01Service.inativar(data.IDRepresentante).then(
      sucesso => {
        this.executarPesquisa();
      },
      erro => {
        var colErros: ApiErrorCollection = erro;
        alert('Deu erro: ' + colErros.mensagem_geral);
      }
    )
  }
  /**
   * Metodo chamado pelo grid para cada linha, de forma a saber se exibe ou não obotão
   * @param data 
   */
  public btn_Inativar_exibir(data: ModelRepresVendaEL01): boolean {
    return data.inCodSituacaoCad == 2;
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Reativar_click(data: ModelRepresVendaEL01) {
    this.apiRepresVendaEL01Service.reativar(data.IDRepresentante).then(
      sucesso => {
        this.executarPesquisa();
      },
      erro => {
        var colErros: ApiErrorCollection = erro;
        alert('Deu erro: ' + colErros.mensagem_geral);
      }
    )
  }
  /**
   * Metodo chamado pelo grid para cada linha, de forma a saber se exibe ou não obotão
   * @param data 
   */
  public btn_Reativar_exibir(data: ModelRepresVendaEL01): boolean {
    return data.inCodSituacaoCad == 3;
  }

}
