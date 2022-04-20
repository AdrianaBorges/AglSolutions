import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelTipoTomadorCte } from '../../../../models/model-tipo-tomador-cte';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoTomadorCteService } from '../../../../api/api-tipo-tomador-cte.service';

@Component({
  selector: 'app-crude-tipo-tomador-cte-detalhe',
  templateUrl: './crude-tipo-tomador-cte-detalhe.component.html',
  styleUrls: ['./crude-tipo-tomador-cte-detalhe.component.scss']
})
export class CrudeTipoTomadorCteDetalheComponent implements OnInit {

  
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoTomadorCte: ModelTipoTomadorCte;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoTomadorCteService: ApiTipoTomadorCteService,
    private _location: Location,
  ) {
    this.modelTipoTomadorCte = new ModelTipoTomadorCte();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoTomadorCte();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'TipoTomadorCte',
        url: '/modulos/idfe/tipo-tomador-cte'
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
      this.meuForm.get('inCodTipoTomadorCTe').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoTomadorCte, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodTipoTomadorCTe: [this.modelTipoTomadorCte.inCodTipoTomadorCTe,Validators.required],
        chDescricao: [this.modelTipoTomadorCte.chDescricao,Validators.required]
      });
    }

  }

  private getTipoTomadorCte(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelTipoTomadorCte = new ModelTipoTomadorCte();
      this.modelTipoTomadorCte.inCodTipoTomadorCTe = null;
      this.modelTipoTomadorCte.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiTipoTomadorCteService.obter(id).then(
        dados_API =>{
          this.modelTipoTomadorCte = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoTomadorCte);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoTomadorCte();
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
    this.apiTipoTomadorCteService.excluir(this.modelTipoTomadorCte.inCodTipoTomadorCTe).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiTipoTomadorCteService.alterar(this.modelTipoTomadorCte).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoTomadorCte = sucesso;
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
    this.apiTipoTomadorCteService.criar(this.modelTipoTomadorCte).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoTomadorCte = sucesso;
        this.meuForm.controls['inCodTipoTomadorCTe'].disable();
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
