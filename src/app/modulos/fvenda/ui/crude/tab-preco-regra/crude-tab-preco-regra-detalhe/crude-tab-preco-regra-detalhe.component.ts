import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ApiErrorCollection } from "../../../../../../api-error/api-error-collection";
import { CabecalhoBreadcrumbService } from "../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { CadastroBarraAcaoComponent } from "../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component";
import { ApiCidadeService } from "../../../../../corp/api/api-cidade.service";
import { ApiGrupoClienteService } from "../../../../../corp/api/api-grupo-cliente.service";
import { ApiMicrorregiaoService } from "../../../../../corp/api/api-microrregiao.service";
import { ApiPaisService } from "../../../../../corp/api/api-pais.service";
import { ApiRegiaoService } from "../../../../../corp/api/api-regiao.service";
import { ApiUfService } from "../../../../../corp/api/api-uf.service";
import { ApiClienteEL02Service } from "../../../../api/api-cliente-el02.service";
import { ApiTabPrecoEL01Service } from "../../../../api/api-tab-preco-el01.service";
import { ApiTabPrecoRegraEL01Service } from "../../../../api/api-tab-preco-regra-el01.service";
import { ModelTabPrecoRegraEL01 } from "../../../../models/model-tab-preco-regra-EL01";
import { Location } from "@angular/common";
import { ApiSelectComponent } from "../../../../../../componentes/api-select/api-select.component";
import { ApiCanalVendaService } from "../../../../../corp/api/api-canal-venda.service";

@Component({
  selector: "app-crude-tab-preco-regra-detalhe",
  templateUrl: "./crude-tab-preco-regra-detalhe.component.html",
  styleUrls: ["./crude-tab-preco-regra-detalhe.component.scss"],
})
export class CrudeTabPrecoRegraDetalheComponent implements OnInit {
  @ViewChild("cadastroBarraAcao", { static: true })
  cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild("breadcrumb_traducao", { static: true })
  breadcrumb_traducao: ElementRef;
  @ViewChild("filtroMicrorregiao", { static: true })
  filtroMicrorregiao: ApiSelectComponent;
  @ViewChild("filtroRegiao", { static: true }) filtroRegiao: ApiSelectComponent;
  @ViewChild("filtroPais", { static: true }) filtroPais: ApiSelectComponent;
  @ViewChild("filtroUF", { static: true }) filtroUF: ApiSelectComponent;
  @ViewChild("filtroCidade", { static: true }) filtroCidade: ApiSelectComponent;

  private cliente = {
    chNomeCliente: "",
    IDClienteVenda: 0,
    inCodCliente: 0,
  };

