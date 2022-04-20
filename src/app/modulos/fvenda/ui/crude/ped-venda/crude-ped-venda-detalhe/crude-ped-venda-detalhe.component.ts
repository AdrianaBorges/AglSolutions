import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ApiClienteEL02Service } from '../../../../api/api-cliente-el02.service';
import { ApiRepresVendaEL01Service } from '../../../../api/api-repres-venda-el01.service';
import { ApiPedVendaEL01Service } from '../../../../api/api-ped-venda-el01.service';
import { ApiEstabelecimentoService } from '../../../../../corp/api/api-estabelecimento.service';
import { ModelPedVendaEL01 } from '../../../../models/model-ped-venda-EL01';
import { ApiPedVendaItemEL01Service } from '../../../../api/api-ped-venda-item-el01.service';
import { ApiTipoPedidoEl01Service } from '../../../../api/api-tipo-pedido-el01.service';
import { FiltroMultiselectComponent } from '../../../../../../componentes/filtro-multiselect/filtro-multiselect.component';
import { ApiOrigemPedVenService } from '../../../../api/api-origem-ped-ven.service';
import { ApiTipoFreteService } from '../../../../api/api-tipo-frete.service';
import { ApiTranspEl01Service } from '../../../../api/api-transp-el01.service';
import { ApiTabPrecoEL01Service } from '../../../../api/api-tab-preco-el01.service';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { ApiCondPagtoVendaService } from '../../../../api/api-cond-pagto-venda.service';

