import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiErrorCollection } from "../../../../../../api-error/api-error-collection";
import { CadastroBarraAcaoComponent } from "../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component";
import { ApiPedCompraItemEL01Service } from "../../../../api/api-ped-compra-item-el01.service";
import { ApiSitAtenPedCompService } from "../../../../api/api-sit-aten-ped-comp.service";
import { ModelPedCompraItemEL01 } from "../../../../models/model-ped-compra-item-EL01";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiTabPrecoEL01Service } from "../../../../api/api-tab-preco-el01.service";
import { ApiItemEL01Service } from "../../../../api/api-item-el01.service";
import { ApiMotRejPedCompService } from "../../../../api/api-mot-rej-ped-comp.service";
import { ApiTabPrecoItemEL01Service } from "../../../../api/api-tab-preco-item-el01.service";
@Component({
  selector: "app-crude-ped-compra-item-detalhe",
  templateUrl: "./crude-ped-compra-item-detalhe.component.html",
  styleUrls: ["./crude-ped-compra-item-detalhe.component.scss"],
})
export class CrudePedCompraItemDetalheComponent implements OnInit {
  @ViewChild("cadastroBarraAcao", { static: true })
  cadastroBarraAcao: CadastroBarraAcaoComponent;

  private item = {
    chDescricao: "",
    IDItem: 0,
    chCodItem: "",
  };

