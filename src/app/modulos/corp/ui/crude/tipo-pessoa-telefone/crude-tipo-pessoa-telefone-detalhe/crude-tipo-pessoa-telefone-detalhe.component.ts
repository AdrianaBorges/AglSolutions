import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoDocumentoPessoaTelefoneService } from './../../../../api/api-tipo-pessoa-telefone.service';
import { ModelTipoPessoaTelefone } from '../../../../models/model-tipo-pessoa-telefone';

@Component({
  selector: 'app-crude-tipo-pessoa-telefone-detalhe',
  templateUrl: './crude-tipo-pessoa-telefone-detalhe.component.html',
  styleUrls: ['./crude-tipo-pessoa-telefone-detalhe.component.scss']
})
export class CrudeTipoPessoaTelefoneDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public pessoaTipoTelefone: ModelTipoPessoaTelefone;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoDocumentoPessoaTelefoneService: ApiTipoDocumentoPessoaTelefoneService,
    private _location: Location,
  ) {
    this.pessoaTipoTelefone = new ModelTipoPessoaTelefone();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoPessoaTelefone();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-pessoa-telefone',
        url: '/modulos/corp/tipo-pessoa-telefone'
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
      this.meuForm.get('inCodTipoPessoaTelefone').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.pessoaTipoTelefone, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodTipoPessoaTelefone: [this.pessoaTipoTelefone.inCodTipoPessoaTelefone,Validators.required],
        chDescricao: [this.pessoaTipoTelefone.chDescricao,Validators.required]
      });
    }

  }

  private getTipoPessoaTelefone(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.pessoaTipoTelefone = new ModelTipoPessoaTelefone();
      this.pessoaTipoTelefone.inCodTipoPessoaTelefone = null;
      this.pessoaTipoTelefone.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiTipoDocumentoPessoaTelefoneService.obter(id).then(
        dados_API =>{
          this.pessoaTipoTelefone = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.pessoaTipoTelefone);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoPessoaTelefone();
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
    this.apiTipoDocumentoPessoaTelefoneService.excluir(this.pessoaTipoTelefone.inCodTipoPessoaTelefone).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiTipoDocumentoPessoaTelefoneService.alterar(this.pessoaTipoTelefone).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoaTipoTelefone = sucesso;
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
    this.apiTipoDocumentoPessoaTelefoneService.criar(this.pessoaTipoTelefone).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoaTipoTelefone = sucesso;
        this.meuForm.controls['inCodTipoPessoaTelefone'].disable();
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
