import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelEstadoCivil } from '../../../../models/model-estado-civil';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiEstadoCivilService } from '../../../../api/api-estado-civil.service';


@Component({
  selector: 'app-crude-estado-civil-detalhe',
  templateUrl: './crude-estado-civil-detalhe.component.html',
  styleUrls: ['./crude-estado-civil-detalhe.component.scss']
})
export class CrudeEstadoCivilDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelEstadoCivil: ModelEstadoCivil;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiEstadoCivilService: ApiEstadoCivilService,
    private _location: Location
  ) {
    this.modelEstadoCivil = new ModelEstadoCivil();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){
    this.criarForm(true);
    this.configurarStatusForm();
    this.getEstadoCivil();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'estado-civil',
        url: '/modulos/corp/estado-civil'
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
      this.meuForm.get('inCodEstadoCivil').disable();
    }
  }

  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelEstadoCivil, emEdicao);
    }else{
      this.meuForm = this.formB.group({
        inCodEstadoCivil: [this.modelEstadoCivil.inCodEstadoCivil, Validators.required],
        chDescricao: [this.modelEstadoCivil.chDescricao, Validators.required]
      });

    }
  }

  private getEstadoCivil(){

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      this.modelEstadoCivil = new ModelEstadoCivil();
      this.modelEstadoCivil.inCodEstadoCivil = null;
      this.modelEstadoCivil.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    }else{

      this.apiEstadoCivilService.obter(id).then(
        dados_API =>{

          this.modelEstadoCivil = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelEstadoCivil);
  }

  btnCancelar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.getEstadoCivil();
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
    this.apiEstadoCivilService.excluir(this.modelEstadoCivil.inCodEstadoCivil).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiEstadoCivilService.alterar(this.modelEstadoCivil).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelEstadoCivil = sucesso;
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
    this.apiEstadoCivilService.criar(this.modelEstadoCivil).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelEstadoCivil = sucesso;
        this.meuForm.controls['inCodEstadoCivil'].disable();
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
