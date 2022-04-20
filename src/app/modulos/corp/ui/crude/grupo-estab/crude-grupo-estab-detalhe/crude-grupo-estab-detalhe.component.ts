import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiGrupoEstabService } from '../../../../api/api-grupo-estab.service';
import { ModelGrupoEstab } from '../../../../models/model-grupo-estab';
import { Location } from "@angular/common";
@Component({
  selector: 'app-crude-grupo-estab-detalhe',
  templateUrl: './crude-grupo-estab-detalhe.component.html',
  styleUrls: ['./crude-grupo-estab-detalhe.component.scss']
})
export class CrudeGrupoEstabDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  public meuForm: FormGroup;
  public modelGrupoEstab: ModelGrupoEstab;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiGrupoEstabService: ApiGrupoEstabService,
    private _location: Location
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelGrupoEstab = new ModelGrupoEstab();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getGrupoEstab();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodGrupoEstab').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelGrupoEstab, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodGrupoEstab: [this.modelGrupoEstab.inCodGrupoEstab, Validators.required],
        chDescricao: [this.modelGrupoEstab.chDescricao, Validators.required],
      });

    }
  }

  private getGrupoEstab() {
    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelGrupoEstab = new ModelGrupoEstab();
      this.modelGrupoEstab.inCodGrupoEstab = 0;
      this.modelGrupoEstab.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);
    } else {
      this.cadastroBarraAcao.exibirAguarde();
      this.apiGrupoEstabService.obter(id).then(
        dados_API => {
          this.modelGrupoEstab = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelGrupoEstab);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getGrupoEstab();
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
    this.apiGrupoEstabService.excluir(this.modelGrupoEstab.inCodGrupoEstab).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiGrupoEstabService.alterar(this.modelGrupoEstab).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrupoEstab = sucesso;
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
    this.apiGrupoEstabService.criar(this.modelGrupoEstab).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrupoEstab = sucesso;
        this.meuForm.controls['inCodGrupoEstab'].disable();
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
