import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelModeloDfe } from '../../../../models/model-modelo-dfe';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiModeloDfeService } from '../../../../api/api-modelo-dfe.service';

@Component({
  selector: 'app-crude-modelo-dfe-detalhe',
  templateUrl: './crude-modelo-dfe-detalhe.component.html',
  styleUrls: ['./crude-modelo-dfe-detalhe.component.scss']
})
export class CrudeModeloDfeDetalheComponent implements OnInit {

 
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelModeloDfe: ModelModeloDfe;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiModeloDfeService: ApiModeloDfeService,
    private _location: Location,
  ) {
    this.modelModeloDfe = new ModelModeloDfe();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getModeloDfe();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'ModeloDfe',
        url: '/modulos/idfe/modelo-dfe'
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
      this.meuForm.get('inCodModeloDFe').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelModeloDfe, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodModeloDFe: [this.modelModeloDfe.inCodModeloDFe,Validators.required],
        chDescricao: [this.modelModeloDfe.chDescricao,Validators.required]
      });
    }

  }

  private getModeloDfe(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelModeloDfe = new ModelModeloDfe();
      this.modelModeloDfe.inCodModeloDFe = null;
      this.modelModeloDfe.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiModeloDfeService.obter(id).then(
        dados_API =>{
          this.modelModeloDfe = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelModeloDfe);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getModeloDfe();
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
    this.apiModeloDfeService.excluir(this.modelModeloDfe.inCodModeloDFe).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiModeloDfeService.alterar(this.modelModeloDfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelModeloDfe = sucesso;
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
    this.apiModeloDfeService.criar(this.modelModeloDfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelModeloDfe = sucesso;
        this.meuForm.controls['inCodModeloDFe'].disable();
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
