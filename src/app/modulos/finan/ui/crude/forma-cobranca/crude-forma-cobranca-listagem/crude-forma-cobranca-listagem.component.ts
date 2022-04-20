import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiFormaCobrancaEL01Service } from '../../../../api/api-forma-cobranca-el01.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModelFormaCobrancaEL01 } from '../../../../models/model-forma-cobranca-el01';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';

@Component({
  selector: 'app-crude-forma-cobranca-listagem',
  templateUrl: './crude-forma-cobranca-listagem.component.html',
  styleUrls: ['./crude-forma-cobranca-listagem.component.scss']
})
export class CrudeFormaCobrancaListagemComponent implements OnInit {

  leftModal: number;
  topModal: number;
  topModalExcluirWebhook: number;
  leftModalExcluirWebhook: number;
  public AbrirModalAtualizaWebhook: boolean = false;
  public AbrirDialogExcluirWebhook: boolean = false;
  public TituloModal: string = undefined;
  public dadoModal: string = "";
  public gridRotasCadastro: string = '/modulos/finan/forma-cobranca';
  public modelFormaCobrancaEL01: ModelFormaCobrancaEL01;

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('traducao_msg_btnManutWhPix') traducao_msg_btnManutWhPix: ElementRef;
  @ViewChild('traducao_msg_btnExcluirWhPix') traducao_msg_btnExcluirWhPix: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiFormaCobrancaEL01Service: ApiFormaCobrancaEL01Service
  ) { }

  cancelarModalAtualizaWebhook() {
    this.AbrirModalAtualizaWebhook = false;
    this.gridFiltro.esconderAguarde();
  }

  cancelarModalExcluirWebhook() {
    this.AbrirDialogExcluirWebhook = false;
    this.gridFiltro.esconderAguarde();
  }

  public confirmaModalAtualizaWebhook() {
    this.gridFiltro.exibirAguarde();
    this.modelFormaCobrancaEL01.chPixURLWebhookConfPag = this.dadoModal;
    this.apiFormaCobrancaEL01Service.criarWebhookPixConfPagto(this.modelFormaCobrancaEL01.chCodFormaCobranca, this.modelFormaCobrancaEL01).then(r => {
      this.AbrirModalAtualizaWebhook = false;
      this.gridFiltro.executarPesquisa(true);
      this.gridFiltro.esconderAguarde();
      this.gridFiltro.dialogo_exibir(this.traducao_msg_btnManutWhPix.nativeElement.innerText);
    }).catch(err => {
      // executar um comando de envio de mensagem ao dar erro
      var erro: ApiErrorCollection = err;
      this.AbrirModalAtualizaWebhook = false;
      this.gridFiltro.esconderAguarde();
      let msg = erro.mensagem_geral.split(",").join("<br/>");
      this.gridFiltro.dialogo_exibir(msg);
    });
  }

  public confirmaModalExcluirWebhook() {
    this.gridFiltro.exibirAguarde();
    this.apiFormaCobrancaEL01Service.excluirWebhookPixConfPagto(this.modelFormaCobrancaEL01.chCodFormaCobranca).then(r => {
      this.AbrirDialogExcluirWebhook = false;
      this.gridFiltro.executarPesquisa(true);
      this.gridFiltro.esconderAguarde();
      this.gridFiltro.dialogo_exibir(this.traducao_msg_btnExcluirWhPix.nativeElement.innerText);
    }).catch(err => {
      // executar um comando de envio de mensagem ao dar erro
      var erro: ApiErrorCollection = err;
      this.AbrirDialogExcluirWebhook = false;
      this.gridFiltro.esconderAguarde();
      let msg = erro.mensagem_geral.split(",").join("<br/>");
      this.gridFiltro.dialogo_exibir(msg);
    });
  }

  ngOnInit() {
    this.leftModal = (window.screen.width / 2) - 600;
    this.topModal = (window.screen.height - 600) / 2;
    this.leftModalExcluirWebhook = (window.screen.width / 2) - 300;
    this.topModalExcluirWebhook = (window.screen.height - 600) / 2;
    this.criarBreadCrumbs();
  }

  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick) {

    if (data.botao.id == 'btnExcluirWhPix') {
      this.AbrirDialogExcluirWebhook = true;
      this.gridFiltro.esconderAguarde();
      this.modelFormaCobrancaEL01 = data.dataItem;
    } else if (data.botao.id == 'btnManutWhPix') {
      this.AbrirModalAtualizaWebhook = true;
      this.gridFiltro.esconderAguarde();
      this.modelFormaCobrancaEL01 = data.dataItem;
      this.TituloModal = "Manutenção de Webhook de Confirmação de Recebimento"
    }
}

  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiFormaCobrancaEL01Service.getColunasGrid();
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    if (dados.botao.id == "btnManutWhPix") {
      return (dados.dataItem.inCodTipoCobranca == 10 || dados.dataItem.inCodTipoCobranca == 11);
    } else if (dados.botao.id == "btnExcluirWhPix") {
      return ((dados.dataItem.inCodTipoCobranca == 10 || dados.dataItem.inCodTipoCobranca == 11) && dados.dataItem.chPixChaveWebhookConfPag != "");
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }

}
