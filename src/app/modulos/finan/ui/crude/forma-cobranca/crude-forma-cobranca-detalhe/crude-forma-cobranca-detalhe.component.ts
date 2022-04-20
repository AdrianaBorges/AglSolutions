import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiFormaCobrancaEL01Service } from '../../../../api/api-forma-cobranca-el01.service';
import { ApiPortadorService } from '../../../../api/api-portador.service';
import { ApiTipoCobrancaService } from '../../../../api/api-tipo-cobranca.service';
import { ApiSequeciaService } from '../../../../../corp/api/api-sequecia.service';
import { ApiCarteiraCrService } from '../../../../api/api-carteira-cr.service';
import { Location } from '@angular/common';
import { ModelFormaCobrancaEL01 } from '../../../../models/model-forma-cobranca-el01';


@Component({
  selector: 'app-crude-forma-cobranca-detalhe',
  templateUrl: './crude-forma-cobranca-detalhe.component.html',
  styleUrls: ['./crude-forma-cobranca-detalhe.component.scss']
})
export class CrudeFormaCobrancaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelFormaCobrancaEL01: ModelFormaCobrancaEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';


  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiFormaCobrancaEL01Service: ApiFormaCobrancaEL01Service,
    public apiPortadorService: ApiPortadorService,
    public apiTipoCobrancaService: ApiTipoCobrancaService,
    public apiCarteiraCrService: ApiCarteiraCrService,
    public apiSequeciaService: ApiSequeciaService,
    private _location: Location,
  ) {
    this.modelFormaCobrancaEL01 = new ModelFormaCobrancaEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.getFormaCobranca();
    this.configurarStatusForm();
  }

  private configurarStatusForm() {
    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.disabled();
    }
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelFormaCobrancaEL01, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        chCodFormaCobranca: [this.modelFormaCobrancaEL01.chCodFormaCobranca, Validators.required],
        chDesAbreviada: [this.modelFormaCobrancaEL01.chDesAbreviada, Validators.required],
        chDescricao: [this.modelFormaCobrancaEL01.chDescricao, Validators.required],
        inCodTipoCobranca: [this.modelFormaCobrancaEL01.inCodTipoCobranca, Validators.required],
        inCodPortador: [this.modelFormaCobrancaEL01.inCodPortador, Validators.required],
        inCodCarteiraCR: [this.modelFormaCobrancaEL01.inCodCarteiraCR, Validators.required],

        inNumDiasValidVenc: [this.modelFormaCobrancaEL01.inNumDiasValidVenc],
        chConvenioCobranca: [this.modelFormaCobrancaEL01.chConvenioCobranca],
        chCodTransmissao: [this.modelFormaCobrancaEL01.chCodTransmissao],
        chCodSeqNossoNum: [this.modelFormaCobrancaEL01.chCodSeqNossoNum],
        chCodSeqRemCob: [this.modelFormaCobrancaEL01.chCodSeqRemCob],
        chNomPastaArqRem: [this.modelFormaCobrancaEL01.chNomPastaArqRem],
        chNomArqRem: [this.modelFormaCobrancaEL01.chNomArqRem],
        chPixChaveRecebedor: [this.modelFormaCobrancaEL01.chPixChaveRecebedor],
        inPixNumSegValidCob: [this.modelFormaCobrancaEL01.inPixNumSegValidCob],
        chPixUrlBase: [this.modelFormaCobrancaEL01.chPixUrlBase],
        chPixUrlTokenBase: [this.modelFormaCobrancaEL01.chPixUrlTokenBase],
        chPixClientID: [this.modelFormaCobrancaEL01.chPixClientID],
        chPixClientSecret: [this.modelFormaCobrancaEL01.chPixClientSecret],
        chPixArqCertificado: [this.modelFormaCobrancaEL01.chPixArqCertificado],
        chPixPassCertificado: [this.modelFormaCobrancaEL01.chPixPassCertificado],
        inPixValidAccessToken: [this.modelFormaCobrancaEL01.inPixValidAccessToken],
        chPixIDLocation: [{value: this.modelFormaCobrancaEL01.chPixIDLocation, disabled: true}],
        chPixURLLocation: [{value: this.modelFormaCobrancaEL01.chPixURLLocation, disabled: true}],
        chPixChaveWebhookConfPag: [{value: this.modelFormaCobrancaEL01.chPixChaveWebhookConfPag, disabled: true}],
        chPixURLWebhookConfPag: [{value: this.modelFormaCobrancaEL01.chPixURLWebhookConfPag, disabled: true}],
        chMsgCobranca: [this.modelFormaCobrancaEL01.chMsgCobranca],
        chViewImpBoletoLocal: [this.modelFormaCobrancaEL01.chViewImpBoletoLocal],
        chViewImpBoletoServer: [this.modelFormaCobrancaEL01.chViewImpBoletoServer],
      });
    }
  }

  private getFormaCobranca() {
    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.operacao = 'inclusao';

      this.modelFormaCobrancaEL01 = new ModelFormaCobrancaEL01();
      this.modelFormaCobrancaEL01.chCodFormaCobranca = null;
      this.modelFormaCobrancaEL01.chDesAbreviada = null;
      this.modelFormaCobrancaEL01.chDescricao = null;
      this.modelFormaCobrancaEL01.inCodTipoCobranca = null;
      this.modelFormaCobrancaEL01.inCodPortador = null;
      this.modelFormaCobrancaEL01.inCodCarteiraCR = null;
      this.modelFormaCobrancaEL01.inNumDiasValidVenc = 0;
      this.modelFormaCobrancaEL01.chConvenioCobranca = null;
      this.modelFormaCobrancaEL01.chCodTransmissao = null;
      this.modelFormaCobrancaEL01.chCodSeqNossoNum = null;
      this.modelFormaCobrancaEL01.chCodSeqRemCob = null;
      this.modelFormaCobrancaEL01.chNomPastaArqRem = null;
      this.modelFormaCobrancaEL01.chNomArqRem = null;
      this.modelFormaCobrancaEL01.chPixChaveRecebedor = null;
      this.modelFormaCobrancaEL01.inPixNumSegValidCob = 0;
      this.modelFormaCobrancaEL01.chPixUrlBase = null;
      this.modelFormaCobrancaEL01.chPixUrlTokenBase = null;
      this.modelFormaCobrancaEL01.chPixClientID = null;
      this.modelFormaCobrancaEL01.chPixClientSecret = null;
      this.modelFormaCobrancaEL01.chPixArqCertificado = null;
      this.modelFormaCobrancaEL01.chPixPassCertificado = null;
      this.modelFormaCobrancaEL01.inPixValidAccessToken = 0;
      this.modelFormaCobrancaEL01.chPixIDLocation = null;
      this.modelFormaCobrancaEL01.chPixURLLocation = null;
      this.modelFormaCobrancaEL01.chPixChaveWebhookConfPag = null;
      this.modelFormaCobrancaEL01.chPixURLWebhookConfPag = null;
      this.modelFormaCobrancaEL01.chMsgCobranca = null;
      this.modelFormaCobrancaEL01.chViewImpBoletoLocal = null;
      this.modelFormaCobrancaEL01.chViewImpBoletoServer = null;

      this.criarForm(true);
    } else {
      this.operacao = 'edicao';

      this.apiFormaCobrancaEL01Service.obter(id).then(
        dados_API => {
          this.modelFormaCobrancaEL01 = dados_API;
          this.criarForm(false);
          this.apiFormaCobrancaEL01Service.chCodFormaCobranca = dados_API.chCodFormaCobranca;
          this.cadastroBarraAcao.esconderAguarde();
          this.configurarStatusForm();
        },
        erro => {
          this.cadastroBarraAcao.esconderAguarde();
          this.apiErrorCollection = erro;
        }
      );
    }

  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelFormaCobrancaEL01);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getFormaCobranca();
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
    this.apiFormaCobrancaEL01Service.excluir(this.modelFormaCobrancaEL01.chCodFormaCobranca).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiFormaCobrancaEL01Service.alterar(this.modelFormaCobrancaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelFormaCobrancaEL01 = sucesso;
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

  disabled(){
    this.meuForm.get('chCodFormaCobranca').disable();
    this.meuForm.get('inCodTipoCobranca').disable();
    this.meuForm.get('inCodPortador').disable();
    this.meuForm.get('inCodCarteiraCR').disable();
  }

  incluir() {
    this.apiFormaCobrancaEL01Service.criar(this.modelFormaCobrancaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelFormaCobrancaEL01 = sucesso;
        this.disabled();
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
