import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSituacaoNfe } from '../../../../models/model-situacao-nfe';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSituacaoNfeService } from '../../../../api/api-situacao-nfe.service';

@Component({
  selector: 'app-crude-situacao-nfe-detalhe',
  templateUrl: './crude-situacao-nfe-detalhe.component.html',
  styleUrls: ['./crude-situacao-nfe-detalhe.component.scss']
})
export class CrudeSituacaoNfeDetalheComponent implements OnInit {

  
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSituacaoNfe: ModelSituacaoNfe;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSituacaoNfeService: ApiSituacaoNfeService,
    private _location: Location,
  ) {
    this.modelSituacaoNfe = new ModelSituacaoNfe();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getSituacaoNfe();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'SituacaoNfe',
        url: '/modulos/idfe/situacao-nfe'
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
      this.meuForm.get('inCodSituacaoNFe').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSituacaoNfe, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodSituacaoNFe: [this.modelSituacaoNfe.inCodSituacaoNFe,Validators.required],
        chDescricao: [this.modelSituacaoNfe.chDescricao,Validators.required]
      });
    }

  }

  private getSituacaoNfe(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelSituacaoNfe = new ModelSituacaoNfe();
      this.modelSituacaoNfe.inCodSituacaoNFe = null;
      this.modelSituacaoNfe.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiSituacaoNfeService.obter(id).then(
        dados_API =>{
          this.modelSituacaoNfe = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSituacaoNfe);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getSituacaoNfe();
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
    this.apiSituacaoNfeService.excluir(this.modelSituacaoNfe.inCodSituacaoNFe).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiSituacaoNfeService.alterar(this.modelSituacaoNfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoNfe = sucesso;
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
    this.apiSituacaoNfeService.criar(this.modelSituacaoNfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoNfe = sucesso;
        this.meuForm.controls['inCodSituacaoNFe'].disable();
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
