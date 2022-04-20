import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiSituacaoCampService } from '../../../../api/api-situacao-camp.service';
import { ModelSituacaoCamp } from '../../../../models/model-situacao-camp';
import { Location } from "@angular/common";
@Component({
  selector: 'app-crude-situacao-camp-detalhe',
  templateUrl: './crude-situacao-camp-detalhe.component.html',
  styleUrls: ['./crude-situacao-camp-detalhe.component.scss']
})
export class CrudeSituacaoCampDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  public meuForm: FormGroup;
  public modelSituacaoCamp: ModelSituacaoCamp;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSituacaoCampService: ApiSituacaoCampService,
    private _location: Location
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelSituacaoCamp = new ModelSituacaoCamp();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSituacaoCamp();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodSituacaoCamp').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSituacaoCamp, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodSituacaoCamp: [this.modelSituacaoCamp.inCodSituacaoCamp, Validators.required],
        chDescricao: [this.modelSituacaoCamp.chDescricao, Validators.required],
      });

    }
  }

  private getSituacaoCamp() {
    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSituacaoCamp = new ModelSituacaoCamp();
      this.modelSituacaoCamp.inCodSituacaoCamp = 0;
      this.modelSituacaoCamp.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);
    } else {
      this.cadastroBarraAcao.exibirAguarde();
      this.apiSituacaoCampService.obter(id).then(
        dados_API => {
          this.modelSituacaoCamp = dados_API;
          this.operacao = 'edicao';
          this.criarForm(false);
          this.cadastroBarraAcao.esconderAguarde();
        },
        erro => {
          this.cadastroBarraAcao.esconderAguarde();
          this.apiErrorCollection = erro;
        }
      );
    }
  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSituacaoCamp);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSituacaoCamp();
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
    this.apiSituacaoCampService.excluir(this.modelSituacaoCamp.inCodSituacaoCamp).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSituacaoCampService.alterar(this.modelSituacaoCamp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoCamp = sucesso;
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
    this.apiSituacaoCampService.criar(this.modelSituacaoCamp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoCamp = sucesso;
        this.meuForm.controls['inCodSituacaoCamp'].disable();
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
