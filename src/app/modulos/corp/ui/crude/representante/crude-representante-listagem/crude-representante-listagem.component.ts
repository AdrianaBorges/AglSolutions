
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ApiSituacaoCadService } from '../../../../api/api-situacao-cad.service';
import { ApiTipoRepresentanteService } from '../../../../api/api-tipo-representante.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModelRepresentanteEl01 } from '../../../../models/model-representante-El01';
import { ApiRepresentanteEl01Service } from '../../../../api/api-representante-el01.service';



@Component({
  selector: 'app-crude-representante-listagem',
  templateUrl: './crude-representante-listagem.component.html',
  styleUrls: ['./crude-representante-listagem.component.scss']
})
export class CrudeRepresentanteListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/corp/representante';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  public formGroupPesquisa: FormGroup;
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiRepresentanteService: ApiRepresentanteEl01Service,
    public apiTipoRepresentanteService: ApiTipoRepresentanteService,
    public apiSituacaoCadService: ApiSituacaoCadService,
    private route: ActivatedRoute,
    private formB: FormBuilder
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }


  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaTipoRepresentante: [[]],
      listaSituacaoCadastral: [[]],
    });

  }
  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiRepresentanteService.getColunasGrid();
  }
  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Inativar_click(data: ModelRepresentanteEl01) {
    this.apiRepresentanteService.inativar(data.IDRepresentante).then(
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
  public btn_Inativar_exibir(data: ModelRepresentanteEl01): boolean {
    return data.inCodSituacaoCad == 2;
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Reativar_click(data: ModelRepresentanteEl01) {
    this.apiRepresentanteService.reativar(data.IDRepresentante).then(
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
  public btn_Reativar_exibir(data: ModelRepresentanteEl01): boolean {
    return data.inCodSituacaoCad == 3;
  }

}
