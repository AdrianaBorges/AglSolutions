import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { InputModalPesquisaComponent } from '../../../../../../componentes/input-modal-pesquisa/input-modal-pesquisa.component';
import { ApiAssTecItemServService } from '../../../../api/api-ass-tec-item-serv.service';
import { ApiDefeitoEL01Service } from '../../../../api/api-defeito-el01.service';
import { ModelAssTecItemServ } from '../../../../models/model-ass-tec-item-serv';
import { Location } from "@angular/common";
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { ApiItemEL01Service } from '../../../../api/api-item-el01.service';

@Component({
  selector: 'app-crude-ass-tec-item-serv-detalhe',
  templateUrl: './crude-ass-tec-item-serv-detalhe.component.html',
  styleUrls: ['./crude-ass-tec-item-serv-detalhe.component.scss']
})
export class CrudeAssTecItemServDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  private item = {
    chDescricao: '',
    IDItem: 0,
    chCodItem: ""
  };

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelAssTecItemServ: ModelAssTecItemServ;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  //public idCadastroPai: number;


  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiAssTecItemServService: ApiAssTecItemServService,
    private _location: Location,
    public apiItemEL01Service: ApiItemEL01Service,
  ) {
    this.modelAssTecItemServ = new ModelAssTecItemServ();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }


  private inicializarDados() {
    this.criarForm(true);
    //this.getDados();

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
    //this.configurarStatusForm();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm() {
    //var id = +this.route.snapshot.paramMap.get('id');


    this.meuForm.controls['IDAssTecItemServ'].disable();

    if (this.idCadastro > 0) {
      this.meuForm.get("UIItem").disable();
    }
    /* if (this.modelAssTecItemServ.IDPessoaContaBanco > 0) {
       this.meuForm.get('inCodTipoDocumento').disable();
     }*/
  }

  private criarForm(emEdicao: boolean) {

    this.item.chDescricao = this.modelAssTecItemServ.chDesItem;
    this.item.chCodItem = this.modelAssTecItemServ.chCodItem;
    this.item.IDItem = this.modelAssTecItemServ.IDItem;

    var UIItem = (this.item.IDItem > 0 ? this.item : null);
    this.modelAssTecItemServ['UIItem'] = UIItem;


    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelAssTecItemServ, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDAssTecItemServ: [this.modelAssTecItemServ.IDAssTecItemServ],
        chDesComplem: [this.modelAssTecItemServ.chDesComplem],
        UIItem: [UIItem, Validators.required],
        dtDatInclusao: [this.modelAssTecItemServ.dtDatInclusao],
        chNomeUsuarioInclusao: [this.modelAssTecItemServ.chNomeUsuarioInclusao],
        dtDatUltAlteracao: [this.modelAssTecItemServ.dtDatUltAlteracao],
        chNomeUsuarioAlteracao: [this.modelAssTecItemServ.chNomeUsuarioAlteracao],

      });
    }


  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelAssTecItemServ = new ModelAssTecItemServ();
      // this.modelAssTecItemServ.daDatExpedicao = null;
      // this.modelAssTecItemServ.dtDatInclusao = null;
      // this.modelAssTecItemServ.dtDatUltAlteracao = null;

      this.modelAssTecItemServ.IDAssTecItemServ = id;
      this.modelAssTecItemServ.IDItem = null;
      this.modelAssTecItemServ.chDesComplem = "";

      //pega da URL o id da pessoa
      //this.modelAssTecItemServ.IDPessoa = +this.route.snapshot.paramMap.get('id');
      this.modelAssTecItemServ.IDAssTecItem = this.apiAssTecItemServService.IDAssTecItem;
      /*  if (this.modelAssTecItemServ.IDPessoa == 0) {
          //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
          //this.modelAssTecItemServ.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
          
        }
        if (this.modelAssTecItemServ.IDPessoa == 0 || this.modelAssTecItemServ.IDPessoa == undefined) {
          console.error('Não foi encontrado o id do cadastro da pessoa el');
        }*/

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiAssTecItemServService.obter(id).then(
        dados_API => {
          this.modelAssTecItemServ = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelAssTecItemServ);
    
    if (this.meuForm.value.UIItem) {
      // this.modelItemLoteSerie.chDesItem = this.meuForm.value.UiItem.chDescricao;
      this.modelAssTecItemServ.chCodItem = this.meuForm.value.UIItem.chCodItem;
      if (this.meuForm.value.UIItem.objetoSelecionado) {
        this.modelAssTecItemServ.IDItem = this.meuForm.value.UIItem.objetoSelecionado.IDItem;
      }
    } else {
      this.modelAssTecItemServ.chDesItem = '';
      this.modelAssTecItemServ.IDItem = null;
      this.modelAssTecItemServ.chCodItem = "";
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
    this.apiAssTecItemServService.excluir(this.modelAssTecItemServ.IDAssTecItemServ).then(
      sucesso => {
        //this._location.back();
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiAssTecItemServService.alterar(this.modelAssTecItemServ).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecItemServ = sucesso;


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
    this.apiAssTecItemServService.criar(this.modelAssTecItemServ).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecItemServ = sucesso;
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
