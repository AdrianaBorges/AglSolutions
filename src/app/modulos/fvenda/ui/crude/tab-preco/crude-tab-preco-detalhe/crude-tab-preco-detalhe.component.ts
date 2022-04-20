import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiTabPrecoEL01Service } from '../../../../api/api-tab-preco-el01.service';
import { ModelTabPrecoEL01 } from '../../../../models/model-tab-preco-EL01';
import { Location } from "@angular/common";
import { ApiTabPrecoItemEL01Service } from '../../../../api/api-tab-preco-item-el01.service';
@Component({
  selector: 'app-crude-tab-preco-detalhe',
  templateUrl: './crude-tab-preco-detalhe.component.html',
  styleUrls: ['./crude-tab-preco-detalhe.component.scss']
})
export class CrudeTabPrecoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public meuForm: FormGroup;
  public modelTabPrecoEL01: ModelTabPrecoEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private consulta: boolean;
  private idCadastro: number;

  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTabPrecoEL01Service: ApiTabPrecoEL01Service,
    private _location: Location,
    private router: Router,

    // Apis Filhas
    private apiTabPrecoItemEL01Service: ApiTabPrecoItemEL01Service,
  ) {
    this.modelTabPrecoEL01 = new ModelTabPrecoEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
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
    //this.configurarStatusForm();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }



  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTabPrecoEL01();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.meuForm.get('chCodTabPreco').disable();
    }
    this.meuForm.controls['IDTabPreco'].disable();
  }

  private criarForm(emEdicao: boolean) {


    if (this.modelTabPrecoEL01.dtDatValidFim) {
      this.modelTabPrecoEL01.dtDatValidFim = new Date(this.modelTabPrecoEL01.dtDatValidFim);
    }

    if (this.modelTabPrecoEL01.dtDatValidIni) {
      this.modelTabPrecoEL01.dtDatValidIni = new Date(this.modelTabPrecoEL01.dtDatValidIni);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTabPrecoEL01, emEdicao);
      // if (this.modelTabPrecoEL01.inCodSituacaoCad) {
      //   if (this.modelTabPrecoEL01.inCodSituacaoAssTec != 1) {
      //     this.cadastroBarraAcao.setModoConsulta();
      //   }
      // }
    }
    else {
      this.meuForm = this.formB.group({
        IDTabPreco: [this.modelTabPrecoEL01.IDTabPreco],
        chCodTabPreco: [this.modelTabPrecoEL01.chCodTabPreco, Validators.required],
        chDescricao: [this.modelTabPrecoEL01.chDescricao, Validators.required],
        dtDatValidIni: [this.modelTabPrecoEL01.dtDatValidIni, Validators.required],
        dtDatValidFim: [this.modelTabPrecoEL01.dtDatValidFim, Validators.required],
        chDesSituacaoCad: [this.modelTabPrecoEL01.chDesSituacaoCad],
      });
    }
  }



  private getTabPrecoEL01() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');
    if (id == 0) {
      this.modelTabPrecoEL01 = new ModelTabPrecoEL01();
      this.modelTabPrecoEL01.IDTabPreco = null;
      this.modelTabPrecoEL01.inCodSituacaoCad = null;
      this.modelTabPrecoEL01.dtDatValidFim = null;
      this.modelTabPrecoEL01.dtDatValidFim = null;
      this.modelTabPrecoEL01.chCodTabPreco = '';
      this.modelTabPrecoEL01.chDescricao = '';

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiTabPrecoEL01Service.obter(id).then(
        dados_API => {

          this.modelTabPrecoEL01 = dados_API;
          // Preencher as demais filhas
          this.apiTabPrecoItemEL01Service.IDTabPreco = this.modelTabPrecoEL01.IDTabPreco;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTabPrecoEL01);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTabPrecoEL01();
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
    this.apiTabPrecoEL01Service.excluir(this.modelTabPrecoEL01.IDTabPreco).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTabPrecoEL01Service.alterar(this.modelTabPrecoEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTabPrecoEL01 = sucesso;
        if (this.modelTabPrecoEL01.dtDatValidFim) {
          this.modelTabPrecoEL01.dtDatValidFim = new Date(this.modelTabPrecoEL01.dtDatValidFim);
        }

        if (this.modelTabPrecoEL01.dtDatValidIni) {
          this.modelTabPrecoEL01.dtDatValidIni = new Date(this.modelTabPrecoEL01.dtDatValidIni);
        }
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
    this.apiTabPrecoEL01Service.criar(this.modelTabPrecoEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTabPrecoEL01 = sucesso;
        if (this.modelTabPrecoEL01.dtDatValidFim) {
          this.modelTabPrecoEL01.dtDatValidFim = new Date(this.modelTabPrecoEL01.dtDatValidFim);
        }

        if (this.modelTabPrecoEL01.dtDatValidIni) {
          this.modelTabPrecoEL01.dtDatValidIni = new Date(this.modelTabPrecoEL01.dtDatValidIni);
        }
        this.meuForm.get('chCodTabPreco').disable();
        this.apiTabPrecoItemEL01Service.IDTabPreco = this.modelTabPrecoEL01.IDTabPreco;

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
