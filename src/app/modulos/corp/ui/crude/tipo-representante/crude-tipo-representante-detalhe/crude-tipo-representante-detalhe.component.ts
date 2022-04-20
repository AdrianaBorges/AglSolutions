import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelTipoRepresentante } from '../../../../models/model-tipo-representante';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoRepresentanteService } from '../../../../api/api-tipo-representante.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-crude-tipo-representante-detalhe',
  templateUrl: './crude-tipo-representante-detalhe.component.html',
  styleUrls: ['./crude-tipo-representante-detalhe.component.scss']
})
export class CrudeTipoRepresentanteDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoRepresentante: ModelTipoRepresentante;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoRepresentanteService: ApiTipoRepresentanteService,
    private _location: Location
  ) {
    this.modelTipoRepresentante = new ModelTipoRepresentante();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoRepresentante();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodTipoRepresentante').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoRepresentante, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoRepresentante: [this.modelTipoRepresentante.inCodTipoRepresentante, Validators.required],
        chDescricao: [this.modelTipoRepresentante.chDescricao, Validators.required]
      });

    }
  }

  private getTipoRepresentante() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelTipoRepresentante = new ModelTipoRepresentante();
      this.modelTipoRepresentante.inCodTipoRepresentante = null;
      this.modelTipoRepresentante.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiTipoRepresentanteService.obter(id).then(
        dados_API => {

          this.modelTipoRepresentante = dados_API;
          this.operacao = 'edicao';
          this.criarForm(false);
        },
        erro => {
          this.apiErrorCollection = erro;
        }
      );
    }

  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoRepresentante);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoRepresentante();
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
    this.apiTipoRepresentanteService.excluir(this.modelTipoRepresentante.inCodTipoRepresentante).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoRepresentanteService.alterar(this.modelTipoRepresentante).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoRepresentante = sucesso;
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
    this.apiTipoRepresentanteService.criar(this.modelTipoRepresentante).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoRepresentante = sucesso;
        this.meuForm.controls['inCodTipoRepresentante'].disable();
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
