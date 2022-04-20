import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiTipoDefeitoService } from '../../../../api/api-tipo-defeito.service';
import { ModelTipoDefeito } from '../../../../models/model-tipo-defeito';
import { Location } from '@angular/common'
@Component({
  selector: 'app-crude-tipo-defeito-detalhe',
  templateUrl: './crude-tipo-defeito-detalhe.component.html',
  styleUrls: ['./crude-tipo-defeito-detalhe.component.scss']
})
export class CrudeTipoDefeitoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoDefeito: ModelTipoDefeito;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoDefeitoService: ApiTipoDefeitoService,
    private _location: Location
  ) {
    this.modelTipoDefeito = new ModelTipoDefeito();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoDefeito();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodTipoDefeito').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoDefeito, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoDefeito: [this.modelTipoDefeito.inCodTipoDefeito, Validators.required],
        chDescricao: [this.modelTipoDefeito.chDescricao, Validators.required]
      });

    }
  }

  private getTipoDefeito() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelTipoDefeito = new ModelTipoDefeito();
      this.modelTipoDefeito.inCodTipoDefeito = null;
      this.modelTipoDefeito.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiTipoDefeitoService.obter(id).then(
        dados_API => {

          this.modelTipoDefeito = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoDefeito);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoDefeito();
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
    this.apiTipoDefeitoService.excluir(this.modelTipoDefeito.inCodTipoDefeito).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoDefeitoService.alterar(this.modelTipoDefeito).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoDefeito = sucesso;
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
    this.apiTipoDefeitoService.criar(this.modelTipoDefeito).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoDefeito = sucesso;
        this.meuForm.controls['inCodTipoDefeito'].disable();
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
