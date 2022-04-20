import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { ValidarPermissaoRotaService } from '../../../../../../validar-permissao-rota.service';
import { ApiCampanhaEL01Service } from '../../../../api/api-campanha-el01.service';
import { ApiSituacaoCampService } from '../../../../api/api-situacao-camp.service';
import { ApiTipoCampanhaService } from '../../../../api/api-tipo-campanha.service';

@Component({
  selector: 'app-crude-campanha-listagem',
  templateUrl: './crude-campanha-listagem.component.html',
  styleUrls: ['./crude-campanha-listagem.component.scss']
})
export class CrudeCampanhaListagemComponent implements OnInit {

  public gridRotasCadastro = '/modulos/fvenda/campanha';

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('traducao_msg_btnReativar_sucesso', { static: true }) traducao_msg_btnReativar_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnSuspender_sucesso', { static: true }) traducao_msg_btnSuspender_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnLiberar_sucesso', { static: true }) traducao_msg_btnLiberar_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnCancelar_sucesso', { static: true }) traducao_msg_btnCancelar_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnEncerrar_sucesso', { static: true }) traducao_msg_btnEncerrar_sucesso: ElementRef;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiCampanhaEL01Service: ApiCampanhaEL01Service,
    public apiSituacaoCampService: ApiSituacaoCampService,
    public apiTipoCampanhaService: ApiTipoCampanhaService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    public router: Router,
    private validarPermissaoRotaService: ValidarPermissaoRotaService,
  ) {

  }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }

  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick) {
    this.gridFiltro.exibirAguarde(() => {
      if (data.botao.id == 'btnReativar') {
        this.apiCampanhaEL01Service.reativar(data.dataItem.IDCampanha).then(r => {
          this.gridFiltro.executarPesquisa(true);
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(this.traducao_msg_btnReativar_sucesso.nativeElement.innerText);
        }).catch(err => {
          // executar um comando de envio de mensagem ao dar erro
          var erro: ApiErrorCollection = err;
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);
        });
      } else if (data.botao.id == 'btnSuspender') {
        this.apiCampanhaEL01Service.suspender(data.dataItem.IDCampanha).then(r => {
          this.gridFiltro.executarPesquisa(true);
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(this.traducao_msg_btnSuspender_sucesso.nativeElement.innerText);
        }).catch(err => {
          // executar um comando de envio de mensagem ao dar erro
          var erro: ApiErrorCollection = err;
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);
        });
      } else if (data.botao.id == 'btnLiberar') {
        this.apiCampanhaEL01Service.liberar(data.dataItem.IDCampanha).then(r => {
          this.gridFiltro.executarPesquisa(true);
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(this.traducao_msg_btnLiberar_sucesso.nativeElement.innerText);
        }).catch(err => {
          // executar um comando de envio de mensagem ao dar erro
          var erro: ApiErrorCollection = err;
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);
        });
      } else if (data.botao.id == 'btnCancelar') {
        this.apiCampanhaEL01Service.cancelar(data.dataItem.IDCampanha).then(r => {
          this.gridFiltro.executarPesquisa(true);
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(this.traducao_msg_btnCancelar_sucesso.nativeElement.innerText);
        }).catch(err => {
          // executar um comando de envio de mensagem ao dar erro
          var erro: ApiErrorCollection = err;
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);
        });
      } else if (data.botao.id == 'btnEncerrar') {
        this.apiCampanhaEL01Service.encerrar(data.dataItem.IDCampanha).then(r => {
          this.gridFiltro.executarPesquisa(true);
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(this.traducao_msg_btnEncerrar_sucesso.nativeElement.innerText);
        }).catch(err => {
          // executar um comando de envio de mensagem ao dar erro
          var erro: ApiErrorCollection = err;
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);
        });
      } else if (data.botao.id == 'btnParametros') {
        this.router.navigateByUrl(`/modulos/fvenda/campanha/${data.dataItem.IDCampanha}/filho/campanha-param`, {
          state: { consulta: true }
        });
      }
    });
  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaSituacaoCamp: [[]],
      listaTipoCampanha: [[]],
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiCampanhaEL01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {


    if (dados.botao.id == 'Update') {
      return dados.dataItem.inCodSituacaoCamp === 1;
    } else if (dados.botao.id == 'Delete') {
      return dados.dataItem.inCodSituacaoCamp === 1;
    } else if (dados.botao.id == 'btnLiberar') {
      if (this.validarPermissaoRotaService.funcaoValidaProUsuario('Liberar') == false) return false;
      return dados.dataItem.inCodSituacaoCamp == 1 && new Date(dados.dataItem.dtDatFim) > new Date();
    } else if (dados.botao.id == 'btnSuspender') {
      if (this.validarPermissaoRotaService.funcaoValidaProUsuario('Suspender') == false) return false;
      return dados.dataItem.inCodSituacaoCamp == 2 && new Date(dados.dataItem.dtDatFim) > new Date();
    } else if (dados.botao.id == 'btnReativar') {
      if (this.validarPermissaoRotaService.funcaoValidaProUsuario('Reativar') == false) return false;
      return dados.dataItem.inCodSituacaoCamp == 3 && new Date(dados.dataItem.dtDatFim) > new Date();
    } else if (dados.botao.id == 'btnCancelar') {
      if (this.validarPermissaoRotaService.funcaoValidaProUsuario('Cancelar') == false) return false;
      return dados.dataItem.inCodSituacaoCamp == 1 ||
        ((dados.dataItem.inCodSituacaoCamp == 2
          || dados.dataItem.inCodSituacaoCamp == 3) && new Date(dados.dataItem.dtDatFim) > new Date());
    } else if (dados.botao.id == 'btnEncerrar') {
      if (this.validarPermissaoRotaService.funcaoValidaProUsuario('Encerrar') == false) return false;
      return (dados.dataItem.inCodSituacaoCamp == 2 || dados.dataItem.inCodSituacaoCamp == 3) && new Date(dados.dataItem.dtDatFim) < new Date();
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }

}
