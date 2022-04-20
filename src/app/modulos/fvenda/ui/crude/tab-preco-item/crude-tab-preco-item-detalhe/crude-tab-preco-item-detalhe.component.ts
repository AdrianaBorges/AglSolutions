import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiItemEL01Service } from '../../../../api/api-item-el01.service';
import { ApiTabPrecoItemEL01Service } from '../../../../api/api-tab-preco-item-el01.service';
import { ModelTabPrecoItemEL01 } from '../../../../models/model-tab-preco-item-EL01';

@Component({
  selector: 'app-crude-tab-preco-item-detalhe',
  templateUrl: './crude-tab-preco-item-detalhe.component.html',
  styleUrls: ['./crude-tab-preco-item-detalhe.component.scss']
})
export class CrudeTabPrecoItemDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  private item = {
    chDescricao: '',
    IDItem: 0,
    chCodItem: ""
  };

  public meuForm: FormGroup;
  public modelTabPrecoItemEL01: ModelTabPrecoItemEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiItemEL01Service: ApiItemEL01Service,
    public apiTabPrecoItemEL01Service: ApiTabPrecoItemEL01Service,
  ) {
    this.modelTabPrecoItemEL01 = new ModelTabPrecoItemEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
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
    this.meuForm.controls['IDTabPrecoItem'].disable();
    let id = Number(this.meuForm.controls['IDTabPrecoItem'].value);

    if(id > 0){

      this.meuForm.controls['deQtdMinima'].disable();
      this.meuForm.controls['dtDatValidIni'].disable();
    }
    if (this.idCadastro > 0) {
      this.meuForm.get("UIItem").disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    this.item.chDescricao = this.modelTabPrecoItemEL01.chDesItem;
    this.item.chCodItem = this.modelTabPrecoItemEL01.chCodItem;
    this.item.IDItem = this.modelTabPrecoItemEL01.IDItem;

    var UIItem = (this.item.IDItem > 0 ? this.item : null);
    this.modelTabPrecoItemEL01['UIItem'] = UIItem;

    if (this.modelTabPrecoItemEL01.dtDatValidIni) {
      this.modelTabPrecoItemEL01.dtDatValidIni = new Date(this.modelTabPrecoItemEL01.dtDatValidIni);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTabPrecoItemEL01, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDTabPrecoItem: [this.modelTabPrecoItemEL01.IDTabPrecoItem],
        UIItem: [UIItem, Validators.required],
        dePrecoVenda: [this.modelTabPrecoItemEL01.dePrecoVenda, Validators.required],
        dtDatValidIni: [this.modelTabPrecoItemEL01.dtDatValidIni],
        deQtdMinima: [this.modelTabPrecoItemEL01.deQtdMinima],
      });
    }
  }

  private getDados() {

    var id: number;
    id = this.idCadastro;

    this.apiErrorCollection = new ApiErrorCollection();

    if (id == 0) {
      this.modelTabPrecoItemEL01 = new ModelTabPrecoItemEL01();

      this.modelTabPrecoItemEL01.IDTabPrecoItem = id;
      this.modelTabPrecoItemEL01.IDItem = null;
      this.modelTabPrecoItemEL01.dePrecoVenda = null;
      this.modelTabPrecoItemEL01.dtDatValidIni = null;
      this.modelTabPrecoItemEL01.deQtdMinima = null;
      this.modelTabPrecoItemEL01.IDTabPreco = this.apiTabPrecoItemEL01Service.IDTabPreco;

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiTabPrecoItemEL01Service.obter(id).then(
        dados_API => {
          this.modelTabPrecoItemEL01 = dados_API;
          this.apiErrorCollection = new ApiErrorCollection();
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTabPrecoItemEL01);
    if (this.meuForm.value.UIItem) {
      // this.modelItemLoteSerie.chDesItem = this.meuForm.value.UiItem.chDescricao;
      this.modelTabPrecoItemEL01.chCodItem = this.meuForm.value.UIItem.chCodItem;
      if (this.meuForm.value.UIItem.objetoSelecionado) {
        this.modelTabPrecoItemEL01.IDItem = this.meuForm.value.UIItem.objetoSelecionado.IDItem;
      }
    } else {
      this.modelTabPrecoItemEL01.chDesItem = '';
      this.modelTabPrecoItemEL01.IDItem = null;
      this.modelTabPrecoItemEL01.chCodItem = "";
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
    this.apiTabPrecoItemEL01Service.excluir(this.modelTabPrecoItemEL01.IDTabPrecoItem).then(
      sucesso => {
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTabPrecoItemEL01Service.alterar(this.modelTabPrecoItemEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTabPrecoItemEL01 = sucesso;


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
    this.apiTabPrecoItemEL01Service.criar(this.modelTabPrecoItemEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTabPrecoItemEL01 = sucesso;
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
