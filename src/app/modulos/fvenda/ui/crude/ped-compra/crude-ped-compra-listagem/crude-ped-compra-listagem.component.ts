import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiMotRejPedCompService } from "../../../../api/api-mot-rej-ped-comp.service";
import { ApiErrorCollection } from "../../../../../../api-error/api-error-collection";
import { CabecalhoBreadcrumbService } from "../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { GridPesquisaColumn } from "../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column";
import { GridPesquisaComponent } from "../../../../../../componentes/grid-pesquisa/grid-pesquisa.component";
import { GridPesquisaColunaEditarBotaoClick } from "../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click";
import { ApiEstabelecimentoService } from "../../../../../corp/api/api-estabelecimento.service";
import { ApiPedCompraEL01Service } from "../../../../api/api-ped-compra-el01.service";
import { ApiSituacaoPedCompService } from "../../../../api/api-situacao-ped-comp.service";
import { ModelPedCompraEL01 } from "../../../../models/model-ped-compra-EL-01";

@Component({
  selector: "app-crude-ped-compra-listagem",
  templateUrl: "./crude-ped-compra-listagem.component.html",
  styleUrls: ["./crude-ped-compra-listagem.component.scss"],
})
export class CrudePedCompraListagemComponent implements OnInit {
  public gridRotasCadastro: string = "modulos/fvenda/ped-compra";

  @ViewChild("gridFiltro", { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild("breadcrumb_traducao", { static: true })
  breadcrumb_traducao: ElementRef;
  @ViewChild("traducao_msg_btnLiberar_sucesso", { static: true })
  traducao_msg_btnLiberar_sucesso: ElementRef;

  @ViewChild("traducao_msg_btnReijetarItem_sucesso", { static: true })
  traducao_msg_btnReijetarItem_sucesso: ElementRef;
  leftModal: number;
  topModal: number;
  public abrirModal: boolean = false;

  public dadosAoRejeitar: any = {
    chDesComplMotRejPedComp: undefined,
    inCodMotRejPedComp: undefined,
    id: 0,
  }

  public modelPedCompraEL01: ModelPedCompraEL01;
  public formGroupPesquisa: FormGroup;
  public formModalRejeita: FormGroup;

  constructor(
    public apiPedCompraEL01Service: ApiPedCompraEL01Service,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    public apiSituacaoPedCompService: ApiSituacaoPedCompService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiMotRejPedCompService: ApiMotRejPedCompService,
    public router: Router,
    private route: ActivatedRoute,
    private formB: FormBuilder
  ) { }

  private criarForm() {
    this.formGroupPesquisa = this.formB.group({
      listaEstabelecimento: [[]],
      listaSituacaoPedidoCompra: [[]],
    });
  }

  desistirModal() {
    this.abrirModal = false;
    this.dadosAoRejeitar = {
      chDesComplMotRejPedComp: undefined,
      inCodMotRejPedComp: undefined,
      id: 0,
    }
    this.gridFiltro.esconderAguarde();
  }
  public async efetivarModal() {
    try {

      this.dadosAoRejeitar.chDesComplMotRejPedComp = this.formModalRejeita.getRawValue().chDesComplMotRejPedComp;
      this.dadosAoRejeitar.inCodMotRejPedComp = this.formModalRejeita.getRawValue().inCodMotRejPedComp;


      this.gridFiltro.exibirAguarde();
      const resp = await this.apiPedCompraEL01Service.rejeitarItens(this.dadosAoRejeitar.id, this.dadosAoRejeitar);
      this.abrirModal = false;
      this.gridFiltro.executarPesquisa(true);
      this.gridFiltro.esconderAguarde();
      this.gridFiltro.dialogo_exibir(this.traducao_msg_btnReijetarItem_sucesso.nativeElement.innerText);

    } catch (error) {
      var erro: ApiErrorCollection = error;
      this.abrirModal = false;
      this.gridFiltro.esconderAguarde();
      let msg = erro.mensagem_geral.split(",").join("<br/>");
      this.gridFiltro.dialogo_exibir(msg);
    }

    this.desistirModal();




  }

  private criarFormModal() {
    this.formModalRejeita = this.formB.group({
      inCodMotRejPedComp: [this.dadosAoRejeitar.inCodMotRejPedComp, Validators.required],
      chDesComplMotRejPedComp: [this.dadosAoRejeitar.chDesComplMotRejPedComp],
    });
  }

  ngOnInit() {
    this.leftModal = (window.screen.width / 2) - 500;
    this.topModal = (window.screen.height - 500) / 2;
    this.criarBreadCrumbs();
    this.criarForm();
  }

  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick) {
    if (data.botao.id == "btnLiberar") {
      this.apiPedCompraEL01Service
        .liberar(data.dataItem.IDPedCompra)
        .then((r) => {
          this.gridFiltro.executarPesquisa(true);
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(
            this.traducao_msg_btnLiberar_sucesso.nativeElement.innerText
          );
        })
        .catch((err) => {
          // executar um comando de envio de mensagem ao dar erro
          var erro: ApiErrorCollection = err;
          this.gridFiltro.esconderAguarde();
          let msg = erro.mensagem_geral.split(",").join("<br/>");
          this.gridFiltro.dialogo_exibir(msg);
        });
    } else if (data.botao.id == 'btnRejeitarItens') {
      this.criarFormModal();
      this.abrirModal = true;
      this.dadosAoRejeitar.id = data.dataItem.IDPedCompra;
    }
  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiPedCompraEL01Service.getColunasGrid();
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    if (dados.botao.id == "Update") {
      return dados.dataItem.inCodSituacaoPedComp == 1;
    } else if (dados.botao.id == "Delete") {
      return dados.dataItem.inCodSituacaoPedComp == 1;
    } else if (dados.botao.id == "btnLiberar") {
      return dados.dataItem.inCodSituacaoPedComp == 1;
    } else if (dados.botao.id == 'btnRejeitarItens') {
      return dados.dataItem.inCodSituacaoPedComp == 1;
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }
}
