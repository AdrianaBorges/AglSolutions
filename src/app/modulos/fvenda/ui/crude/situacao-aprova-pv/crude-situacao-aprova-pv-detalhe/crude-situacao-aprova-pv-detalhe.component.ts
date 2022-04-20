import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ModelSituacaoSolAprPV } from '../../../../models/model-situacao-sol-apr-pv';
import { ApiSituacaoSolAprPvService } from '../../../../api/api-situacao-sol-apr-pv.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-crude-situacao-aprova-pv-detalhe',
  templateUrl: './crude-situacao-aprova-pv-detalhe.component.html',
  styleUrls: ['./crude-situacao-aprova-pv-detalhe.component.scss']
})
export class CrudeSituacaoAprovaPvDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSituacaoSolAprPV: ModelSituacaoSolAprPV;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSituacaoSolAprPvService: ApiSituacaoSolAprPvService,
    private _location: Location
  ) {
    this.modelSituacaoSolAprPV = new ModelSituacaoSolAprPV();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSituacaoSolAprPvService();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodSituacaoSolAprPV').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSituacaoSolAprPV, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodSituacaoSolAprPV: [this.modelSituacaoSolAprPV.inCodSituacaoSolAprPV, Validators.required],
        chDescricao: [this.modelSituacaoSolAprPV.chDescricao, Validators.required]
      });

    }
  }

  private getSituacaoSolAprPvService() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSituacaoSolAprPV = new ModelSituacaoSolAprPV();
      this.modelSituacaoSolAprPV.inCodSituacaoSolAprPV = null;
      this.modelSituacaoSolAprPV.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiSituacaoSolAprPvService.obter(id).then(
        dados_API => {

          this.modelSituacaoSolAprPV = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSituacaoSolAprPV);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSituacaoSolAprPvService();
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
    this.apiSituacaoSolAprPvService.excluir(this.modelSituacaoSolAprPV.inCodSituacaoSolAprPV).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSituacaoSolAprPvService.alterar(this.modelSituacaoSolAprPV).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoSolAprPV = sucesso;
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
    this.apiSituacaoSolAprPvService.criar(this.modelSituacaoSolAprPV).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoSolAprPV = sucesso;
        this.meuForm.controls['inCodSituacaoSolAprPV'].disable();
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
