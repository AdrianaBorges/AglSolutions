import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiCategoriaService } from '../../../../api/api-categoria.service';
import { ModelCategoria } from '../../../../models/model-categoria';

import { Location } from "@angular/common";
import { ApiSelectComponent } from '../../../../../../componentes/api-select/api-select.component';
@Component({
  selector: 'app-crude-categoria-detalhe',
  templateUrl: './crude-categoria-detalhe.component.html',
  styleUrls: ['./crude-categoria-detalhe.component.scss']
})
export class CrudeCategoriaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('IDCategoriaPai', { static: true }) IDCategoriaPaiComp: ApiSelectComponent;
  public meuForm: FormGroup;
  public modelCategoria: ModelCategoria;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiCategoriaService: ApiCategoriaService,
    public apiCategoriaPaiService: ApiCategoriaService,
    private _location: Location
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelCategoria = new ModelCategoria();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getCategoria();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('chCodCategoria').disable();
    }
    this.meuForm.controls['IDCategoria'].disable();
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCategoria, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        IDCategoria: [this.modelCategoria.IDCategoria],
        chCodCategoria: [this.modelCategoria.chCodCategoria, Validators.required],
        chDescricao: [this.modelCategoria.chDescricao, Validators.required],
        IDCategoriaPai: [this.modelCategoria.IDCategoriaPai]
      });

    }
  }

  private getCategoria() {
    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelCategoria = new ModelCategoria();
      this.modelCategoria.IDCategoria = 0;
      this.modelCategoria.chCodCategoria = "";
      this.modelCategoria.chDescricao = "";
      this.modelCategoria.IDCategoriaPai = null;
      this.modelCategoria.chDesCategoriaPai = "";
      this.modelCategoria.chCodCategoriaPai = "";

      this.operacao = 'inclusao';
      this.criarForm(true);
    } else {
      this.cadastroBarraAcao.exibirAguarde();
      this.apiCategoriaService.obter(id).then(
        dados_API => {
          this.modelCategoria = dados_API;
          this.IDCategoriaPaiComp.filtroAlterado("Categoria.IDCategoria", "neq", this.modelCategoria.IDCategoria);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCategoria);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getCategoria();
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
    this.apiCategoriaService.excluir(this.modelCategoria.IDCategoria).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiCategoriaService.alterar(this.modelCategoria).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCategoria = sucesso;
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
    this.apiCategoriaService.criar(this.modelCategoria).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCategoria = sucesso;
        this.meuForm.controls['chCodCategoria'].disable();
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
