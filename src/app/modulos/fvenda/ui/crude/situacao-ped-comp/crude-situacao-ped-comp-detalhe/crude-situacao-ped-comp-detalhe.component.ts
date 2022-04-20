import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { Location } from '@angular/common';
import { ApiSituacaoPedCompService } from '../../../../api/api-situacao-ped-comp.service';
import { ModelSituacaoPedComp } from '../../../../models/model-situacao-ped-comp';

@Component({
  selector: 'app-crude-situacao-ped-comp-detalhe',
  templateUrl: './crude-situacao-ped-comp-detalhe.component.html',
  styleUrls: ['./crude-situacao-ped-comp-detalhe.component.scss']
})
export class CrudeSituacaoPedCompDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSituacaoPedComp: ModelSituacaoPedComp;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSituacaoPedCompService: ApiSituacaoPedCompService,
    private _location: Location
  ) {
    this.modelSituacaoPedComp = new ModelSituacaoPedComp();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSituacaoPedCompService();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodSituacaoPedComp').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSituacaoPedComp, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodSituacaoPedComp: [this.modelSituacaoPedComp.inCodSituacaoPedComp, Validators.required],
        chDescricao: [this.modelSituacaoPedComp.chDescricao, Validators.required]
      });

    }
  }

  private getSituacaoPedCompService() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSituacaoPedComp = new ModelSituacaoPedComp();
      this.modelSituacaoPedComp.inCodSituacaoPedComp = null;
      this.modelSituacaoPedComp.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiSituacaoPedCompService.obter(id).then(
        dados_API => {

          this.modelSituacaoPedComp = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSituacaoPedComp);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSituacaoPedCompService();
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
    this.apiSituacaoPedCompService.excluir(this.modelSituacaoPedComp.inCodSituacaoPedComp).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSituacaoPedCompService.alterar(this.modelSituacaoPedComp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoPedComp = sucesso;
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
    this.apiSituacaoPedCompService.criar(this.modelSituacaoPedComp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoPedComp = sucesso;
        this.meuForm.controls['inCodSituacaoPedComp'].disable();
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