  private clientePai = {
    chNomeCliente: "",
    IDClienteVenda: 0,
    inCodCliente: 0,
  };
  public meuForm: FormGroup;
  public modelTabPrecoRegraEL01: ModelTabPrecoRegraEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: "inclusao" | "edicao";

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTabPrecoRegraEL01Service: ApiTabPrecoRegraEL01Service,
    public apiPaisService: ApiPaisService,
    public apiUFService: ApiUfService,
    public apiCidadeService: ApiCidadeService,
    public apiRegiaoService: ApiRegiaoService,
    public apiMicrorregiaoService: ApiMicrorregiaoService,
    public apiGrupoClienteService: ApiGrupoClienteService,
    public apiCanalVendaService: ApiCanalVendaService,
    public apiClienteEL02PaiService: ApiClienteEL02Service,
    public apiClienteEL02Service: ApiClienteEL02Service,
    public apiTabPrecoEL01Service: ApiTabPrecoEL01Service,
    private formB: FormBuilder,
    private _location: Location
  ) {
    this.modelTabPrecoRegraEL01 = new ModelTabPrecoRegraEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
    this.apiPaisService.mudarOrdenacao("Pais.chNomeAbreviado", "asc");
    this.apiUFService.mudarOrdenacao("UF.chNome", "asc");
    this.apiCidadeService.mudarOrdenacao("Cidade.chNome", "asc");
    this.apiRegiaoService.mudarOrdenacao("Regiao.chDescricao", "asc");
    this.apiMicrorregiaoService.mudarOrdenacao(
      "Microrregiao.chDescricao",
      "asc"
    );
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get("id");
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(
      traducao + " " + id
    );
  }
  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTabPrecoRegra();
  }

  private configurarStatusForm() {
    var id = +this.route.snapshot.paramMap.get("id");
    this.meuForm.controls["IDTabPrecoRegra"].disable();
  }

  private criarForm(emEdicao: boolean) {
    if (this.modelTabPrecoRegraEL01.dtDatValidFim) {
      this.modelTabPrecoRegraEL01.dtDatValidFim = new Date(
        this.modelTabPrecoRegraEL01.dtDatValidFim
      );
    }
    if (this.modelTabPrecoRegraEL01.dtDatValidIni) {
      this.modelTabPrecoRegraEL01.dtDatValidIni = new Date(
        this.modelTabPrecoRegraEL01.dtDatValidIni
      );
    }

    this.cliente.chNomeCliente = this.modelTabPrecoRegraEL01.chNomeCliente;
    this.cliente.inCodCliente = this.modelTabPrecoRegraEL01.inCodCliente;
    this.cliente.IDClienteVenda = this.modelTabPrecoRegraEL01.IDClienteVenda;

    var UIData_ClienteVenda =
      this.cliente.IDClienteVenda > 0 ? this.cliente : null;
    this.modelTabPrecoRegraEL01["UIData_ClienteVenda"] = UIData_ClienteVenda;

    this.clientePai.chNomeCliente = this.modelTabPrecoRegraEL01.chNomeClientePai;
    this.clientePai.inCodCliente = this.modelTabPrecoRegraEL01.inCodClientePai;
    this.clientePai.IDClienteVenda = this.modelTabPrecoRegraEL01.IDClienteVendaPai;

    var UIData_ClienteVendaPai =
      this.clientePai.IDClienteVenda > 0 ? this.clientePai : null;
    this.modelTabPrecoRegraEL01[
      "UIData_ClienteVendaPai"
    ] = UIData_ClienteVendaPai;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(
        this.meuForm,
        this.modelTabPrecoRegraEL01,
        emEdicao
      );
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({
        //Dados essenciais
        IDTabPrecoRegra: [this.modelTabPrecoRegraEL01.IDTabPrecoRegra],
        UIData_ClienteVendaPai: [UIData_ClienteVendaPai],
        UIData_ClienteVenda: [UIData_ClienteVenda],
        IDTabPreco: [
          this.modelTabPrecoRegraEL01.IDTabPreco,
          Validators.required,
        ],
        dtDatValidIni: [
          this.modelTabPrecoRegraEL01.dtDatValidIni,
          Validators.required,
        ],
        dtDatValidFim: [
          this.modelTabPrecoRegraEL01.dtDatValidFim,
          Validators.required,
        ],

        IDPais: [this.modelTabPrecoRegraEL01.IDPais],
        IDUF: [this.modelTabPrecoRegraEL01.IDUF],
        IDCidade: [this.modelTabPrecoRegraEL01.IDCidade],
        IDMicrorregiao: [this.modelTabPrecoRegraEL01.IDMicrorregiao],
        chCodRegiao: [this.modelTabPrecoRegraEL01.chCodRegiao],
        chCodGrupoCliente: [this.modelTabPrecoRegraEL01.chCodGrupoCliente],
        chCodCanalVenda: [this.modelTabPrecoRegraEL01.chCodCanalVenda],
      });
    }
  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(
      this.meuForm,
      this.modelTabPrecoRegraEL01
    );

    if (this.meuForm.value.UIData_ClienteVendaPai) {
      this.modelTabPrecoRegraEL01.chNomeClientePai = this.meuForm.value.UIData_ClienteVendaPai.chNomeCliente;
      if (this.meuForm.value.UIData_ClienteVendaPai.objetoSelecionado) {
        this.modelTabPrecoRegraEL01.IDClienteVendaPai = this.meuForm.value.UIData_ClienteVendaPai.objetoSelecionado.IDClienteVenda;
      }
    } else {
      this.modelTabPrecoRegraEL01.chNomeClientePai = "";
      this.modelTabPrecoRegraEL01.IDClienteVendaPai = null;
    }

    if (this.meuForm.value.UIData_ClienteVenda) {
      this.modelTabPrecoRegraEL01.chNomeCliente = this.meuForm.value.UIData_ClienteVenda.chNomeCliente;
      if (this.meuForm.value.UIData_ClienteVenda.objetoSelecionado) {
        this.modelTabPrecoRegraEL01.IDClienteVenda = this.meuForm.value.UIData_ClienteVenda.objetoSelecionado.IDClienteVenda;
      }
    } else {
      this.modelTabPrecoRegraEL01.chNomeCliente = "";
      this.modelTabPrecoRegraEL01.IDClienteVenda = null;
    }
  }

  private getTabPrecoRegra() {
    var id: number;
    id = +this.route.snapshot.paramMap.get("id");

    if (id == 0) {
      this.modelTabPrecoRegraEL01 = new ModelTabPrecoRegraEL01();
      this.modelTabPrecoRegraEL01.IDTabPrecoRegra = 0;
      this.modelTabPrecoRegraEL01.IDTabPreco = null;
      this.modelTabPrecoRegraEL01.IDClienteVenda = null;
      this.modelTabPrecoRegraEL01.IDClienteVendaPai = null;
      this.modelTabPrecoRegraEL01.IDCidade = null;
      this.modelTabPrecoRegraEL01.IDUF = null;
      this.modelTabPrecoRegraEL01.IDMicrorregiao = null;
      this.modelTabPrecoRegraEL01.IDPais = null;
      this.modelTabPrecoRegraEL01.chCodGrupoCliente = null;
      this.modelTabPrecoRegraEL01.chCodCanalVenda = null;
      this.modelTabPrecoRegraEL01.chCodRegiao = null;
      this.modelTabPrecoRegraEL01.dtDatValidFim = null;
      this.modelTabPrecoRegraEL01.dtDatValidIni = null;

      this.operacao = "inclusao";
      this.criarForm(true);
    } else {
      this.cadastroBarraAcao.exibirAguarde();
      this.apiTabPrecoRegraEL01Service.obter(id).then(
        (dados_API) => {
          this.modelTabPrecoRegraEL01 = dados_API;
          this.operacao = "edicao";
          this.criarForm(false);
          this.meuForm
            .get("IDMicrorregiao")
            .setValue(this.modelTabPrecoRegraEL01.IDMicrorregiao);
          this.cadastroBarraAcao.esconderAguarde();
        },
        (erro) => {
          this.cadastroBarraAcao.esconderAguarde();
          this.apiErrorCollection = erro;
        }
      );
    }
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTabPrecoRegra();
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
    this.apiTabPrecoRegraEL01Service
      .excluir(this.modelTabPrecoRegraEL01.IDTabPrecoRegra)
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
    this.apiTabPrecoRegraEL01Service.alterar(this.modelTabPrecoRegraEL01).then(
      (sucesso) => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTabPrecoRegraEL01 = sucesso;
        this.criarForm(false);
        this.meuForm
          .get("IDMicrorregiao")
          .setValue(this.modelTabPrecoRegraEL01.IDMicrorregiao);
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
    this.apiTabPrecoRegraEL01Service.criar(this.modelTabPrecoRegraEL01).then(
      (sucesso) => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTabPrecoRegraEL01 = sucesso;
        this.criarForm(false);
        this.operacao = "edicao";
        this.meuForm
          .get("IDMicrorregiao")
          .setValue(this.modelTabPrecoRegraEL01.IDMicrorregiao);
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
