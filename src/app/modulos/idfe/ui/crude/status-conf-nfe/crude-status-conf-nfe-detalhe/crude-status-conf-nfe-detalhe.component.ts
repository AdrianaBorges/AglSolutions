import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelStatusConfNfe } from '../../../../models/model-status-conf-nfe';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiStatusConfNfeService } from '../../../../api/api-status-conf-nfe.service';

@Component({
  selector: 'app-crude-status-conf-nfe-detalhe',
  templateUrl: './crude-status-conf-nfe-detalhe.component.html',
  styleUrls: ['./crude-status-conf-nfe-detalhe.component.scss']
})
export class CrudeStatusConfNfeDetalheComponent implements OnInit {

 
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelStatusConfNfe: ModelStatusConfNfe;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiStatusConfNfeService: ApiStatusConfNfeService,
    private _location: Location,
  ) {
    this.modelStatusConfNfe = new ModelStatusConfNfe();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getStatusConfNfe();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'StatusConfNfe',
        url: '/modulos/idfe/status-conf-nfe'
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
      this.meuForm.get('inCodStatusConfNFe').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelStatusConfNfe, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodStatusConfNFe: [this.modelStatusConfNfe.inCodStatusConfNFe,Validators.required],
        chDescricao: [this.modelStatusConfNfe.chDescricao,Validators.required]
      });
    }

  }

  private getStatusConfNfe(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelStatusConfNfe = new ModelStatusConfNfe();
      this.modelStatusConfNfe.inCodStatusConfNFe = null;
      this.modelStatusConfNfe.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiStatusConfNfeService.obter(id).then(
        dados_API =>{
          this.modelStatusConfNfe = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelStatusConfNfe);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getStatusConfNfe();
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
    this.apiStatusConfNfeService.excluir(this.modelStatusConfNfe.inCodStatusConfNFe).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiStatusConfNfeService.alterar(this.modelStatusConfNfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelStatusConfNfe = sucesso;
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
    this.apiStatusConfNfeService.criar(this.modelStatusConfNfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelStatusConfNfe = sucesso;
        this.meuForm.controls['inCodStatusConfNFe'].disable();
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
