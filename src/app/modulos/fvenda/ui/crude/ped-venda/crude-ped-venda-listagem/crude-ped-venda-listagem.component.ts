import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiTokenService } from '../../../../../../api-data-access/api-token.service';
import { Router } from '@angular/router';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ConfigEmpresaService } from '../../../../../config/api/config-empresa.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ApiEstabelecimentoService } from '../../../../../corp/api/api-estabelecimento.service';
import { ApiPedVendaEL01Service } from '../../../../api/api-ped-venda-el01.service';
import { ApiOrigemPedVenService } from '../../../../api/api-origem-ped-ven.service';
import { ApiSituacaoPedVenService } from '../../../../api/api-situacao-ped-ven.service';
import { ModelPedVendaEL01 } from '../../../../models/model-ped-venda-EL01';

@Component({
  selector: 'app-crude-ped-venda-listagem',
  templateUrl: './crude-ped-venda-listagem.component.html',
  styleUrls: ['./crude-ped-venda-listagem.component.scss']
})
export class CrudePedVendaListagemComponent implements OnInit {

  leftModal: number;
  topModal: number;
  public AbrirModal: boolean = false;
  public TituloModal: string = undefined;
  public dadoModal: string = "";
  public gridRotasCadastro: string = '/modulos/fvenda/ped-venda';
  public modelItem: ModelPedVendaEL01;

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('traducao_msg_btnLiberar_sucesso') traducao_msg_btnLiberar_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnRedigitar_sucesso') traducao_msg_btnRedigitar_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnDevolver_sucesso') traducao_msg_btnDevolver_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnCancelar_sucesso') traducao_msg_btnCancelar_sucesso: ElementRef;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiPedVendaEL01Service: ApiPedVendaEL01Service,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    public apiOrigemPedVenService: ApiOrigemPedVenService,
    public apiSituacaoPedVenService: ApiSituacaoPedVenService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiTokenService: ApiTokenService,
    public router: Router,
    private configEmpresaService: ConfigEmpresaService,
    private formB: FormBuilder
  ) { }


  DesistirModal() {
    this.AbrirModal = false;
    this.gridFiltro.esconderAguarde();
  }
  public async EfetivarModal() {
    this.gridFiltro.exibirAguarde();

    try {
      this.modelItem.chDesMotivoRejeitado = this.dadoModal
      await this.apiPedVendaEL01Service.cancelar(this.modelItem.IDPedVenda, this.modelItem);
      this.gridFiltro.executarPesquisa(true);
      this.gridFiltro.esconderAguarde();
      this.gridFiltro.dialogo_exibir(this.traducao_msg_btnCancelar_sucesso.nativeElement.innerText);
      this.AbrirModal = false;

    } catch (error) {
      var erro: ApiErrorCollection = error;
      this.gridFiltro.esconderAguarde();
      this.gridFiltro.dialogo_exibir(erro.mensagem_geral);
      this.AbrirModal = false;
    }


  }
  ngOnInit() {
    this.leftModal = (window.screen.width / 2) - 500;
    this.topModal = (window.screen.height - 500) / 2;
    this.criarBreadCrumbs();
    this.criarForm();
  }

  private criarForm() {
    this.formGroupPesquisa = this.formB.group({
      listaSituacao: [[]],
      listaEstabelecimento: [[]],
      listaOrigem: [[]]
    });

  }

  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick) {
    this.gridFiltro.exibirAguarde(() => {

      if (data.botao.id == 'btnLiberar') {
        try {
          this.apiPedVendaEL01Service.liberar(data.dataItem.IDPedVenda).then(x => {
            this.gridFiltro.executarPesquisa(true);
            this.gridFiltro.esconderAguarde();
            this.gridFiltro.dialogo_exibir(this.traducao_msg_btnLiberar_sucesso.nativeElement.innerText);

          });
        } catch (error) {
          var erro: ApiErrorCollection = error;
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);
        }
      } else if (data.botao.id == 'btnRedigitar') {
        try {
          this.apiPedVendaEL01Service.redigitar(data.dataItem.IDPedVenda).then(x => {
            this.gridFiltro.executarPesquisa(true);
            this.gridFiltro.esconderAguarde();
            this.gridFiltro.dialogo_exibir(this.traducao_msg_btnRedigitar_sucesso.nativeElement.innerText);

          });
        } catch (error) {
          var erro: ApiErrorCollection = error;
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);
        }
      } else if (data.botao.id == 'btnDevolver') {
        try {
          this.apiPedVendaEL01Service.devolver(data.dataItem.IDPedVenda).then(x => {
            this.gridFiltro.executarPesquisa(true);
            this.gridFiltro.esconderAguarde();
            this.gridFiltro.dialogo_exibir(this.traducao_msg_btnDevolver_sucesso.nativeElement.innerText);

          });
        } catch (error) {
          var erro: ApiErrorCollection = error;
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);
        }
      } else if (data.botao.id == 'cancelar') {
        this.AbrirModal = true;
        this.modelItem = data.dataItem;
        this.TituloModal = "Motivo do Cancelamento do Pedido de Venda"
      }
    });
  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiPedVendaEL01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    if (dados.botao.id == 'Read') {
      return dados.dataItem.inCodSituacaoPedVen != 1;
    } else if (dados.botao.id == 'Update') {
      return dados.dataItem.inCodSituacaoPedVen == 1;;
    } else if (dados.botao.id == 'Delete') {
      return dados.dataItem.inCodSituacaoPedVen == 1;
    } else if (dados.botao.id == 'View') {
      return false;
    } else if (dados.botao.id == "btnLiberar") {
      return dados.dataItem.inCodSituacaoPedVen == 1;
    } else if (dados.botao.id == "btnRedigitar") {
      return dados.dataItem.lgPermRedigitar == true;
    } else if (dados.botao.id == "btnDevolver") {
      return dados.dataItem.lgPermDevolver == true;
    } else if (dados.botao.id == "cancelar") {
      return dados.dataItem.lgPermCancelar == true;
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }
}