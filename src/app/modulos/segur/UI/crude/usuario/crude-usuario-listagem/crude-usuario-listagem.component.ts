import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoUsuarioService } from '../../../../api/api-tipo-usuario.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiUsuariosEL01Service } from '../../../../api/api-usuarios-el01.service';
import { ApiSituacaoCadService } from '../../../../../corp/api/api-situacao-cad.service';
import { ModelUsuario } from '../../../../models/model-usuario';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './crude-usuario-listagem.component.html',
  styleUrls: ['./crude-usuario-listagem.component.scss']
})
export class CrudeUsuariosListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  public gridRotasCadastro: string = '/modulos/segur/usuario';

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiTipoUsuarioService: ApiTipoUsuarioService,
    public apiUsuarioEL01Service: ApiUsuariosEL01Service,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSituacaoCadService: ApiSituacaoCadService,
    private formB: FormBuilder
  ) { }


  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
    this.apiTipoUsuarioService.mudarOrdenacao("chDesTipoUsuario", "asc");
    this.apiSituacaoCadService.mudarOrdenacao("chDescricao", "asc");
  }
  private criarBreadCrumbs() {
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0], //'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Pessoa',
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
      listaTipoUsuario: [[]],
      listaSituacaoCadastral: [[]]
    });

  }
  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }


  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiUsuarioEL01Service.getColunasGrid()
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Inativar_click(data: ModelUsuario){
    this.apiUsuarioEL01Service.inativar(data.chCodUsuario).then(
      sucesso => {
        this.executarPesquisa();
      },
      erro => {
        var colErros: ApiErrorCollection = erro;
        alert('Deu erro: '+ colErros.mensagem_geral);
      }
    )
  }
  /**
   * Metodo chamado pelo grid para cada linha, de forma a saber se exibe ou não obotão
   * @param data 
   */
  public btn_Inativar_exibir(data: ModelUsuario): boolean{
    return data.inCodSituacaoCad == 2;
  }

  /**
   * Método que recebe o evento de click do botão para que o Detalhe possa executar a ação
   * @param data 
   */
  public btn_Reativar_click(data: ModelUsuario){
    this.apiUsuarioEL01Service.reativar(data.chCodUsuario).then(
      sucesso => {
        this.executarPesquisa();
      },
      erro => {
        var colErros: ApiErrorCollection = erro;
        alert('Deu erro: '+ colErros.mensagem_geral);
      }
    )
  }
  /**
   * Metodo chamado pelo grid para cada linha, de forma a saber se exibe ou não obotão
   * @param data 
   */
  public btn_Reativar_exibir(data: ModelUsuario): boolean{
    return data.inCodSituacaoCad == 3;
  }
}
