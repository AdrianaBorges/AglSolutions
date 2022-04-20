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
import { ApiClienteEL02Service } from '../../../../api/api-cliente-el02.service';
import { Location } from "@angular/common";
import { ApiCondPagtoVendaService } from '../../../../api/api-cond-pagto-venda.service';
@Component({
  selector: 'app-crude-solicita-credito-reajuste-detalhe',
  templateUrl: './crude-solicita-credito-reajuste-detalhe.component.html',
  styleUrls: ['./crude-solicita-credito-reajuste-detalhe.component.scss']
})
export class CrudeSolicitaCreditoReajusteDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  private representante = {
    chNomeRepresentante: '',
    inCodRepresentante: 0
  };

  private cliente = {
    chNomeCliente: '',
    IDClienteVenda: 0,
    inCodCliente: 0
  };
  public meuForm: FormGroup;
  public modelSolicCredVendaEL01: ModelSolicCredVendaEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private consulta: boolean;
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSolicCredVendaEL01Service: ApiSolicCredVendaEL01Service,
    public apiTipoPessoaService: ApiTipoPessoaService,
    public apiRepresVendaEL01Service: ApiRepresVendaEL01Service,
    public apiCondPagtoVendaService: ApiCondPagtoVendaService,
    public apiClienteEL02Service: ApiClienteEL02Service,
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
      this.meuForm.get('UIData_Cliente').disable();
    }

  }

  private criarForm(emEdicao: boolean) {
    this.representante.chNomeRepresentante = this.modelSolicCredVendaEL01.chNomeRepresentante;
    this.representante.inCodRepresentante = this.modelSolicCredVendaEL01.inCodRepresentante;

    var UIData_Representante = (this.representante.inCodRepresentante > 0 ? this.representante : null);
    this.modelSolicCredVendaEL01['UIData_Representante'] = UIData_Representante;

    this.cliente.chNomeCliente = this.modelSolicCredVendaEL01.chNomeCliente;
    this.cliente.inCodCliente = this.modelSolicCredVendaEL01.inCodCliente;
    this.cliente.IDClienteVenda = this.modelSolicCredVendaEL01.IDClienteVenda;

    var UIData_Cliente = (this.cliente.IDClienteVenda > 0 ? this.cliente : null);
    this.modelSolicCredVendaEL01['UIData_Cliente'] = UIData_Cliente;

    if (this.modelSolicCredVendaEL01.dtDatSolic) {
      this.modelSolicCredVendaEL01.dtDatSolic = new Date(this.modelSolicCredVendaEL01.dtDatSolic);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSolicCredVendaEL01, emEdicao);
      if (this.modelSolicCredVendaEL01.inCodSituacaoSolicCred) {
        if (this.modelSolicCredVendaEL01.inCodSituacaoSolicCred != 1 && this.modelSolicCredVendaEL01.inCodSituacaoSolicCred != 2) {
          this.cadastroBarraAcao.setModoConsulta();
        }
      }
    }
    else {
      this.meuForm = this.formB.group({
        IDSolicCredVenda: [this.modelSolicCredVendaEL01.IDSolicCredVenda],
        dtDatSolic: [this.modelSolicCredVendaEL01.dtDatSolic],
        chNomeUsuarioSolic: [this.modelSolicCredVendaEL01.chNomeUsuarioSolic],
        UIData_Representante: [UIData_Representante, Validators.required],
        UIData_Cliente: [UIData_Cliente, Validators.required],
        chCodCondPagtoVenda: [this.modelSolicCredVendaEL01.chCodCondPagtoVenda, Validators.required],
        deValPedVenda: [this.modelSolicCredVendaEL01.deValPedVenda],
        deValCredSolic: [this.modelSolicCredVendaEL01.deValCredSolic, Validators.required],
        //chDesObservacao: [this.modelSolicCredVendaEL01.chDesObservacao],
        chNomeUsuarioAprov: [this.modelSolicCredVendaEL01.chNomeUsuarioAprov],
        deValCredAprov: [this.modelSolicCredVendaEL01.deValCredAprov],
        chDesMotivoRejeita: [this.modelSolicCredVendaEL01.chDesMotivoRejeita],
        chDesMotivo: [this.modelSolicCredVendaEL01.chDesMotivo],
        chDesSituacaoSolicCred: [this.modelSolicCredVendaEL01.chDesSituacaoSolicCred],
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
      this.modelSolicCredVendaEL01.IDClienteVenda = null;
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

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiSolicCredVendaEL01Service.obter(id).then(
        dados_API => {

          this.modelSolicCredVendaEL01 = dados_API;
          this.operacao = 'edicao';
          this.criarForm(false);
        },
        erro => {
          this.apiErrorCollection = erro;
        }
      );
    }

  }
  mudancaCondpagto(dado: any) {
    this.apiClienteEL02Service.obter(dado.IDCliente).then(r => {
      this.meuForm.get('chCodCondPagtoVenda').setValue(r.chCodCondPagtoVenda);
      this.representante.inCodRepresentante = r.inCodRepresentante;
      this.representante.chNomeRepresentante = r.chNomeRepresentante;
      this.representante["objetoSelecionado"] = {
        IDRepresentante: r.IDRepresentante
      };
      this.modelSolicCredVendaEL01["UIData_Representante"] = this.representante;
      this.meuForm.get('UIData_Representante').setValue(this.representante);
    });
  }
  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSolicCredVendaEL01);

    if (this.meuForm.value.UIData_Representante) {
      this.modelSolicCredVendaEL01.chNomeRepresentante = this.meuForm.value.UIData_Representante.chNomeRepresentante;
      this.modelSolicCredVendaEL01.inCodRepresentante = this.meuForm.value.UIData_Representante.inCodRepresentante;
      if (this.meuForm.value.UIData_Representante.objetoSelecionado) {
        this.modelSolicCredVendaEL01.IDRepresentante = this.meuForm.value.UIData_Representante.objetoSelecionado.IDRepresentante;
      }
    } else {
      this.modelSolicCredVendaEL01.chNomeRepresentante = '';
      this.modelSolicCredVendaEL01.IDRepresentante = null;
    }

    if (this.meuForm.value.UIData_Cliente) {
      this.modelSolicCredVendaEL01.chNomeCliente = this.meuForm.value.UIData_Cliente.chNomeCliente;
      if (this.meuForm.value.UIData_Cliente.objetoSelecionado) {
        this.modelSolicCredVendaEL01.IDClienteVenda = this.meuForm.value.UIData_Cliente.objetoSelecionado.IDClienteVenda;
      }
    } else {
      this.modelSolicCredVendaEL01.chNomeCliente = '';
      this.modelSolicCredVendaEL01.IDClienteVenda = null;
    }
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSolicCredVendaEL01();
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
        this.configurarStatusForm();
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
    this.apiSolicCredVendaEL01Service.criar(this.modelSolicCredVendaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSolicCredVendaEL01 = sucesso;
        this.meuForm.get('UIData_Cliente').disable();
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
