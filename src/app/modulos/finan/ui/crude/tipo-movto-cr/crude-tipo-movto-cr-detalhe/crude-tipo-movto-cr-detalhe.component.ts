import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoMovtoCR } from '../../../../models/model-tipo-movto-cr';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoMovtoCrService } from '../../../../api/api-tipo-movto-cr.service';

@Component({
  selector: 'app-crude-tipo-movto-cr-detalhe',
  templateUrl: './crude-tipo-movto-cr-detalhe.component.html',
  styleUrls: ['./crude-tipo-movto-cr-detalhe.component.scss']
})
export class CrudeTipoMovtoCRDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoMovtoCR: ModelTipoMovtoCR;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao' | 'exclusao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoMovtoCrService: ApiTipoMovtoCrService,
    private _location: Location,
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelTipoMovtoCR = new ModelTipoMovtoCR();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoMovtoCR();

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
      this.meuForm.get('inCodTipoMovtoCR').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoMovtoCR, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoMovtoCR:  new FormControl(this.modelTipoMovtoCR.inCodTipoMovtoCR, [Validators.required]),
        chDescricao:       new FormControl(this.modelTipoMovtoCR.chDescricao, [Validators.required])});
    }

  }

  private getTipoMovtoCR() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id <=0) {
      this.modelTipoMovtoCR = new ModelTipoMovtoCR();
      this.modelTipoMovtoCR.inCodTipoMovtoCR = null;
      this.modelTipoMovtoCR.chDescricao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiTipoMovtoCrService.obter(id).then(
        dados_API => {
          this.modelTipoMovtoCR = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoMovtoCR);

  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoMovtoCR();
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
    this.apiTipoMovtoCrService.excluir(this.modelTipoMovtoCR.inCodTipoMovtoCR).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoMovtoCrService.alterar(this.modelTipoMovtoCR).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoMovtoCR = sucesso;
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
    this.apiTipoMovtoCrService.criar(this.modelTipoMovtoCR).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoMovtoCR = sucesso;
        this.meuForm.controls['inCodTipoMovtoCR'].disable();
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
