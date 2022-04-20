import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelPessoaEmail } from '../../../../models/model-pessoa-email';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPessoaEmailService } from '../../../../api/api-pessoa-email.service';
import { ApiTipoDocumentoPessoaEmailService } from '../../../../api/api-tipo-pessoa-email.service';
//import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';

@Component({
  selector: 'app-crude-pessoa-email-detalhe',
  templateUrl: './crude-pessoa-email-detalhe.component.html',
  styleUrls: ['./crude-pessoa-email-detalhe.component.scss']
})
export class CrudePessoaEmailDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelPessoaEmail: ModelPessoaEmail;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPessoaEmailService: ApiPessoaEmailService,
    private _location: Location,
    public apiTipoPessoaEmailService: ApiTipoDocumentoPessoaEmailService,
  ) {
    this.modelPessoaEmail = new ModelPessoaEmail();
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

    this.meuForm.controls['IDPessoaEmail'].disable();

    if (this.modelPessoaEmail.IDPessoaEmail > 0) {
      this.meuForm.get('inCodTipoPessoaEmail').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPessoaEmail, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDPessoaEmail: [this.modelPessoaEmail.IDPessoaEmail],
        inCodTipoPessoaEmail: [this.modelPessoaEmail.inCodTipoPessoaEmail, Validators.required],
        chEmail: [this.modelPessoaEmail.chEmail, Validators.required],
        IDPessoa: [this.modelPessoaEmail.IDPessoa, Validators.required],
        dtDatInclusao: [this.modelPessoaEmail.dtDatInclusao],
        dtDatUltAlteracao: [this.modelPessoaEmail.dtDatUltAlteracao],
      });
    }


  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelPessoaEmail = new ModelPessoaEmail();
      // this.modelPessoaEmail.daDatExpedicao = null;
      // this.modelPessoaEmail.dtDatInclusao = null;
      // this.modelPessoaEmail.dtDatUltAlteracao = null;

      this.modelPessoaEmail.IDPessoaEmail = id;

      //pega da URL o id da pessoa
      //this.modelPessoaEmail.IDPessoa = +this.route.snapshot.paramMap.get('id');
      this.modelPessoaEmail.IDPessoa = this.apiPessoaEmailService.getIdPessoa();
      /*if (this.modelPessoaEmail.IDPessoa == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelPessoaEmail.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
       
      }
      if (this.modelPessoaEmail.IDPessoa == 0 || this.modelPessoaEmail.IDPessoa == undefined) {
        console.error('Não foi encontrado o id do cadastro da pessoa el');
      }
*/
      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiPessoaEmailService.obter(id).then(
        dados_API => {
          this.modelPessoaEmail = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPessoaEmail);
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
    this.apiPessoaEmailService.excluir(this.modelPessoaEmail.IDPessoaEmail).then(
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
    this.apiPessoaEmailService.alterar(this.modelPessoaEmail).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaEmail = sucesso;
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
    this.apiPessoaEmailService.criar(this.modelPessoaEmail).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaEmail = sucesso;
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
