import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelPessoaContaBanco } from '../../../../models/model-pessoa-conta-banco';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPessoaContaBancoService } from '../../../../api/api-pessoa-conta-banco.service';
import { ApiTipoDocumentoService } from '../../../../api/api-tipo-documento.service';
import { ApiBancoService } from '../../../../../finan/api/api-banco.service';
import { ApiTipoContaBancoService } from '../../../../../finan/api/api-tipo-conta-banco.service';
import { ModelTipoDocumento } from '../../../../models/model-tipo-documento';
//import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';


@Component({
  selector: 'app-crude-pessoa-conta-banco-detalhe',
  templateUrl: './crude-pessoa-conta-banco-detalhe.component.html',
  styleUrls: ['./crude-pessoa-conta-banco-detalhe.component.scss']
})
export class CrudePessoaContaBancoDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelPessoaContaBanco: ModelPessoaContaBanco;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  //public idCadastroPai: number;

  //Dados provenientes de chave estrangeira
  private pessoaTipoDocumento = new ModelTipoDocumento;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPessoaContaBancoService: ApiPessoaContaBancoService,
    private _location: Location,
    public apiTipoDocumentoService: ApiTipoDocumentoService,
    public apiBancoService: ApiBancoService,
    public apiTipoContaService: ApiTipoContaBancoService
  ) {
    this.modelPessoaContaBanco = new ModelPessoaContaBanco();
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
  habilitarMask() {
    if (this.meuForm.value.inCodTipoDocumento == 1) {
      return "000.000.000-00";
    } else
      if (this.meuForm.value.inCodTipoDocumento == 2) {
        return "00.000.000/0000-00";
      }
      else {
        return "";
      }
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

    this.meuForm.controls['IDPessoaContaBanco'].disable();

    /* if (this.modelPessoaContaBanco.IDPessoaContaBanco > 0) {
       this.meuForm.get('inCodTipoDocumento').disable();
     }*/
  }

  private criarForm(emEdicao: boolean) {
    this.pessoaTipoDocumento.inCodTipoDocumento = this.modelPessoaContaBanco.inCodTipoDocumento;
    this.pessoaTipoDocumento.chDesTipoDocumento = this.modelPessoaContaBanco.chDesTipoDocumento;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPessoaContaBanco, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDPessoaContaBanco: [this.modelPessoaContaBanco.IDPessoaContaBanco],
        inCodTipoDocumento: [this.modelPessoaContaBanco.inCodTipoDocumento, Validators.required],
        chAgencia: [this.modelPessoaContaBanco.chAgencia, Validators.required],
        chDVAgencia: [this.modelPessoaContaBanco.chDVAgencia],
        chConta: [this.modelPessoaContaBanco.chConta, Validators.required],
        chDVConta: [this.modelPessoaContaBanco.chDVConta, Validators.required],
        chNomeTitular: [this.modelPessoaContaBanco.chNomeTitular, Validators.required],
        inCodBanco: [this.modelPessoaContaBanco.inCodBanco, Validators.required],
        inCodTipoContaBanco: [this.modelPessoaContaBanco.inCodTipoContaBanco, Validators.required],
        inNumIdentificacaoTitular: [this.modelPessoaContaBanco.inNumIdentificacaoTitular, Validators.required],
        dtDatInclusao: [this.modelPessoaContaBanco.dtDatInclusao],
        dtDatUltAlteracao: [this.modelPessoaContaBanco.dtDatUltAlteracao],
      });
    }


  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelPessoaContaBanco = new ModelPessoaContaBanco();
      // this.modelPessoaContaBanco.daDatExpedicao = null;
      // this.modelPessoaContaBanco.dtDatInclusao = null;
      // this.modelPessoaContaBanco.dtDatUltAlteracao = null;

      this.modelPessoaContaBanco.IDPessoaContaBanco = id;
      this.modelPessoaContaBanco.inNumIdentificacaoTitular = undefined;

      //pega da URL o id da pessoa
      //this.modelPessoaContaBanco.IDPessoa = +this.route.snapshot.paramMap.get('id');
      this.modelPessoaContaBanco.IDPessoa = this.apiPessoaContaBancoService.getIdPessoa();
    /*  if (this.modelPessoaContaBanco.IDPessoa == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelPessoaContaBanco.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        
      }
      if (this.modelPessoaContaBanco.IDPessoa == 0 || this.modelPessoaContaBanco.IDPessoa == undefined) {
        console.error('Não foi encontrado o id do cadastro da pessoa el');
      }*/

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiPessoaContaBancoService.obter(id).then(
        dados_API => {
          this.modelPessoaContaBanco = dados_API;
          this.modelPessoaContaBanco.chDVConta = dados_API.chDVConta || dados_API["chDvConta"];

          if ((this.modelPessoaContaBanco.inCodTipoDocumento == 1) && (this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length < 11)) {

            this.modelPessoaContaBanco.inNumIdentificacaoTitular = "0".repeat(11 - this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length) + this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString();

          } else
            if ((this.modelPessoaContaBanco.inCodTipoDocumento == 2) && (this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length < 14)) {
              this.modelPessoaContaBanco.inNumIdentificacaoTitular = "0".repeat(14 - this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length) + this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString();

            } else {
              this.modelPessoaContaBanco.inNumIdentificacaoTitular = this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString();
            }

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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPessoaContaBanco);
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
    this.apiPessoaContaBancoService.excluir(this.modelPessoaContaBanco.IDPessoaContaBanco).then(
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
    this.apiPessoaContaBancoService.alterar(this.modelPessoaContaBanco).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaContaBanco = sucesso;
        this.modelPessoaContaBanco.chDVConta = sucesso.chDVConta || sucesso["chDvConta"];
        if ((this.modelPessoaContaBanco.inCodTipoDocumento == 1) && (this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length < 11)) {

          this.modelPessoaContaBanco.inNumIdentificacaoTitular = "0".repeat(11 - this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length) + this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString();

        } else
          if ((this.modelPessoaContaBanco.inCodTipoDocumento == 2) && (this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length < 14)) {
            this.modelPessoaContaBanco.inNumIdentificacaoTitular = "0".repeat(14 - this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length) + this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString();

          } else {
            this.modelPessoaContaBanco.inNumIdentificacaoTitular = this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString();
          }

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
    this.apiPessoaContaBancoService.criar(this.modelPessoaContaBanco).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaContaBanco = sucesso;
        this.modelPessoaContaBanco.chDVConta = sucesso.chDVConta || sucesso["chDvConta"];
        if ((this.modelPessoaContaBanco.inCodTipoDocumento == 1) && (this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length < 11)) {

          this.modelPessoaContaBanco.inNumIdentificacaoTitular = "0".repeat(11 - this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length) + this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString();

        } else
          if ((this.modelPessoaContaBanco.inCodTipoDocumento == 2) && (this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length < 14)) {
            this.modelPessoaContaBanco.inNumIdentificacaoTitular = "0".repeat(14 - this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString().length) + this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString();

          } else {
            this.modelPessoaContaBanco.inNumIdentificacaoTitular = this.modelPessoaContaBanco.inNumIdentificacaoTitular.toString();
          }

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
