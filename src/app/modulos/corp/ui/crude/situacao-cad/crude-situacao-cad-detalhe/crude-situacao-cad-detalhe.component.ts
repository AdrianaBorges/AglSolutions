import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSituacaoCad } from '../../../../models/model-situacao-cad';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSituacaoCadService } from './../../../../api/api-situacao-cad.service';

@Component({
  selector: 'app-crude-situacao-cad-detalhe',
  templateUrl: './crude-situacao-cad-detalhe.component.html',
  styleUrls: ['./crude-situacao-cad-detalhe.component.scss']
})
export class CrudeSituacaoCadDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSituacaoCad: ModelSituacaoCad;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSituacaoCadService: ApiSituacaoCadService,
    private _location: Location,
  ) {
    this.modelSituacaoCad = new ModelSituacaoCad();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getSituacaoCad();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'situacao-cad',
        url: '/modulos/corp/situacao-cad'
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
      this.meuForm.get('inCodSituacaoCad').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSituacaoCad, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodSituacaoCad: [this.modelSituacaoCad.inCodSituacaoCad,Validators.required],
        chDescricao: [this.modelSituacaoCad.chDescricao,Validators.required]
      });
    }

  }

  private getSituacaoCad(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelSituacaoCad = new ModelSituacaoCad();
      this.modelSituacaoCad.inCodSituacaoCad = null;
      this.modelSituacaoCad.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiSituacaoCadService.obter(id).then(
        dados_API =>{
          this.modelSituacaoCad = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSituacaoCad);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getSituacaoCad();
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
    this.apiSituacaoCadService.excluir(this.modelSituacaoCad.inCodSituacaoCad).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiSituacaoCadService.alterar(this.modelSituacaoCad).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoCad = sucesso;
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
    this.apiSituacaoCadService.criar(this.modelSituacaoCad).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoCad = sucesso;
        this.meuForm.controls['inCodSituacaoCad'].disable();
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
