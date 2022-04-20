import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSituacaoAtenPed } from '../../../../models/model-situacao-aten-ped';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSituacaoAtenPedService } from '../../../../api/api-situacao-aten-ped.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-crude-situacao-aten-ped-detalhe',
  templateUrl: './crude-situacao-aten-ped-detalhe.component.html',
  styleUrls: ['./crude-situacao-aten-ped-detalhe.component.scss']
})
export class CrudeSituacaoAtenPedDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSituacaoAtenPed: ModelSituacaoAtenPed;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSituacaoAtenPedService: ApiSituacaoAtenPedService,
    private _location: Location
  ) {
    this.modelSituacaoAtenPed = new ModelSituacaoAtenPed();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSituacaoAtendimentoPedido();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodSituacaoAtenPed').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSituacaoAtenPed, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodSituacaoAtenPed: [this.modelSituacaoAtenPed.inCodSituacaoAtenPed, Validators.required],
        chDescricao: [this.modelSituacaoAtenPed.chDescricao, Validators.required]
      });

    }
  }

  private getSituacaoAtendimentoPedido() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSituacaoAtenPed = new ModelSituacaoAtenPed();
      this.modelSituacaoAtenPed.inCodSituacaoAtenPed = null;
      this.modelSituacaoAtenPed.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiSituacaoAtenPedService.obter(id).then(
        dados_API => {

          this.modelSituacaoAtenPed = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSituacaoAtenPed);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSituacaoAtendimentoPedido();
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
    this.apiSituacaoAtenPedService.excluir(this.modelSituacaoAtenPed.inCodSituacaoAtenPed).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSituacaoAtenPedService.alterar(this.modelSituacaoAtenPed).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoAtenPed = sucesso;
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
    this.apiSituacaoAtenPedService.criar(this.modelSituacaoAtenPed).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoAtenPed = sucesso;
        this.meuForm.controls['inCodSituacaoAtenPed'].disable();
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
