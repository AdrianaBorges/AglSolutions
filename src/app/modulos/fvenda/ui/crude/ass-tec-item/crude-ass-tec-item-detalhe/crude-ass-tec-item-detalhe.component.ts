import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiErrorCollection } from "../../../../../../api-error/api-error-collection";
import { CadastroBarraAcaoComponent } from "../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component";
import { ApiAssTecItemEL01Service } from "../../../../api/api-ass-tec-item-el01.service";
import { ApiAssTecnicaEL01Service } from "../../../../api/api-ass-tecnica-el01.service";
import { ApiItemEL01Service } from "../../../../api/api-item-el01.service";
import { ApiItemLoteSerieEl01Service } from "../../../../api/api-item-lote-serie-el01.service";
import { ApiSolucAssTecService } from "../../../../api/api-soluc-ass-tec.service";
import { ModelAssTecItemEL01 } from "../../../../models/model-ass-tec-item-EL01";
import { ModelAssTecnicaEL01 } from "../../../../models/model-ass-tecnica-EL01";
import { Location } from "@angular/common";
import { ApiAssTecItemSubsService } from "../../../../api/api-ass-tec-item-subs.service";
import { ApiAssTecItemServService } from "../../../../api/api-ass-tec-item-serv.service";
import { ApiAssTecItemDefAlegService } from "../../../../api/api-ass-tec-item-def-aleg.service";
import { ApiAssTecItemDefConstService } from "../../../../api/api-ass-tec-item-def-const.service";
import { GridInterfaceTabCadastroFilho } from "../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho";
import { ApiSelectComponent } from "../../../../../../componentes/api-select/api-select.component";
import { InputModalPesquisaComponent } from "../../../../../../componentes/input-modal-pesquisa/input-modal-pesquisa.component";


