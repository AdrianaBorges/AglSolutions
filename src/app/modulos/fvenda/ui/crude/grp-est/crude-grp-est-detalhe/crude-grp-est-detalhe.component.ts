import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiGrpEstService } from '../../../../api/api-grp-est.service';
import { ModelGrpEst } from '../../../../models/model-grp-est';
import { Location } from "@angular/common";
@Component({
  selector: 'app-crude-grp-est-detalhe',
  templateUrl: './crude-grp-est-detalhe.component.html',
  styleUrls: ['./crude-grp-est-detalhe.component.scss']
})
export class CrudeGrpEstDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelGrpEst: ModelGrpEst;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiGrpEstService: ApiGrpEstService,
    private _location: Location
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelGrpEst = new ModelGrpEst();
  }

  ngOnInit() {

    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getGrpEst();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('chCodGrpEst').disable();
    }
    this.meuForm.controls['IDGrpEst'].disable();
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelGrpEst, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        IDGrpEst: [this.modelGrpEst.IDGrpEst],
        chCodGrpEst: [this.modelGrpEst.chCodGrpEst, Validators.required],
        chDescricao: [this.modelGrpEst.chDescricao, Validators.required]
      });

    }
  }

  private getGrpEst() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelGrpEst = new ModelGrpEst();
      this.modelGrpEst.IDGrpEst = 0;
      this.modelGrpEst.chCodGrpEst = "";
      this.modelGrpEst.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiGrpEstService.obter(id).then(
        dados_API => {

          this.modelGrpEst = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelGrpEst);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getGrpEst();
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
    this.apiGrpEstService.excluir(this.modelGrpEst.IDGrpEst).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiGrpEstService.alterar(this.modelGrpEst).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrpEst = sucesso;
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
    this.apiGrpEstService.criar(this.modelGrpEst).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrpEst = sucesso;
        this.meuForm.controls['chCodGrpEst'].disable();
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
