import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

//Componentes
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';

//Modelo de dados
//import { PessoaTipoPessoa } from '../../../models/pessoa-tipo-pessoa';

//APIs
import { ApiPessoaElService } from '../../../../api/api-pessoa-el.service';
import { ApiTipoPessoaService } from '../../../../api/api-tipo-pessoa.service';
import { ApiTipoDocumentoService } from '../../../../api/api-tipo-documento.service';
import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';

//APIs Filhas
import { ApiPessoaDocumentoService } from '../../../../api/api-pessoa-documento.service';
import { ApiPessoaTelefoneService } from '../../../../api/api-pessoa-telefone.service';
import { ApiPessoaEnderecoService } from '../../../../api/api-pessoa-endereco.service';
import { ApiPessoaEmailService } from '../../../../api/api-pessoa-email.service';
import { ApiPessoaContatoService } from '../../../../api/api-pessoa-contato.service';
import { ApiPessoaContaBancoService } from '../../../../api/api-pessoa-conta-banco.service';
import { ModelPessoaEL } from '../../../../models/model-pessoa-el';

//Kendo
//import { TabStripComponent } from '@progress/kendo-angular-layout';
//import { forEach } from '../../../../../../../node_modules/@angular/router/src/utils/collection';
//import { EventEmitter } from '../../../../../../../node_modules/protractor';

@Component({
  selector: 'app-crude-pessoa-juridica',
  templateUrl: './crude-pessoa-juridica.component.html',
  styleUrls: ['./crude-pessoa-juridica.component.scss']
})
export class CrudePessoaJuridicaComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public pessoalEL: ModelPessoaEL;
  public apiErrorCollection: ApiErrorCollection;
  public meuForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiPessoaElService: ApiPessoaElService,
    public apiTipoPessoaService: ApiTipoPessoaService,
    public ApiTipoDocumentoService: ApiTipoDocumentoService,
    private formB: FormBuilder,
    private _location: Location,
    private apiPessoaDocumentoService: ApiPessoaDocumentoService,
    private apiPessoaTelefoneService: ApiPessoaTelefoneService,
    private apiPessoaEnderecoService: ApiPessoaEnderecoService,
    private apiPessoaEmailService: ApiPessoaEmailService,
    private apiPessoaContatoService: ApiPessoaContatoService,
    private apiPessoaContaBancoService: ApiPessoaContaBancoService,
  ) {
    this.pessoalEL = new ModelPessoaEL();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDadosTab_DadosPessoais();
    
  }

  public ngAfterViewInit() {
    
  }

  /**
   * Retorna o id do cadastro sendo acessado
   * Implementação do método da interface CadastroBarraAcaoPai
   */
  public cadastroBarraAcaoPai_getIdCadastro(): number {
    if (this.pessoalEL) {
      return this.pessoalEL.IDPessoa;
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
    this.getPessoa();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('CNPJ').disable();
    }
    this.meuForm.controls['IDPessoa'].disable();
  }

  private criarForm(emEdicao: boolean) {

    var CNPJ: string = (this.pessoalEL.inNumIdentificacao > 0 ? (this.pessoalEL.inNumIdentificacao + '').padStart(14, "0") : '');
    this.pessoalEL['CNPJ'] = CNPJ;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.pessoalEL, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDPessoa: [this.pessoalEL.IDPessoa],
        chNomePessoa: [this.pessoalEL.chNomePessoa, Validators.required],
        chNomeFantasia: [this.pessoalEL.chNomeFantasia],
        chIM: [this.pessoalEL.chIM],
        chIE: [this.pessoalEL.chIE],
        CNPJ: [CNPJ, Validators.required]

      });
    }

  }

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.pessoalEL);
    this.pessoalEL.inNumIdentificacao = this.meuForm.value.CNPJ;
  }

  private getPessoa() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    
    if (id == 0) {
      this.pessoalEL = new ModelPessoaEL();
      this.pessoalEL.inCodTipoPessoa = 2; //Pessoa Jurídica
      this.pessoalEL.inCodTipoDocumento = 2; //CNPJ
      this.criarForm(true);
      this.ApiTipoDocumentoService.setInCodTipoPessoa(this.pessoalEL.inCodTipoPessoa);
    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai
      this.apiPessoaDocumentoService.setIdPessoa(id);
      this.apiPessoaContaBancoService.setIdPessoa(id);
      this.apiPessoaContatoService.setIdPessoa(id);
      this.apiPessoaEmailService.setIdPessoa(id);
      this.apiPessoaTelefoneService.setIdPessoa(id);
      this.apiPessoaEnderecoService.setIdPessoa(id);

      //carrego os dados da pessoa física do id recebido 
      this.apiPessoaElService.obter(id).then(
        pessoa => {
          this.pessoalEL = pessoa;
          this.ApiTipoDocumentoService.setInCodTipoPessoa(this.pessoalEL.inCodTipoPessoa);
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
    this.getPessoa();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.pessoalEL.IDPessoa > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiPessoaElService.excluir(this.pessoalEL.IDPessoa).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiPessoaElService.alterar(this.pessoalEL).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoalEL = sucesso;
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
    this.apiPessoaElService.criar(this.pessoalEL).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoalEL = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('CNPJ').disable();

        //informo ao serviço dos dados filhos o ID do pai
        
        this.apiPessoaDocumentoService.setIdPessoa(this.pessoalEL.IDPessoa);
        this.apiPessoaEnderecoService.setIdPessoa(this.pessoalEL.IDPessoa);
        this.apiPessoaEmailService.setIdPessoa(this.pessoalEL.IDPessoa);
        this.apiPessoaTelefoneService.setIdPessoa(this.pessoalEL.IDPessoa);
        this.apiPessoaContatoService.setIdPessoa(this.pessoalEL.IDPessoa);
        this.apiPessoaContaBancoService.setIdPessoa(this.pessoalEL.IDPessoa);
        this.ApiTipoDocumentoService.setInCodTipoPessoa(this.pessoalEL.inCodTipoPessoa);
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
