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
import { ModelSegurado } from '../../../../models/model-segurado';
//import { PessoaTipoPessoa } from '../../../models/pessoa-tipo-pessoa';

//APIs
import { ApiSeguradoService } from '../../../../api/api-segurado.service';
import { ApiTipoPessoaService } from '../../../../../corp/api/api-tipo-pessoa.service';
import { ApiTipoDocumentoService } from '../../../../../corp/api/api-tipo-documento.service';
import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';

//APIs Filhas
import { ApiPessoaDocumentoService } from '../../../../../corp/api/api-pessoa-documento.service';
import { ApiPessoaTelefoneService } from '../../../../../corp/api/api-pessoa-telefone.service';
import { ApiPessoaEnderecoService } from '../../../../../corp/api/api-pessoa-endereco.service';
import { ApiPessoaEmailService } from '../../../../../corp/api/api-pessoa-email.service';
import { ApiPessoaContatoService } from '../../../../../corp/api/api-pessoa-contato.service';
import { ApiPessoaContaBancoService } from '../../../../../corp/api/api-pessoa-conta-banco.service';
import { ApiPessoaElService } from '../../../../../corp/api/api-pessoa-el.service';

//Kendo
//import { TabStripComponent } from '@progress/kendo-angular-layout';
//import { forEach } from '../../../../../../../node_modules/@angular/router/src/utils/collection';
//import { EventEmitter } from '../../../../../../../node_modules/protractor';

@Component({
  selector: 'app-crude-segurado-juridica',
  templateUrl: './crude-segurado-juridica.component.html',
  styleUrls: ['./crude-segurado-juridica.component.scss']
})
export class CrudeSeguradoJuridicaComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public modelSegurado: ModelSegurado;
  public apiErrorCollection: ApiErrorCollection;
  public meuForm: FormGroup;
  private cnpjAnterior: string;
  
  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiSeguradoService: ApiSeguradoService,
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
    private apiPessoaElService: ApiPessoaElService

  ) {
    this.modelSegurado = new ModelSegurado();
    this.apiErrorCollection = new ApiErrorCollection();
  }
  procurarPorCNPJ(cnpj) {
    cnpj = cnpj.split(".").join("");
    cnpj = cnpj.split("-").join("");
    cnpj = cnpj.split("/").join("");

    if (this.cnpjAnterior != undefined) {
      if (cnpj == this.cnpjAnterior) return;
    }

    this.apiPessoaElService.getByCnpj(cnpj).
      then((r) => {
        this.cnpjAnterior = cnpj;
        this.meuForm.get("CNPJ").setValue((r.inNumIdentificacao > 0 ? (r.inNumIdentificacao + '').padStart(14, "0") : ''));
        this.meuForm.get("chNomeFantasia").setValue(r.chNomeFantasia);
        this.meuForm.get("chNomePessoa").setValue(r.chNomePessoa);
        this.meuForm.get("chIE").setValue(r.chIE);
        this.meuForm.get("chIM").setValue(r.chIM);
      }).catch(e => {
        console.log(e);
      });
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
    if (this.modelSegurado) {
      return this.modelSegurado.IDPessoa;
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

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');
    // if(this.modoExclusao){
    //   this.meuForm.disable();
    // }else if(id >0){
    //   this.meuForm.get('CNPJ').disable();
    // }

    if (id > 0) {
      this.meuForm.get('CNPJ').disable();
    }
    //this.meuForm.get('CNPJ').disable();
    this.meuForm.controls['IDPessoa'].disable();
  }

  private criarForm(emEdicao: boolean) {
    //emEdicao = emEdicao || false;


    var CNPJ: string = (this.modelSegurado.inNumIdentificacao > 0 ? (this.modelSegurado.inNumIdentificacao + '').padStart(14, "0") : '');
    this.modelSegurado['CNPJ'] = CNPJ;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSegurado, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDPessoa: [this.modelSegurado.IDPessoa],
        chNomePessoa: [this.modelSegurado.chNomePessoa, Validators.required],
        chNomeFantasia: [this.modelSegurado.chNomeFantasia],
        chIM: [this.modelSegurado.chIM],
        chIE: [this.modelSegurado.chIE],
        CNPJ: [CNPJ, Validators.required]

      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSegurado);
    this.modelSegurado.inNumIdentificacao = this.meuForm.value.CNPJ;
  }

  private getPessoa() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelSegurado = new ModelSegurado();
      this.modelSegurado.inCodTipoPessoa = 2; //Pessoa Jurídica
      this.modelSegurado.inCodTipoDocumento = 2; //CNPJ
      this.criarForm(true);

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
      this.apiSeguradoService.obter(id).then(
        pessoa => {
          this.modelSegurado = pessoa;
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
    if (this.modelSegurado.IDPessoa > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiSeguradoService.excluir(this.modelSegurado.IDPessoa).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSeguradoService.alterar(this.modelSegurado).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSegurado = sucesso;
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
    this.apiSeguradoService.criar(this.modelSegurado).then(
      sucesso => {
        //this.meuForm.reset();
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSegurado = sucesso;
        this.meuForm.get('CNPJ').disable();
        //this.meuForm.controls['inNumIdentificacao'].disable();
        this.criarForm(false);
        //this.exibirDadosForm();
        // this.meuForm.reset();
        // this.meuForm.markAsUntouched();
        // this.resetarForm();
        this.cadastroBarraAcao.esconderAguarde();

        //informo ao serviço dos dados filhos o ID do pai
        this.apiPessoaDocumentoService.setIdPessoa(this.modelSegurado.IDPessoa);
        this.apiPessoaEnderecoService.setIdPessoa(this.modelSegurado.IDPessoa);
        this.apiPessoaEmailService.setIdPessoa(this.modelSegurado.IDPessoa);
        this.apiPessoaTelefoneService.setIdPessoa(this.modelSegurado.IDPessoa);
        this.apiPessoaContatoService.setIdPessoa(this.modelSegurado.IDPessoa);
        this.apiPessoaContaBancoService.setIdPessoa(this.modelSegurado.IDPessoa);
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
