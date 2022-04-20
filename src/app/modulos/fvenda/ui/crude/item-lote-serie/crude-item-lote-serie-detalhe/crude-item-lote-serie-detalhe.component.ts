import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { ModelItemLoteSerieEl01 } from '../../../../models/model-item-lote-serie-el01';
import { ApiItemEL01Service } from '../../../../api/api-item-el01.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ApiItemLoteSerieEl01Service } from '../../../../api/api-item-lote-serie-el01.service';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';

@Component({
  selector: 'app-crude-item-lote-serie-detalhe',
  templateUrl: './crude-item-lote-serie-detalhe.component.html',
  styleUrls: ['./crude-item-lote-serie-detalhe.component.scss']
})
export class CrudeItemLoteSerieDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public dtValidade: Date;
  public dtFabricacao: Date;
  private item = {
    chDescricao: '',
    IDItem: 0,
    chCodItem: ""
  };
  //public modoExclusao: boolean;

  public modelItemLoteSerieEl01: ModelItemLoteSerieEl01;
  public apiErrorCollection: ApiErrorCollection;

  public meuForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiItemEL01Service: ApiItemEL01Service,
    public apiItemLoteSerieEl01Service: ApiItemLoteSerieEl01Service,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelItemLoteSerieEl01 = new ModelItemLoteSerieEl01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDadosTab_DadosPessoais();
    //Promise.resolve(null).then(() => this.inicializarDadosTab_DadosPessoais());
  }

  public ngAfterViewInit() {
    //Promise.resolve(null).then(() => this.kendoTabStripInstance.selectTab(0));
  }

  /**
   * Retorna o id do cadastro sendo acessado
   * Implementação do método da interface CadastroBarraAcaoPai
   */
  public cadastroBarraAcaoPai_getIdCadastro(): number {
    if (this.modelItemLoteSerieEl01) {
      return this.modelItemLoteSerieEl01.IDItem;
    } else {
      return 0;
    }
  }

  private inicializarDadosTab_DadosPessoais() {
    //Crio a instância dos formControls sem dados para não dar erro na interface
    this.criarForm(true);

    //Configuro quais controles estarão desabilitados
    this.configurarStatusForm();

    //Carrego os dados de pessoa
    this.getItem();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('UIItem').disable();
      this.meuForm.get('chCodModelo').disable();
      this.meuForm.get('chNumLote').disable();
      this.meuForm.get('chNumSerie').disable();
    }
    this.meuForm.controls['IDItemLoteSerie'].disable();
  }

  private criarForm(emEdicao: boolean) {

    this.item.chDescricao = this.modelItemLoteSerieEl01.chDesItem;
    this.item.chCodItem = this.modelItemLoteSerieEl01.chCodItem;
    this.item.IDItem = this.modelItemLoteSerieEl01.IDItem;

    var UIItem = (this.item.IDItem > 0 ? this.item : null);
    this.modelItemLoteSerieEl01['UIItem'] = UIItem;


    if (this.modelItemLoteSerieEl01.daDatFabricacao) {
      this.modelItemLoteSerieEl01.daDatFabricacao = new Date(this.modelItemLoteSerieEl01.daDatFabricacao);
    }
    if (this.modelItemLoteSerieEl01.daDatValidade) {
      this.modelItemLoteSerieEl01.daDatValidade = new Date(this.modelItemLoteSerieEl01.daDatValidade);
    }


    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelItemLoteSerieEl01, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDItemLoteSerie: [this.modelItemLoteSerieEl01.IDItemLoteSerie],
        // IDItem: [this.modelItemLoteSerieEl01.IDItem, Validators.required],
        UIItem: [UIItem, Validators.required],
        chCodModelo: [this.modelItemLoteSerieEl01.chCodModelo],
        chNumSerie: [this.modelItemLoteSerieEl01.chNumSerie],
        chNumLote: [this.modelItemLoteSerieEl01.chNumLote],
        daDatFabricacao: [this.modelItemLoteSerieEl01.daDatFabricacao],
        daDatValidade: [this.modelItemLoteSerieEl01.daDatValidade],
        deQtdEntrada: [this.modelItemLoteSerieEl01.deQtdEntrada],
        deQtdSaldoIniAssTec: [this.modelItemLoteSerieEl01.deQtdSaldoIniAssTec],
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelItemLoteSerieEl01);

    if (this.meuForm.value.UIItem) {
      // this.modelItemLoteSerieEl01.chDesItem = this.meuForm.value.UiItem.chDescricao;
      this.modelItemLoteSerieEl01.chCodItem = this.meuForm.value.UIItem.chCodItem;
      if (this.meuForm.value.UIItem.objetoSelecionado) {
        this.modelItemLoteSerieEl01.IDItem = this.meuForm.value.UIItem.objetoSelecionado.IDItem;
      }
    } else {
      this.modelItemLoteSerieEl01.chDesItem = '';
      this.modelItemLoteSerieEl01.IDItem = null;
      this.modelItemLoteSerieEl01.chCodItem = "";
    }
  }

  private getItem() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelItemLoteSerieEl01 = new ModelItemLoteSerieEl01();
      this.modelItemLoteSerieEl01.IDItemLoteSerie = 0;
      this.modelItemLoteSerieEl01.IDItem = null;
      this.modelItemLoteSerieEl01.chNumSerie = "";
      this.modelItemLoteSerieEl01.chCodModelo = "";
      this.modelItemLoteSerieEl01.chDesItem = "";
      this.modelItemLoteSerieEl01.daDatFabricacao = null;
      this.modelItemLoteSerieEl01.daDatValidade = null;
      this.modelItemLoteSerieEl01.chNumLote = '';
      this.modelItemLoteSerieEl01.deQtdEntrada = 0;
      this.modelItemLoteSerieEl01.deQtdSaldoIniAssTec = 0;

      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


      //carrego os dados da pessoa física do id recebido
      this.apiItemLoteSerieEl01Service.obter(id).then(
        pessoa => {
          this.modelItemLoteSerieEl01 = pessoa;
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

  btnCancelar() {
    this.getItem();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.modelItemLoteSerieEl01.IDItemLoteSerie > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiItemLoteSerieEl01Service.excluir(this.modelItemLoteSerieEl01.IDItemLoteSerie).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiItemLoteSerieEl01Service.alterar(this.modelItemLoteSerieEl01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelItemLoteSerieEl01 = sucesso;
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
    this.apiItemLoteSerieEl01Service.criar(this.modelItemLoteSerieEl01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelItemLoteSerieEl01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('UIItem').disable();
        this.meuForm.get('chCodModelo').disable();
        this.meuForm.get('chNumLote').disable();
        this.meuForm.get('chNumSerie').disable();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }


}
