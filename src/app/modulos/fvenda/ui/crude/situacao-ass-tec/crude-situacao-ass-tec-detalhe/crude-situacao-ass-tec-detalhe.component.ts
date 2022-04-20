import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSituacaoAssTec } from '../../../../models/model-situacao-ass-tec';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSituacaoAssTecService } from '../../../../api/api-situacao-ass-tec.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-crude-situacao-ass-tec-detalhe',
  templateUrl: './crude-situacao-ass-tec-detalhe.component.html',
  styleUrls: ['./crude-situacao-ass-tec-detalhe.component.scss']
})

export class CrudeSituacaoAssTecDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSituacaoAssTec: ModelSituacaoAssTec;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSituacaoAssTecService: ApiSituacaoAssTecService,
    private _location: Location
  ) {
    this.modelSituacaoAssTec = new ModelSituacaoAssTec();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getMotivoRejeita();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodSituacaoAssTec').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSituacaoAssTec, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodSituacaoAssTec: [this.modelSituacaoAssTec.inCodSituacaoAssTec, Validators.required],
        chDescricao: [this.modelSituacaoAssTec.chDescricao, Validators.required]
      });

    }
  }

  private getMotivoRejeita() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSituacaoAssTec = new ModelSituacaoAssTec();
      this.modelSituacaoAssTec.inCodSituacaoAssTec = null;
      this.modelSituacaoAssTec.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiSituacaoAssTecService.obter(id).then(
        dados_API => {

          this.modelSituacaoAssTec = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSituacaoAssTec);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getMotivoRejeita();
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
    this.apiSituacaoAssTecService.excluir(this.modelSituacaoAssTec.inCodSituacaoAssTec).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSituacaoAssTecService.alterar(this.modelSituacaoAssTec).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoAssTec = sucesso;
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
    this.apiSituacaoAssTecService.criar(this.modelSituacaoAssTec).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSituacaoAssTec = sucesso;
        this.meuForm.controls['inCodSituacaoAssTec'].disable();
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