@Component({
  selector: 'app-crude-ped-venda-detalhe',
  templateUrl: './crude-ped-venda-detalhe.component.html',
  styleUrls: ['./crude-ped-venda-detalhe.component.scss']
})
export class CrudePedVendaDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('TipoPedido', { static: true }) tipoPedido: FiltroMultiselectComponent;
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
  public modelPedVendaEL01: ModelPedVendaEL01;
  public apiErrorCollection: ApiErrorCollection;
  public filtroPadrao_TipoPedido = this.setFiltroPadrao_TipoPedido()

  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,

    public apiPedVendaEL01Service: ApiPedVendaEL01Service,
    public apiPedVendaItemEL01Service: ApiPedVendaItemEL01Service,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    public apiClienteEL02Service: ApiClienteEL02Service,
    public apiRepresVendaEL01Service: ApiRepresVendaEL01Service,
    public apiTipoPedidoEl01Service: ApiTipoPedidoEl01Service,
    public apiOrigemPedVenService: ApiOrigemPedVenService,
    public apiTipoFreteService: ApiTipoFreteService,
    public apiTranspEl01Service: ApiTranspEl01Service,
    public apiTabPrecoEL01Service: ApiTabPrecoEL01Service,
    public apiCondPagtoVendaService: ApiCondPagtoVendaService,
    private _location: Location,
    private router: Router
  ) {
    this.modelPedVendaEL01 = new ModelPedVendaEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }
  setFiltroPadrao_TipoPedido(){
    return `TipoPedido.inCodSituacaoCad~eq~2`;
  }
  gridInterfaceTabCadastroFilho_setIdCadastro(id: string): void {
    this.idCadastro = +id;
    this.carregarDados();
  }
  gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }
  private carregarDados() {
    var id = +this.route.snapshot.paramMap.get("id");
    this.apiPedVendaEL01Service.obter(id).then((programa) => {
      this.modelPedVendaEL01 = programa;
    });
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.getPedVendaEL01();
    this.configurarStatusForm();
  }

  private configurarStatusForm() {
    var id = +this.route.snapshot.paramMap.get('id');

    if(this.modelPedVendaEL01 && this.modelPedVendaEL01.inCodSituacaoPedVen != 1){
      this.cadastroBarraAcao.setModoConsulta();
    }else if (id > 0) {
      this.disabled();
    }
  }

  private criarForm(emEdicao: boolean) {
    this.representante.chNomeRepresentante = this.modelPedVendaEL01.chNomeRepresentante;
    this.representante.IDRepresentante = this.modelPedVendaEL01.IDRepresentante;
    this.representante.inCodRepresentante = this.modelPedVendaEL01.inCodRepresentante;

    var UIData_Representante = (this.representante.IDRepresentante > 0 ? this.representante : null);
    this.modelPedVendaEL01['UIData_Representante'] = UIData_Representante;

    this.cliente.chNomeCliente = this.modelPedVendaEL01.chNomeCliente;
    this.cliente.IDClienteVenda = this.modelPedVendaEL01.IDClienteVenda;
    this.cliente.inCodCliente = this.modelPedVendaEL01.inCodCliente;

    var UIData_Cliente = (this.cliente.IDClienteVenda > 0 ? this.cliente : null);
    this.modelPedVendaEL01['UIData_Cliente'] = UIData_Cliente;

    var UIListTipoPedido = [];
    if (this.modelPedVendaEL01.chLstTipoPedido) {
      UIListTipoPedido = this.modelPedVendaEL01.chLstTipoPedido.split(',');
      this.modelPedVendaEL01['UIListTipoPedido'] = UIListTipoPedido
    }

    if (this.modelPedVendaEL01.daDatLimFatur) {
      this.modelPedVendaEL01.daDatLimFatur = new Date(this.modelPedVendaEL01.daDatLimFatur);
    } 

    if (this.modelPedVendaEL01.daDatBase) {
      this.modelPedVendaEL01.daDatBase = new Date(this.modelPedVendaEL01.daDatBase);
    } 

    if (this.modelPedVendaEL01.daDatEntregaSolic) {
      this.modelPedVendaEL01.daDatEntregaSolic = new Date(this.modelPedVendaEL01.daDatEntregaSolic);
    }

    const agora = new Date();
    const ano = agora.getUTCFullYear()
    const mes = agora.getUTCMonth()
    const dia = agora.getUTCDate()
    const somenteData = new Date(ano, mes, dia, 0, 0, 0)

    if (this.modelPedVendaEL01.daDatEntrada) {
      this.modelPedVendaEL01.daDatEntrada = new Date(this.modelPedVendaEL01.daDatEntrada);
    } else {
      this.modelPedVendaEL01.daDatEntrada = somenteData;
    }

    if (this.modelPedVendaEL01.daDatEmissao) {
      this.modelPedVendaEL01.daDatEmissao = new Date(this.modelPedVendaEL01.daDatEmissao);
    } else {
      this.modelPedVendaEL01.daDatEmissao = somenteData;
    }

    if (this.modelPedVendaEL01.daDatFaturPrev) {
      this.modelPedVendaEL01.daDatFaturPrev = new Date(this.modelPedVendaEL01.daDatFaturPrev);
    }

    if (this.modelPedVendaEL01.daDatEntregaPrev) {
      this.modelPedVendaEL01.daDatEntregaPrev = new Date(this.modelPedVendaEL01.daDatEntregaPrev);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPedVendaEL01, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        UIListTipoPedido: [UIListTipoPedido, Validators.required],
        IDPedVenda: [{value: this.modelPedVendaEL01.IDPedVenda, disabled: true}],
        UIData_Representante: [UIData_Representante, Validators.required],
        UIData_Cliente: [UIData_Cliente, Validators.required],
        IDEstabelec: [this.modelPedVendaEL01.IDEstabelec, Validators.required],
        chCodEstabelec: [this.modelPedVendaEL01.chCodEstabelec],
        chNomAbrevEstabelec: [this.modelPedVendaEL01.chNomAbrevEstabelec],
        chNomeEstabelec: [this.modelPedVendaEL01.chNomeEstabelec],
        inNumPedVenda: [{value: this.modelPedVendaEL01.inNumPedVenda, disabled: true}],
        chLstTipoPedido: [this.modelPedVendaEL01.chLstTipoPedido],
        inCodOrigemPedVen: [this.modelPedVendaEL01.inCodOrigemPedVen, Validators.required],
        chDesOrigemPedVen: [this.modelPedVendaEL01.chDesOrigemPedVen],
        inCodSituacaoPedVen: [this.modelPedVendaEL01.inCodSituacaoPedVen],
        chDesSituacaoPedVen: [{value: this.modelPedVendaEL01.chDesSituacaoPedVen, disabled: true}],
        lgPermRedigitar: [this.modelPedVendaEL01.lgPermRedigitar],
        lgPermDevolver: [this.modelPedVendaEL01.lgPermDevolver],
        lgPermCancelar: [this.modelPedVendaEL01.lgPermCancelar],
        chNumPedRep: [this.modelPedVendaEL01.chNumPedRep],
        chNumPedEmp: [{value: this.modelPedVendaEL01.chNumPedEmp, disabled: true}],
        chNumPedCli: [this.modelPedVendaEL01.chNumPedCli],
        chNumOrdCompCli: [this.modelPedVendaEL01.chNumOrdCompCli],
        daDatEmissao: [this.modelPedVendaEL01.daDatEmissao, Validators.required],
        daDatEntrada: [this.modelPedVendaEL01.daDatEntrada, Validators.required],
        daDatLimFatur: [this.modelPedVendaEL01.daDatLimFatur],
        daDatEntregaSolic: [this.modelPedVendaEL01.daDatEntregaSolic],
        daDatEntregaPrev: [{value: this.modelPedVendaEL01.daDatEntregaPrev, disabled: true}],
        daDatFaturPrev: [{value: this.modelPedVendaEL01.daDatFaturPrev, disabled: true}],
        IDCliente: [this.modelPedVendaEL01.IDCliente],
        IDPapelPessoaCliente: [this.modelPedVendaEL01.IDPapelPessoaCliente],
        IDPessoaCliente: [this.modelPedVendaEL01.IDPessoaCliente],
        inCodTipoPessoaCliente: [this.modelPedVendaEL01.inCodTipoPessoaCliente],
        chDesTipoPessoaCliente: [this.modelPedVendaEL01.chDesTipoPessoaCliente],
        inCodTipoDocumentoCliente: [this.modelPedVendaEL01.inCodTipoDocumentoCliente],
        chDesTipoDocumentoCliente: [this.modelPedVendaEL01.chDesTipoDocumentoCliente],
        inNumIdentifCliente: [this.modelPedVendaEL01.inNumIdentifCliente],
        inCodCliente: [this.modelPedVendaEL01.inCodCliente],
        chNomAbrevCliente: [this.modelPedVendaEL01.chNomAbrevCliente],
        chNomeCliente: [this.modelPedVendaEL01.chNomeCliente],
        IDPessoaEnderecoEntrega: [this.modelPedVendaEL01.IDPessoaEnderecoEntrega],
        chNomComprador: [this.modelPedVendaEL01.chNomComprador],
        IDPapelPessoaRepresentante: [this.modelPedVendaEL01.IDPapelPessoaRepresentante],
        IDPessoaRepresentante: [this.modelPedVendaEL01.IDPessoaRepresentante],
        inCodTipoPessoaRepresentante: [this.modelPedVendaEL01.inCodTipoPessoaRepresentante],
        chDesTipoPessoaRepresentante: [this.modelPedVendaEL01.chDesTipoPessoaRepresentante],
        inCodTipoDocumentoRepresentante: [this.modelPedVendaEL01.inCodTipoDocumentoRepresentante],
        chDesTipoDocumentoRepresentante: [this.modelPedVendaEL01.chDesTipoDocumentoRepresentante],
        inNumIdentifRepresentante: [this.modelPedVendaEL01.inNumIdentifRepresentante],
        inCodRepresentante: [this.modelPedVendaEL01.inCodRepresentante],
        chNomeAbrevRepresentante: [this.modelPedVendaEL01.chNomeAbrevRepresentante],
        chNomeRepresentante: [this.modelPedVendaEL01.chNomeRepresentante],
        IDTransp: [this.modelPedVendaEL01.IDTransp, Validators.required],
        inCodTransp: [this.modelPedVendaEL01.inCodTransp],
        chNomAbrevTransp: [this.modelPedVendaEL01.chNomAbrevTransp],
        chNomeTransp: [this.modelPedVendaEL01.chNomeTransp],
        inCodTipoFrete: [this.modelPedVendaEL01.inCodTipoFrete, Validators.required],
        chDesTipoFrete: [this.modelPedVendaEL01.chDesTipoFrete],
        IDRedesp: [this.modelPedVendaEL01.IDRedesp],
        inCodRedesp: [this.modelPedVendaEL01.inCodRedesp],
        chNomAbrevRedesp: [this.modelPedVendaEL01.chNomAbrevRedesp],
        chNomeRedesp: [this.modelPedVendaEL01.chNomeRedesp],
        inCodTipoFreteRedesp: [this.modelPedVendaEL01.inCodTipoFreteRedesp],
        chDesTipoFreteRedesp: [this.modelPedVendaEL01.chDesTipoFreteRedesp],
        chCodCondPagtoVenda: [this.modelPedVendaEL01.chCodCondPagtoVenda, Validators.required],
        chDesCondPagtoVenda: [this.modelPedVendaEL01.chDesCondPagtoVenda],
        chCondicao: [this.modelPedVendaEL01.chCondicao],
        IDTabPreco: [this.modelPedVendaEL01.IDTabPreco],
        chCodTabPreco: [this.modelPedVendaEL01.chCodTabPreco],
        chDesTabPreco: [this.modelPedVendaEL01.chDesTabPreco],
        daDatBase: [this.modelPedVendaEL01.daDatBase],
        deValProduto: [{value: this.modelPedVendaEL01.deValProduto, disabled: true}],
        deValIPI: [{value: this.modelPedVendaEL01.deValIPI, disabled: true}],
        deValST: [{value: this.modelPedVendaEL01.deValST, disabled: true}],
        deValTotal: [{value: this.modelPedVendaEL01.deValTotal, disabled: true}],
        deValVenda: [{value: this.modelPedVendaEL01.deValVenda, disabled: true}],
        deValBonific: [{value: this.modelPedVendaEL01.deValBonific, disabled: true}],
        chDesObservacao: [this.modelPedVendaEL01.chDesObservacao],
        chDesMotivoNaoAprov: [{value: this.modelPedVendaEL01.chDesMotivoNaoAprov, disabled: true}],
        chDesMotivoRejeitado: [{value: this.modelPedVendaEL01.chDesMotivoRejeitado, disabled: true}],
        dtDatInclusao: [this.modelPedVendaEL01.dtDatInclusao],
        chCodUsuarioInclusao: [{value: this.modelPedVendaEL01.chCodUsuarioInclusao, disabled: true}],
        chNomeUsuarioInclusao: [this.modelPedVendaEL01.chNomeUsuarioInclusao],
        dtDatUltAlteracao: [this.modelPedVendaEL01.dtDatUltAlteracao],
        chCodUsuarioAlteracao: [this.modelPedVendaEL01.chCodUsuarioAlteracao],
        chNomeUsuarioAlteracao: [this.modelPedVendaEL01.chNomeUsuarioAlteracao],
      });
    }
  }

  private getPedVendaEL01() {
    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.operacao = 'inclusao';

      this.modelPedVendaEL01 = new ModelPedVendaEL01();
      this.modelPedVendaEL01.IDPedVenda = 0;
      this.modelPedVendaEL01.IDEstabelec = 0;
      this.modelPedVendaEL01.chCodEstabelec = "";
      this.modelPedVendaEL01.chNomAbrevEstabelec = "";
      this.modelPedVendaEL01.chNomeEstabelec = "";
      this.modelPedVendaEL01.inNumPedVenda = 0;
      this.modelPedVendaEL01.chLstTipoPedido = "";
      this.modelPedVendaEL01.inCodOrigemPedVen = 0;
      this.modelPedVendaEL01.chDesOrigemPedVen = "";
      this.modelPedVendaEL01.inCodSituacaoPedVen = 0;
      this.modelPedVendaEL01.chDesSituacaoPedVen = "";
      this.modelPedVendaEL01.lgPermRedigitar = null;
      this.modelPedVendaEL01.lgPermDevolver = null;
      this.modelPedVendaEL01.lgPermCancelar = null;
      this.modelPedVendaEL01.chNumPedRep = "";
      this.modelPedVendaEL01.chNumPedEmp = "";
      this.modelPedVendaEL01.chLstTipoPedido = "";
      this.modelPedVendaEL01.chNumPedCli = "";
      this.modelPedVendaEL01.chNumOrdCompCli = "";
      this.modelPedVendaEL01.daDatEmissao = null;
      this.modelPedVendaEL01.daDatEntrada = null;
      this.modelPedVendaEL01.daDatLimFatur = null;
      this.modelPedVendaEL01.daDatEntregaSolic = null;
      this.modelPedVendaEL01.daDatEntregaPrev = null;
      this.modelPedVendaEL01.daDatFaturPrev = null;
      this.modelPedVendaEL01.IDClienteVenda = null;
      this.modelPedVendaEL01.IDCliente = 0;
      this.modelPedVendaEL01.IDPapelPessoaCliente = 0;
      this.modelPedVendaEL01.IDPessoaCliente = 0;
      this.modelPedVendaEL01.inCodTipoPessoaCliente = 0;
      this.modelPedVendaEL01.chDesTipoPessoaCliente = "";
      this.modelPedVendaEL01.inCodTipoDocumentoCliente = 0;
      this.modelPedVendaEL01.chDesTipoDocumentoCliente = "";
      this.modelPedVendaEL01.inNumIdentifCliente = 0;
      this.modelPedVendaEL01.inCodCliente = 0;
      this.modelPedVendaEL01.chNomAbrevCliente = "";
      this.modelPedVendaEL01.chNomeCliente = "";
      this.modelPedVendaEL01.IDPessoaEnderecoEntrega = null;
      this.modelPedVendaEL01.chNomComprador = "";
      this.modelPedVendaEL01.IDRepresentante = 0;
      this.modelPedVendaEL01.IDPapelPessoaRepresentante = 0;
      this.modelPedVendaEL01.IDPessoaRepresentante = 0;
      this.modelPedVendaEL01.inCodTipoPessoaRepresentante = 0;
      this.modelPedVendaEL01.chDesTipoPessoaRepresentante = "";
      this.modelPedVendaEL01.inCodTipoDocumentoRepresentante = 0;
      this.modelPedVendaEL01.chDesTipoDocumentoRepresentante = "";
      this.modelPedVendaEL01.inNumIdentifRepresentante = 0;
      this.modelPedVendaEL01.inCodRepresentante = 0;
      this.modelPedVendaEL01.chNomeAbrevRepresentante = "";
      this.modelPedVendaEL01.chNomeRepresentante = "";
      this.modelPedVendaEL01.IDTransp = 0;
      this.modelPedVendaEL01.inCodTransp = 0;
      this.modelPedVendaEL01.chNomAbrevTransp = '';
      this.modelPedVendaEL01.chNomeTransp = "";
      this.modelPedVendaEL01.inCodTipoFrete = 0;
      this.modelPedVendaEL01.chDesTipoFrete = "";
      this.modelPedVendaEL01.IDRedesp = null;
      this.modelPedVendaEL01.inCodRedesp = 0;
      this.modelPedVendaEL01.chNomAbrevRedesp = "";
      this.modelPedVendaEL01.chNomeRedesp = "";
      this.modelPedVendaEL01.inCodTipoFreteRedesp = null;
      this.modelPedVendaEL01.chDesTipoFreteRedesp = "";
      this.modelPedVendaEL01.chCodCondPagtoVenda = "";
      this.modelPedVendaEL01.chDesCondPagtoVenda = "";
      this.modelPedVendaEL01.chCondicao = "";
      this.modelPedVendaEL01.IDTabPreco = null;
      this.modelPedVendaEL01.chCodTabPreco = "";
      this.modelPedVendaEL01.chDesTabPreco = "";
      this.modelPedVendaEL01.daDatBase = null;
      this.modelPedVendaEL01.deValProduto = 0;

      this.modelPedVendaEL01.deValIPI = 0;
      this.modelPedVendaEL01.deValST = 0;
      this.modelPedVendaEL01.deValTotal = 0;
      this.modelPedVendaEL01.deValVenda = 0;
      this.modelPedVendaEL01.deValBonific = 0;
      this.modelPedVendaEL01.chDesObservacao = "";
      this.modelPedVendaEL01.chDesMotivoRejeitado = "";
      this.modelPedVendaEL01.dtDatInclusao = null;
      this.modelPedVendaEL01.chCodUsuarioInclusao = "";
      this.modelPedVendaEL01.dtDatUltAlteracao = null;
      this.modelPedVendaEL01.chCodUsuarioAlteracao = "";
      this.modelPedVendaEL01.chNomeUsuarioAlteracao = "";
      
      this.criarForm(true);
    } else {
      this.operacao = 'edicao';
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai
      //carrego os dados da pessoa física do id recebido
      this.apiPedVendaEL01Service.obter(id).then(
        pedidoVenda => {
          this.modelPedVendaEL01 = pedidoVenda;
          this.criarForm(false);
          this.apiPedVendaItemEL01Service.IDPedVenda = pedidoVenda.IDPedVenda;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPedVendaEL01);

    if (this.meuForm.value.UIData_Representante) {
      this.modelPedVendaEL01.chNomeRepresentante = this.meuForm.value.UIData_Representante.chNomeRepresentante;

      if(this.meuForm.value.UIData_Representante.objetoSelecionado){
        this.modelPedVendaEL01.IDRepresentante = this.meuForm.value.UIData_Representante.objetoSelecionado.IDRepresentante;
      }
      
    } else {
      this.modelPedVendaEL01.chNomeRepresentante = '';
      this.modelPedVendaEL01.IDRepresentante = null;
    }

    if (this.meuForm.value.UIData_Cliente) {
      //UIData_Cliente só está disponível quando o componente está habilitado
      this.modelPedVendaEL01.chNomeCliente = this.meuForm.value.UIData_Cliente.chNomeCliente;
      this.modelPedVendaEL01.IDClienteVenda = this.meuForm.value.UIData_Cliente.objetoSelecionado.IDClienteVenda;
    }

    if (this.meuForm.value.UIListTipoPedido) {
      this.modelPedVendaEL01.chLstTipoPedido = this.meuForm.value.UIListTipoPedido.join(',');
    }
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getPedVendaEL01();
    this.cadastroBarraAcao.esconderAguarde();
    // this._location.back();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde(() => {
      this.coletarDadosForm();

      if (this.operacao == 'edicao') {
        this.alterar();
      } else {
        this.incluir();
      }
    });
  }

  btnExcluir() {
    this.apiPedVendaEL01Service.excluir(this.modelPedVendaEL01.IDPedVenda).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  mudancaCliente(dado: any) {
    if(dado?.inCodCliente && dado?.IDClienteVenda){
      this.representante.inCodRepresentante = dado.inCodRepresentante;
      this.representante.chNomeRepresentante = dado.chNomeRepresentante;
      this.representante.IDRepresentante = dado.IDRepresentante;
      this.representante["objetoSelecionado"] = {
        IDRepresentante: dado.IDRepresentante
      };
      
      this.modelPedVendaEL01["UIData_Representante"] = this.representante;
      this.meuForm.get('UIData_Representante').setValue(this.representante);
    }
  }

  alterar() {
    this.apiPedVendaEL01Service.alterar(this.modelPedVendaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPedVendaEL01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        //this._location.back();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

  disabled() {
    this.meuForm.get('IDPedVenda').disable();
    this.meuForm.get('IDEstabelec').disable();
    this.meuForm.get('inCodOrigemPedVen').disable();
    this.meuForm.get('UIListTipoPedido').disable();
    this.meuForm.get('UIData_Cliente').disable();
  }

  incluir() {
    this.apiPedVendaEL01Service.criar(this.modelPedVendaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPedVendaEL01 = sucesso;
        this.disabled();
        this.criarForm(false);
        this.operacao = 'edicao';
        this.cadastroBarraAcao.esconderAguarde();
        //this._location.back();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }
}


