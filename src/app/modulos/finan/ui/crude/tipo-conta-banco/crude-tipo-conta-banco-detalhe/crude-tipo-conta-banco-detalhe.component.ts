import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoContaBanco } from '../../../../models/model-tipo-conta-banco';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoContaBancoService } from '../../../../api/api-tipo-conta-banco.service';

@Component({
  selector: 'app-crude-tipo-conta-banco-detalhe',
  templateUrl: './crude-tipo-conta-banco-detalhe.component.html',
  styleUrls: ['./crude-tipo-conta-banco-detalhe.component.scss']
})
export class CrudeTipoContaBancoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoContaBanco: ModelTipoContaBanco;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoContaBancoService: ApiTipoContaBancoService,
    private _location: Location,
  ) {
    this.modelTipoContaBanco = new ModelTipoContaBanco();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoContaBanco();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-conta-banco',
        url: '/modulos/finan/tipo-conta-banco'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodTipoContaBanco').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoContaBanco, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoContaBanco: new FormControl(this.modelTipoContaBanco.inCodTipoContaBanco, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelTipoContaBanco.chDescricao, [Validators.required, Validators.maxLength(50)])
      });
    }

  }

  private getTipoContaBanco() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelTipoContaBanco = new ModelTipoContaBanco();
      this.modelTipoContaBanco.inCodTipoContaBanco = null;
      this.modelTipoContaBanco.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiTipoContaBancoService.pesquisarPorId(id).then(
        dados_API => {
          this.modelTipoContaBanco = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoContaBanco);
    //console.log('this.modelTipoContaBanco = ', this.modelTipoContaBanco);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoContaBanco();
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
    this.apiTipoContaBancoService.excluir(this.modelTipoContaBanco.inCodTipoContaBanco).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoContaBancoService.alterar(this.modelTipoContaBanco).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoContaBanco = sucesso;
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
    this.apiTipoContaBancoService.criar(this.modelTipoContaBanco).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoContaBanco = sucesso;
        this.meuForm.controls['inCodTipoContaBanco'].disable();
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
