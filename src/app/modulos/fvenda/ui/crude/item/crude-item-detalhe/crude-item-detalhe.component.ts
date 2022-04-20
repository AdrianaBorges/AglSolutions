import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { Location } from "@angular/common";
import { ModelItemEL01 } from '../../../../models/model-item-EL01';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCategoriaService } from '../../../../api/api-categoria.service';
import { ApiItemEL01Service } from '../../../../api/api-item-el01.service';
import { ApiFamMatService } from '../../../../api/api-fam-mat.service';
import { ApiEspecieItemService } from '../../../../api/api-especie-item.service';
import { ApiFamComService } from '../../../../api/api-fam-com.service';
import { ApiGrpEstService } from '../../../../api/api-grp-est.service';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

@Component({
  selector: 'app-crude-item-detalhe',
  templateUrl: './crude-item-detalhe.component.html',
  styleUrls: ['./crude-item-detalhe.component.scss']
})
export class CrudeItemDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  public meuForm: FormGroup;
  public modelItemEL01: ModelItemEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiItemEL01Service: ApiItemEL01Service,
    public apiCategoriaService: ApiCategoriaService,
    public apiFamMatService: ApiFamMatService,
    public apiEspecieItemService: ApiEspecieItemService,
    public apiFamComService: ApiFamComService,
    public apiGrpEstService: ApiGrpEstService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelItemEL01 = new ModelItemEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }
  /*
  public ngAfterViewInit() {
    //Promise.resolve(null).then(() => this.kendoTabStripInstance.selectTab(0));
  }
  */
  /**
   * Retorna o id do cadastro sendo acessado
   * Implementação do método da interface CadastroBarraAcaoPai
   *
  public cadastroBarraAcaoPai_getIdCadastro(): number {
    if (this.modelItemEL01) {
      return this.modelItemEL01.IDItem;
    } else {
      return 0;
    }
  }
  */

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getItem();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('chCodItem').disable();
    }
    this.meuForm.controls['IDItem'].disable();
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelItemEL01, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({
        //Dados essenciais
        IDItem: [this.modelItemEL01.IDItem],
        IDGrpEst: [this.modelItemEL01.IDGrpEst],
        IDFamMat: [this.modelItemEL01.IDFamMat],
        IDFamCom: [this.modelItemEL01.IDFamCom],
        IDCategoria: [this.modelItemEL01.IDCategoria],
        inCodEspecieItem: [this.modelItemEL01.inCodEspecieItem,Validators.required],
        chCodItem: [this.modelItemEL01.chCodItem, Validators.required],
        chCodComplem: [this.modelItemEL01.chCodComplem],
        chCodEAN: [this.modelItemEL01.chCodEAN],
        chDescricao: [this.modelItemEL01.chDescricao, Validators.required],

        chCodUM: [this.modelItemEL01.chCodUM],
        chCodNCM: [this.modelItemEL01.chCodNCM],
        dePercIPI: [this.modelItemEL01.dePercIPI],
        dePercST: [this.modelItemEL01.dePercST],
        dePesoBruto: [this.modelItemEL01.dePesoBruto],
        dePesoLiquido: [this.modelItemEL01.dePesoLiquido],
        deLargura: [this.modelItemEL01.deLargura],
        deAltura: [this.modelItemEL01.deAltura],
        deComprimento: [this.modelItemEL01.deComprimento],
        deQtdMultipla: [this.modelItemEL01.deQtdMultipla],
        deQtdMinima: [this.modelItemEL01.deQtdMinima],
        deQtdMaxima: [this.modelItemEL01.deQtdMaxima],
        lgPermDesconto: [this.modelItemEL01.lgPermDesconto],
        deDescMaximo: [this.modelItemEL01.deDescMaximo],
        chDesObservacao: [this.modelItemEL01.chDesObservacao],
        chDesSituacaoCad: [this.modelItemEL01.chDesSituacaoCad],
        lgControleLoteSerie: [this.modelItemEL01.lgControleLoteSerie],
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelItemEL01);
  }

  private getItem() {
    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelItemEL01 = new ModelItemEL01();
      this.modelItemEL01.IDItem = 0;
      this.modelItemEL01.IDGrpEst = null;
      this.modelItemEL01.IDFamMat = null;
      this.modelItemEL01.IDFamCom = null;
      this.modelItemEL01.IDCategoria = null;
      this.modelItemEL01.inCodEspecieItem = null;
      this.modelItemEL01.chCodFamCom = '';
      this.modelItemEL01.chCodFamMat = '';
      this.modelItemEL01.chCodGrpEst = '';
      this.modelItemEL01.chCodItem = '';
      this.modelItemEL01.chCodNCM = '';
      this.modelItemEL01.chCodUM = '';
      this.modelItemEL01.chDesCategoria = '';
      this.modelItemEL01.chDesEspecieItem = '';
      this.modelItemEL01.chDesFamCom = '';
      this.modelItemEL01.chDesFamMat = '';
      this.modelItemEL01.chDesGrpEst = '';
      this.modelItemEL01.chDesObservacao = '';
      this.modelItemEL01.chDesSituacaoCad = '';
      this.modelItemEL01.chDescricao = '';

      this.modelItemEL01.deAltura = 0;
      this.modelItemEL01.deComprimento = 0;
      this.modelItemEL01.deDescMaximo = 0;
      this.modelItemEL01.deLargura = 0;
      this.modelItemEL01.dePercIPI = 0;
      this.modelItemEL01.dePercST = 0;
      this.modelItemEL01.dePesoBruto = 0;
      this.modelItemEL01.dePesoLiquido = 0;
      this.modelItemEL01.deQtdMaxima = 0;
      this.modelItemEL01.deQtdMinima = 0;
      this.modelItemEL01.deQtdMultipla = 0;
      this.modelItemEL01.lgPermDesconto = false;
      this.modelItemEL01.lgControleLoteSerie = false;

      this.operacao = 'inclusao';
      this.criarForm(true);
    } else {
      this.cadastroBarraAcao.exibirAguarde();
      this.apiItemEL01Service.obter(id).then(
        dados_API => {
          this.modelItemEL01 = dados_API;
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

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getItem();
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
    this.apiItemEL01Service.excluir(this.modelItemEL01.IDItem).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiItemEL01Service.alterar(this.modelItemEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelItemEL01 = sucesso;
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
    this.apiItemEL01Service.criar(this.modelItemEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelItemEL01 = sucesso;
        this.criarForm(false);
        this.operacao = 'edicao';
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('chCodItem').disable();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

}
