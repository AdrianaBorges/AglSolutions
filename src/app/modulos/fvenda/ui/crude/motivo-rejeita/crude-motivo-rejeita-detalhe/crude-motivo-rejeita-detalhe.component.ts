import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelMotivoRejeita } from '../../../../models/model-motivo-rejeita';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiMotivoRejeitaService } from '../../../../api/api-motivo-rejeita.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-crude-motivo-rejeita-detalhe',
  templateUrl: './crude-motivo-rejeita-detalhe.component.html',
  styleUrls: ['./crude-motivo-rejeita-detalhe.component.scss']
})
export class CrudeMotivoRejeitaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelMotivoRejeita: ModelMotivoRejeita;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiMotivoRejeitaService: ApiMotivoRejeitaService,
    private _location: Location
  ) {
    this.modelMotivoRejeita = new ModelMotivoRejeita();
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
      this.meuForm.get('inCodMotivoRejeita').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelMotivoRejeita, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodMotivoRejeita: [this.modelMotivoRejeita.inCodMotivoRejeita, Validators.required],
        chDescricao: [this.modelMotivoRejeita.chDescricao, Validators.required]
      });

    }
  }

  private getMotivoRejeita() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelMotivoRejeita = new ModelMotivoRejeita();
      this.modelMotivoRejeita.inCodMotivoRejeita = null;
      this.modelMotivoRejeita.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiMotivoRejeitaService.obter(id).then(
        dados_API => {

          this.modelMotivoRejeita = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelMotivoRejeita);
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
    this.apiMotivoRejeitaService.excluir(this.modelMotivoRejeita.inCodMotivoRejeita).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiMotivoRejeitaService.alterar(this.modelMotivoRejeita).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelMotivoRejeita = sucesso;
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
    this.apiMotivoRejeitaService.criar(this.modelMotivoRejeita).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelMotivoRejeita = sucesso;
        this.meuForm.controls['inCodMotivoRejeita'].disable();
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
