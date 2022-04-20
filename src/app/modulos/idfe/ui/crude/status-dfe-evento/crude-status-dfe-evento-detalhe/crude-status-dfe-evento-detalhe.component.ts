import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelStatusDfeEvento } from '../../../../models/model-status-dfe-evento';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiStatusDfeEventoService } from '../../../../api/api-status-dfe-evento.service';
@Component({
  selector: 'app-crude-status-dfe-evento-detalhe',
  templateUrl: './crude-status-dfe-evento-detalhe.component.html',
  styleUrls: ['./crude-status-dfe-evento-detalhe.component.scss']
})
export class CrudeStatusDfeEventoDetalheComponent implements OnInit {

  
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelStatusDfeEvento: ModelStatusDfeEvento;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiStatusDfeEventoService: ApiStatusDfeEventoService,
    private _location: Location,
  ) {
    this.modelStatusDfeEvento = new ModelStatusDfeEvento();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getStatusDfeEvento();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'StatusDfeEvento',
        url: '/modulos/idfe/status-dfe-evento'
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
      this.meuForm.get('inCodStatusDFeEvento').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelStatusDfeEvento, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodStatusDFeEvento: [this.modelStatusDfeEvento.inCodStatusDFeEvento,Validators.required],
        chDescricao: [this.modelStatusDfeEvento.chDescricao,Validators.required]
      });
    }

  }

  private getStatusDfeEvento(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelStatusDfeEvento = new ModelStatusDfeEvento();
      this.modelStatusDfeEvento.inCodStatusDFeEvento = null;
      this.modelStatusDfeEvento.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiStatusDfeEventoService.obter(id).then(
        dados_API =>{
          this.modelStatusDfeEvento = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelStatusDfeEvento);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getStatusDfeEvento();
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
    this.apiStatusDfeEventoService.excluir(this.modelStatusDfeEvento.inCodStatusDFeEvento).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiStatusDfeEventoService.alterar(this.modelStatusDfeEvento).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelStatusDfeEvento = sucesso;
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
    this.apiStatusDfeEventoService.criar(this.modelStatusDfeEvento).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelStatusDfeEvento = sucesso;
        this.meuForm.controls['inCodStatusDFeEvento'].disable();
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
