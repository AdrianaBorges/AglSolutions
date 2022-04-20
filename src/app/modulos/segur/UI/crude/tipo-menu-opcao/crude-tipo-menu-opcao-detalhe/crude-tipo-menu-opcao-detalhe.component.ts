import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoMenuOpcao } from '../../../../models/model-tipo-menu-opcao';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoMenuOpcaoService } from '../../../../api/api-tipo-menu-opcao.service';


@Component({
  selector: 'app-crude-tipo-menu-opcao-detalhe',
  templateUrl: './crude-tipo-menu-opcao-detalhe.component.html',
  styleUrls: ['./crude-tipo-menu-opcao-detalhe.component.scss']
})
export class CrudeTipoMenuOpcaoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelTipoMenuOpcao: ModelTipoMenuOpcao;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoMenuOpcaoService: ApiTipoMenuOpcaoService,
    private _location: Location,
  ) { 
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelTipoMenuOpcao = new ModelTipoMenuOpcao();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoMenuOpcao();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-menu-opcao',
        url: '/modulos/segur/tipo-menu-opcao'
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
      this.meuForm.get('inCodTipoMenuOpcao').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoMenuOpcao, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoMenuOpcao: new FormControl(this.modelTipoMenuOpcao.inCodTipoMenuOpcao, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelTipoMenuOpcao.chDescricao, [Validators.required, Validators.maxLength(50)])          });
    }

  }

  private getTipoMenuOpcao() {

    var id = +this.route.snapshot.paramMap.get('id');
    
    if (id <=0) {
      this.modelTipoMenuOpcao = new ModelTipoMenuOpcao();
      this.modelTipoMenuOpcao.inCodTipoMenuOpcao = null;
      this.modelTipoMenuOpcao.chDescricao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiTipoMenuOpcaoService.obter(id).then(
        dados_API => {
          this.modelTipoMenuOpcao = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoMenuOpcao);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoMenuOpcao();
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
    this.apiTipoMenuOpcaoService.excluir(this.modelTipoMenuOpcao.inCodTipoMenuOpcao).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoMenuOpcaoService.alterar(this.modelTipoMenuOpcao).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoMenuOpcao = sucesso;
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
    this.apiTipoMenuOpcaoService.criar(this.modelTipoMenuOpcao).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoMenuOpcao = sucesso;
        this.meuForm.controls['inCodTipoMenuOpcao'].disable();
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
