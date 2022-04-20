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
import { ModelEstipulante } from '../../../../models/model-estipulante';
//import { PessoaTipoPessoa } from '../../../models/pessoa-tipo-pessoa';

//APIs
import { ApiEstipulanteService } from '../../../../api/api-estipulante.service';
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
  selector: 'app-crude-estipulante-detalhe',
  templateUrl: './crude-estipulante-detalhe.component.html',
  styleUrls: ['./crude-estipulante-detalhe.component.scss']
})
export class CrudeEstipulanteDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public modelEstipulante: ModelEstipulante;
  public apiErrorCollection: ApiErrorCollection;
  public meuForm: FormGroup;

  private cnpjAnterior: string;
  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiEstipulanteService: ApiEstipulanteService,
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
    this.modelEstipulante = new ModelEstipulante();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDadosTab_DadosPessoais();
    //Promise.resolve(null).then(() => this.inicializarDadosTab_DadosPessoais());
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

  public ngAfterViewInit() {
    //Promise.resolve(null).then(() => this.kendoTabStripInstance.selectTab(0));
  }

  /**
   * Retorna o id do cadastro sendo acessado
   * Implementação do método da interface CadastroBarraAcaoPai
   */
  public cadastroBarraAcaoPai_getIdCadastro(): number {
    if (this.modelEstipulante) {
      return this.modelEstipulante.IDPessoa;
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


    var CNPJ: string = (this.modelEstipulante.inNumIdentificacao > 0 ? (this.modelEstipulante.inNumIdentificacao + '').padStart(14, "0") : '');
    this.modelEstipulante['CNPJ'] = CNPJ;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelEstipulante, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDPessoa: [this.modelEstipulante.IDPessoa],
        chNomePessoa: [this.modelEstipulante.chNomePessoa, Validators.required],
        chNomeFantasia: [this.modelEstipulante.chNomeFantasia],
        chIM: [this.modelEstipulante.chIM],
        chIE: [this.modelEstipulante.chIE],
        CNPJ: [CNPJ, Validators.required]

      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelEstipulante);
    this.modelEstipulante.inNumIdentificacao = this.meuForm.value.CNPJ;
  }

  private getPessoa() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelEstipulante = new ModelEstipulante();
      this.modelEstipulante.inCodTipoPessoa = 2; //Pessoa Jurídica
      this.modelEstipulante.inCodTipoDocumento = 2; //CNPJ
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
      this.apiEstipulanteService.obter(id).then(
        pessoa => {
          this.modelEstipulante = pessoa;
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
    if (this.modelEstipulante.IDPessoa > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiEstipulanteService.excluir(this.modelEstipulante.IDPessoa).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiEstipulanteService.alterar(this.modelEstipulante).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelEstipulante = sucesso;
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
    this.apiEstipulanteService.criar(this.modelEstipulante).then(
      sucesso => {
        //this.meuForm.reset();
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelEstipulante = sucesso;
        //this.meuForm.controls['inNumIdentificacao'].disable();
        this.meuForm.get('CNPJ').disable();
        this.criarForm(false);
        //this.exibirDadosForm();
        // this.meuForm.reset();
        // this.meuForm.markAsUntouched();
        // this.resetarForm();
        this.cadastroBarraAcao.esconderAguarde();

        //informo ao serviço dos dados filhos o ID do pai
        this.apiPessoaDocumentoService.setIdPessoa(this.modelEstipulante.IDPessoa);
        this.apiPessoaEnderecoService.setIdPessoa(this.modelEstipulante.IDPessoa);
        this.apiPessoaEmailService.setIdPessoa(this.modelEstipulante.IDPessoa);
        this.apiPessoaTelefoneService.setIdPessoa(this.modelEstipulante.IDPessoa);
        this.apiPessoaContatoService.setIdPessoa(this.modelEstipulante.IDPessoa);
        this.apiPessoaContaBancoService.setIdPessoa(this.modelEstipulante.IDPessoa);
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
