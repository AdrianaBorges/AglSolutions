import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiFamMatService } from '../../../../api/api-fam-mat.service';
import { ModelFamMat } from '../../../../models/model-fam-mat';
import { Location } from "@angular/common";
@Component({
  selector: 'app-crude-fam-mat-detalhe',
  templateUrl: './crude-fam-mat-detalhe.component.html',
  styleUrls: ['./crude-fam-mat-detalhe.component.scss']
})
export class CrudeFamMatDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelFamMat: ModelFamMat;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiFamMatService: ApiFamMatService,
    private _location: Location
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelFamMat = new ModelFamMat();
  }

  ngOnInit() {

    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getFamMat();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('chCodFamMat').disable();
    }
    this.meuForm.controls['IDFamMat'].disable();
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelFamMat, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        IDFamMat: [this.modelFamMat.IDFamMat],
        chCodFamMat: [this.modelFamMat.chCodFamMat, Validators.required],
        chDescricao: [this.modelFamMat.chDescricao, Validators.required]
      });

    }
  }

  private getFamMat() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelFamMat = new ModelFamMat();
      this.modelFamMat.IDFamMat = 0;
      this.modelFamMat.chCodFamMat = "";
      this.modelFamMat.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiFamMatService.obter(id).then(
        dados_API => {

          this.modelFamMat = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelFamMat);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getFamMat();
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
    this.apiFamMatService.excluir(this.modelFamMat.IDFamMat).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiFamMatService.alterar(this.modelFamMat).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelFamMat = sucesso;
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
    this.apiFamMatService.criar(this.modelFamMat).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelFamMat = sucesso;
        this.meuForm.controls['chCodFamMat'].disable();
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
