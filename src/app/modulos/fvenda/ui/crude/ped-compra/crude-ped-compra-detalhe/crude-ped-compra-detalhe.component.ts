import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiErrorCollection } from "../../../../../../api-error/api-error-collection";
import { ApiEstabelecimentoService } from "../../../../../corp/api/api-estabelecimento.service";
import { ApiClienteEL02Service } from "../../../../api/api-cliente-el02.service";
import { ApiPedCompraEL01Service } from "../../../../api/api-ped-compra-el01.service";
import { ApiRepresVendaEL01Service } from "../../../../api/api-repres-venda-el01.service";
import { ApiTabPrecoEL01Service } from "../../../../api/api-tab-preco-el01.service";
import { ModelPedCompraEL01 } from "../../../../models/model-ped-compra-EL-01";
import { Location } from "@angular/common";
import { CadastroBarraAcaoComponent } from "../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component";
import { ApiPedCompraItemEL01Service } from "../../../../api/api-ped-compra-item-el01.service";
@Component({
  selector: "app-crude-ped-compra-detalhe",
  templateUrl: "./crude-ped-compra-detalhe.component.html",
  styleUrls: ["./crude-ped-compra-detalhe.component.scss"],
})
export class CrudePedCompraDetalheComponent implements OnInit {
  @ViewChild("cadastroBarraAcao", { static: true })
  cadastroBarraAcao: CadastroBarraAcaoComponent;
  // @ViewChild("pesquisa", { static: true }) pesquisa: InputModalPesquisaComponent;
  private representante = {
    chNomeRepresentante: "",
    inCodRepresentante: 0,
    IDRepresentante: 0,
  };

