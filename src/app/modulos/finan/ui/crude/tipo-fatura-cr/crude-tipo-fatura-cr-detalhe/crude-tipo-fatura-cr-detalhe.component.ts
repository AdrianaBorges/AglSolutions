import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoFaturaCR } from '../../../../models/model-tipo-fatura-cr';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoFaturaCrService } from '../../../../api/api-tipo-fatura-cr.service';

@Component({
  selector: 'app-crude-tipo-fatura-cr-detalhe',
  templateUrl: './crude-tipo-fatura-cr-detalhe.component.html',
  styleUrls: ['./crude-tipo-fatura-cr-detalhe.component.scss']
})
export class CrudeTipoFaturaCRDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoFaturaCR: ModelTipoFaturaCR;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao' | 'exclusao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoFaturaCrService: ApiTipoFaturaCrService,
    private _location: Location,
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelTipoFaturaCR = new ModelTipoFaturaCR();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoFaturaCR();

  }

  private criarBreadCrumbs(){
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');
    //console.log(id);
    if (id >0) {
      this.meuForm.get('inCodTipoFaturaCR').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoFaturaCR, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoFaturaCR: new FormControl(this.modelTipoFaturaCR.inCodTipoFaturaCR, [Validators.required]),
        chDescricao:       new FormControl(this.modelTipoFaturaCR.chDescricao, [Validators.required])});
    }

  }

  private getTipoFaturaCR() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id <=0) {
      this.modelTipoFaturaCR = new ModelTipoFaturaCR();
      this.modelTipoFaturaCR.inCodTipoFaturaCR = null;
      this.modelTipoFaturaCR.chDescricao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiTipoFaturaCrService.obter(id).then(
        dados_API => {
          this.modelTipoFaturaCR = dados_API;
          this.operacao = 'edicao';
          this.criarForm(false);
          this.cadastroBarraAcao.esconderAguarde();
        },
        erro => {
          this.apiErrorCollection = erro;
          this.cadastroBarraAcao.esconderAguarde();
        }
      );
    }

  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoFaturaCR);

  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoFaturaCR();
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
    this.apiTipoFaturaCrService.excluir(this.modelTipoFaturaCR.inCodTipoFaturaCR).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoFaturaCrService.alterar(this.modelTipoFaturaCR).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoFaturaCR = sucesso;
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
    this.apiTipoFaturaCrService.criar(this.modelTipoFaturaCR).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoFaturaCR = sucesso;
        this.meuForm.controls['inCodTipoFaturaCR'].disable();
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
