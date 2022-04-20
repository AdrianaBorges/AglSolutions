import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ModelPortador } from '../../../../models/model-portador';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { Location } from '@angular/common';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPortadorService } from '../../../../api/api-portador.service';
import { ApiSequeciaService } from '../../../../../corp/api/api-sequecia.service';
import { ApiBancoService } from '../../../../api/api-banco.service';
@Component({
  selector: 'app-crude-portador-detalhe',
  templateUrl: './crude-portador-detalhe.component.html',
  styleUrls: ['./crude-portador-detalhe.component.scss']
})
export class CrudePortadorDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelPortador: ModelPortador;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private chSeqNossoNum: string;
  private chSeqRemCob: string;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPortadorService: ApiPortadorService,
    public apiSequenciaNumService: ApiSequeciaService,
    public apiSequenciaRemService: ApiSequeciaService,
    public apiBancoService: ApiBancoService,
    private _location: Location,
  ) {
    this.modelPortador = new ModelPortador();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getPortador();

  }
  valorAlteradoSeqNossoNum(id: string) {
    this.chSeqNossoNum = id;
  }

  valorAlteradoSeqRemCob(id: string) {
    this.chSeqRemCob = id;
  }
  private criarBreadCrumbs() {
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'cond-pagto',
        url: '/modulos/finan/portador'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm() {

    let id: number = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodPortador').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPortador, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodPortador: new FormControl(this.modelPortador.inCodPortador, [Validators.required]),
        chNomAbreviado: new FormControl(this.modelPortador.chNomAbreviado, [Validators.required, Validators.maxLength(25)]),
        chNome: new FormControl(this.modelPortador.chNome, [Validators.required, Validators.maxLength(50)]),
        inCodBanco: new FormControl(this.modelPortador.inCodBanco),
        chAgencia: new FormControl(this.modelPortador.chAgencia),
        chDVAgencia: new FormControl(this.modelPortador.chDVAgencia),
        chConta: new FormControl(this.modelPortador.chConta),
        chDVConta: new FormControl(this.modelPortador.chDVConta),
        chCodSeqNossoNum: new FormControl(this.modelPortador.chCodSeqNossoNum),
        chCodSeqRemCob: new FormControl(this.modelPortador.chCodSeqRemCob),
        chConvenioCobranca: new FormControl(this.modelPortador.chConvenioCobranca),
        chCodTransmissao: new FormControl(this.modelPortador.chCodTransmissao),
        chNomPastaArqRem: new FormControl(this.modelPortador.chNomPastaArqRem),
        chNomArqRem: new FormControl(this.modelPortador.chNomArqRem),
      });
    }

  }

  private getPortador() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelPortador = new ModelPortador();
      this.modelPortador.inCodPortador = null;
      this.modelPortador.chNomAbreviado = "";
      this.modelPortador.chNomArqRem = "";
      this.modelPortador.chNomPastaArqRem = "";
      this.modelPortador.chNome = "";
      this.modelPortador.chAgencia = "";
      this.modelPortador.inCodBanco = null;
      this.modelPortador.chDVAgencia = "";
      this.modelPortador.chDVConta = "";
      this.modelPortador.chConta = "";
      this.modelPortador.chCodSeqNossoNum = null;
      this.modelPortador.chCodSeqRemCob = null;
      this.modelPortador.chCodTransmissao = "";
      this.modelPortador.chConvenioCobranca = "";
      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiPortadorService.pesquisarPorId(id).then(
        dados_API => {
          this.modelPortador = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPortador);

    this.modelPortador.chCodSeqNossoNum = this.chSeqNossoNum;
    this.modelPortador.chCodSeqRemCob = this.chSeqRemCob;

  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getPortador();
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
    this.apiPortadorService.excluir(this.modelPortador.inCodPortador).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiPortadorService.alterar(this.modelPortador).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPortador = sucesso;
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
    this.apiPortadorService.criar(this.modelPortador).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPortador = sucesso;
        this.meuForm.get('inCodPortador').disable();
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

  inputCondicaoKeyup(event: any) {
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.keyCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }

  }
}
