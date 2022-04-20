import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoCobrancaSeg } from '../../../../models/model-tipo-cobranca-seg';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoCobrancaSegService } from '../../../../api/api-tipo-cobranca-seg.service';

@Component({
  selector: 'app-crude-tipo-cobranca-seg-detalhe',
  templateUrl: './crude-tipo-cobranca-seg-detalhe.component.html',
  styleUrls: ['./crude-tipo-cobranca-seg-detalhe.component.scss']
})
export class CrudeTipoCobrancaSegDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelTipoCobrancaSeg: ModelTipoCobrancaSeg;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoCobrancaSegService: ApiTipoCobrancaSegService,
    private _location: Location,
  ) { 
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelTipoCobrancaSeg = new ModelTipoCobrancaSeg();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoCobrancaSeg();

  }
  
  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-cobranca-seg',
        url: '/modulos/eseg/tipo-cobranca-seg'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm() {

    var id :number;
    id = +this.route.snapshot.paramMap.get('id');
    //console.log(id);
    if (id >0) {
      this.meuForm.get('inCodTipoCobrancaSeg').disable();
    }

  }
    
  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoCobrancaSeg, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoCobrancaSeg: new FormControl(this.modelTipoCobrancaSeg.inCodTipoCobrancaSeg, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelTipoCobrancaSeg.chDescricao, [Validators.required, Validators.maxLength(50)])          });
    }

  }
    
  private getTipoCobrancaSeg() {

    var id = +this.route.snapshot.paramMap.get('id');
    
    if (id <=0) {
      this.modelTipoCobrancaSeg = new ModelTipoCobrancaSeg();
      this.modelTipoCobrancaSeg.inCodTipoCobrancaSeg = null;
      this.modelTipoCobrancaSeg.chDescricao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiTipoCobrancaSegService.obter(id).then(
        dados_API => {
          this.modelTipoCobrancaSeg = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoCobrancaSeg);
    //console.log('this.modelParamCorp = ', this.modelTipoCobrancaSeg);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }
    
  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoCobrancaSeg();
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
    this.apiTipoCobrancaSegService.excluir(this.modelTipoCobrancaSeg.inCodTipoCobrancaSeg).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }
    
  alterar() {
    this.apiTipoCobrancaSegService.alterar(this.modelTipoCobrancaSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoCobrancaSeg = sucesso;
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
    this.apiTipoCobrancaSegService.criar(this.modelTipoCobrancaSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoCobrancaSeg = sucesso;
        this.meuForm.controls['inCodTipoCobrancaSeg'].disable();
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