  private cliente = {
    chNomeCliente: "",
    IDClienteVenda: 0,
    inCodCliente: 0,
  };
  public meuForm: FormGroup;
  public modelPedCompraEL01: ModelPedCompraEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: "inclusao" | "edicao";
  private consulta: boolean;
  private idCadastro: number;

  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPedCompraEL01Service: ApiPedCompraEL01Service,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    public apiRepresVendaEL01Service: ApiRepresVendaEL01Service,
    public apiTabPrecoEL01Service: ApiTabPrecoEL01Service,
    public apiClienteEL02Service: ApiClienteEL02Service,
    public apiPedCompraItemEL01Service: ApiPedCompraItemEL01Service,
    private _location: Location,
    private router: Router
  ) {
    this.modelPedCompraEL01 = new ModelPedCompraEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    // this.criarBreadCrumbs();
  }
  mudancaRepresentante(dado: any) {
    this.apiClienteEL02Service.obter(dado.IDCliente).then((r) => {
      this.representante.inCodRepresentante = r.inCodRepresentante;
      this.representante.chNomeRepresentante = r.chNomeRepresentante;
      this.representante["objetoSelecionado"] = {
        IDRepresentante: r.IDRepresentante,
      };
      this.modelPedCompraEL01["UIData_Representante"] = this.representante;
      this.meuForm.get("UIData_Representante").setValue(this.representante);
    });
  }

  // /**
  //  * Deve ser chamada pelo evento do grid de pesquisa,
  //  * seja para criar um novo registro ou para exibir
  //  * para edição ou exclusão
  //  * @param id zero se for um novo cadastro e um valor
  //  * se for para abrir para edição ou exclusão
  //  */
  // public gridInterfaceTabCadastroFilho_setIdCadastro(id: string): void {
  //   this.idCadastro = +id;
  //   this.getPedCompraEL01();
  //   //this.configurarStatusForm();
  // }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getPedCompraEL01();
  }

  private configurarStatusForm() {
    var id = +this.route.snapshot.paramMap.get("id");

    if (id > 0) {
      this.meuForm.get("UIData_Cliente").disable();
      this.meuForm.get("UIData_Representante").disable();
      this.meuForm.get("IDEstabelec").disable();
      this.meuForm.get("daDatPedCompra").disable();
      this.meuForm.get("chNumPedCliente").disable();
      this.meuForm.get("IDTabPreco").disable();
      this.meuForm.get("deValProduto").disable();
      this.meuForm.get("deValTotal").disable();
    }
    this.meuForm.controls["IDPedCompra"].disable();
  }

  private criarForm(emEdicao: boolean) {
    this.representante.chNomeRepresentante = this.modelPedCompraEL01.chNomeRepresentante;
    this.representante.inCodRepresentante = this.modelPedCompraEL01.inCodRepresentante;
    this.representante.IDRepresentante = this.modelPedCompraEL01.IDRepresentante;

    var UIData_Representante =
      this.representante.IDRepresentante > 0 ? this.representante : null;
    this.modelPedCompraEL01["UIData_Representante"] = UIData_Representante;

    this.cliente.chNomeCliente = this.modelPedCompraEL01.chNomeCliente;
    this.cliente.inCodCliente = this.modelPedCompraEL01.inCodCliente;
    this.cliente.IDClienteVenda = this.modelPedCompraEL01.IDClienteVenda;

    var UIData_Cliente = this.cliente.IDClienteVenda > 0 ? this.cliente : null;
    this.modelPedCompraEL01["UIData_Cliente"] = UIData_Cliente;

    if (this.modelPedCompraEL01.daDatPedCompra) {
      this.modelPedCompraEL01.daDatPedCompra = new Date(
        this.modelPedCompraEL01.daDatPedCompra
      );
    }

    if (this.modelPedCompraEL01.dtDatRetorno) {
      this.modelPedCompraEL01.dtDatRetorno = new Date(
        this.modelPedCompraEL01.dtDatRetorno
      );
    }

    if (this.modelPedCompraEL01.dtDatLiberacao) {
      this.modelPedCompraEL01.dtDatLiberacao = new Date(
        this.modelPedCompraEL01.dtDatLiberacao
      );
    }

    if (this.modelPedCompraEL01.dtDatInclusao) {
      this.modelPedCompraEL01.dtDatInclusao = new Date(
        this.modelPedCompraEL01.dtDatInclusao
      );
    }

    if (this.modelPedCompraEL01.dtDatUltAlteracao) {
      this.modelPedCompraEL01.dtDatUltAlteracao = new Date(
        this.modelPedCompraEL01.dtDatUltAlteracao
      );
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(
        this.meuForm,
        this.modelPedCompraEL01,
        emEdicao
      );
      if (this.modelPedCompraEL01.inCodSituacaoPedComp) {
        if (this.modelPedCompraEL01.inCodSituacaoPedComp != 1) {
          this.cadastroBarraAcao.setModoConsulta();
        }
      }
    } else {
      this.meuForm = this.formB.group({
        IDPedCompra: [this.modelPedCompraEL01.IDPedCompra],
        IDEstabelec: [this.modelPedCompraEL01.IDEstabelec, Validators.required],
        inNumPedCompra: [this.modelPedCompraEL01.inNumPedCompra],
        UIData_Representante: [UIData_Representante, Validators.required],
        UIData_Cliente: [UIData_Cliente, Validators.required],
        daDatPedCompra: [
          this.modelPedCompraEL01.daDatPedCompra,
          Validators.required,
        ],
        chNumPedCliente: [
          this.modelPedCompraEL01.chNumPedCliente,
          Validators.required,
        ],
        chNomContatoCliente: [this.modelPedCompraEL01.chNomContatoCliente],
        IDTabPreco: [this.modelPedCompraEL01.IDTabPreco, Validators.required],
        deValProduto: [this.modelPedCompraEL01.deValProduto],
        deValTotal: [this.modelPedCompraEL01.deValTotal],
        chDesObservacao: [this.modelPedCompraEL01.chDesObservacao],
        dtDatInclusao: [this.modelPedCompraEL01.dtDatInclusao],
        chNomeUsuarioInclusao: [this.modelPedCompraEL01.chNomeUsuarioInclusao],
        dtDatUltAlteracao: [this.modelPedCompraEL01.dtDatUltAlteracao],
        chNomeUsuarioAlteracao: [
          this.modelPedCompraEL01.chNomeUsuarioAlteracao,
        ],
        dtDatEncerram: [this.modelPedCompraEL01.dtDatLiberacao],
        chNomeUsuarioLibera: [this.modelPedCompraEL01.chNomeUsuarioLibera],
        dtDatRetorno: [this.modelPedCompraEL01.dtDatRetorno],
      });
    }
  }

  public getImageSituacao() {
    if (
      this.modelPedCompraEL01 &&
      this.modelPedCompraEL01.inCodSituacaoPedComp
    ) {
      return `assets/img/Face${
        this.modelPedCompraEL01.inCodSituacaoPedComp == 1
          ? "01"
          : this.modelPedCompraEL01.inCodSituacaoPedComp == 2
          ? "02"
          : this.modelPedCompraEL01.inCodSituacaoPedComp == 3
          ? "03"
          : "01"
      }.png`;
    } else {
      return undefined;
    }
  }

  private getPedCompraEL01() {
    var id: number;
    id = +this.route.snapshot.paramMap.get("id");

    if (id == 0) {
      this.modelPedCompraEL01 = new ModelPedCompraEL01();
      this.modelPedCompraEL01.IDPedCompra = 0;
      this.modelPedCompraEL01.inCodSituacaoPedComp = 1;
      this.modelPedCompraEL01.daDatPedCompra = null;
      this.modelPedCompraEL01.dtDatRetorno = null;
      this.modelPedCompraEL01.dtDatLiberacao = null;
      this.modelPedCompraEL01.dtDatInclusao = null;
      this.modelPedCompraEL01.dtDatUltAlteracao = null;

      this.modelPedCompraEL01.IDClienteVenda = null;
      this.modelPedCompraEL01.IDRepresentante = null;
      this.modelPedCompraEL01.IDEstabelec = null;
      this.modelPedCompraEL01.inNumPedCompra = null;
      this.modelPedCompraEL01.chNomContatoCliente = "";
      this.modelPedCompraEL01.chNumPedCliente = "";

      this.modelPedCompraEL01.chDesObservacao = "";

      this.modelPedCompraEL01.chNomeUsuarioInclusao = "";
      this.modelPedCompraEL01.chNomeUsuarioAlteracao = "";
      this.modelPedCompraEL01.chNomeUsuarioLibera = "";

      this.operacao = "inclusao";
      this.criarForm(true);
    } else {
      this.apiPedCompraEL01Service.obter(id).then(
        (dados_API) => {
          this.modelPedCompraEL01 = dados_API;
          this.apiPedCompraItemEL01Service.IDPedCompra = this.modelPedCompraEL01.IDPedCompra;
          this.apiPedCompraItemEL01Service.modelPedCompraEL01 = this.modelPedCompraEL01;
          // this.AlteraTecnico(this.modelPedCompraEL01.inCodTipoTecnico);
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
      this.modelPedCompraEL01
    );

    if (this.meuForm.getRawValue().UIData_Representante) {
      this.modelPedCompraEL01.chNomeRepresentante = this.meuForm.getRawValue().UIData_Representante.chNomeRepresentante;
      this.modelPedCompraEL01.inCodRepresentante = this.meuForm.getRawValue().UIData_Representante.inCodRepresentante;
      if (this.meuForm.getRawValue().UIData_Representante.objetoSelecionado) {
        this.modelPedCompraEL01.IDRepresentante = this.meuForm.getRawValue().UIData_Representante.objetoSelecionado.IDRepresentante;
      }
    } else {
      this.modelPedCompraEL01.chNomeRepresentante = "";
      this.modelPedCompraEL01.IDRepresentante = null;
    }

    if (this.meuForm.getRawValue().UIData_Cliente) {
      this.modelPedCompraEL01.chNomeCliente = this.meuForm.getRawValue().UIData_Cliente.chNomeCliente;
      if (this.meuForm.getRawValue().UIData_Cliente.objetoSelecionado) {
        this.modelPedCompraEL01.IDClienteVenda = this.meuForm.getRawValue().UIData_Cliente.objetoSelecionado.IDClienteVenda;
      }
    } else {
      this.modelPedCompraEL01.chNomeCliente = "";
      this.modelPedCompraEL01.IDClienteVenda = null;
    }
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getPedCompraEL01();
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
    this.apiPedCompraEL01Service
      .excluir(this.modelPedCompraEL01.IDPedCompra)
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
    this.apiPedCompraEL01Service.alterar(this.modelPedCompraEL01).then(
      (sucesso) => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPedCompraEL01 = sucesso;
        this.apiPedCompraItemEL01Service.IDPedCompra = this.modelPedCompraEL01.IDPedCompra;
        this.apiPedCompraItemEL01Service.modelPedCompraEL01 = this.modelPedCompraEL01;
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
    this.apiPedCompraEL01Service.criar(this.modelPedCompraEL01).then(
      (sucesso) => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPedCompraEL01 = sucesso;
        this.meuForm.get("UIData_Cliente").disable();
        this.meuForm.get("UIData_Representante").disable();
        this.meuForm.get("IDEstabelec").disable();
        this.meuForm.get("daDatPedCompra").disable();
        this.meuForm.get("chNumPedCliente").disable();
        this.meuForm.get("IDTabPreco").disable();
        this.meuForm.get("deValProduto").disable();
        this.meuForm.get("deValTotal").disable();
        this.apiPedCompraItemEL01Service.IDPedCompra = this.modelPedCompraEL01.IDPedCompra;
        this.apiPedCompraItemEL01Service.modelPedCompraEL01 = this.modelPedCompraEL01;
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
}
