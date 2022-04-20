import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaBotaoDetalhes } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa-botao-detalhes';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { ApiSituacaoCadService } from '../../../../../corp/api/api-situacao-cad.service';
import { ApiTranspEl01Service } from '../../../../api/api-transp-el01.service';
import { ModelTranspEL01 } from '../../../../models/model-transp-EL01';

@Component({
  selector: 'app-crude-transp-listagem',
  templateUrl: './crude-transp-listagem.component.html',
  styleUrls: ['./crude-transp-listagem.component.scss']
})
export class CrudeTranspListagemComponent implements OnInit {

  public gridRotasCadastro = '/modulos/fvenda/transp';

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaTransp') instanciaModalPesquisaTransp: ModalPesquisaComponent;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiTranspEl01Service: ApiTranspEl01Service,
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
      listaSituacaoCadastral: [null]
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiTranspEl01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Inativar_click(data: ModelTranspEL01) {
    this.apiTranspEl01Service.inativar(data.IDTransp).then(
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
  public btn_Inativar_exibir(data: ModelTranspEL01): boolean {
    return data.inCodSituacaoCad == 2;
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Reativar_click(data: ModelTranspEL01) {
    this.apiTranspEl01Service.reativar(data.IDTransp).then(
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
  public btn_Reativar_exibir(data: ModelTranspEL01): boolean {
    return data.inCodSituacaoCad == 3;
  }

}
