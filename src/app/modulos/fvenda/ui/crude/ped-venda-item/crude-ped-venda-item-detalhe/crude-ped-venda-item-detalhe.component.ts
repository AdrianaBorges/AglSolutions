import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiSelectComponent } from '../../../../../../componentes/api-select/api-select.component'
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ApiClienteEL02Service } from '../../../../api/api-cliente-el02.service';
import { ApiRepresVendaEL01Service } from '../../../../api/api-repres-venda-el01.service';
import { ApiEstabelecimentoService } from '../../../../../corp/api/api-estabelecimento.service';
import { ModelPedVendaItemEL01 } from '../../../../models/model-ped-venda-item-EL01';
import { ApiPedVendaItemEL01Service } from '../../../../api/api-ped-venda-item-el01.service';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { ApiPedVendaEL01Service } from '../../../../api/api-ped-venda-el01.service';
import { ModelPedVendaEL01 } from '../../../../models/model-ped-venda-EL01';
import { ApiItemEL01Service } from '../../../../api/api-item-el01.service';
import { ApiTipoPedidoEl01Service } from '../../../../api/api-tipo-pedido-el01.service';
import { ApiTabPrecoEL01Service } from '../../../../api/api-tab-preco-el01.service';
import { ModelItemEL01 } from '../../../../models/model-item-EL01';
import { ApiTabPrecoItemEL01Service } from '../../../../api/api-tab-preco-item-el01.service';
import { ModelTabPrecoItemEL01 } from '../../../../models/model-tab-preco-item-EL01';

