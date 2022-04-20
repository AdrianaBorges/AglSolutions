import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelTipoPessoa } from '../../../../models/model-tipo-pessoa';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoPessoaService } from '../../../../api/api-tipo-pessoa.service';

@Component({
  selector: 'app-crude-tipo-pessoa-detalhe',
  templateUrl: './crude-tipo-pessoa-detalhe.component.html',
  styleUrls: ['./crude-tipo-pessoa-detalhe.component.scss']
})
export class CrudeTipoPessoaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoPessoa: ModelTipoPessoa;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoPessoaService: ApiTipoPessoaService,
    private _location: Location,
  ) {
    this.modelTipoPessoa = new ModelTipoPessoa();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoPessoa();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-pessoa',
        url: '/modulos/corp/tipo-pessoa'
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
      this.meuForm.get('inCodTipoPessoa').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoPessoa, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodTipoPessoa: [this.modelTipoPessoa.inCodTipoPessoa, Validators.required],
        chDesTipoPessoa: [this.modelTipoPessoa.chDesTipoPessoa, Validators.required]
      });
    }

  }

  private getTipoPessoa(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelTipoPessoa = new ModelTipoPessoa();
      this.modelTipoPessoa.inCodTipoPessoa = null;
      this.modelTipoPessoa.chDesTipoPessoa = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiTipoPessoaService.obter(id).then(
        dados_API =>{
          this.modelTipoPessoa = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoPessoa);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoPessoa();
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
    this.apiTipoPessoaService.excluir(this.modelTipoPessoa.inCodTipoPessoa).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiTipoPessoaService.alterar(this.modelTipoPessoa).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoPessoa = sucesso;
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
    this.apiTipoPessoaService.criar(this.modelTipoPessoa).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoPessoa = sucesso;
        this.meuForm.controls['inCodTipoPessoa'].disable();
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
