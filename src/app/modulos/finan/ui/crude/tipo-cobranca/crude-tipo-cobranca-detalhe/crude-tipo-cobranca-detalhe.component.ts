import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoCobranca } from '../../../../models/model-tipo-cobranca';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoCobrancaService } from '../../../../api/api-tipo-cobranca.service';

@Component({
  selector: 'app-crude-tipo-cobranca-detalhe',
  templateUrl: './crude-tipo-cobranca-detalhe.component.html',
  styleUrls: ['./crude-tipo-cobranca-detalhe.component.scss']
})
export class CrudeTipoCobrancaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelTipoCobranca: ModelTipoCobranca;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoCobrancaService: ApiTipoCobrancaService,
    private _location: Location,
  ) {
    this.modelTipoCobranca = new ModelTipoCobranca();
    this.apiErrorCollection = new ApiErrorCollection();
  }
  
  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoCobranca();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-cobranca',
        url: '/modulos/finan/tipo-cobranca'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }
  
  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodTipoCobranca').disable();
    }

  }
  
  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoCobranca, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoCobranca: new FormControl(this.modelTipoCobranca.inCodTipoCobranca, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelTipoCobranca.chDescricao, [Validators.required, Validators.maxLength(50)])
      });
    }

  }
  
  private getTipoCobranca() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelTipoCobranca = new ModelTipoCobranca();
      this.modelTipoCobranca.inCodTipoCobranca = null;
      this.modelTipoCobranca.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiTipoCobrancaService.pesquisarPorId(id).then(
        dados_API => {
          this.modelTipoCobranca = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoCobranca);
    //console.log('this.modelTipoCobranca = ', this.modelTipoCobranca);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }
  
  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoCobranca();
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
    this.apiTipoCobrancaService.excluir(this.modelTipoCobranca.inCodTipoCobranca).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }
  
  alterar() {
    this.apiTipoCobrancaService.alterar(this.modelTipoCobranca).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoCobranca = sucesso;
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
    this.apiTipoCobrancaService.criar(this.modelTipoCobranca).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoCobranca = sucesso;
        this.meuForm.controls['inCodTipoCobranca'].disable();
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