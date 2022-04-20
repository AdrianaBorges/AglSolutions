import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ApiSelectComponent } from '../../../../../../componentes/api-select/api-select.component';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiAssTecItemSubsService } from '../../../../api/api-ass-tec-item-subs.service';
import { ApiDefeitoEL01Service } from '../../../../api/api-defeito-el01.service';
import { ModelAssTecItemSubs } from '../../../../models/model-ass-tec-item-subs';
import { Location } from "@angular/common";
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { ApiItemEL01Service } from '../../../../api/api-item-el01.service';
import { ApiItemLoteSerieEl01Service } from '../../../../api/api-item-lote-serie-el01.service';
import { InputModalPesquisaComponent } from '../../../../../../componentes/input-modal-pesquisa/input-modal-pesquisa.component';


@Component({
  selector: 'app-crude-ass-tec-item-subs-detalhe',
  templateUrl: './crude-ass-tec-item-subs-detalhe.component.html',
  styleUrls: ['./crude-ass-tec-item-subs-detalhe.component.scss']
})
export class CrudeAssTecItemSubsDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('loteSerie', { static: true }) loteSerie: ApiSelectComponent;
  private item = {
    chDescricao: '',
    IDItem: 0,
    chCodItem: ""
  };

  public meuForm: FormGroup;
  public modelAssTecItemSubs: ModelAssTecItemSubs;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiAssTecItemSubsService: ApiAssTecItemSubsService,
    private _location: Location,
    public apiItemEL01Service: ApiItemEL01Service,
    public apiItemLoteSerieEl01Service: ApiItemLoteSerieEl01Service,
  ) {
    this.modelAssTecItemSubs = new ModelAssTecItemSubs();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  ValidarItemSerie(event) {
    this.loteSerie.filtroAlterado("Item.IDItem", 'eq', event.IDItem);
  }
  private inicializarDados() {

    this.criarForm(true);
  }

  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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
    this.getDados();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm() {
    this.meuForm.controls['IDAssTecItemSubs'].disable();

    if (this.idCadastro > 0) {
      this.meuForm.get("UIItem").disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    this.item.chDescricao = this.modelAssTecItemSubs.chDesItem;
    this.item.chCodItem = this.modelAssTecItemSubs.chCodItem;
    this.item.IDItem = this.modelAssTecItemSubs.IDItem;

    var UIItem = (this.item.IDItem > 0 ? this.item : null);
    this.modelAssTecItemSubs['UIItem'] = UIItem;

    if (this.modelAssTecItemSubs.dtDatSolicEstoque) {
      this.modelAssTecItemSubs.dtDatSolicEstoque = new Date(this.modelAssTecItemSubs.dtDatSolicEstoque);
    }

    if (this.modelAssTecItemSubs.dtDatRecebEstoque) {
      this.modelAssTecItemSubs.dtDatRecebEstoque = new Date(this.modelAssTecItemSubs.dtDatRecebEstoque);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelAssTecItemSubs, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDAssTecItemSubs: [this.modelAssTecItemSubs.IDAssTecItemSubs],
        IDItemLoteSerie: [this.modelAssTecItemSubs.IDItemLoteSerie],
        chDesComplem: [this.modelAssTecItemSubs.chDesComplem],
        UIItem: [UIItem, Validators.required],
        deQtdSubs: [this.modelAssTecItemSubs.deQtdSubs, Validators.required],
        dtDatInclusao: [this.modelAssTecItemSubs.dtDatInclusao],
        chNomeUsuarioInclusao: [this.modelAssTecItemSubs.chNomeUsuarioInclusao],
        dtDatUltAlteracao: [this.modelAssTecItemSubs.dtDatUltAlteracao],
        chNomeUsuarioAlteracao: [this.modelAssTecItemSubs.chNomeUsuarioAlteracao],
        dtDatSolicEstoque: [this.modelAssTecItemSubs.dtDatSolicEstoque],
        chNumSolicEstoque: [this.modelAssTecItemSubs.chNumSolicEstoque],
        dtDatRecebEstoque: [this.modelAssTecItemSubs.dtDatRecebEstoque],
      });
    }
  }

  private getDados() {

    var id: number;
    id = this.idCadastro;

    if (id == 0) {
      this.modelAssTecItemSubs = new ModelAssTecItemSubs();

      this.modelAssTecItemSubs.IDAssTecItemSubs = id;
      this.modelAssTecItemSubs.IDItem = null;
      this.modelAssTecItemSubs.IDItemLoteSerie = null;
      this.modelAssTecItemSubs.chDesComplem = "";
      this.modelAssTecItemSubs.deQtdSubs = null;

      this.modelAssTecItemSubs.dtDatSolicEstoque = null;
      this.modelAssTecItemSubs.dtDatRecebEstoque = null;
      this.modelAssTecItemSubs.chNumSolicEstoque = ""
      this.modelAssTecItemSubs.IDAssTecItem = this.apiAssTecItemSubsService.IDAssTecItem;
      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiAssTecItemSubsService.obter(id).then(
        dados_API => {
          this.modelAssTecItemSubs = dados_API;
          this.loteSerie.filtroAlterado("Item.IDItem", 'eq', this.modelAssTecItemSubs.IDItem);
          this.operacao = 'edicao';
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelAssTecItemSubs);

    if (this.meuForm.value.UIItem) {
      this.modelAssTecItemSubs.chCodItem = this.meuForm.value.UIItem.chCodItem;
      if (this.meuForm.value.UIItem.objetoSelecionado) {
        this.modelAssTecItemSubs.IDItem = this.meuForm.value.UIItem.objetoSelecionado.IDItem;
      }
    } else {
      this.modelAssTecItemSubs.chDesItem = '';
      this.modelAssTecItemSubs.IDItem = null;
      this.modelAssTecItemSubs.chCodItem = "";
    }
  }

  btnCancelar() {
    this.getDados();
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
    this.apiAssTecItemSubsService.excluir(this.modelAssTecItemSubs.IDAssTecItemSubs).then(
      sucesso => {
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiAssTecItemSubsService.alterar(this.modelAssTecItemSubs).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecItemSubs = sucesso;


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
    this.apiAssTecItemSubsService.criar(this.modelAssTecItemSubs).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecItemSubs = sucesso;
        this.meuForm.get("UIItem").disable();
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
