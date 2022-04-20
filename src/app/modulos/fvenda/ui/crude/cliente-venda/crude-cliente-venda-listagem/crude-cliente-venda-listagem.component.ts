import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiClienteEL02Service } from '../../../../api/api-cliente-el02.service';
import { ModelClienteEl02 } from '../../../../models/model-cliente-EL02';
import { GridRotaCadastro } from '../../../../../../componentes/grid-pesquisa/grid-rota-cadastro';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiRepresVendaEL01Service } from '../../../../api/api-repres-venda-el01.service';
import { ApiSituacaoCadService } from '../../../../../corp/api/api-situacao-cad.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaBotaoDetalhes } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa-botao-detalhes';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

@Component({
  selector: 'app-crude-cliente-venda-listagem',
  templateUrl: './crude-cliente-venda-listagem.component.html',
  styleUrls: ['./crude-cliente-venda-listagem.component.scss']
})
export class CrudeClienteVendaListagemComponent implements OnInit {



  public gridRotasCadastro: GridRotaCadastro[] = [
    {
      nomeCampo: 'inCodTipoPessoaCliente',
      valorCampo: 1,
      rota: '/modulos/fvenda/cliente-venda/fisica',
      textoBotaoCriarNovo: 'Física'
    },
    {
      nomeCampo: 'inCodTipoPessoaCliente',
      valorCampo: 2,
      rota: '/modulos/fvenda/cliente-venda/juridica',
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
    public apiClienteEl02Service: ApiClienteEL02Service,
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
      listaRepresentante: [[]],
      listaSituacaoCadastral: [null],
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiClienteEl02Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Inativar_click(data: ModelClienteEl02) {
    this.apiClienteEl02Service.inativar(data.IDCliente).then(
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
  public btn_Inativar_exibir(data: ModelClienteEl02): boolean {
    return data.inCodSituacaoCad == 2;
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Reativar_click(data: ModelClienteEl02) {
    this.apiClienteEl02Service.reativar(data.IDCliente).then(
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
  public btn_Reativar_exibir(data: ModelClienteEl02): boolean {
    return data.inCodSituacaoCad == 3;
  }

}
