import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiEspecieItemService } from '../../../../api/api-especie-item.service';
import { ModelEspecieItem } from '../../../../models/model-especie-item';
import { Location } from "@angular/common";

@Component({
  selector: 'app-crude-especie-item-detalhe',
  templateUrl: './crude-especie-item-detalhe.component.html',
  styleUrls: ['./crude-especie-item-detalhe.component.scss']
})
export class CrudeEspecieItemDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelEspecieItem: ModelEspecieItem;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiEspecieItemService: ApiEspecieItemService,
    private _location: Location
  ) {
    this.modelEspecieItem = new ModelEspecieItem();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getEspecieItem();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodEspecieItem').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelEspecieItem, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodEspecieItem: [this.modelEspecieItem.inCodEspecieItem, Validators.required],
        chDescricao: [this.modelEspecieItem.chDescricao, Validators.required]
      });

    }
  }

  private getEspecieItem() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelEspecieItem = new ModelEspecieItem();
      this.modelEspecieItem.inCodEspecieItem = null;
      this.modelEspecieItem.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiEspecieItemService.obter(id).then(
        dados_API => {

          this.modelEspecieItem = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelEspecieItem);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getEspecieItem();
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
    this.apiEspecieItemService.excluir(this.modelEspecieItem.inCodEspecieItem).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiEspecieItemService.alterar(this.modelEspecieItem).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelEspecieItem = sucesso;
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
    this.apiEspecieItemService.criar(this.modelEspecieItem).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelEspecieItem = sucesso;
        this.meuForm.controls['inCodEspecieItem'].disable();
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