  public meuForm: FormGroup;
  public modelPedCompraItemEL01: ModelPedCompraItemEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: "inclusao" | "edicao";
  private idCadastro: number;

  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPedCompraItemEL01Service: ApiPedCompraItemEL01Service,
    public apiSitAtenPedCompService: ApiSitAtenPedCompService,
    private _location: Location,
    public apiTabPrecoEL01Service: ApiTabPrecoEL01Service,
    public apiItemEL01Service: ApiItemEL01Service,
    public apiMotRejPedCompService: ApiMotRejPedCompService,
    private apiTabPrecoItemEL01Service: ApiTabPrecoItemEL01Service
  ) {
    this.modelPedCompraItemEL01 = new ModelPedCompraItemEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }
  isRejeicao() {
    return this.meuForm.getRawValue().inCodSitAtenPedComp == 4;
  }
  async AjustesPrecoTabelaTab(event) {
    if (event && this.meuForm.get("UIItem").value.objetoSelecionado.IDItem) {
      let dado = await this.apiTabPrecoItemEL01Service.getItem(
        event,
        this.meuForm.get("UIItem").value.objetoSelecionado.IDItem
      );
      if (dado) {
        this.meuForm.get("dePrecoTabela").setValue(dado.dePrecoVenda);
        this.meuForm.get("deValUnitLiquido").setValue(dado.dePrecoVenda);
      }
    }
  }

  async AjustesPrecoTabelaItem(event) {
    if (event.IDItem && this.meuForm.get("IDTabPreco").value) {
      let dado = await this.apiTabPrecoItemEL01Service.getItem(
        this.meuForm.get("IDTabPreco").value,
        event.IDItem
      );
      if (dado) {
        this.meuForm.get("dePrecoTabela").setValue(dado.dePrecoVenda);
        this.meuForm.get("deValUnitLiquido").setValue(dado.dePrecoVenda);
      }
    }
  }
  ValidaValorSolicitado() {
    let qtd = this.meuForm.get("deQtdSolic").value;
    let vlr = this.meuForm.get("deValUnitSolic").value;

    if (qtd != undefined && vlr != undefined) {
      this.meuForm.get("deValTotSolic").setValue(Number(qtd) * Number(vlr));
    }
  }
  ValidaValorAtend() {
    let qtd = this.meuForm.get("deQtdAtend").value;
    let vlr = this.meuForm.get("deValUnitLiquido").value;

    if (qtd != undefined && vlr != undefined) {
      this.meuForm.get("deValTotLiquido").setValue(Number(qtd) * Number(vlr));
    }
  }
  AjustesSituacao(event) {
    if (event == 3) {
      this.meuForm
        .get("deQtdAtend")
        .setValue(this.meuForm.get("deQtdSolic").value);
      this.meuForm.get("deQtdAtend").disable();
    } else if (event == 4) {
      this.meuForm.get("deQtdAtend").setValue(0);
      this.meuForm.get("deQtdAtend").disable();
    } else {
      // this.meuForm.get('deQtdAtend').setValue();
      this.meuForm.get("deQtdAtend").enable();
    }
    this.ValidaValorSolicitado();
    this.ValidaValorAtend();
    if (this.modelPedCompraItemEL01.inCodSituacaoPedComp) {
      if (this.modelPedCompraItemEL01.inCodSituacaoPedComp != 1) {
        this.cadastroBarraAcao.setModoConsulta();
      }
    }
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
  }

  public numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /**
   * Deve ser chamada pelo evento do grid de pesquisa,
   * seja para criar um novo registro ou para exibir
   * para edição ou exclusão
   * @param id zero se for um novo cadastro e um valor
   * se for para abrir para edição ou exclusão
   */
  public gridInterfaceTabCadastroFilho_setIdCadastro(id: string): void {
    this.idCadastro = +id;
    this.getDados();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm() {
    this.meuForm.controls["IDPedCompraItem"].disable();
    this.meuForm.controls["dePrecoTabela"].disable();
    this.meuForm.controls["deValTotSolic"].disable();
    this.meuForm.controls["deValTotLiquido"].disable();

    if (this.idCadastro > 0) {
      // this.meuForm.get("UIItem").disable();

      this.meuForm.get("chCodEANRec").disable();
      this.meuForm.get("deQtdSolic").disable();
      this.meuForm.get("deValUnitSolic").disable();
      this.meuForm.get("IDTabPreco").disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    this.item.chDescricao = this.modelPedCompraItemEL01.chDesItem;
    this.item.chCodItem = this.modelPedCompraItemEL01.chCodItem;
    this.item.IDItem = this.modelPedCompraItemEL01.IDItem;

    var UIItem = this.item.IDItem > 0 ? this.item : null;
    this.modelPedCompraItemEL01["UIItem"] = UIItem;

    if (this.modelPedCompraItemEL01.dtDatAtend) {
      this.modelPedCompraItemEL01.dtDatAtend = new Date(
        this.modelPedCompraItemEL01.dtDatAtend
      );
    }

    if (this.modelPedCompraItemEL01.dtDatInclusao) {
      this.modelPedCompraItemEL01.dtDatInclusao = new Date(
        this.modelPedCompraItemEL01.dtDatInclusao
      );
    }

    if (this.modelPedCompraItemEL01.dtDatUltAlteracao) {
      this.modelPedCompraItemEL01.dtDatUltAlteracao = new Date(
        this.modelPedCompraItemEL01.dtDatUltAlteracao
      );
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(
        this.meuForm,
        this.modelPedCompraItemEL01,
        emEdicao
      );
      if (this.modelPedCompraItemEL01.inCodSituacaoPedComp) {
        if (this.modelPedCompraItemEL01.inCodSituacaoPedComp != 1) {
          this.cadastroBarraAcao.setModoConsulta();
        }
      }

      this.meuForm.get("UIItem").setValue(UIItem);

      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDPedCompraItem: [this.modelPedCompraItemEL01.IDPedCompraItem],
        chCodEANRec: [
          this.modelPedCompraItemEL01.chCodEANRec,
          Validators.required,
        ],
        deQtdSolic: [
          this.modelPedCompraItemEL01.deQtdSolic,
          Validators.required,
        ],
        UIItem: [UIItem],
        deValUnitSolic: [
          this.modelPedCompraItemEL01.deValUnitSolic,
          Validators.required,
        ],
        deValTotSolic: [this.modelPedCompraItemEL01.deValTotSolic],
        IDTabPreco: [
          this.modelPedCompraItemEL01.IDTabPreco,
          Validators.required,
        ],
        dePrecoTabela: [this.modelPedCompraItemEL01.dePrecoTabela],
        deValUnitLiquido: [this.modelPedCompraItemEL01.deValUnitLiquido],
        inCodSitAtenPedComp: [
          this.modelPedCompraItemEL01.inCodSitAtenPedComp,
          Validators.required,
        ],
        deQtdAtend: [this.modelPedCompraItemEL01.deQtdAtend],
        deValTotLiquido: [this.modelPedCompraItemEL01.deValTotLiquido],
        inCodMotRejPedComp: [this.modelPedCompraItemEL01.inCodMotRejPedComp],
        chDesMotivo: [this.modelPedCompraItemEL01.chDesMotivo],

        dtDatInclusao: [this.modelPedCompraItemEL01.dtDatInclusao],
        chNomeUsuarioInclusao: [
          this.modelPedCompraItemEL01.chNomeUsuarioInclusao,
        ],
        dtDatUltAlteracao: [this.modelPedCompraItemEL01.dtDatUltAlteracao],
        chNomeUsuarioAlteracao: [
          this.modelPedCompraItemEL01.chNomeUsuarioAlteracao,
        ],
        dtDatAtend: [this.modelPedCompraItemEL01.dtDatAtend],
        chNomeUsuarioAtend: [this.modelPedCompraItemEL01.chNomeUsuarioAtend],
      });
    }
  }

  private getDados() {
    var id: number;
    id = this.idCadastro;

    this.apiErrorCollection = new ApiErrorCollection();

    if (id == 0) {
      this.modelPedCompraItemEL01 = new ModelPedCompraItemEL01();

      this.modelPedCompraItemEL01.IDPedCompraItem = id;
      this.modelPedCompraItemEL01.IDItem = null;
      this.modelPedCompraItemEL01.IDTabPreco = null;
      this.modelPedCompraItemEL01.chCodEANRec = "";
      this.modelPedCompraItemEL01.chDesMotRejPedComp = "";
      this.modelPedCompraItemEL01.dePrecoTabela = null;
      this.modelPedCompraItemEL01.deQtdAtend = null;
      this.modelPedCompraItemEL01.deValTotLiquido = null;
      this.modelPedCompraItemEL01.deValTotSolic = null;
      this.modelPedCompraItemEL01.deQtdSolic = null;
      this.modelPedCompraItemEL01.deValUnitSolic = null;
      this.modelPedCompraItemEL01.inCodSitAtenPedComp = null;
      this.modelPedCompraItemEL01.inCodMotRejPedComp = null;

      this.modelPedCompraItemEL01.dtDatInclusao = null;
      this.modelPedCompraItemEL01.dtDatUltAlteracao = null;
      this.modelPedCompraItemEL01.dtDatAtend = null;
      this.modelPedCompraItemEL01.chCodUsuarioAlteracao = "";
      this.modelPedCompraItemEL01.chCodUsuarioAtend = "";
      this.modelPedCompraItemEL01.chCodUsuarioInclusao = "";
      this.modelPedCompraItemEL01.IDPedCompra =
        this.apiPedCompraItemEL01Service.IDPedCompra;
      this.criarForm(true);
      this.configurarStatusForm();
      this.operacao = "inclusao";
    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiPedCompraItemEL01Service.obter(id).then(
        (dados_API) => {
          this.modelPedCompraItemEL01 = dados_API;
          this.apiErrorCollection = new ApiErrorCollection();
          this.operacao = "edicao";
          this.criarForm(false);
          this.configurarStatusForm();
          this.AjustesSituacao(this.modelPedCompraItemEL01.inCodSitAtenPedComp);
          this.ValidaValorSolicitado();

          this.cadastroBarraAcao.esconderAguarde();
        },
        (erro) => {
          this.cadastroBarraAcao.esconderAguarde();
          this.apiErrorCollection = erro;
        }
      );
    }
  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(
      this.meuForm,
      this.modelPedCompraItemEL01
    );

    if (this.meuForm.getRawValue().UIItem) {
      this.modelPedCompraItemEL01.chCodItem =
        this.meuForm.getRawValue().UIItem.chCodItem;
      if (this.meuForm.getRawValue().UIItem.objetoSelecionado) {
        this.modelPedCompraItemEL01.IDItem =
          this.meuForm.getRawValue().UIItem.objetoSelecionado.IDItem;
      }
    }

    // else {
    //       this.modelPedCompraItemEL01.chDesItem = "";
    //       this.modelPedCompraItemEL01.IDItem = null;
    //       this.modelPedCompraItemEL01.chCodItem = "";
    //     }
  }

  btnCancelar() {
    this.getDados();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.operacao == "edicao") {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiPedCompraItemEL01Service
      .excluir(this.modelPedCompraItemEL01.IDPedCompraItem)
      .then(
        (sucesso) => {
          this.cadastroBarraAcao.esconder();
        },
        (erro) => {
          this.apiErrorCollection = erro;
        }
      );
  }

  alterar() {
    this.apiPedCompraItemEL01Service.alterar(this.modelPedCompraItemEL01).then(
      (sucesso) => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPedCompraItemEL01 = sucesso;

        this.criarForm(false);
        this.configurarStatusForm();
        this.cadastroBarraAcao.esconderAguarde();
      },
      (erro) => {
        console.error("erro = ", erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

  incluir() {
    this.apiPedCompraItemEL01Service.criar(this.modelPedCompraItemEL01).then(
      (sucesso) => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPedCompraItemEL01 = sucesso;

        this.meuForm.get("chCodEANRec").disable();
        this.meuForm.get("deQtdSolic").disable();
        this.meuForm.get("deValUnitSolic").disable();
        this.meuForm.get("IDTabPreco").disable();
        this.criarForm(false);
        this.configurarStatusForm();
        this.operacao = "edicao";
        this.cadastroBarraAcao.esconderAguarde();
      },
      (erro) => {
        console.error("erro = ", erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }
}
