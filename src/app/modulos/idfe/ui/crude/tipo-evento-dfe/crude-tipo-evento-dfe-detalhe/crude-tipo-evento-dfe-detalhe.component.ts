import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelTipoEventoDfe } from '../../../../models/model-tipo-evento-dfe';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoEventoDfeService } from '../../../../api/api-tipo-evento-dfe.service';

@Component({
  selector: 'app-crude-tipo-evento-dfe-detalhe',
  templateUrl: './crude-tipo-evento-dfe-detalhe.component.html',
  styleUrls: ['./crude-tipo-evento-dfe-detalhe.component.scss']
})
export class CrudeTipoEventoDfeDetalheComponent implements OnInit {

  
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoEventoDfe: ModelTipoEventoDfe;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoEventoDfeService: ApiTipoEventoDfeService,
    private _location: Location,
  ) {
    this.modelTipoEventoDfe = new ModelTipoEventoDfe();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoEventoDfe();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'TipoEventoDfe',
        url: '/modulos/idfe/tipo-evento-dfe'
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
      this.meuForm.get('inCodTipoEventoDFe').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoEventoDfe, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodTipoEventoDFe: [this.modelTipoEventoDfe.inCodTipoEventoDFe,Validators.required],
        chDescricao: [this.modelTipoEventoDfe.chDescricao,Validators.required]
      });
    }

  }

  private getTipoEventoDfe(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelTipoEventoDfe = new ModelTipoEventoDfe();
      this.modelTipoEventoDfe.inCodTipoEventoDFe = null;
      this.modelTipoEventoDfe.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiTipoEventoDfeService.obter(id).then(
        dados_API =>{
          this.modelTipoEventoDfe = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoEventoDfe);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoEventoDfe();
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
    this.apiTipoEventoDfeService.excluir(this.modelTipoEventoDfe.inCodTipoEventoDFe).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiTipoEventoDfeService.alterar(this.modelTipoEventoDfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoEventoDfe = sucesso;
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
    this.apiTipoEventoDfeService.criar(this.modelTipoEventoDfe).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoEventoDfe = sucesso;
        this.meuForm.controls['inCodTipoEventoDFe'].disable();
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
