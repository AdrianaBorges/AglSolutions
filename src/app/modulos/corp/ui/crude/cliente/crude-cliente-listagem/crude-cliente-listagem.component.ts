
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiClienteEl01Service } from '../../../../api/api-cliente-el01.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ApiSituacaoCadService } from '../../../../api/api-situacao-cad.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModelClienteEL01 } from '../../../../models/model-ClienteEL01';
import { ApiRepresentanteEl01Service } from '../../../../api/api-representante-el01.service';




@Component({
  selector: 'app-crude-cliente-listagem',
  templateUrl: './crude-cliente-listagem.component.html',
  styleUrls: ['./crude-cliente-listagem.component.scss']
})
export class CrudeClienteListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/corp/cliente';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  public formGroupPesquisa: FormGroup;
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiClienteEl01Service: ApiClienteEl01Service,
    public apiSituacaoCadService: ApiSituacaoCadService,
    public apiRepresentanteEl01Service: ApiRepresentanteEl01Service,
    private route: ActivatedRoute,
    private formB: FormBuilder
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }


  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaRepresentante: [[]],
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
    return this.apiClienteEl01Service.getColunasGrid();
  }
  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Inativar_click(data: ModelClienteEL01) {
    this.apiClienteEl01Service.inativar(data.IDCliente).then(
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
  public btn_Inativar_exibir(data: ModelClienteEL01): boolean {
    return data.inCodSituacaoCad == 2;
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Reativar_click(data: ModelClienteEL01) {
    this.apiClienteEl01Service.reativar(data.IDCliente).then(
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
  public btn_Reativar_exibir(data: ModelClienteEL01): boolean {
    return data.inCodSituacaoCad == 3;
  }

}
