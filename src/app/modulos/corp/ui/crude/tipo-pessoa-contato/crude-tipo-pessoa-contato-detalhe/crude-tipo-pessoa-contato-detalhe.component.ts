import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoPessoaContatoService } from './../../../../api/api-tipo-pessoa-contato.service';
import { ModelTipoPessoaContato } from '../../../../models/model-tipo-pessoa-contato';

@Component({
  selector: 'app-crude-tipo-pessoa-contato-detalhe',
  templateUrl: './crude-tipo-pessoa-contato-detalhe.component.html',
  styleUrls: ['./crude-tipo-pessoa-contato-detalhe.component.scss']
})
export class CrudeTipoPessoaContatoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public pessoaTipoContato: ModelTipoPessoaContato;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoPessoaContatoService: ApiTipoPessoaContatoService,
    private _location: Location,
  ) {
    this.pessoaTipoContato = new ModelTipoPessoaContato();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoPessoaContato();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-pessoa-contato',
        url: '/modulos/corp/tipo-pessoa-contato'
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
      this.meuForm.get('inCodTipoPessoaContato').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.pessoaTipoContato, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodTipoPessoaContato: [this.pessoaTipoContato.inCodTipoPessoaContato,Validators.required],
        chDescricao: [this.pessoaTipoContato.chDescricao,Validators.required]
      });
    }

  }

  private getTipoPessoaContato(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.pessoaTipoContato = new ModelTipoPessoaContato();
      this.pessoaTipoContato.inCodTipoPessoaContato = null;
      this.pessoaTipoContato.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiTipoPessoaContatoService.obter(id).then(
        dados_API =>{
          this.pessoaTipoContato = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.pessoaTipoContato);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoPessoaContato();
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
    this.apiTipoPessoaContatoService.excluir(this.pessoaTipoContato.inCodTipoPessoaContato).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiTipoPessoaContatoService.alterar(this.pessoaTipoContato).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoaTipoContato = sucesso;
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
    this.apiTipoPessoaContatoService.criar(this.pessoaTipoContato).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoaTipoContato = sucesso;
        this.meuForm.controls['inCodTipoPessoaContato'].disable();
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
