import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ModelCarteiraCR } from '../../../../models/model-carteira-cr';
import { ApiCarteiraCrService } from '../../../../api/api-carteira-cr.service';

@Component({
  selector: 'app-crude-carteira-cr-detalhe',
  templateUrl: './crude-carteira-cr-detalhe.component.html',
  styleUrls: ['./crude-carteira-cr-detalhe.component.scss']
})
export class CrudeCarteiraCrDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelCarteiraCR: ModelCarteiraCR;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiCarteiraCrService: ApiCarteiraCrService,
    private _location: Location,
  ) {
    this.modelCarteiraCR = new ModelCarteiraCR();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getCarteiraCR();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodCarteiraCR').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCarteiraCR, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodCarteiraCR: new FormControl(this.modelCarteiraCR.inCodCarteiraCR,  [Validators.required, Validators.maxLength(9)]),
            chDescricao: new FormControl(this.modelCarteiraCR.chDescricao,      [Validators.required, Validators.maxLength(50)])
      });
    }

  }

  private getCarteiraCR() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelCarteiraCR = new ModelCarteiraCR();
      this.modelCarteiraCR.inCodCarteiraCR = 0;
      this.modelCarteiraCR.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiCarteiraCrService.pesquisarPorId(id).then(
        dados_API => {
          this.modelCarteiraCR = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCarteiraCR);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getCarteiraCR();
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
    this.apiCarteiraCrService.excluir(this.modelCarteiraCR.inCodCarteiraCR).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiCarteiraCrService.alterar(this.modelCarteiraCR).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCarteiraCR = sucesso;
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
    this.apiCarteiraCrService.criar(this.modelCarteiraCR).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCarteiraCR = sucesso;
        this.meuForm.controls['inCodCarteiraCR'].disable();
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

