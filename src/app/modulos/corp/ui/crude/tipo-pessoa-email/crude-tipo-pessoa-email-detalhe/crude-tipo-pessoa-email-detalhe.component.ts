import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoDocumentoPessoaEmailService } from './../../../../api/api-tipo-pessoa-email.service';
import { ModelTipoPessoaEmail } from '../../../../models/model-tipo-pessoa-email';

@Component({
  selector: 'app-crude-tipo-pessoa-email-detalhe',
  templateUrl: './crude-tipo-pessoa-email-detalhe.component.html',
  styleUrls: ['./crude-tipo-pessoa-email-detalhe.component.scss']
})
export class CrudeTipoPessoaEmailDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelPessoaTipoEmail: ModelTipoPessoaEmail;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoDocumentoPessoaEmailService: ApiTipoDocumentoPessoaEmailService,
    private _location: Location,
  ) {
    this.modelPessoaTipoEmail = new ModelTipoPessoaEmail();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoEmail();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'In??cio',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-pessoa-email',
        url: '/modulos/corp/tipo-pessoa-email'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm(){

    var id = +this.route.snapshot.paramMap.get('id');

    if(id >0){
      this.meuForm.get('inCodTipoPessoaEmail').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPessoaTipoEmail, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodTipoPessoaEmail: [this.modelPessoaTipoEmail.inCodTipoPessoaEmail,Validators.required],
        chDescricao: [this.modelPessoaTipoEmail.chDescricao,Validators.required]
      });
    }

  }

  private getTipoEmail(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelPessoaTipoEmail = new ModelTipoPessoaEmail();
      this.modelPessoaTipoEmail.inCodTipoPessoaEmail = null;
      this.modelPessoaTipoEmail.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiTipoDocumentoPessoaEmailService.obter(id).then(
        dados_API =>{
          this.modelPessoaTipoEmail = dados_API;
          this.operacao = 'edicao';
          this.criarForm(false);
        },
        erro => {
          this.apiErrorCollection = erro;
        }
      );
    }

  }

  private coletarDadosForm(){
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPessoaTipoEmail);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoEmail();
    this.cadastroBarraAcao.esconderAguarde();
  }

  btnConfirmar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if(this.operacao == 'edicao'){
      this.alterar();
    }else{
      this.incluir();
    }
  }

  btnExcluir(){
    this.apiTipoDocumentoPessoaEmailService.excluir(this.modelPessoaTipoEmail.inCodTipoPessoaEmail).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiTipoDocumentoPessoaEmailService.alterar(this.modelPessoaTipoEmail).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaTipoEmail = sucesso;
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

  incluir(){
    this.apiTipoDocumentoPessoaEmailService.criar(this.modelPessoaTipoEmail).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaTipoEmail = sucesso;
        this.meuForm.controls['inCodTipoPessoaEmail'].disable();
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
