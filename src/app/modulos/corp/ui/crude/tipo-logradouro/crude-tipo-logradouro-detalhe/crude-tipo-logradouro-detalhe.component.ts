import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelTipoLogradouro } from './../../../../models/model-tipo-logradouro';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoLogradouroService } from './../../../../api/api-tipo-logradouro.service';

@Component({
  selector: 'app-crude-tipo-logradouro-detalhe',
  templateUrl: './crude-tipo-logradouro-detalhe.component.html',
  styleUrls: ['./crude-tipo-logradouro-detalhe.component.scss']
})
export class CrudeTipoLogradouroDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoLogradouro: ModelTipoLogradouro;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoLogradouroService: ApiTipoLogradouroService,
    private _location: Location,
  ) {
    this.modelTipoLogradouro = new ModelTipoLogradouro();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoLogradouro();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-logradouro',
        url: '/modulos/corp/tipo-logradouro'
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
      this.meuForm.get('inCodTipoLogradouro').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoLogradouro, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodTipoLogradouro: [this.modelTipoLogradouro.inCodTipoLogradouro,Validators.required],
        chDescricao: [this.modelTipoLogradouro.chDescricao,Validators.required],
        chDesAbreviado: [this.modelTipoLogradouro.chDesAbreviado,Validators.required]
      });
    }

  }

  private getTipoLogradouro(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelTipoLogradouro = new ModelTipoLogradouro();
      this.modelTipoLogradouro.inCodTipoLogradouro = null;
      this.modelTipoLogradouro.chDesAbreviado = "";
      this.modelTipoLogradouro.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiTipoLogradouroService.obter(id).then(
        dados_API =>{
          this.modelTipoLogradouro = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoLogradouro);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoLogradouro();
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
    this.apiTipoLogradouroService.excluir(this.modelTipoLogradouro.inCodTipoLogradouro).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiTipoLogradouroService.alterar(this.modelTipoLogradouro).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoLogradouro = sucesso;
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
    this.apiTipoLogradouroService.criar(this.modelTipoLogradouro).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoLogradouro = sucesso;
        this.meuForm.controls['inCodTipoLogradouro'].disable();
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
