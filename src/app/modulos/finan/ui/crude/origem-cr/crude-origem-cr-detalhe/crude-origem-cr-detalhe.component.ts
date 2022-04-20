import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ModelOrigemCR } from '../../../../models/model-origem-cr';
import { ApiOrigemCrService } from '../../../../api/api-origem-cr.service';

@Component({
  selector: 'app-crude-origem-cr-detalhe',
  templateUrl: './crude-origem-cr-detalhe.component.html',
  styleUrls: ['./crude-origem-cr-detalhe.component.scss']
})
export class CrudeOrigemCrDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelOrigemCR: ModelOrigemCR;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiOrigemCrService: ApiOrigemCrService,
    private _location: Location,
  ) {
    this.modelOrigemCR = new ModelOrigemCR();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getOrigemCr();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodOrigemCR').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelOrigemCR, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodOrigemCR: new FormControl(this.modelOrigemCR.inCodOrigemCR,      [Validators.required, Validators.maxLength(9)]),
          chDescricao: new FormControl(this.modelOrigemCR.chDescricao,        [Validators.required, Validators.maxLength(50)])
      });
    }

  }

  private getOrigemCr() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelOrigemCR = new ModelOrigemCR();
      this.modelOrigemCR.inCodOrigemCR = 0;
      this.modelOrigemCR.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiOrigemCrService.pesquisarPorId(id).then(
        dados_API => {
          this.modelOrigemCR = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelOrigemCR);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getOrigemCr();
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
    this.apiOrigemCrService.excluir(this.modelOrigemCR.inCodOrigemCR).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiOrigemCrService.alterar(this.modelOrigemCR).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelOrigemCR = sucesso;
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
    this.apiOrigemCrService.criar(this.modelOrigemCR).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelOrigemCR = sucesso;
        this.meuForm.controls['inCodOrigemCR'].disable();
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

