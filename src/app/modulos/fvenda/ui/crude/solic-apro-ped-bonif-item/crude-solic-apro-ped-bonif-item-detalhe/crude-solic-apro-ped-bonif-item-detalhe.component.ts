import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ApiEstabelecimentoService } from '../../../../../corp/api/api-estabelecimento.service';
import { ModelSolicAprovPVItemEL01 } from '../../../../models/model-solic-aprov-pv-item-EL01';
import { ApiSolicAprovPVItemEL01Service } from '../../../../api/api-solic-aprov-pv-item-el01.service';
import { ApiPedVendaEL01Service } from '../../../../api/api-ped-venda-el01.service';
import { ApiSolicAprovPVEL01Service } from '../../../../api/api-solic-aprov-pv-el01.service';
import { ModelSolicAprovPVEL01 } from '../../../../models/model-solic-aprov-pv-EL01';


@Component({
  selector: 'app-crude-solic-apro-ped-bonif-item-detalhe',
  templateUrl: './crude-solic-apro-ped-bonif-item-detalhe.component.html',
  styleUrls: ['./crude-solic-apro-ped-bonif-item-detalhe.component.scss']
})
export class CrudeSolicAproPedBonifItemDetalheComponent implements OnInit {
  private pediDovenda = {
    inNumPedVenda: 0,
    IDPedVenda: 0
  };

