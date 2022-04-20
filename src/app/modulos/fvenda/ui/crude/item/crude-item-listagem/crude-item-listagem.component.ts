import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaBotaoDetalhes } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa-botao-detalhes';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { ApiSituacaoCadService } from '../../../../../corp/api/api-situacao-cad.service';
import { ApiCategoriaService } from '../../../../api/api-categoria.service';
import { ApiEspecieItemService } from '../../../../api/api-especie-item.service';
import { ApiFamComService } from '../../../../api/api-fam-com.service';
import { ApiFamMatService } from '../../../../api/api-fam-mat.service';
import { ApiGrpEstService } from '../../../../api/api-grp-est.service';
import { ApiItemEL01Service } from '../../../../api/api-item-el01.service';
import { ModelItemEL01 } from '../../../../models/model-item-EL01';

@Component({
  selector: 'app-crude-item-listagem',
  templateUrl: './crude-item-listagem.component.html',
  styleUrls: ['./crude-item-listagem.component.scss']
})
export class CrudeItemListagemComponent implements OnInit {


  public gridRotasCadastro = '/modulos/fvenda/item';
    
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiFamComService: ApiFamComService,
    public apiItemEL01Service: ApiItemEL01Service,
    public apiFamMatService: ApiFamMatService,
    public apiGrpEstService: ApiGrpEstService,
    public apiEspecieItemService: ApiEspecieItemService,
    public apiCategoriaService: ApiCategoriaService,
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
      listaEspecieItem: [[]],
      listaCategoria: [[]],
      listaGrpEst: [[]],
      listaFamCom: [[]],
      listaFamMat: [[]],
      listaSituacaoCadastral: [null],
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiItemEL01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Inativar_click(data: ModelItemEL01) {
    this.apiItemEL01Service.inativar(data.IDItem).then(
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
  public btn_Inativar_exibir(data: ModelItemEL01): boolean {
    return data.inCodSituacaoCad == 2;
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Reativar_click(data: ModelItemEL01) {
    this.apiItemEL01Service.reativar(data.IDItem).then(
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
  public btn_Reativar_exibir(data: ModelItemEL01): boolean {
    return data.inCodSituacaoCad == 3;
  }


}
