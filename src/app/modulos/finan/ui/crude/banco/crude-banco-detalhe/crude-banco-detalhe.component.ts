import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelBanco } from '../../../../models/model-banco';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiBancoService } from '../../../../api/api-banco.service';

@Component({
  selector: 'app-crude-banco-detalhe',
  templateUrl: './crude-banco-detalhe.component.html',
  styleUrls: ['./crude-banco-detalhe.component.scss']
})
export class CrudeBancoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelBanco: ModelBanco;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiBancoService: ApiBancoService,
    private _location: Location,
  ) {
    this.modelBanco = new ModelBanco();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getBanco();

  }

  private criarBreadCrumbs(){
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodBanco').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelBanco, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodBanco: new FormControl(this.modelBanco.inCodBanco, [Validators.required]),
        chNome: new FormControl(this.modelBanco.chNome, [Validators.required]),
        chClasseCobrancaPix: new FormControl(this.modelBanco.chClasseCobrancaPix, [Validators.required]),
        chClasseBoleto: new FormControl(this.modelBanco.chClasseBoleto, [Validators.required])
      });
    }

  }

  private getBanco() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelBanco = new ModelBanco();
      this.modelBanco.inCodBanco = null;
      this.modelBanco.chNome = null;
      this.modelBanco.chClasseCobrancaPix = null;
      this.modelBanco.chClasseBoleto = null;

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiBancoService.pesquisarPorId(id).then(
        dados_API => {
          this.modelBanco = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelBanco);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getBanco();
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
    this.apiBancoService.excluir(this.modelBanco.inCodBanco).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiBancoService.alterar(this.modelBanco).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelBanco = sucesso;
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
    this.apiBancoService.criar(this.modelBanco).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelBanco = sucesso;
        this.meuForm.controls['inCodBanco'].disable();
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
