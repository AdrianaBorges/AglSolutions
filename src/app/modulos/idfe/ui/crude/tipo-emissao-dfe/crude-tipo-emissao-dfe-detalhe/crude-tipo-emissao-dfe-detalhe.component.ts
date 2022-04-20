import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelTipoEmissaoDfe } from '../../../../models/model-tipo-emissao-dfe';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoEmissaoDfeService } from '../../../../api/api-tipo-emissao-dfe.service';


@Component({
  selector: 'app-crude-tipo-emissao-dfe-detalhe',
  templateUrl: './crude-tipo-emissao-dfe-detalhe.component.html',
  styleUrls: ['./crude-tipo-emissao-dfe-detalhe.component.scss']
})
export class CrudeTipoEmissaoDfeDetalheComponent implements OnInit {

 
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoEmissaoDfe: ModelTipoEmissaoDfe;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoEmissaoDfeService: ApiTipoEmissaoDfeService,
    private _location: Location,
  ) {
    this.modelTipoEmissaoDfe = new ModelTipoEmissaoDfe();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoEmissaoDfe();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'TipoEmissaoDfe',
        url: '/modulos/idfe/tipo-emissao-dfe'
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
      this.meuForm.get('inCodTipoEmissaoDFe').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoEmissaoDfe, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodTipoEmissaoDFe: [this.modelTipoEmissaoDfe.inCodTipoEmissaoDFe,Validators.required],
        chDescricao: [this.modelTipoEmissaoDfe.chDescricao,Validators.required]
      });
    }

  }

  private getTipoEmissaoDfe(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelTipoEmissaoDfe = new ModelTipoEmissaoDfe();
      this.modelTipoEmissaoDfe.inCodTipoEmissaoDFe = null;
      this.modelTipoEmissaoDfe.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiTipoEmissaoDfeService.obter(id).then(
        dados_API =>{
          this.modelTipoEmissaoDfe = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoEmissaoDfe);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoEmissaoDfe();
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
    this.apiTipoEmissaoDfeService.excluir(this.modelTipoEmissaoDfe.inCodTipoEmissaoDFe).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiTipoEmissaoDfeService.alterar(this.modelTipoEmissaoDfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoEmissaoDfe = sucesso;
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
    this.apiTipoEmissaoDfeService.criar(this.modelTipoEmissaoDfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoEmissaoDfe = sucesso;
        this.meuForm.controls['inCodTipoEmissaoDFe'].disable();
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
