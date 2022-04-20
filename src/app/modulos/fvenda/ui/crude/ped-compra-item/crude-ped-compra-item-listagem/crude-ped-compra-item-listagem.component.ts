import { ApiErrorCollection } from "../../../../../../api-error/api-error-collection";
import { ApiEstabelecimentoService } from "../../../../../corp/api/api-estabelecimento.service";
import { ApiPedCompraEL01Service } from "../../../../api/api-ped-compra-el01.service";
import { ApiPedCompraItemEL01Service } from "../../../../api/api-ped-compra-item-el01.service";
import { ApiSitAtenPedCompService } from "../../../../api/api-sit-aten-ped-comp.service";
import { ApiSituacaoPedCompService } from "../../../../api/api-situacao-ped-comp.service";
import { CabecalhoBreadcrumbService } from "../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { GridInterfaceTabCadastroFilho } from "../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho";
import { GridPesquisaColumn } from "../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column";
import { GridPesquisaColunaEditarBotaoClick } from "../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click";
import { GridPesquisaComponent } from "../../../../../../componentes/grid-pesquisa/grid-pesquisa.component";
import { ModelPedCompraEL01 } from "../../../../models/model-ped-compra-EL-01";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-crude-ped-compra-item-listagem",
  templateUrl: "./crude-ped-compra-item-listagem.component.html",
  styleUrls: ["./crude-ped-compra-item-listagem.component.scss"],
})
export class CrudePedCompraItemListagemComponent implements OnInit {
  @ViewChild("gridFiltroApx", { static: true }) gridFiltroApx: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;
  public formGroupPesquisaItem: FormGroup;
  constructor(
    public apiPedCompraItemEL01Service: ApiPedCompraItemEL01Service,
    public apiSitAtenPedCompService: ApiSitAtenPedCompService,
    private formB: FormBuilder
  ) {}

  ngOnInit() {
    this.criarForm();
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiPedCompraItemEL01Service.getColunasGrid();
  }

  private criarForm() {
    this.formGroupPesquisaItem = this.formB.group({
      listaSituacaoAtendimento: [[]],
    });
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    // if (dados.botao.id == "Create") {
    //   return (
    //     this.apiPedCompraItemEL01Service.modelPedCompraEL01
    //       .inCodSituacaoPedComp == 1
    //   );
    // } else

    if (dados.botao.id == "Update") {
      return dados.dataItem ? dados.dataItem.inCodSituacaoPedComp == 1 : true;
    } else if (dados.botao.id == "Delete") {
      return dados.dataItem ? dados.dataItem.inCodSituacaoPedComp == 1 : true;
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }

  executarPesquisa() {
    this.gridFiltroApx.executarPesquisa();
  }
}
