import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelSituacaoVenda } from '../../../../models/model-situacao-venda';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSituacaoVendaService } from '../../../../api/api-situacao-venda.service';

@Component({
  selector: 'app-crude-situacao-venda-detalhe',
  templateUrl: './crude-situacao-venda-detalhe.component.html',
  styleUrls: ['./crude-situacao-venda-detalhe.component.scss']
})
export class CrudeSituacaoVendaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelSituacaoVenda: ModelSituacaoVenda;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSituacaoVendaService: ApiSituacaoVendaService,
    private _location: Location,
  ) { 
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelSituacaoVenda = new ModelSituacaoVenda();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSituacaoVenda();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'situacao-venda',
        url: '/modulos/eseg/situacao-venda'
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
    
    if (id >0) {
      this.meuForm.get('inCodSituacaoVenda').disable();
    }

  }
    
  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSituacaoVenda, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodSituacaoVenda: new FormControl(this.modelSituacaoVenda.inCodSituacaoVenda, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelSituacaoVenda.chDescricao, [Validators.required, Validators.maxLength(50)])          });
    }

  }
    
  private getSituacaoVenda() {

    var id = +this.route.snapshot.paramMap.get('id');
    
    if (id <=0) {
      this.modelSituacaoVenda = new ModelSituacaoVenda();
      this.modelSituacaoVenda.inCodSituacaoVenda = null;
      this.modelSituacaoVenda.chDescricao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiSituacaoVendaService.obter(id).then(
        dados_API => {
          this.modelSituacaoVenda = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSituacaoVenda);
    //console.log('this.modelParamCorp = ', this.modelSituacaoVenda);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }
    
  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSituacaoVenda();
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
    this.apiSituacaoVendaService.excluir(this.modelSituacaoVenda.inCodSituacaoVenda).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }
    
  alterar() {
    this.apiSituacaoVendaService.alterar(this.modelSituacaoVenda).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoVenda = sucesso;
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
    this.apiSituacaoVendaService.criar(this.modelSituacaoVenda).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoVenda = sucesso;
        this.meuForm.controls['inCodSituacaoVenda'].disable();
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