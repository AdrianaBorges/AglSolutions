import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ApiErrorCollection } from "../../../../../../api-error/api-error-collection";
import { CabecalhoBreadcrumbService } from "../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { CadastroBarraAcaoComponent } from "../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component";
import { ApiTipoIntegraCampService } from "../../../../api/api-tipo-integra-camp.service";
import { ModelTipoIntegraCamp } from "../../../../models/model-tipo-integra-camp";
import { Location } from "@angular/common";
@Component({
  selector: 'app-crude-tipo-integra-camp-detalhe',
  templateUrl: './crude-tipo-integra-camp-detalhe.component.html',
  styleUrls: ['./crude-tipo-integra-camp-detalhe.component.scss']
})
export class CrudeTipoIntegraCampDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  public meuForm: FormGroup;
  public modelTipoIntegraCamp: ModelTipoIntegraCamp;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoIntegraCampService: ApiTipoIntegraCampService,
    private _location: Location
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelTipoIntegraCamp = new ModelTipoIntegraCamp();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoIntegraCamp();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodTipoIntegraCamp').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoIntegraCamp, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoIntegraCamp: [this.modelTipoIntegraCamp.inCodTipoIntegraCamp, Validators.required],
        chDescricao: [this.modelTipoIntegraCamp.chDescricao, Validators.required],
      });

    }
  }

  private getTipoIntegraCamp() {
    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelTipoIntegraCamp = new ModelTipoIntegraCamp();
      this.modelTipoIntegraCamp.inCodTipoIntegraCamp = 0;
      this.modelTipoIntegraCamp.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);
    } else {
      this.cadastroBarraAcao.exibirAguarde();
      this.apiTipoIntegraCampService.obter(id).then(
        dados_API => {
          this.modelTipoIntegraCamp = dados_API;
          this.operacao = 'edicao';
          this.criarForm(false);
          this.cadastroBarraAcao.esconderAguarde();
        },
        erro => {
          this.cadastroBarraAcao.esconderAguarde();
          this.apiErrorCollection = erro;
        }
      );
    }
  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoIntegraCamp);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoIntegraCamp();
    this.cadastroBarraAcao.esconderAguarde();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.operacao == 'edicao') {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiTipoIntegraCampService.excluir(this.modelTipoIntegraCamp.inCodTipoIntegraCamp).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoIntegraCampService.alterar(this.modelTipoIntegraCamp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoIntegraCamp = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

  incluir() {
    this.apiTipoIntegraCampService.criar(this.modelTipoIntegraCamp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoIntegraCamp = sucesso;
        this.meuForm.controls['inCodTipoIntegraCamp'].disable();
        this.criarForm(false);
        this.operacao = 'edicao';
        this.cadastroBarraAcao.esconderAguarde();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

}
