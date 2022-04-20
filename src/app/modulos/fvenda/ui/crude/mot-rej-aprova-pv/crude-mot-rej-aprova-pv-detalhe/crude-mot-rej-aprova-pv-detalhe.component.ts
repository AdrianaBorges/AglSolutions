import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiMotRejSolAprPvService } from '../../../../api/api-mot-rej-sol-apr-pv.service';
import { ModelMotRejSolAprPV } from '../../../../models/model-mot-rej-sol-apr-pv';
import { Location } from "@angular/common";

@Component({
  selector: 'app-crude-mot-rej-aprova-pv-detalhe',
  templateUrl: './crude-mot-rej-aprova-pv-detalhe.component.html',
  styleUrls: ['./crude-mot-rej-aprova-pv-detalhe.component.scss']
})
export class CrudeMotRejAprovaPvDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelMotRejSolAprPV: ModelMotRejSolAprPV;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiMotRejSolAprPvService: ApiMotRejSolAprPvService,
    private _location: Location
  ) {
    this.modelMotRejSolAprPV = new ModelMotRejSolAprPV();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getMotRejSolAprPV();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodMotRejSolAprPV').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelMotRejSolAprPV, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodMotRejSolAprPV: [this.modelMotRejSolAprPV.inCodMotRejSolAprPV, Validators.required],
        chDescricao: [this.modelMotRejSolAprPV.chDescricao, Validators.required]
      });

    }
  }

  private getMotRejSolAprPV() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelMotRejSolAprPV = new ModelMotRejSolAprPV();
      this.modelMotRejSolAprPV.inCodMotRejSolAprPV = null;
      this.modelMotRejSolAprPV.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiMotRejSolAprPvService.obter(id).then(
        dados_API => {

          this.modelMotRejSolAprPV = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelMotRejSolAprPV);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getMotRejSolAprPV();
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
    this.apiMotRejSolAprPvService.excluir(this.modelMotRejSolAprPV.inCodMotRejSolAprPV).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiMotRejSolAprPvService.alterar(this.modelMotRejSolAprPV).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelMotRejSolAprPV = sucesso;
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
    this.apiMotRejSolAprPvService.criar(this.modelMotRejSolAprPV).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelMotRejSolAprPV = sucesso;
        this.meuForm.controls['inCodMotRejSolAprPV'].disable();
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
