import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelRacaCor } from '../../../../models/model-raca-cor';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiRacaCorService } from '../../../../api/api-raca-cor.service';

@Component({
  selector: 'app-crude-raca-cor-detalhe',
  templateUrl: './crude-raca-cor-detalhe.component.html',
  styleUrls: ['./crude-raca-cor-detalhe.component.scss']
})
export class CrudeRacaCorDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelRacaCor: ModelRacaCor;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiRacaCorService: ApiRacaCorService,
    private _location: Location,
  ) {
    this.modelRacaCor = new ModelRacaCor();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getSexo();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'raca-cod',
        url: '/modulos/corp/raca-cor'
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
      this.meuForm.get('inCodRacaCor').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelRacaCor, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodRacaCor: [this.modelRacaCor.inCodRacaCor,Validators.required],
        chDescricao: [this.modelRacaCor.chDescricao,Validators.required]
      });
    }

  }

  private getSexo(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelRacaCor = new ModelRacaCor();
      this.modelRacaCor.inCodRacaCor = null;
      this.modelRacaCor.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiRacaCorService.obter(id).then(
        dados_API =>{
          this.modelRacaCor = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelRacaCor);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getSexo();
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
    this.apiRacaCorService.excluir(this.modelRacaCor.inCodRacaCor).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiRacaCorService.alterar(this.modelRacaCor).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelRacaCor = sucesso;
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
    this.apiRacaCorService.criar(this.modelRacaCor).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelRacaCor = sucesso;
        this.meuForm.controls['inCodRacaCor'].disable();
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
