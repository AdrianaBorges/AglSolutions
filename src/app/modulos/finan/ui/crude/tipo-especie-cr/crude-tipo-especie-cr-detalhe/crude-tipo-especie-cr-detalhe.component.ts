import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ModelTipoEspecieCR } from '../../../../models/model-tipo-especie-cr';
import { ApiTipoEspecieCrService } from '../../../../api/api-tipo-especie-cr.service';

@Component({
  selector: 'app-crude-tipo-especie-cr-detalhe',
  templateUrl: './crude-tipo-especie-cr-detalhe.component.html',
  styleUrls: ['./crude-tipo-especie-cr-detalhe.component.scss']
})
export class CrudeTipoEspecieCrDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoEspecieCR: ModelTipoEspecieCR;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoEspecieCrService: ApiTipoEspecieCrService,
    private _location: Location,
  ) {
    this.modelTipoEspecieCR = new ModelTipoEspecieCR();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoEspecieCR();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodTipoEspecieCR').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoEspecieCR, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoEspecieCR: new FormControl(this.modelTipoEspecieCR.inCodTipoEspecieCR, [Validators.required, Validators.maxLength(9)]),
               chDescricao: new FormControl(this.modelTipoEspecieCR.chDescricao,        [Validators.required, Validators.maxLength(50)])
      });
    }

  }

  private getTipoEspecieCR() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelTipoEspecieCR = new ModelTipoEspecieCR();
      this.modelTipoEspecieCR.inCodTipoEspecieCR = 0;
      this.modelTipoEspecieCR.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiTipoEspecieCrService.pesquisarPorId(id).then(
        dados_API => {
          this.modelTipoEspecieCR = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoEspecieCR);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoEspecieCR();
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
    this.apiTipoEspecieCrService.excluir(this.modelTipoEspecieCR.inCodTipoEspecieCR).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoEspecieCrService.alterar(this.modelTipoEspecieCR).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoEspecieCR = sucesso;
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
    this.apiTipoEspecieCrService.criar(this.modelTipoEspecieCR).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoEspecieCR = sucesso;
        this.meuForm.controls['inCodTipoEspecieCR'].disable();
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

