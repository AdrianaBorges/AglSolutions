import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSolicAprovPVEL01 } from '../../../../models/model-solic-aprov-pv-EL01';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ApiSolicAprovPVEL01Service } from '../../../../api/api-solic-aprov-pv-el01.service';
import { ApiClienteEL02Service } from '../../../../api/api-cliente-el02.service';
import { ApiRepresVendaEL01Service } from '../../../../api/api-repres-venda-el01.service';
import { ApiMotRejSolAprPvService } from '../../../../api/api-mot-rej-sol-apr-pv.service';
import { timer } from 'rxjs';



@Component({
  selector: 'app-crude-aprova-ped-bonif-rejeita-detalhe',
  templateUrl: './crude-aprova-ped-bonif-rejeita-detalhe.component.html',
  styleUrls: ['./crude-aprova-ped-bonif-rejeita-detalhe.component.scss']
})
export class CrudeAprovaPedBonifRejeitaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  private representante = {
    chNomeRepresentante: '',
    inCodRepresentante: 0,
    IDRepresentante: 0
  };
  private cliente = {
    chNomeCliente: '',
    IDClienteVenda: 0,
    inCodCliente: 0
  };
  public maskTipoPessoa: string = "";
  public meuForm: FormGroup;
  public modelSolicAprovPVEL01: ModelSolicAprovPVEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,

    public apiSolicAprovPvEL01Service: ApiSolicAprovPVEL01Service,
    public apiMotRejSolAprPvService: ApiMotRejSolAprPvService,
    public apiClienteEL02Service: ApiClienteEL02Service,
    public apiRepresVendaEL01Service: ApiRepresVendaEL01Service,
    private _location: Location,
    private router: Router
  ) {
    this.modelSolicAprovPVEL01 = new ModelSolicAprovPVEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSolicAprovPVEL01();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {
    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.disabled();
    }
  }

  private criarForm(emEdicao: boolean) {
    this.representante.chNomeRepresentante = this.modelSolicAprovPVEL01.chNomeRepresentante;
    this.representante.IDRepresentante = this.modelSolicAprovPVEL01.IDRepresentante;
    this.representante.inCodRepresentante = this.modelSolicAprovPVEL01.inCodRepresentante;

    var UIData_Representante = (this.representante.IDRepresentante > 0 ? this.representante : null);
    this.modelSolicAprovPVEL01['UIData_Representante'] = UIData_Representante;


    this.cliente.chNomeCliente = this.modelSolicAprovPVEL01.chNomeCliente;
    this.cliente.IDClienteVenda = this.modelSolicAprovPVEL01.IDClienteVenda;
    this.cliente.inCodCliente = this.modelSolicAprovPVEL01.inCodCliente;

    var UIData_Cliente = (this.cliente.IDClienteVenda > 0 ? this.cliente : null);
    this.modelSolicAprovPVEL01['UIData_Cliente'] = UIData_Cliente;


    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSolicAprovPVEL01, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        IDSolicAprovPV: [{value: this.modelSolicAprovPVEL01.IDSolicAprovPV, disabled: true}],
        UIData_Representante: UIData_Representante,
        UIData_Cliente: UIData_Cliente,
        dtDatSolic: [{value: this.modelSolicAprovPVEL01.dtDatSolic, disabled: true}],
        chCodUsuarioSolic: [this.modelSolicAprovPVEL01.chCodUsuarioSolic],
        chNomeUsuarioSolic: [{value: this.modelSolicAprovPVEL01.chNomeUsuarioSolic, disabled: true}],
        chEMailUsuarioSolic: [this.modelSolicAprovPVEL01.chEMailUsuarioSolic],
        inCodSituacaoSolAprPV: [this.modelSolicAprovPVEL01.inCodSituacaoSolAprPV],
        chDesSituacaoSolAprPV: [{value: this.modelSolicAprovPVEL01.chDesSituacaoSolAprPV, disabled: true}],
        IDClienteVenda: [this.modelSolicAprovPVEL01.IDClienteVenda],
        IDCliente: [this.modelSolicAprovPVEL01.IDCliente],
        IDPapelPessoaCliente: [this.modelSolicAprovPVEL01.IDPapelPessoaCliente],
        IDPessoaCliente: [this.modelSolicAprovPVEL01.IDPessoaCliente],
        inCodTipoPessoaCliente: [this.modelSolicAprovPVEL01.inCodTipoPessoaCliente],
        chDesTipoPessoaCliente: [this.modelSolicAprovPVEL01.chDesTipoPessoaCliente],
        inCodTipoDocumentoCliente: [this.modelSolicAprovPVEL01.inCodTipoDocumentoCliente],
        chDesTipoDocumentoCliente: [this.modelSolicAprovPVEL01.chDesTipoDocumentoCliente],
        inNumIdentifCliente: [this.modelSolicAprovPVEL01.inNumIdentifCliente],
        inCodCliente: [{value: this.modelSolicAprovPVEL01.inCodCliente, disabled: true}],
        chNomAbrevCliente: [this.modelSolicAprovPVEL01.chNomAbrevCliente],
        chNomeCliente: [this.modelSolicAprovPVEL01.chNomeCliente],
        IDRepresentante: [this.modelSolicAprovPVEL01.IDRepresentante],
        IDPapelPessoaRepresentante: [this.modelSolicAprovPVEL01.IDPapelPessoaRepresentante],
        IDPessoaRepresentante: [this.modelSolicAprovPVEL01.IDPessoaRepresentante],
        inCodTipoPessoaRepresentante: [this.modelSolicAprovPVEL01.inCodTipoPessoaRepresentante],
        chDesTipoPessoaRepresentante: [this.modelSolicAprovPVEL01.chDesTipoPessoaRepresentante],
        inCodTipoDocumentoRepresentante: [this.modelSolicAprovPVEL01.inCodTipoDocumentoRepresentante],
        chDesTipoDocumentoRepresentante: [this.modelSolicAprovPVEL01.chDesTipoDocumentoRepresentante],
        inNumIdentifRepresentante: [this.modelSolicAprovPVEL01.inNumIdentifRepresentante],
        inCodRepresentante: [{value: this.modelSolicAprovPVEL01.inCodRepresentante, disabled: true}],
        chNomeAbrevRepresentante: [this.modelSolicAprovPVEL01.chNomeAbrevRepresentante],
        chNomeRepresentante: [this.modelSolicAprovPVEL01.chNomeRepresentante],
        deValBonific: [{value: this.modelSolicAprovPVEL01.deValBonific, disabled: true}],
        deValVenda: [{value: this.modelSolicAprovPVEL01.deValVenda, disabled: true}],
        dePercBonifXVenda: [{value: this.modelSolicAprovPVEL01.dePercBonifXVenda, disabled: true}],
        chDesObservacao: [{value: this.modelSolicAprovPVEL01.chDesObservacao, disabled: true}],
        chCodUsuarioAprov: [this.modelSolicAprovPVEL01.chCodUsuarioAprov],
        chNomeUsuarioAprov: [this.modelSolicAprovPVEL01.chNomeUsuarioAprov],
        chEMailUsuarioAprov: [this.modelSolicAprovPVEL01.chEMailUsuarioAprov],
        inCodMotRejSolAprPV: [this.modelSolicAprovPVEL01.inCodMotRejSolAprPV, Validators.required],
        chDesMotRejSolAprPV: [this.modelSolicAprovPVEL01.chDesMotRejSolAprPV],
        chDesMotivo: [this.modelSolicAprovPVEL01.chDesMotivo],
        dtDatInclusao: [this.modelSolicAprovPVEL01.dtDatInclusao],
        dtDatUltAlteracao: [this.modelSolicAprovPVEL01.dtDatUltAlteracao],
      });
    }
  }

  private getSolicAprovPVEL01() {
    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSolicAprovPVEL01 = new ModelSolicAprovPVEL01();
      this.modelSolicAprovPVEL01.IDSolicAprovPV = 0;
      this.modelSolicAprovPVEL01.dtDatSolic = null;
      this.modelSolicAprovPVEL01.chCodUsuarioSolic = "";
      this.modelSolicAprovPVEL01.chNomeUsuarioSolic = "";
      this.modelSolicAprovPVEL01.chEMailUsuarioSolic = "";
      this.modelSolicAprovPVEL01.inCodSituacaoSolAprPV = 0;
      this.modelSolicAprovPVEL01.chDesSituacaoSolAprPV = null;
      this.modelSolicAprovPVEL01.IDClienteVenda = 0;
      this.modelSolicAprovPVEL01.IDCliente = 0;
      this.modelSolicAprovPVEL01.IDPapelPessoaCliente = 0;
      this.modelSolicAprovPVEL01.IDPessoaCliente = 0;
      this.modelSolicAprovPVEL01.inCodTipoPessoaCliente = 0;
      this.modelSolicAprovPVEL01.chDesTipoPessoaCliente = "";
      this.modelSolicAprovPVEL01.inCodTipoDocumentoCliente = 0;
      this.modelSolicAprovPVEL01.chDesTipoDocumentoCliente = "";
      this.modelSolicAprovPVEL01.inNumIdentifCliente = 0;
      this.modelSolicAprovPVEL01.inCodCliente = 0;
      this.modelSolicAprovPVEL01.chNomAbrevCliente = "";
      this.modelSolicAprovPVEL01.chNomeCliente = "";
      this.modelSolicAprovPVEL01.IDRepresentante = 0;
      this.modelSolicAprovPVEL01.IDPapelPessoaRepresentante = 0;
      this.modelSolicAprovPVEL01.IDPessoaRepresentante = 0;
      this.modelSolicAprovPVEL01.inCodTipoPessoaRepresentante = 0;
      this.modelSolicAprovPVEL01.chDesTipoPessoaRepresentante = "";
      this.modelSolicAprovPVEL01.inCodTipoDocumentoRepresentante = 0;
      this.modelSolicAprovPVEL01.inCodTipoDocumentoCliente = 0;
      this.modelSolicAprovPVEL01.chDesTipoDocumentoRepresentante = "";
      this.modelSolicAprovPVEL01.inNumIdentifRepresentante = 0;
      this.modelSolicAprovPVEL01.inCodRepresentante = 0;
      this.modelSolicAprovPVEL01.chNomeAbrevRepresentante = "";
      this.modelSolicAprovPVEL01.chNomeRepresentante = "";
      this.modelSolicAprovPVEL01.deValBonific = 0;
      this.modelSolicAprovPVEL01.deValVenda = 0;
      this.modelSolicAprovPVEL01.dePercBonifXVenda = 0;
      this.modelSolicAprovPVEL01.chDesObservacao = "";
      this.modelSolicAprovPVEL01.chCodUsuarioAprov = "";
      this.modelSolicAprovPVEL01.chNomeUsuarioAprov = "";
      this.modelSolicAprovPVEL01.chEMailUsuarioAprov = "";
      this.modelSolicAprovPVEL01.inCodMotRejSolAprPV = 0;
      this.modelSolicAprovPVEL01.chDesMotRejSolAprPV = "";
      this.modelSolicAprovPVEL01.chDesMotivo = "";
      this.modelSolicAprovPVEL01.dtDatInclusao = null;
      this.modelSolicAprovPVEL01.dtDatUltAlteracao = null;

      this.operacao = 'inclusao';
      this.criarForm(true);
    }else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


      //carrego os dados da pessoa física do id recebido 
      this.apiSolicAprovPvEL01Service.obter(id).then(
        pessoa => {
          this.modelSolicAprovPVEL01 = pessoa;
          this.criarForm(false);
          this.cadastroBarraAcao.esconderAguarde();
        },
        erro => {
          this.cadastroBarraAcao.esconderAguarde();
          this.apiErrorCollection = erro;
        }
      );
    }
  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSolicAprovPVEL01);

    if (this.meuForm.value.UIData_Representante) {
      this.modelSolicAprovPVEL01.chNomeRepresentante = this.meuForm.value.UIData_Representante.chNomeRepresentante;
      this.modelSolicAprovPVEL01.IDRepresentante = this.meuForm.value.UIData_Representante.IDRepresentante;
    } else {
      this.modelSolicAprovPVEL01.chNomeRepresentante = '';
      this.modelSolicAprovPVEL01.IDRepresentante = null;
    }
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSolicAprovPVEL01();
    this.cadastroBarraAcao.esconderAguarde();
    this._location.back();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde(() => {
      this.coletarDadosForm();
      this.modelSolicAprovPVEL01.inCodSituacaoSolAprPV = 4;
      this.alterar();
      // if (this.operacao == 'edicao') {
        
      // } else {
      //   this.incluir();
      // }
    });
  }

  btnExcluir() {
    this.apiSolicAprovPvEL01Service.excluir(this.modelSolicAprovPVEL01.IDSolicAprovPV).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSolicAprovPvEL01Service.alterar(this.modelSolicAprovPVEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSolicAprovPVEL01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();

        this.cadastroBarraAcao.setModoConsulta();
        this._location.back();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }
  disabled() {
    this.meuForm.get('IDSolicAprovPV').disable();
    this.meuForm.get('dtDatSolic').disable();
    this.meuForm.get('chNomeUsuarioSolic').disable();
    this.meuForm.get('UIData_Cliente').disable();
    this.meuForm.get('UIData_Representante').disable();
    this.meuForm.get('deValBonific').disable();
    this.meuForm.get('deValVenda').disable();
    this.meuForm.get('dePercBonifXVenda').disable();
    this.meuForm.get('chDesObservacao').disable();
    this.meuForm.get('chDesSituacaoSolAprPV').disable();
    this.meuForm.get('dtDatInclusao').disable();
    this.meuForm.get('dtDatUltAlteracao').disable();
  }
  incluir() {
    this.apiSolicAprovPvEL01Service.criar(this.modelSolicAprovPVEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSolicAprovPVEL01 = sucesso;
        this.disabled();
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

