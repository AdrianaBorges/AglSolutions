import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelGrauInstrucao } from '../../../../models/model-grau-instrucao';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiGrauInstrucaoService } from '../../../../api/api-grau-instrucao.service';

@Component({
  selector: 'app-crude-grau-inst-detalhe',
  templateUrl: './crude-grau-inst-detalhe.component.html',
  styleUrls: ['./crude-grau-inst-detalhe.component.scss']
})
export class CrudeGrauInstDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelGrauInstrucao: ModelGrauInstrucao;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiGrauInstrucaoService: ApiGrauInstrucaoService,
    private _location: Location,
  ) {
    this.modelGrauInstrucao = new ModelGrauInstrucao();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getGrauInst();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'grau-inst',
        url: '/modulos/corp/grau-inst'
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
      this.meuForm.get('inCodGrauInst').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelGrauInstrucao, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodGrauInst: [this.modelGrauInstrucao.inCodGrauInst,Validators.required],
        chDescricao: [this.modelGrauInstrucao.chDescricao,Validators.required]
      });
    }

  }

  private getGrauInst(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');
    
    if (id==0){
      this.modelGrauInstrucao = new ModelGrauInstrucao();
      this.modelGrauInstrucao.inCodGrauInst = null;
      this.modelGrauInstrucao.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiGrauInstrucaoService.obter(id).then(
        dados_API =>{
          this.modelGrauInstrucao = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelGrauInstrucao);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getGrauInst();
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
    this.apiGrauInstrucaoService.excluir(this.modelGrauInstrucao.inCodGrauInst).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiGrauInstrucaoService.alterar(this.modelGrauInstrucao).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrauInstrucao = sucesso;
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
    this.apiGrauInstrucaoService.criar(this.modelGrauInstrucao).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrauInstrucao = sucesso;
        this.meuForm.controls['inCodGrauInst'].disable();
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
