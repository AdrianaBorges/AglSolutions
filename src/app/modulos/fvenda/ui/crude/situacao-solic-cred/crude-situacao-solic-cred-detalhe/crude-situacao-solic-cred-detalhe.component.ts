import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSituacaoSolicCred } from '../../../../models/model-situacao-solic-cred';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSituacaoSolicCredService } from '../../../../api/api-situacao-solic-cred.service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-crude-situacao-solic-cred-detalhe',
  templateUrl: './crude-situacao-solic-cred-detalhe.component.html',
  styleUrls: ['./crude-situacao-solic-cred-detalhe.component.scss']
})
export class CrudeSituacaoSolicCredDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSituacaoSolicCred: ModelSituacaoSolicCred;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSituacaoSolicCredService: ApiSituacaoSolicCredService,
    private _location: Location
  ) {
    this.modelSituacaoSolicCred = new ModelSituacaoSolicCred();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSituacaoSolicCred();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {
    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodSituacaoSolicCred').disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSituacaoSolicCred, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodSituacaoSolicCred: [this.modelSituacaoSolicCred.inCodSituacaoSolicCred, Validators.required],
        chDescricao: [this.modelSituacaoSolicCred.chDescricao, Validators.required]
      });
    }
  }

  private getSituacaoSolicCred() {
    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSituacaoSolicCred = new ModelSituacaoSolicCred();
      this.modelSituacaoSolicCred.inCodSituacaoSolicCred = null;
      this.modelSituacaoSolicCred.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiSituacaoSolicCredService.obter(id).then(
        dados_API => {

          this.modelSituacaoSolicCred = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSituacaoSolicCred);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSituacaoSolicCred();
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
    this.apiSituacaoSolicCredService.excluir(this.modelSituacaoSolicCred.inCodSituacaoSolicCred).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSituacaoSolicCredService.alterar(this.modelSituacaoSolicCred).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoSolicCred = sucesso;
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
    this.apiSituacaoSolicCredService.criar(this.modelSituacaoSolicCred).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoSolicCred = sucesso;
        this.meuForm.controls['inCodSituacaoSolicCred'].disable();
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
