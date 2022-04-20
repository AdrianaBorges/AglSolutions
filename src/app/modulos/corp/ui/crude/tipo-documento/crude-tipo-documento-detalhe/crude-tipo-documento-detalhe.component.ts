import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoDocumentoService } from '../../../../api/api-tipo-documento.service';
import { ModelTipoDocumento } from '../../../../models/model-tipo-documento';

@Component({
  selector: 'app-crude-tipo-documento-detalhe',
  templateUrl: './crude-tipo-documento-detalhe.component.html',
  styleUrls: ['./crude-tipo-documento-detalhe.component.scss']
})
export class CrudeTipoDocumentoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelPessoaTipoDocumento: ModelTipoDocumento;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoDocumentoService: ApiTipoDocumentoService,
    private _location: Location,
  ) {
    this.modelPessoaTipoDocumento = new ModelTipoDocumento();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoDocumento();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-documento',
        url: '/modulos/corp/tipo-documento'
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
      this.meuForm.get('inCodTipoDocumento').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPessoaTipoDocumento, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodTipoDocumento: [this.modelPessoaTipoDocumento.inCodTipoDocumento,Validators.required],
        chDesTipoDocumento: [this.modelPessoaTipoDocumento.chDesTipoDocumento,Validators.required]
      });
    }

  }

  private getTipoDocumento(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelPessoaTipoDocumento = new ModelTipoDocumento();
      this.modelPessoaTipoDocumento.inCodTipoDocumento = null;
      this.modelPessoaTipoDocumento.chDesTipoDocumento = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiTipoDocumentoService.obter(id).then(
        dados_API =>{
          this.modelPessoaTipoDocumento = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPessoaTipoDocumento);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoDocumento();
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
    this.apiTipoDocumentoService.excluir(this.modelPessoaTipoDocumento.inCodTipoDocumento).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiTipoDocumentoService.alterar(this.modelPessoaTipoDocumento).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaTipoDocumento = sucesso;
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
    this.apiTipoDocumentoService.criar(this.modelPessoaTipoDocumento).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaTipoDocumento = sucesso;
        this.meuForm.controls['inCodTipoDocumento'].disable();
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
