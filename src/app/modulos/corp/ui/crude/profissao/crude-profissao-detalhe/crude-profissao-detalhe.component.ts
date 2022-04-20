import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiProfissaoService } from './../../../../api/api-profissao.service';
import { ModelProfissao } from '../../../../models/model-profissao';

@Component({
  selector: 'app-crude-profissao-detalhe',
  templateUrl: './crude-profissao-detalhe.component.html',
  styleUrls: ['./crude-profissao-detalhe.component.scss']
})
export class CrudeProfissaoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public pessoaProfissao: ModelProfissao;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiProfissaoService: ApiProfissaoService,
    private _location: Location,
  ) {
    this.pessoaProfissao = new ModelProfissao();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoPessoaTelefone();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'profissao',
        url: '/modulos/corp/profissao'
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
      this.meuForm.get('inCodProfissao').disable();
    }

  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.pessoaProfissao, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodProfissao: [this.pessoaProfissao.inCodProfissao,Validators.required],
        chDescricao: [this.pessoaProfissao.chDescricao,Validators.required]
      });
    }

  }

  private getTipoPessoaTelefone(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.pessoaProfissao = new ModelProfissao();
      this.pessoaProfissao.inCodProfissao = null;
      this.pessoaProfissao.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{

      this.apiProfissaoService.obter(id).then(
        dados_API =>{
          this.pessoaProfissao = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.pessoaProfissao);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoPessoaTelefone();
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
    this.apiProfissaoService.excluir(this.pessoaProfissao.inCodProfissao).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiProfissaoService.alterar(this.pessoaProfissao).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoaProfissao = sucesso;
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
    this.apiProfissaoService.criar(this.pessoaProfissao).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoaProfissao = sucesso;
        this.meuForm.controls['inCodProfissao'].disable();
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
