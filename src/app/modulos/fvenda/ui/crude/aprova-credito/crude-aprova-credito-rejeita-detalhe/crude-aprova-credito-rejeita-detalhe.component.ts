import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSolicCredVendaEL01 } from '../../../../models/model-solic-cred-venda-EL01';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiSolicCredVendaEL01Service } from '../../../../api/api-solic-cred-venda-el01.service';
import { ApiTipoPessoaService } from '../../../../../corp/api/api-tipo-pessoa.service';
import { ApiRepresVendaEL01Service } from '../../../../api/api-repres-venda-el01.service';
import { Location } from "@angular/common";
import { ApiMotivoRejeitaService } from '../../../../api/api-motivo-rejeita.service';
import { ApiCondPagtoVendaService } from '../../../../api/api-cond-pagto-venda.service';
@Component({
  selector: 'app-crude-aprova-credito-rejeita-detalhe',
  templateUrl: './crude-aprova-credito-rejeita-detalhe.component.html',
  styleUrls: ['./crude-aprova-credito-rejeita-detalhe.component.scss']
})
export class CrudeAprovaCreditoRejeitaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  private representante = {
    chNomeRepresentante: '',
    IDRepresentante: 0
  };
  public isCNPJ: boolean = false;
  public isCPF: boolean = false;
  public maskTipoPessoa: string = "";
  public meuForm: FormGroup;
  public modelSolicCredVendaEL01: ModelSolicCredVendaEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSolicCredVendaEL01Service: ApiSolicCredVendaEL01Service,
    public apiTipoPessoaService: ApiTipoPessoaService,
    public apiRepresVendaEL01Service: ApiRepresVendaEL01Service,
    public apiCondPagtoVendaService: ApiCondPagtoVendaService,
    public apiMotivoRejeitaService: ApiMotivoRejeitaService,
    private _location: Location,
    private router: Router
  ) {
    this.modelSolicCredVendaEL01 = new ModelSolicCredVendaEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();

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

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSolicCredVendaEL01();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('CpfCnpj').disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    this.representante.chNomeRepresentante = this.modelSolicCredVendaEL01.chNomeRepresentante;
    this.representante.IDRepresentante = this.modelSolicCredVendaEL01.IDRepresentante;

    var UIData_Representante = (this.representante.IDRepresentante > 0 ? this.representante : null);
    this.modelSolicCredVendaEL01['UIData_Representante'] = UIData_Representante;

    var CpfCnpj: string = (this.modelSolicCredVendaEL01.inNumIdentifCliente > 0 ? (this.modelSolicCredVendaEL01.inCodTipoPessoa == 1) ? (this.modelSolicCredVendaEL01.inNumIdentifCliente + '').padStart(11, "0") : (this.modelSolicCredVendaEL01.inNumIdentifCliente + '').padStart(14, "0") : '');
    this.modelSolicCredVendaEL01['CpfCnpj'] = CpfCnpj;

    if (this.modelSolicCredVendaEL01.dtDatSolic) {
      this.modelSolicCredVendaEL01.dtDatSolic = new Date(this.modelSolicCredVendaEL01.dtDatSolic);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSolicCredVendaEL01, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        IDSolicCredVenda: [this.modelSolicCredVendaEL01.IDSolicCredVenda],
        dtDatSolic: [this.modelSolicCredVendaEL01.dtDatSolic],
        chNomeUsuarioSolic: [this.modelSolicCredVendaEL01.chNomeUsuarioSolic],
        UIData_Representante: [UIData_Representante],
        CpfCnpj: [CpfCnpj],
        chNomeCliente: [this.modelSolicCredVendaEL01.chNomeCliente],
        chCodCondPagtoVenda: [this.modelSolicCredVendaEL01.chCodCondPagtoVenda],
        deValPedVenda: [this.modelSolicCredVendaEL01.deValPedVenda],
        deValCredSolic: [this.modelSolicCredVendaEL01.deValCredSolic],
        //chDesObservacao: [this.modelSolicCredVendaEL01.chDesObservacao],
        chNomeUsuarioAprov: [this.modelSolicCredVendaEL01.chNomeUsuarioAprov],
        deValCredAprov: [this.modelSolicCredVendaEL01.deValCredAprov, Validators.required],
        chDesMotivoRejeita: [this.modelSolicCredVendaEL01.chDesMotivoRejeita],
        chDesMotivo: [this.modelSolicCredVendaEL01.chDesMotivo],
        chDesSituacaoSolicCred: [this.modelSolicCredVendaEL01.chDesSituacaoSolicCred],
        inCodMotivoRejeita: [this.modelSolicCredVendaEL01.inCodMotivoRejeita, Validators.required]
      });
    }
  }

  private getSolicCredVendaEL01() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSolicCredVendaEL01 = new ModelSolicCredVendaEL01();
      this.modelSolicCredVendaEL01.IDSolicCredVenda = 0;
      this.modelSolicCredVendaEL01.dtDatSolic = null;
      this.modelSolicCredVendaEL01.chNomeUsuarioSolic = "";
      this.modelSolicCredVendaEL01.inNumIdentifCliente = null;
      this.modelSolicCredVendaEL01.IDRepresentante = null;
      this.modelSolicCredVendaEL01.chCodCondPagtoVenda = "";
      this.modelSolicCredVendaEL01.inCodTipoPessoa = null;
      this.modelSolicCredVendaEL01.deValPedVenda = null;
      this.modelSolicCredVendaEL01.deValCredSolic = null;
      //this.modelSolicCredVendaEL01.chDesObservacao = "";
      this.modelSolicCredVendaEL01.chNomeUsuarioAprov = "";
      this.modelSolicCredVendaEL01.deValCredAprov = null;
      this.modelSolicCredVendaEL01.chDesMotivoRejeita = "";
      this.modelSolicCredVendaEL01.chDesMotivo = "";
      this.modelSolicCredVendaEL01.chDesSituacaoSolicCred = "";
      this.modelSolicCredVendaEL01.chNomeCliente = "";
      this.modelSolicCredVendaEL01.deValCredAprov = null;
      this.modelSolicCredVendaEL01.inCodMotivoRejeita = null;

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiSolicCredVendaEL01Service.obter(id).then(
        dados_API => {

          this.modelSolicCredVendaEL01 = dados_API;

          if (this.modelSolicCredVendaEL01.inCodTipoPessoa == 1) {
            this.maskTipoPessoa = "000.000.000-00";
            this.isCPF = true;
            this.isCNPJ = false;
          } else {
            this.maskTipoPessoa = "00.000.000/0000-00";
            this.isCPF = false;
            this.isCNPJ = true;
          }
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSolicCredVendaEL01);

    this.modelSolicCredVendaEL01.inNumIdentifCliente = this.meuForm.value.CpfCnpj;
    this.modelSolicCredVendaEL01.inCodTipoDocumento = this.modelSolicCredVendaEL01.inCodTipoPessoa;
    if (this.meuForm.value.UIData_Representante) {
      this.modelSolicCredVendaEL01.chNomeRepresentante = this.meuForm.value.UIData_Representante.chNomeRepresentante;
      this.modelSolicCredVendaEL01.IDRepresentante = this.meuForm.value.UIData_Representante.IDRepresentante;
    } else {
      this.modelSolicCredVendaEL01.chNomeRepresentante = '';
      this.modelSolicCredVendaEL01.IDRepresentante = null;
    }
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSolicCredVendaEL01();
    this.cadastroBarraAcao.esconderAguarde();
    this._location.back();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde(()=>{
      this.coletarDadosForm();
      this.modelSolicCredVendaEL01.inCodSituacaoSolicCred = 4;
      if (this.operacao == 'edicao') {
        this.alterar();
      } else {
        this.incluir();
      }
    });
  }

  btnExcluir() {
    this.apiSolicCredVendaEL01Service.excluir(this.modelSolicCredVendaEL01.IDSolicCredVenda).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSolicCredVendaEL01Service.alterar(this.modelSolicCredVendaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSolicCredVendaEL01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this._location.back();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

  incluir() {
    this.apiSolicCredVendaEL01Service.criar(this.modelSolicCredVendaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSolicCredVendaEL01 = sucesso;
        this.meuForm.get('CpfCnpj').disable();
        this.criarForm(false);
        this.operacao = 'edicao';
        this.cadastroBarraAcao.esconderAguarde();
        this._location.back();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }
}