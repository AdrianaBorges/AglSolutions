import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoSeguro } from '../../../../models/model-tipo-seguro';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoSeguroService } from '../../../../api/api-tipo-seguro.service';

@Component({
  selector: 'app-crude-tipo-seguro-detalhe',
  templateUrl: './crude-tipo-seguro-detalhe.component.html',
  styleUrls: ['./crude-tipo-seguro-detalhe.component.scss']
})
export class CrudeTipoSeguroDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelTipoSeguro: ModelTipoSeguro;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoSeguroService: ApiTipoSeguroService,
    private _location: Location,
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelTipoSeguro = new ModelTipoSeguro();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoSeguro();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-seguro',
        url: '/modulos/eseg/tipo-seguro'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }
  
  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');
    if (id >0 ) {
      this.meuForm.get('inCodTipoSeguro').disable();
    }

  }
  
  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoSeguro, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoSeguro: new FormControl(this.modelTipoSeguro.inCodTipoSeguro, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelTipoSeguro.chDescricao, [Validators.required, Validators.maxLength(50)])
      });
    }

  }
  
  private getTipoSeguro() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id <=0) {
      this.modelTipoSeguro = new ModelTipoSeguro();
      this.modelTipoSeguro.inCodTipoSeguro = null;
      this.modelTipoSeguro.chDescricao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiTipoSeguroService.obter(id).then(
        dados_API => {
          this.modelTipoSeguro = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoSeguro);
    //console.log('this.modelTipoSeguro = ', this.modelTipoSeguro);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }
  
  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoSeguro();
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
    this.apiTipoSeguroService.excluir(this.modelTipoSeguro.inCodTipoSeguro).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }
  
  alterar() {
    this.apiTipoSeguroService.alterar(this.modelTipoSeguro).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoSeguro = sucesso;
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
    this.apiTipoSeguroService.criar(this.modelTipoSeguro).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoSeguro = sucesso;
        this.meuForm.controls['inCodTipoSeguro'].disable();
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
