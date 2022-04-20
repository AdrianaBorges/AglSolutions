import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';

import { ApiCidadeService } from '../../../../../corp/api/api-cidade.service';
import { ApiUfService } from '../../../../../corp/api/api-uf.service';
import { ApiPaisService } from '../../../../../corp/api/api-pais.service';
import { ApiTipoPessoaService } from '../../../../../corp/api/api-tipo-pessoa.service';

import { ApiTranspEl01Service } from '../../../../api/api-transp-el01.service';
import { ModelTranspEL01 } from '../../../../models/model-transp-EL01';
import { Location } from "@angular/common";

@Component({
  selector: 'app-crude-transp-detalhe',
  templateUrl: './crude-transp-detalhe.component.html',
  styleUrls: ['./crude-transp-detalhe.component.scss']
})
export class CrudeTranspDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public isCNPJ: boolean = false;
  public isCPF: boolean = false;
  public maskTipoPessoa: string = "";

  public meuForm: FormGroup;
  public ModelTranspEL01: ModelTranspEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiTranspEl01Service: ApiTranspEl01Service,
    public apiPaisService: ApiPaisService,
    public apiCidadeService: ApiCidadeService,
    public apiUFService: ApiUfService,
    public apiTipoPessoaService: ApiTipoPessoaService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.ModelTranspEL01 = new ModelTranspEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTransportadora();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('IDTransp').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    var CpfCnpj: string = (this.ModelTranspEL01.inNumIdentificacao > 0 ? (this.ModelTranspEL01.inCodTipoPessoa == 1) ? (this.ModelTranspEL01.inNumIdentificacao + '').padStart(11, "0") : (this.ModelTranspEL01.inNumIdentificacao + '').padStart(14, "0") : '');
    this.ModelTranspEL01['CpfCnpj'] = CpfCnpj;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.ModelTranspEL01, emEdicao);
    } else {
      this.meuForm = this.formB.group({

        IDTransp: [{ value: this.ModelTranspEL01.IDTransp, disabled: true}],
        inCodTransp: [{ value: this.ModelTranspEL01.inCodTransp, disabled: true}],
        chNomAbreviado: [this.ModelTranspEL01.chNomAbreviado, Validators.required],
        inNumIdentificacao: [this.ModelTranspEL01.inNumIdentificacao],
        chNome: [this.ModelTranspEL01.chNome, Validators.required],
        IDPais: [this.ModelTranspEL01.IDPais],
        IDUF: [this.ModelTranspEL01.IDUF],
        IDCidade: [this.ModelTranspEL01.IDCidade],
        chEmail: [this.ModelTranspEL01.chEmail],
        chDDDTelefone: [this.ModelTranspEL01.chEmail],
        chNumTelefone: [this.ModelTranspEL01.chEmail],
        inCodTipoPessoa: [this.ModelTranspEL01.inCodTipoPessoa],
        CpfCnpj: [CpfCnpj],
        chDesSituacaoCad: [{value: this.ModelTranspEL01.chDesSituacaoCad, disabled: true}]
      });
    }

  }

  private getTransportadora() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      this.ModelTranspEL01 = new ModelTranspEL01();
      this.ModelTranspEL01.IDTransp = null;
      this.ModelTranspEL01.inCodTransp = null;
      this.ModelTranspEL01.chNomAbreviado = '';
      this.ModelTranspEL01.inNumIdentificacao = null;
      this.ModelTranspEL01.chNome = '';
      this.ModelTranspEL01.IDPais = null;
      this.ModelTranspEL01.IDUF = null;
      this.ModelTranspEL01.IDCidade = null;
      this.ModelTranspEL01.chEmail = '';
      this.ModelTranspEL01.chDDDTelefone = '';
      this.ModelTranspEL01.chNumTelefone = '';

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiTranspEl01Service.obter(id).then(
        dados_API => {
          this.ModelTranspEL01 = dados_API;

          this.alterarMascara(this.ModelTranspEL01.inCodTipoPessoa);

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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.ModelTranspEL01);

    this.ModelTranspEL01.inNumIdentificacao = this.meuForm.value.CpfCnpj;
    this.ModelTranspEL01.inCodTipoDocumento = this.ModelTranspEL01.inCodTipoPessoa;
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTransportadora();
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
    this.apiTranspEl01Service.excluir(this.ModelTranspEL01.IDTransp).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTranspEl01Service.alterar(this.ModelTranspEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.ModelTranspEL01 = sucesso;
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
    this.apiTranspEl01Service.criar(this.ModelTranspEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.ModelTranspEL01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('IDTransp').disable();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

  alterarMascara(dado) {
    if (dado == 1) {
      this.maskTipoPessoa = "000.000.000-00";
      this.isCPF = true;
      this.isCNPJ = false;
    } else {
      this.maskTipoPessoa = "00.000.000/0000-00";
      this.isCPF = false;
      this.isCNPJ = true;
    }
  }

}
