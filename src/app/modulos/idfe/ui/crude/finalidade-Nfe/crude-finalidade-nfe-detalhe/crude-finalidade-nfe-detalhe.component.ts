import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelFinalidadeNfe } from '../../../../models/model-finalidade-nfe';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiFinalidadeNfeService } from '../../../../api/api-finalidade-nfe.service';

@Component({
  selector: 'app-crude-finalidade-nfe-detalhe',
  templateUrl: './crude-finalidade-nfe-detalhe.component.html',
  styleUrls: ['./crude-finalidade-nfe-detalhe.component.scss']
})
export class CrudeFinalidadeNfeDetalheComponent implements OnInit {

 
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelFinalidadeNfe: ModelFinalidadeNfe;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiFinalidadeNfeService: ApiFinalidadeNfeService,
    private _location: Location,
  ) {
    this.modelFinalidadeNfe = new ModelFinalidadeNfe();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getFinalidadeNfe();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'FinalidadeNfe',
        url: '/modulos/idfe/finalidade-nfe'
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
      this.meuForm.get('inCodFinalidadeNFe').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelFinalidadeNfe, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodFinalidadeNFe: [this.modelFinalidadeNfe.inCodFinalidadeNFe,Validators.required],
        chDescricao: [this.modelFinalidadeNfe.chDescricao,Validators.required]
      });
    }

  }

  private getFinalidadeNfe(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelFinalidadeNfe = new ModelFinalidadeNfe();
      this.modelFinalidadeNfe.inCodFinalidadeNFe = null;
      this.modelFinalidadeNfe.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiFinalidadeNfeService.obter(id).then(
        dados_API =>{
          this.modelFinalidadeNfe = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelFinalidadeNfe);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getFinalidadeNfe();
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
    this.apiFinalidadeNfeService.excluir(this.modelFinalidadeNfe.inCodFinalidadeNFe).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiFinalidadeNfeService.alterar(this.modelFinalidadeNfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelFinalidadeNfe = sucesso;
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
    this.apiFinalidadeNfeService.criar(this.modelFinalidadeNfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelFinalidadeNfe = sucesso;
        this.meuForm.controls['inCodFinalidadeNFe'].disable();
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
