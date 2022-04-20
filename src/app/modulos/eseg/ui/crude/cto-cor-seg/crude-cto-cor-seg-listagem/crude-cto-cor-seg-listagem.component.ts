import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelCtoCorSegEL01 } from '../../../../models/model-cto-cor-seg-el01';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ApiCtoCorSegEL01Service } from '../../../../api/api-cto-cor-seg-el01.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ApiSituacaoCadService } from '../../../../../corp/api/api-situacao-cad.service';
import { ApiTipoPapelService } from '../../../../../corp/api/api-tipo-papel.service';

@Component({
  selector: 'app-crude-cto-cor-seg-listagem',
  templateUrl: './crude-cto-cor-seg-listagem.component.html',
  styleUrls: ['./crude-cto-cor-seg-listagem.component.scss']
})
export class CrudeCtoCorSegListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/eseg/cto-cor-seg';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiCtoCorSegEL01Service: ApiCtoCorSegEL01Service,
    public apiSituacaoCadService: ApiSituacaoCadService,
    public apiTipoPapelService: ApiTipoPapelService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
    this.apiTipoPapelService.mudarOrdenacao("chDesTipoPapel", "asc");
    this.apiSituacaoCadService.mudarOrdenacao("chDescricao", "asc");
  }
  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaTipoPapel: [[]],
      listaSituacaoCadastral: [[]]
    });

  }
  
  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }


  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiCtoCorSegEL01Service.getColunasGrid();
  }

  /**
     * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
     * @param data 
     */
  public btn_Inativar_click(data: ModelCtoCorSegEL01) {
    this.apiCtoCorSegEL01Service.inativar(data.IDCtoCorSeg).then(
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
  public btn_Inativar_exibir(data: ModelCtoCorSegEL01): boolean {
    return data.inCodSituacaoCad == 2;
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Reativar_click(data: ModelCtoCorSegEL01) {
    this.apiCtoCorSegEL01Service.reativar(data.IDCtoCorSeg).then(
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
  public btn_Reativar_exibir(data: ModelCtoCorSegEL01): boolean {
    return data.inCodSituacaoCad == 3;
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Validar_click(data: ModelCtoCorSegEL01) {
    this.apiCtoCorSegEL01Service.validar(data.IDCtoCorSeg).then(
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
  public btn_Validar_exibir(data: ModelCtoCorSegEL01): boolean {
    return data.inCodSituacaoCad == 1;
  }


  /**
  * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
  * @param data 
  */
  public btn_Cancelar_click(data: ModelCtoCorSegEL01) {
    this.apiCtoCorSegEL01Service.cancelar(data.IDCtoCorSeg).then(
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
  public btn_Cancelar_exibir(data: ModelCtoCorSegEL01): boolean {
    return data.inCodSituacaoCad != 4;
  }


}