@Component({
  selector: 'app-crude-ped-venda-item-detalhe',
  templateUrl: './crude-ped-venda-item-detalhe.component.html',
  styleUrls: ['./crude-ped-venda-item-detalhe.component.scss']
})
export class CrudePedVendaItemDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('TipoPedido', {static: true}) TipoPedido: ApiSelectComponent;
  private item = {
    chDescricao: "",
    IDItem: 0,
    chCodItem: "",
  };
  public maskTipoPessoa: string = "";
  public meuForm: FormGroup;
  public modelPedVendaItemEL01: ModelPedVendaItemEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  public modelPedVendaEL01: ModelPedVendaEL01;
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,

    public apiPedVendaItemEL01Service: ApiPedVendaItemEL01Service,
    public apiPedVendaEL01Service: ApiPedVendaEL01Service,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    public apiClienteEL02Service: ApiClienteEL02Service,
    public apiRepresVendaEL01Service: ApiRepresVendaEL01Service,
    public apiItemEL01Service: ApiItemEL01Service,
    public apiTipoPedidoEl01Service: ApiTipoPedidoEl01Service,
    public apiTabPrecoEL01Service: ApiTabPrecoEL01Service,
    public apiTabPrecoItemEL01Service: ApiTabPrecoItemEL01Service,
    private _location: Location,
    private router: Router
  ) {
    this.modelPedVendaItemEL01 = new ModelPedVendaItemEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }
  /**
  * Deve ser chamada pelo evento do grid de pesquisa, 
  * seja para criar um novo registro ou para exibir 
  * para edição ou exclusão
  * @param id zero se for um novo cadastro e um valor 
  * se for para abrir para edição ou exclusão
  */
  public gridInterfaceTabCadastroFilho_setIdCadastro(id: string): void {
    this.idCadastro = +id;
    this.carregarDadosPai().then(
      sucesso => {
        this.inicializarDados(+id);
      }
    );
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private getIdPai(): number {
    return +this.route.snapshot.paramMap.get("id");
  }

  private carregarDadosPai(): Promise<void> {
    return new Promise((resolve, reject)=>{
      var id = this.getIdPai();
      this.apiPedVendaEL01Service.obter(id).then((pedido) => {
        this.setFiltroPadrao_TipoPedido(pedido.chLstTipoPedido);
        this.modelPedVendaEL01 = pedido;
        this.modelPedVendaItemEL01.IDPedVenda = this.modelPedVendaEL01.IDPedVenda;
        resolve()
      });
    })
  }

  setFiltroPadrao_TipoPedido(chLstTipoPedido) {
    this.TipoPedido.filtroAlterado('TipoPedido.chCodTipoPedido', 'in', `(${chLstTipoPedido})`);
  }

  ngOnInit() {
    this.criarForm(true);
  }

  private inicializarDados(id) {
    this.configurarStatusForm(id);
    this.getPedVendaItemEL01(id);
  }

  private configurarStatusForm(id) {
    this.criarForm(true);
    if (id > 0) {
      if(this.modelPedVendaItemEL01.inCodSituacaoPedVen && this.modelPedVendaItemEL01.inCodSituacaoPedVen !== 1){
        this.cadastroBarraAcao.setModoConsulta();
      }else{
        this.disabled();
      }
    }
  }

  Calc() {
    const desc1 = this.meuForm.value.deDescont1 ? Number(this.meuForm.value.deDescont1) : 0;
    const desc2 = this.meuForm.value.deDescont2 ? Number(this.meuForm.value.deDescont2) : 0;
    const desc3 = this.meuForm.value.deDescont3 ? Number(this.meuForm.value.deDescont3) : 0;
    const desc4 = this.meuForm.value.deDescont4 ? Number(this.meuForm.value.deDescont4) : 0;
    const desc5 = this.meuForm.value.deDescont5 ? Number(this.meuForm.value.deDescont5) : 0;
    const ValorBruto = this.meuForm.get('deValUnitBruto').value ? Number(this.meuForm.get('deValUnitBruto').value) : 0
    let valorLiq: number = ValorBruto;
    if (desc1) {
      valorLiq = valorLiq * (1 - (desc1 / 100));
    }
    if (desc2) {
      valorLiq = valorLiq * (1 - (desc2 / 100));
    }
    if (desc3) {
      valorLiq = valorLiq * (1 - (desc3 / 100));
    }
    if (desc4) {
      valorLiq = valorLiq * (1 - (desc4 / 100));
    }
    if (desc5) {
      valorLiq = valorLiq * (1 - (desc5 / 100));
    }

    const valorLiquido = Math.round(valorLiq * 100)/100;
    const valorQtd = this.meuForm.get('deQtdItem').value ? Number(this.meuForm.get('deQtdItem').value) : 0;
    this.meuForm.get('deValUnitLiquido').setValue(valorLiquido);

    const total = Math.round(valorLiquido * valorQtd * 10000)/10000;
    this.meuForm.get('deValTotLiquido').setValue(total);
  }

  private criarForm(emEdicao: boolean) {
    if (this.modelPedVendaItemEL01.daDatEntregaPrev) {
      this.modelPedVendaItemEL01.daDatEntregaPrev = new Date(this.modelPedVendaItemEL01.daDatEntregaPrev);
    }

    if (this.modelPedVendaItemEL01.daDatEntregaSolic) {
      this.modelPedVendaItemEL01.daDatEntregaSolic = new Date(this.modelPedVendaItemEL01.daDatEntregaSolic);
    }

    if (this.modelPedVendaItemEL01.daDatFaturPrev) {
      this.modelPedVendaItemEL01.daDatFaturPrev = new Date(this.modelPedVendaItemEL01.daDatFaturPrev);
    }

    this.item.IDItem = this.modelPedVendaItemEL01.IDItem;
    this.item.chCodItem = this.modelPedVendaItemEL01.chCodItem;
    this.item.chDescricao = this.modelPedVendaItemEL01.chDesItem;
    var UIItem = this.item.IDItem > 0 ? this.item : null;
    this.modelPedVendaItemEL01["UIItem"] = UIItem;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPedVendaItemEL01, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        UIItem: [UIItem, Validators.required],
        deDescont1: [],
        deDescont2: [],
        deDescont3: [],
        deDescont4: [],
        deDescont5: [],
        IDPedVendaItem: [{value: this.modelPedVendaItemEL01.IDPedVendaItem, disabled: true}],
        IDPedVenda: [{value: this.modelPedVendaItemEL01.IDPedVenda, disabled: true}],
        inNumSeq: [{value: this.modelPedVendaItemEL01.inNumSeq, disabled: true}],
        IDTipoPedido: [this.modelPedVendaItemEL01.IDTipoPedido, Validators.required],
        chCodTipoPedido: [this.modelPedVendaItemEL01.chCodTipoPedido],
        chDesTipoPedido: [this.modelPedVendaItemEL01.chDesTipoPedido],
        lgConsideraVenda: [this.modelPedVendaItemEL01.lgConsideraVenda],
        IDItem: [this.modelPedVendaItemEL01.IDItem],
        chCodItem: [this.modelPedVendaItemEL01.chCodItem],
        chDesItem: [this.modelPedVendaItemEL01.chDesItem],
        chCodUMItem: [{value: this.modelPedVendaItemEL01.chCodUMItem, disabled: true}],
        chDesCompl: [this.modelPedVendaItemEL01.chDesCompl],
        IDTabPreco: [this.modelPedVendaItemEL01.IDTabPreco],
        chCodTabPreco: [this.modelPedVendaItemEL01.chCodTabPreco],
        chDesTabPreco: [this.modelPedVendaItemEL01.chDesTabPreco],
        deQtdItem: [this.modelPedVendaItemEL01.deQtdItem],
        dePrecoTabela: [{value: this.modelPedVendaItemEL01.dePrecoTabela, disabled: true}],
        deValUnitBruto: [this.modelPedVendaItemEL01.deValUnitBruto],
        chDescCascata: [this.modelPedVendaItemEL01.chDescCascata],
        deValUnitLiquido: [{value: this.modelPedVendaItemEL01.deValUnitLiquido, disabled: true}],
        deValTotLiquido: [{value: this.modelPedVendaItemEL01.deValTotLiquido, disabled: true}],
        dePercIPI: [{value: this.modelPedVendaItemEL01.dePercIPI, disabled: true}],
        deValIPI: [{value: this.modelPedVendaItemEL01.deValIPI, disabled: true}],
        dePercST: [{value: this.modelPedVendaItemEL01.dePercST, disabled: true}],
        deValST: [{value: this.modelPedVendaItemEL01.deValST, disabled: true}],
        daDatEntregaSolic: [this.modelPedVendaItemEL01.daDatEntregaSolic],
        daDatEntregaPrev: [{value: this.modelPedVendaItemEL01.daDatEntregaPrev, disabled: true}],
        daDatFaturPrev: [{value: this.modelPedVendaItemEL01.daDatFaturPrev, disabled: true}],
        chCodNatOper: [{value: this.modelPedVendaItemEL01.chCodNatOper, disabled: true}],
        inCodSituacaoAtenPed: [{value: this.modelPedVendaItemEL01.inCodSituacaoAtenPed, disabled: true}],
        chDesSituacaoAtenPed: [{value: this.modelPedVendaItemEL01.chDesSituacaoAtenPed, disabled: true}],
        chDesMotivoCancel: [{value: this.modelPedVendaItemEL01.chDesMotivoCancel, disabled: true}],
        dtDatInclusao: [this.modelPedVendaItemEL01.dtDatInclusao],
        chCodUsuarioInclusao: [this.modelPedVendaItemEL01.chCodUsuarioInclusao],
        chNomeUsuarioInclusao: [this.modelPedVendaItemEL01.chNomeUsuarioInclusao],
        dtDatUltAlteracao: [this.modelPedVendaItemEL01.dtDatUltAlteracao],
        chCodUsuarioAlteracao: [this.modelPedVendaItemEL01.chCodUsuarioAlteracao],
        chNomeUsuarioAlteracao: [this.modelPedVendaItemEL01.chNomeUsuarioAlteracao],
      });
    }

    this.disabledAlways();
    
  }

  disabledAlways() {
    this.meuForm.get('IDPedVendaItem').disable();
    this.meuForm.get('IDPedVenda').disable();
    this.meuForm.get('inNumSeq').disable();
    this.meuForm.get('chCodUMItem').disable();
    this.meuForm.get('dePrecoTabela').disable();
    this.meuForm.get('deValUnitLiquido').disable();
    this.meuForm.get('deValTotLiquido').disable();
    this.meuForm.get('dePercIPI').disable();
    this.meuForm.get('deValIPI').disable();
    this.meuForm.get('dePercST').disable();
    this.meuForm.get('deValST').disable();
    this.meuForm.get('daDatEntregaPrev').disable();
    this.meuForm.get('daDatFaturPrev').disable();
    this.meuForm.get('chCodNatOper').disable();
    this.meuForm.get('inCodSituacaoAtenPed').disable();
    this.meuForm.get('chDesSituacaoAtenPed').disable();
    this.meuForm.get('chDesMotivoCancel').disable();
  }

  private getPedVendaItemEL01(id) {
    this.apiErrorCollection = new ApiErrorCollection();

    if (id == 0) {
      this.operacao = 'inclusao';

      this.modelPedVendaItemEL01 = new ModelPedVendaItemEL01();
      this.modelPedVendaItemEL01.IDPedVendaItem = 0;
      this.modelPedVendaItemEL01.IDPedVenda = this.getIdPai();
      this.modelPedVendaItemEL01.inNumSeq = 0;
      this.modelPedVendaItemEL01.IDTipoPedido = 0;
      this.modelPedVendaItemEL01.chCodTipoPedido = "";
      this.modelPedVendaItemEL01.chDesTipoPedido = "";
      this.modelPedVendaItemEL01.lgConsideraVenda = null;
      this.modelPedVendaItemEL01.IDItem = 0;
      this.modelPedVendaItemEL01.chCodItem = "";
      this.modelPedVendaItemEL01.chDesItem = "";
      this.modelPedVendaItemEL01.chCodUMItem = "";
      this.modelPedVendaItemEL01.chDesCompl = "";
      this.modelPedVendaItemEL01.IDTabPreco = this.modelPedVendaEL01.IDTabPreco;
      this.modelPedVendaItemEL01.chCodTabPreco = "";
      this.modelPedVendaItemEL01.chDesTabPreco = "";
      this.modelPedVendaItemEL01.deQtdItem = 0;
      this.modelPedVendaItemEL01.dePrecoTabela = 0;
      this.modelPedVendaItemEL01.deValUnitBruto = 0;
      this.modelPedVendaItemEL01.chDescCascata = "";
      this.modelPedVendaItemEL01.deValUnitLiquido = 0;
      this.modelPedVendaItemEL01.deValTotLiquido = 0;
      this.modelPedVendaItemEL01.dePercIPI = 0;
      this.modelPedVendaItemEL01.deValIPI = 0;
      this.modelPedVendaItemEL01.dePercST = 0;
      this.modelPedVendaItemEL01.deValST = 0;
      this.modelPedVendaItemEL01.daDatEntregaSolic = null;
      this.modelPedVendaItemEL01.daDatEntregaPrev = null;
      this.modelPedVendaItemEL01.daDatFaturPrev = null;
      this.modelPedVendaItemEL01.chCodNatOper = "";
      this.modelPedVendaItemEL01.inCodSituacaoAtenPed = 0;
      this.modelPedVendaItemEL01.chDesSituacaoAtenPed = "";
      this.modelPedVendaItemEL01.chDesMotivoCancel = "";
      this.modelPedVendaItemEL01.dtDatInclusao = null;
      this.modelPedVendaItemEL01.chCodUsuarioInclusao = "";
      this.modelPedVendaItemEL01.chNomeUsuarioInclusao = "";
      this.modelPedVendaItemEL01.dtDatUltAlteracao = null;
      this.modelPedVendaItemEL01.chCodUsuarioAlteracao = "";
      this.modelPedVendaItemEL01.chNomeUsuarioAlteracao = "";

      this.criarForm(true);
    } else {
      this.operacao = 'edicao';
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai
      //carrego os dados do item do pedido de Venda do id recebido
      this.apiPedVendaItemEL01Service.obter(id).then(
        pedVendaItem => {
          this.modelPedVendaItemEL01 = pedVendaItem;

          this.criarForm(false);

          this.modelPedVendaItemEL01.chDescCascata.split('+').map((currElement, index) => {
            const formControl = this.meuForm.get(`deDescont${index + 1}`)
            if(formControl){
              formControl.setValue(+currElement);
            }
          })
          
          this.configurarStatusForm(id);
          this.cadastroBarraAcao.esconderAguarde();
        },
        erro => {
          this.cadastroBarraAcao.esconderAguarde();
          this.apiErrorCollection = erro;
        }
      );
    }
  }

  public itemAlterado(itemEL01: ModelItemEL01): void {
    if(itemEL01 && itemEL01.chCodUM){
      // Item encontrado
      this.modelPedVendaItemEL01.chCodUMItem = itemEL01.chCodUM;
      this.meuForm.get('chCodUMItem').setValue(itemEL01.chCodUM);
      let idTabPreco = this.meuForm.value.IDTabPreco;
      if(idTabPreco){
        this.changed_IDTabPreco(idTabPreco)
      }
    }else{
      // Nenhum item encontrado
      this.modelPedVendaItemEL01.chCodUMItem = '';
      this.meuForm.get('chCodUMItem').setValue('');
      this.meuForm.get('dePrecoTabela').setValue(0);
      this.meuForm.get('deValUnitBruto').setValue(0);
      this.meuForm.get('deValUnitLiquido').setValue(0);
      this.meuForm.get('deValTotLiquido').setValue(0);
    }
    
  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPedVendaItemEL01);
    if (this.meuForm.value.UIItem) {
      // this.modelItemLoteSerie.chDesItem = this.meuForm.value.UiItem.chDescricao;
      this.modelPedVendaItemEL01.chCodItem = this.meuForm.value.UIItem.chCodItem;
      if (this.meuForm.value.UIItem.objetoSelecionado) {
        let itemEL01: ModelItemEL01 = this.meuForm.value.UIItem.objetoSelecionado
        this.modelPedVendaItemEL01.IDItem = itemEL01.IDItem;
        this.modelPedVendaItemEL01.chCodUMItem = itemEL01.chCodUM;
      }
    }
    this.modelPedVendaItemEL01.chDescCascata += this.meuForm.value.deDescont1 ? this.modelPedVendaItemEL01.chDescCascata ? '+' + this.meuForm.value.deDescont1 : this.meuForm.value.deDescont1 : '';
    this.modelPedVendaItemEL01.chDescCascata += this.meuForm.value.deDescont2 ? this.modelPedVendaItemEL01.chDescCascata ? '+' + this.meuForm.value.deDescont2 : this.meuForm.value.deDescont2 : '';
    this.modelPedVendaItemEL01.chDescCascata += this.meuForm.value.deDescont3 ? this.modelPedVendaItemEL01.chDescCascata ? '+' + this.meuForm.value.deDescont3 : this.meuForm.value.deDescont3 : '';
    this.modelPedVendaItemEL01.chDescCascata += this.meuForm.value.deDescont4 ? this.modelPedVendaItemEL01.chDescCascata ? '+' + this.meuForm.value.deDescont4 : this.meuForm.value.deDescont4 : '';
    this.modelPedVendaItemEL01.chDescCascata += this.meuForm.value.deDescont5 ? this.modelPedVendaItemEL01.chDescCascata ? '+' + this.meuForm.value.deDescont5 : this.meuForm.value.deDescont5 : '';
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getPedVendaItemEL01(this.idCadastro);
    this.cadastroBarraAcao.esconderAguarde();
    this._location.back();
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
    this.apiPedVendaItemEL01Service.excluir(this.modelPedVendaItemEL01.IDPedVendaItem).then(
      sucesso => {
        // this._location.back();
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiPedVendaItemEL01Service.alterar(this.modelPedVendaItemEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPedVendaItemEL01 = sucesso;
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
    this.meuForm.get('IDTipoPedido').disable();
    this.meuForm.get('UIItem').disable();
  }

  incluir() {
    this.apiPedVendaItemEL01Service.criar(this.modelPedVendaItemEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPedVendaItemEL01 = sucesso;
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

  changed_IDTabPreco(IDTabPreco: number){
    let idItem = this.meuForm.value.UIItem?.objetoSelecionado.IDItem;
    if(IDTabPreco && idItem){
       //this.modelPedVendaItemEL01.IDItem
      this.apiTabPrecoItemEL01Service.getItem(IDTabPreco, idItem).then(
        tabPreco => {
          this.meuForm.get('deValUnitBruto').setValue(tabPreco.dePrecoVenda);
          this.meuForm.get('dePrecoTabela').setValue(tabPreco.dePrecoVenda);
          this.Calc()
        }
      )
    }else{
      this.meuForm.get('dePrecoTabela').setValue(0);
      this.Calc()
    }
  }
}