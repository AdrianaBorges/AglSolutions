import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelPessoaTelefone } from '../../../../models/model-pessoa-telefone';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPessoaTelefoneService } from '../../../../api/api-pessoa-telefone.service';
import { ApiTipoDocumentoPessoaTelefoneService } from '../../../../api/api-tipo-pessoa-telefone.service';

//import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';



@Component({
  selector: 'app-crude-pessoa-telefone-detalhe',
  templateUrl: './crude-pessoa-telefone-detalhe.component.html',
  styleUrls: ['./crude-pessoa-telefone-detalhe.component.scss']
})
export class CrudePessoaTelefoneDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelPessoaTelefone: ModelPessoaTelefone;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPessoaTelefoneService: ApiPessoaTelefoneService,
    private _location: Location,
    public apiTipoPessoatelefoneService: ApiTipoDocumentoPessoaTelefoneService
  ) {
    this.modelPessoaTelefone = new ModelPessoaTelefone();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    this.criarForm(true);
    //this.getDados();

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

    this.meuForm.controls['IDPessoaTelefone'].disable();

    if (this.modelPessoaTelefone.IDPessoaTelefone > 0) {
      this.meuForm.get('inCodTipoPessoaTelefone').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPessoaTelefone, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDPessoaTelefone: [this.modelPessoaTelefone.IDPessoaTelefone],
        inCodTipoPessoaTelefone: [this.modelPessoaTelefone.inCodTipoPessoaTelefone, Validators.required],
        chDDI: [this.modelPessoaTelefone.chDDI, Validators.required],
        IDPessoa: [this.modelPessoaTelefone.IDPessoa, Validators.required],
        chDDD: [this.modelPessoaTelefone.chDDD, Validators.required],
        chNumero: [this.modelPessoaTelefone.chNumero, Validators.required],
        dtDatInclusao: [this.modelPessoaTelefone.dtDatInclusao],
        dtDatUltAlteracao: [this.modelPessoaTelefone.dtDatUltAlteracao],
      });
    }


  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelPessoaTelefone = new ModelPessoaTelefone();
      // this.modelPessoaTelefone.daDatExpedicao = null;
      // this.modelPessoaTelefone.dtDatInclusao = null;
      // this.modelPessoaTelefone.dtDatUltAlteracao = null;

      this.modelPessoaTelefone.IDPessoaTelefone = id;

      //pega da URL o id da pessoa
//      this.modelPessoaTelefone.IDPessoa = +this.route.snapshot.paramMap.get('id');
      this.modelPessoaTelefone.IDPessoa = this.apiPessoaTelefoneService.getIdPessoa();
  /*    if (this.modelPessoaTelefone.IDPessoa == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelPessoaTelefone.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelPessoaTelefone.IDPessoa = this.apiPessoaTelefoneService.getIdPessoa()
      }
      if (this.modelPessoaTelefone.IDPessoa == 0 || this.modelPessoaTelefone.IDPessoa == undefined) {
        console.error('Não foi encontrado o id do cadastro da pessoa el');
      }
*/
      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiPessoaTelefoneService.obter(id).then(
        dados_API => {
          this.modelPessoaTelefone = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPessoaTelefone);
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
    this.apiPessoaTelefoneService.excluir(this.modelPessoaTelefone.IDPessoaTelefone).then(
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
    this.apiPessoaTelefoneService.alterar(this.modelPessoaTelefone).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaTelefone = sucesso;
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
    this.apiPessoaTelefoneService.criar(this.modelPessoaTelefone).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaTelefone = sucesso;
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
