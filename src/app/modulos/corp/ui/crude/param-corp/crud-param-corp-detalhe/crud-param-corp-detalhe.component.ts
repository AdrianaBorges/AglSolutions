import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelParamCorp } from '../../../../models/model-param-corp';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiParamCorpService } from '../../../../api/api-param-corp.service';

@Component({
  selector: 'app-crud-param-corp-detalhe',
  templateUrl: './crud-param-corp-detalhe.component.html',
  styleUrls: ['./crud-param-corp-detalhe.component.scss']
})
export class CrudParamCorpDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelParamCorp: ModelParamCorp;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiParamCorpService: ApiParamCorpService,
    private _location: Location,
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelParamCorp = new ModelParamCorp();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getParamCorp();
  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'param-corp',
        url: '/modulos/corp/param-corp'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm() {

    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.meuForm.get('chCodParamCorp').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelParamCorp, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        chCodParamCorp: new FormControl(this.modelParamCorp.chCodParamCorp, [Validators.required, Validators.maxLength(50)]),
        chDescricao: new FormControl(this.modelParamCorp.chDescricao, [Validators.required, Validators.maxLength(100)]),
        chValor: new FormControl(this.modelParamCorp.chValor, []),
        chDesObservacao: new FormControl(this.modelParamCorp.chDesObservacao, [])
      });
    }

  }

  private getParamCorp() {

    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.modelParamCorp = new ModelParamCorp();
      this.modelParamCorp.chCodParamCorp = "";
      this.modelParamCorp.chDescricao = "";
      this.modelParamCorp.chValor = "";
      this.modelParamCorp.chDesObservacao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiParamCorpService.obter(id).then(
        dados_API => {
          this.modelParamCorp = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelParamCorp);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getParamCorp();
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
    this.apiParamCorpService.excluir(this.modelParamCorp.chCodParamCorp).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiParamCorpService.alterar(this.modelParamCorp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelParamCorp = sucesso;
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
    this.apiParamCorpService.criar(this.modelParamCorp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelParamCorp = sucesso;
        this.meuForm.controls['chCodParamCorp'].disable();
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