@Component({
  selector: "app-crude-ass-tec-item-detalhe",
  templateUrl: "./crude-ass-tec-item-detalhe.component.html",
  styleUrls: ["./crude-ass-tec-item-detalhe.component.scss"],
})
export class CrudeAssTecItemDetalheComponent
  implements OnInit, GridInterfaceTabCadastroFilho {
  @ViewChild("cadastroBarraAcao", { static: true })
  cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild("Pesquisa", { static: true })
  Pesquisa: InputModalPesquisaComponent;
  @ViewChild("loteSerie", { static: true }) loteSerie: ApiSelectComponent;
  private item = {
    chDescricao: "",
    IDItem: 0,
    chCodItem: "",
  };

  public meuForm: FormGroup;
  public modelAssTecnicaEL01: ModelAssTecnicaEL01;
  public modelAssTecItemEL01: ModelAssTecItemEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: "inclusao" | "edicao";
  private consulta: boolean;
  private idCadastro: number;

  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiAssTecnicaEL01Service: ApiAssTecnicaEL01Service,
    public apiAssTecItemEL01Service: ApiAssTecItemEL01Service,
    public apiSolucAssTecService: ApiSolucAssTecService,
    public apiItemLoteSerieEl01Service: ApiItemLoteSerieEl01Service,
    public apiItemEL01Service: ApiItemEL01Service,
    private _location: Location,
    private router: Router,

    // Apis Filhas
    private apiAssTecItemSubsService: ApiAssTecItemSubsService,
    private apiAssTecItemServService: ApiAssTecItemServService,
    private apiAssTecItemDefAlegService: ApiAssTecItemDefAlegService,
    private apiAssTecItemDefConstService: ApiAssTecItemDefConstService
  ) {
    this.modelAssTecItemEL01 = new ModelAssTecItemEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.modelAssTecnicaEL01 = new ModelAssTecnicaEL01();
    this.modelAssTecnicaEL01.chCodEstabelec = "";
    this.inicializarDados();
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
    this.carregarDadosPai();
    //this.configurarStatusForm();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private carregarDadosPai() {
    var idPai = +this.route.snapshot.paramMap.get("id");
    this.apiAssTecnicaEL01Service.obter(idPai).then((programa) => {
      this.modelAssTecnicaEL01 = programa;
      if (this.modelAssTecnicaEL01.dtDatAbertura) {
        this.modelAssTecnicaEL01.dtDatAbertura = new Date(
          this.modelAssTecnicaEL01.dtDatAbertura
        );
      }
    });
  }

  private inicializarDados() {
    this.carregarDadosPai();
    this.criarForm(true);
    this.configurarStatusForm();
    this.getAssTecnicaEL01();
  }

  private configurarStatusForm() {
    var id = +this.route.snapshot.paramMap.get("IDAssTecItem");
    if (id > 0) {
      this.meuForm.get("UIItem").disable();
    }
    this.meuForm.controls["IDAssTecItem"].disable();
  }

  private criarForm(emEdicao: boolean) {
    this.item.chDescricao = this.modelAssTecItemEL01.chDesItem;
    this.item.chCodItem = this.modelAssTecItemEL01.chCodItem;
    this.item.IDItem = this.modelAssTecItemEL01.IDItem;

    var UIItem = this.item.IDItem > 0 ? this.item : null;
    this.modelAssTecItemEL01["UIItem"] = UIItem;

    if (this.modelAssTecItemEL01.dtDatEncerram) {
      this.modelAssTecItemEL01.dtDatEncerram = new Date(
        this.modelAssTecItemEL01.dtDatEncerram
      );
    }

    if (this.modelAssTecItemEL01.dtDatInclusao) {
      this.modelAssTecItemEL01.dtDatInclusao = new Date(
        this.modelAssTecItemEL01.dtDatInclusao
      );
    }

    if (this.modelAssTecItemEL01.daDatEmisNFSaida) {
      this.modelAssTecItemEL01.daDatEmisNFSaida = new Date(
        this.modelAssTecItemEL01.daDatEmisNFSaida
      );
    }

    if (this.modelAssTecItemEL01.dtDatUltAlteracao) {
      this.modelAssTecItemEL01.dtDatUltAlteracao = new Date(
        this.modelAssTecItemEL01.dtDatUltAlteracao
      );
    }

    if (this.modelAssTecItemEL01.dtDatEncerram) {
      this.modelAssTecItemEL01.dtDatEncerram = new Date(
        this.modelAssTecItemEL01.dtDatEncerram
      );
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(
        this.meuForm,
        this.modelAssTecItemEL01,
        emEdicao
      );
      if (this.modelAssTecItemEL01.inCodSituacaoAssTec) {
        if (this.modelAssTecItemEL01.inCodSituacaoAssTec != 1) {
          this.cadastroBarraAcao.setModoConsulta();
        }
      }
    } else {
      this.meuForm = this.formB.group({
        IDAssTecItem: [this.modelAssTecItemEL01.IDAssTecItem],
        IDItemLoteSerie: [this.modelAssTecItemEL01.IDItemLoteSerie],
        chDesComplem: [this.modelAssTecItemEL01.chDesComplem],
        UIItem: [UIItem, Validators.required],
        chDesSolucao: [this.modelAssTecItemEL01.chDesSolucao],
        chDesMotivoCanc: [this.modelAssTecItemEL01.chDesMotivoCanc],
        deQtdItem: [this.modelAssTecItemEL01.deQtdItem, Validators.required],
        inCodSolucAssTec: [this.modelAssTecItemEL01.inCodSolucAssTec],
        dtDatInclusao: [this.modelAssTecItemEL01.dtDatInclusao],
        chNomeUsuarioInclusao: [this.modelAssTecItemEL01.chNomeUsuarioInclusao],
        dtDatUltAlteracao: [this.modelAssTecItemEL01.dtDatUltAlteracao],
        chNomeUsuarioAlteracao: [
          this.modelAssTecItemEL01.chNomeUsuarioAlteracao,
        ],
        dtDatEncerram: [this.modelAssTecItemEL01.dtDatEncerram],
        chNomeUsuarioEncerram: [this.modelAssTecItemEL01.chNomeUsuarioEncerram],
        chCodSerieNFSaida: [this.modelAssTecItemEL01.chCodSerieNFSaida],
        chNumNFSaida: [this.modelAssTecItemEL01.chNumNFSaida],
        daDatEmisNFSaida: [this.modelAssTecItemEL01.daDatEmisNFSaida],
        deQtdAtend: [this.modelAssTecItemEL01.deQtdAtend],
        chNumSerieItem: [this.modelAssTecItemEL01.chNumSerieItem],
      });
    }
  }

  public getImageSituacao() {
    if (
      this.modelAssTecItemEL01 &&
      this.modelAssTecItemEL01.inCodSituacaoAssTec
    ) {
      return `assets/img/Face${
        this.modelAssTecItemEL01.inCodSituacaoAssTec == 1
          ? "01"
          : this.modelAssTecItemEL01.inCodSituacaoAssTec == 2
          ? "02"
          : this.modelAssTecItemEL01.inCodSituacaoAssTec == 3
          ? "04"
          : "01"
      }.png`;
    } else {
      return undefined;
    }
  }

  private getAssTecnicaEL01() {
    var idPai: number;
    var id: number;
    idPai = +this.route.snapshot.paramMap.get("id");
    id = +this.route.snapshot.paramMap.get("IDAssTecItem");
    if (id == 0) {
      this.modelAssTecItemEL01 = new ModelAssTecItemEL01();
      this.modelAssTecItemEL01.IDAssTecnica = idPai;
      this.modelAssTecItemEL01.inCodSituacaoAssTec = 1;
      this.modelAssTecItemEL01.IDAssTecItem = 0;
      this.modelAssTecItemEL01.dtDatEncerram = null;
      this.modelAssTecItemEL01.dtDatInclusao = null;
      this.modelAssTecItemEL01.dtDatUltAlteracao = null;

      this.modelAssTecItemEL01.deQtdAtend = null;
      this.modelAssTecItemEL01.daDatEmisNFSaida = null;
      this.modelAssTecItemEL01.chNumNFSaida = "";
      this.modelAssTecItemEL01.chCodSerieNFSaida = "";

      this.modelAssTecItemEL01.IDItemLoteSerie = null;
      this.modelAssTecItemEL01.IDItem = null;
      this.modelAssTecItemEL01.inCodSolucAssTec = null;
      this.modelAssTecItemEL01.chDesMotivoCanc = "";
      this.modelAssTecItemEL01.chDesSolucAssTec = "";
      this.modelAssTecItemEL01.chDesMotivoCanc = "";
      this.modelAssTecItemEL01.chDesSolucao = "";
      this.modelAssTecItemEL01.chNumSerieItem = null;

      this.modelAssTecItemEL01.chNomeUsuarioInclusao = "";
      this.modelAssTecItemEL01.chNomeUsuarioAlteracao = "";
      this.modelAssTecItemEL01.chNomeUsuarioEncerram = "";

      this.operacao = "inclusao";
      this.criarForm(true);
    } else {
      this.apiAssTecItemEL01Service.obter(id).then(
        (dados_API) => {
          this.modelAssTecItemEL01 = dados_API;
          this.loteSerie.filtroAlterado(
            "Item.IDItem",
            "eq",
            this.modelAssTecItemEL01.IDItem
          );
          // Preencher as demais filhas
          this.apiAssTecItemDefAlegService.IDAssTecItem = this.modelAssTecItemEL01.IDAssTecItem;
          this.apiAssTecItemDefConstService.IDAssTecItem = this.modelAssTecItemEL01.IDAssTecItem;
          this.apiAssTecItemServService.IDAssTecItem = this.modelAssTecItemEL01.IDAssTecItem;
          this.apiAssTecItemSubsService.IDAssTecItem = this.modelAssTecItemEL01.IDAssTecItem;
          this.operacao = "edicao";
          this.criarForm(false);
        },
        (erro) => {
          this.apiErrorCollection = erro;
        }
      );
    }
  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(
      this.meuForm,
      this.modelAssTecItemEL01
    );

    if (this.meuForm.value.UIItem) {
      // this.modelItemLoteSerie.chDesItem = this.meuForm.value.UiItem.chDescricao;
      this.modelAssTecItemEL01.chCodItem = this.meuForm.value.UIItem.chCodItem;
      if (this.meuForm.value.UIItem.objetoSelecionado) {
        this.modelAssTecItemEL01.IDItem = this.meuForm.value.UIItem.objetoSelecionado.IDItem;
      }
    } else {
      this.modelAssTecItemEL01.chDesItem = "";
      this.modelAssTecItemEL01.IDItem = null;
      this.modelAssTecItemEL01.chCodItem = "";
    }
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getAssTecnicaEL01();
    this.cadastroBarraAcao.esconderAguarde();
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
    this.apiAssTecItemEL01Service
      .excluir(this.modelAssTecItemEL01.IDAssTecItem)
      .then(
        (sucesso) => {
          this._location.back();
        },
        (erro) => {
          this.apiErrorCollection = erro;
        }
      );
  }

  alterar() {
    this.apiAssTecItemEL01Service.alterar(this.modelAssTecItemEL01).then(
      (sucesso) => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecItemEL01 = sucesso;
        if (this.modelAssTecItemEL01.dtDatEncerram) {
          this.modelAssTecItemEL01.dtDatEncerram = new Date(
            this.modelAssTecItemEL01.dtDatEncerram
          );
        }

        if (this.modelAssTecItemEL01.dtDatInclusao) {
          this.modelAssTecItemEL01.dtDatInclusao = new Date(
            this.modelAssTecItemEL01.dtDatInclusao
          );
        }

        if (this.modelAssTecItemEL01.daDatEmisNFSaida) {
          this.modelAssTecItemEL01.daDatEmisNFSaida = new Date(
            this.modelAssTecItemEL01.daDatEmisNFSaida
          );
        }

        if (this.modelAssTecItemEL01.dtDatUltAlteracao) {
          this.modelAssTecItemEL01.dtDatUltAlteracao = new Date(
            this.modelAssTecItemEL01.dtDatUltAlteracao
          );
        }

        if (this.modelAssTecItemEL01.dtDatEncerram) {
          this.modelAssTecItemEL01.dtDatEncerram = new Date(
            this.modelAssTecItemEL01.dtDatEncerram
          );
        }

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
    this.apiAssTecItemEL01Service.criar(this.modelAssTecItemEL01).then(
      (sucesso) => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecItemEL01 = sucesso;
        if (this.modelAssTecItemEL01.dtDatEncerram) {
          this.modelAssTecItemEL01.dtDatEncerram = new Date(
            this.modelAssTecItemEL01.dtDatEncerram
          );
        }

        if (this.modelAssTecItemEL01.dtDatInclusao) {
          this.modelAssTecItemEL01.dtDatInclusao = new Date(
            this.modelAssTecItemEL01.dtDatInclusao
          );
        }

        if (this.modelAssTecItemEL01.daDatEmisNFSaida) {
          this.modelAssTecItemEL01.daDatEmisNFSaida = new Date(
            this.modelAssTecItemEL01.daDatEmisNFSaida
          );
        }

        if (this.modelAssTecItemEL01.dtDatUltAlteracao) {
          this.modelAssTecItemEL01.dtDatUltAlteracao = new Date(
            this.modelAssTecItemEL01.dtDatUltAlteracao
          );
        }

        if (this.modelAssTecItemEL01.dtDatEncerram) {
          this.modelAssTecItemEL01.dtDatEncerram = new Date(
            this.modelAssTecItemEL01.dtDatEncerram
          );
        }
        this.meuForm.get("UIItem").disable();
        this.apiAssTecItemDefAlegService.IDAssTecItem = this.modelAssTecItemEL01.IDAssTecItem;
        this.apiAssTecItemDefConstService.IDAssTecItem = this.modelAssTecItemEL01.IDAssTecItem;
        this.apiAssTecItemServService.IDAssTecItem = this.modelAssTecItemEL01.IDAssTecItem;
        this.apiAssTecItemSubsService.IDAssTecItem = this.modelAssTecItemEL01.IDAssTecItem;
        this.criarForm(false);
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

  ValidarItemSerie(event) {
    this.loteSerie.filtroAlterado("Item.IDItem", "eq", event.IDItem);
  }
}
