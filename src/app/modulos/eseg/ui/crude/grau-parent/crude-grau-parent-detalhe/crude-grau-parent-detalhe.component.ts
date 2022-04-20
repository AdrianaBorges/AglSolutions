import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelGrauParent } from '../../../../models/model-grau-parent';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiGrauParentService } from '../../../../api/api-grau-parent.service';

@Component({
  selector: 'app-crude-grau-parent-detalhe',
  templateUrl: './crude-grau-parent-detalhe.component.html',
  styleUrls: ['./crude-grau-parent-detalhe.component.scss']
})
export class CrudeGrauParentDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelGrauParent: ModelGrauParent;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiGrauParentService: ApiGrauParentService,
    private _location: Location,
  ) { 
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelGrauParent = new ModelGrauParent();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    
    this.criarForm(true);
    this.configurarStatusForm();
    this.getGrauParent();
  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'grau-parent',
        url: '/modulos/eseg/grau-parent'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }
    
  private configurarStatusForm() {

    var id :number;
    id = +this.route.snapshot.paramMap.get('id');
    //console.log(id);
    if (id >0) {
      this.meuForm.get('inCodGrauParent').disable();
    }

  }
    
  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelGrauParent, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodGrauParent: new FormControl(this.modelGrauParent.inCodGrauParent, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelGrauParent.chDescricao, [Validators.required, Validators.maxLength(50)])          });
    }

  }
    
  private getGrauParent() {

    var id = +this.route.snapshot.paramMap.get('id');
    
    if (id <=0) {
      this.modelGrauParent = new ModelGrauParent();
      this.modelGrauParent.inCodGrauParent = null;
      this.modelGrauParent.chDescricao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiGrauParentService.obter(id).then(
        dados_API => {
          this.modelGrauParent = dados_API;
          this.operacao = 'edicao';
          this.criarForm(false);
        },
        erro => {
          this.apiErrorCollection = erro;
        }
      );
    }

  }
    
  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelGrauParent);
  }
    
  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getGrauParent();
    this.cadastroBarraAcao.esconderAguarde();
  }
    
  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.operacao == 'edicao') {
      this.alterar();
    } else {
      this.incluir();
    }
  }
    
  btnExcluir() {
    this.apiGrauParentService.excluir(this.modelGrauParent.inCodGrauParent).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }
    
  alterar() {
    this.apiGrauParentService.alterar(this.modelGrauParent).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrauParent = sucesso;
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
    
  incluir() {
    this.apiGrauParentService.criar(this.modelGrauParent).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrauParent = sucesso;
        this.meuForm.controls['inCodGrauParent'].disable();
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