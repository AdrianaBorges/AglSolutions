import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSituacaoCte } from '../../../../models/model-situacao-cte';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSituacaoCteService } from '../../../../api/api-situacao-cte.service';

@Component({
  selector: 'app-crude-situacao-cte-detalhe',
  templateUrl: './crude-situacao-cte-detalhe.component.html',
  styleUrls: ['./crude-situacao-cte-detalhe.component.scss']
})
export class CrudeSituacaoCteDetalheComponent implements OnInit {

  
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSituacaoCte: ModelSituacaoCte;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSituacaoCteService: ApiSituacaoCteService,
    private _location: Location,
  ) {
    this.modelSituacaoCte = new ModelSituacaoCte();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getSituacaoCte();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'SituacaoCte',
        url: '/modulos/idfe/situacao-cte'
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
      this.meuForm.get('inCodSituacaoCTe').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSituacaoCte, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodSituacaoCTe: [this.modelSituacaoCte.inCodSituacaoCTe,Validators.required],
        chDescricao: [this.modelSituacaoCte.chDescricao,Validators.required]
      });
    }

  }

  private getSituacaoCte(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelSituacaoCte = new ModelSituacaoCte();
      this.modelSituacaoCte.inCodSituacaoCTe = null;
      this.modelSituacaoCte.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiSituacaoCteService.obter(id).then(
        dados_API =>{
          this.modelSituacaoCte = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSituacaoCte);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getSituacaoCte();
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
    this.apiSituacaoCteService.excluir(this.modelSituacaoCte.inCodSituacaoCTe).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiSituacaoCteService.alterar(this.modelSituacaoCte).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoCte = sucesso;
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
    this.apiSituacaoCteService.criar(this.modelSituacaoCte).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoCte = sucesso;
        this.meuForm.controls['inCodSituacaoCTe'].disable();
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