  idPai: number = 0;

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public maskTipoPessoa: string = "";
  public meuForm: FormGroup;
  public modelSolicAprovPVItemEL01: ModelSolicAprovPVItemEL01;
  public modelSolicAprovPVEL01: ModelSolicAprovPVEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPedVendaEL01Service: ApiPedVendaEL01Service,
    public apiSolicAprovPVItemEL01Service: ApiSolicAprovPVItemEL01Service,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    public apiSolicAprovPVEL01Service: ApiSolicAprovPVEL01Service,
    private _location: Location,
    private router: Router
  ) {
    this.modelSolicAprovPVItemEL01 = new ModelSolicAprovPVItemEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {

    this.inicializarDados();
    this.criarBreadCrumbs();
    this.carregarDadosPai();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSolicAprovPVItemEL01();

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
    this.pediDovenda.inNumPedVenda = this.modelSolicAprovPVItemEL01.inNumPedVenda;
    this.pediDovenda.IDPedVenda = this.modelSolicAprovPVItemEL01.IDPedVenda;

    var UIData_PedidoVenda = (this.pediDovenda.IDPedVenda > 0 ? this.pediDovenda : null);
    this.modelSolicAprovPVItemEL01['UIData_PedidoVenda'] = UIData_PedidoVenda;
    if (this.modelSolicAprovPVItemEL01.daDatEntrada) {
      this.modelSolicAprovPVItemEL01.daDatEntrada = new Date(this.modelSolicAprovPVItemEL01.daDatEntrada);
    }

    if (this.modelSolicAprovPVItemEL01.daDatEmissao) {
      this.modelSolicAprovPVItemEL01.daDatEmissao = new Date(this.modelSolicAprovPVItemEL01.daDatEmissao);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSolicAprovPVItemEL01, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        UIData_PedidoVenda: UIData_PedidoVenda,
        IDSolicAprovPVItem: [this.modelSolicAprovPVItemEL01.IDSolicAprovPVItem],
        IDSolicAprovPV: [this.modelSolicAprovPVItemEL01.IDSolicAprovPV],
        inCodSituacaoSolAprPV: [this.modelSolicAprovPVItemEL01.inCodSituacaoSolAprPV],
        chDesSituacaoSolAprPV: [this.modelSolicAprovPVItemEL01.chDesSituacaoSolAprPV],
        IDPedVenda: [this.modelSolicAprovPVItemEL01.IDPedVenda],
        IDEstabelec: [this.modelSolicAprovPVItemEL01.IDEstabelec],
        chCodEstabelec: [this.modelSolicAprovPVItemEL01.chCodEstabelec],
        chNomAbrevEstabelec: [this.modelSolicAprovPVItemEL01.chNomAbrevEstabelec],
        chNomeEstabelec: [this.modelSolicAprovPVItemEL01.chNomeEstabelec],
        inNumPedVenda: [this.modelSolicAprovPVItemEL01.inNumPedVenda],
        inCodSituacaoPedVen: [this.modelSolicAprovPVItemEL01.inCodSituacaoPedVen],
        chDesSituacaoPedVen: [this.modelSolicAprovPVItemEL01.chDesSituacaoPedVen],
        chNumPedRep: [this.modelSolicAprovPVItemEL01.chNumPedRep],
        chNumPedEmp: [this.modelSolicAprovPVItemEL01.chNumPedEmp],
        chNumPedCli: [this.modelSolicAprovPVItemEL01.chNumPedCli],
        daDatEmissao: [this.modelSolicAprovPVItemEL01.daDatEmissao],
        daDatEntrada: [this.modelSolicAprovPVItemEL01.daDatEntrada],
        deValProduto: [this.modelSolicAprovPVItemEL01.deValProduto],
        deValTotal: [this.modelSolicAprovPVItemEL01.deValTotal],
        deValVenda: [this.modelSolicAprovPVItemEL01.deValVenda],
        deValBonific: [this.modelSolicAprovPVItemEL01.deValBonific],
        lgPedPrincipal: [this.modelSolicAprovPVItemEL01.lgPedPrincipal],
      });
    }
  }
  private carregarDadosPai() {
    this.idPai= +this.route.snapshot.paramMap.get('idPai');
    this.apiSolicAprovPVEL01Service.obter(this.idPai).then(
      programa => {
        this.modelSolicAprovPVEL01 = programa;

      }
    );
  }
  limparCampos(event) {
    this.meuForm.get('IDPedVenda').setValue(null)
    this.meuForm.get('daDatEmissao').setValue(null)
    this.meuForm.get('daDatEntrada').setValue(null)
    this.meuForm.get('chNumPedRep').setValue(null)
    this.meuForm.get('chNumPedEmp').setValue(null)
    this.meuForm.get('chNumPedCli').setValue(null)
    this.meuForm.get('deValTotal').setValue(null)
    this.meuForm.get('UIData_PedidoVenda').setValue(null)
  }
  async AtribuirPedVenda(event) {
    try {
      const resp = await this.apiPedVendaEL01Service.obterPorCod(event.inNumPedVenda);
      if (resp) {
        this.meuForm.get('daDatEmissao').setValue(new Date(resp.daDatEmissao))
        this.meuForm.get('daDatEntrada').setValue(new Date(resp.daDatEntrada))
        this.meuForm.get('chNumPedRep').setValue(resp.chNumPedRep)
        this.meuForm.get('chNumPedEmp').setValue(resp.chNumPedEmp)
        this.meuForm.get('chNumPedCli').setValue(resp.chNumPedCli)
        this.meuForm.get('deValVenda').setValue(resp.deValVenda)
        this.meuForm.get('deValBonific').setValue(resp.deValBonific)
        this.meuForm.get('deValTotal').setValue(resp.deValTotal)
        this.meuForm.get('IDPedVenda').setValue(resp.IDPedVenda);
        this.modelSolicAprovPVItemEL01.IDPedVenda = resp.IDPedVenda;
      }
    } catch (error) {

    }
  }
  private getSolicAprovPVItemEL01() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSolicAprovPVItemEL01 = new ModelSolicAprovPVItemEL01();
      this.modelSolicAprovPVItemEL01.IDSolicAprovPVItem = 0;
      this.modelSolicAprovPVItemEL01.IDSolicAprovPV = +this.route.snapshot.paramMap.get('idPai');
      this.modelSolicAprovPVItemEL01.inCodSituacaoSolAprPV = 0;
      this.modelSolicAprovPVItemEL01.chDesSituacaoSolAprPV = "";
      this.modelSolicAprovPVItemEL01.IDPedVenda = 0;
      this.modelSolicAprovPVItemEL01.IDEstabelec = 0;
      this.modelSolicAprovPVItemEL01.chCodEstabelec = "";
      this.modelSolicAprovPVItemEL01.chNomAbrevEstabelec = "";
      this.modelSolicAprovPVItemEL01.chNomeEstabelec = "";
      this.modelSolicAprovPVItemEL01.inNumPedVenda = 0;
      this.modelSolicAprovPVItemEL01.inCodSituacaoPedVen = 0;
      this.modelSolicAprovPVItemEL01.chDesSituacaoPedVen = "";
      this.modelSolicAprovPVItemEL01.chNumPedRep = "";
      this.modelSolicAprovPVItemEL01.chNumPedEmp = "";
      this.modelSolicAprovPVItemEL01.chNumPedCli = "";
      this.modelSolicAprovPVItemEL01.daDatEmissao = null;
      this.modelSolicAprovPVItemEL01.daDatEntrada = null;
      this.modelSolicAprovPVItemEL01.deValProduto = 0;
      this.modelSolicAprovPVItemEL01.deValTotal = 0;
      this.modelSolicAprovPVItemEL01.deValVenda = 0;
      this.modelSolicAprovPVItemEL01.deValBonific = 0;
      this.modelSolicAprovPVItemEL01.lgPedPrincipal = null;

      this.operacao = 'inclusao';
      this.criarForm(true);
    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


      //carrego os dados da pessoa física do id recebido
      this.apiSolicAprovPVItemEL01Service.obter(id).then(
        pessoa => {
          this.modelSolicAprovPVItemEL01 = pessoa;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSolicAprovPVItemEL01);

    if (this.meuForm.value.UIData_PedidoVenda) {
      this.modelSolicAprovPVItemEL01.inNumPedVenda = this.meuForm.value.UIData_PedidoVenda.inNumPedVenda;
      if (this.meuForm.value.UIData_PedidoVenda.objetoSelecionado) {
        this.modelSolicAprovPVItemEL01.IDPedVenda = this.meuForm.value.UIData_PedidoVenda.objetoSelecionado.IDPedVenda;
      }
    } else {
      this.modelSolicAprovPVItemEL01.inNumPedVenda = null;
      this.modelSolicAprovPVItemEL01.IDPedVenda = null;
    }
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSolicAprovPVItemEL01();
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
    this.apiSolicAprovPVItemEL01Service.excluir(this.modelSolicAprovPVItemEL01.IDSolicAprovPVItem).then(
      sucesso => {
        debugger
        // this._location.back();
        this.router.navigateByUrl(`/modulos/fvenda/solic-apro-ped-bonif/${this.idPai}/filho/solic-apro-ped-bonif-item`)
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSolicAprovPVItemEL01Service.alterar(this.modelSolicAprovPVItemEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSolicAprovPVItemEL01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        debugger
        this.cadastroBarraAcao.setModoConsulta();
        // this._location.back();
        this.router.navigateByUrl(`/modulos/fvenda/solic-apro-ped-bonif/${this.idPai}/filho/solic-apro-ped-bonif-item`)
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
    this.meuForm.get('UIData_PedidoVenda').disable();
    this.meuForm.get('IDPedVenda').disable();
    this.meuForm.get('daDatEmissao').disable();
    this.meuForm.get('daDatEntrada').disable();
    this.meuForm.get('chNumPedRep').disable();
    this.meuForm.get('chNumPedEmp').disable();
    this.meuForm.get('chNumPedCli').disable();
    this.meuForm.get('deValTotal').disable();
    this.meuForm.get('IDEstabelec').disable();
    this.meuForm.get('deValVenda').disable();
    this.meuForm.get('deValBonific').disable();
    this.meuForm.get('deValTotal').disable();

  }
  incluir() {
    this.apiSolicAprovPVItemEL01Service.criar(this.modelSolicAprovPVItemEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSolicAprovPVItemEL01 = sucesso;
        this.disabled();
        this.criarForm(false);
        this.operacao = 'edicao';
        this.cadastroBarraAcao.esconderAguarde();
        // this._location.back();
        this.router.navigateByUrl(`/modulos/fvenda/solic-apro-ped-bonif/${this.idPai}/filho/solic-apro-ped-bonif-item`)
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }
}

