import { ApiGrupoClienteService } from './../../../../api/api-grupo-cliente.service';
import { ApiPapelPessoaService } from './../../../../api/api-papel-pessoa.service';
import { ApiSituacaoCadService } from './../../../../api/api-situacao-cad.service';

import { Location } from "@angular/common";
import { ModelClienteEL01 } from "../../../../models/model-ClienteEL01";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CadastroBarraAcaoComponent } from "../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component";
import { ApiErrorCollection } from "../../../../../../api-error/api-error-collection";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CabecalhoBreadcrumbService } from "../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { ApiPessoaDocumentoService } from "../../../../api/api-pessoa-documento.service";
import { ApiPessoaTelefoneService } from "../../../../api/api-pessoa-telefone.service";
import { ApiPessoaEnderecoService } from "../../../../api/api-pessoa-endereco.service";
import { ApiPessoaEmailService } from "../../../../api/api-pessoa-email.service";
import { ApiPessoaContatoService } from "../../../../api/api-pessoa-contato.service";
import { ApiPessoaElService } from "../../../../api/api-pessoa-el.service";
import { ApiTipoDocumentoService } from "../../../../api/api-tipo-documento.service";
import { ApiClienteEl01Service } from "../../../../api/api-cliente-el01.service";
import { ApiMicrorregiaoService } from '../../../../api/api-microrregiao.service';
import { ApiCanalVendaService } from '../../../../api/api-canal-venda.service';
import { ApiRegiaoService } from '../../../../api/api-regiao.service';
import { ApiRepresentanteEl01Service } from '../../../../api/api-representante-el01.service';
@Component({
  selector: 'app-crude-cliente-detalhe',
  templateUrl: './crude-cliente-detalhe.component.html',
  styleUrls: ['./crude-cliente-detalhe.component.scss']
})
export class CrudeClienteDetalheComponent implements OnInit {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public modelClienteEL01: ModelClienteEL01;
  public apiErrorCollection: ApiErrorCollection;
  private clienteSuperior = {
    chNomecliente: '',
    inCodcliente: 0
  };

  private pessoa = {
    chNomePessoa: '',
    IDPessoa: 0
  };
  private pagador = {
    chNomePessoa: '',
    IDPapelPessoa: 0
  };

  private representante = {
    chNomeRepresentante: '',
    inCodRepresentante: 0
  };

  public meuForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiClienteEl01Service: ApiClienteEl01Service,
    public apiClienteEl01SuperiorService: ApiClienteEl01Service,
    private formB: FormBuilder,
    private _location: Location,
    private apiPessoaDocumentoService: ApiPessoaDocumentoService,
    private apiPessoaTelefoneService: ApiPessoaTelefoneService,
    private apiPessoaEnderecoService: ApiPessoaEnderecoService,
    private apiPessoaEmailService: ApiPessoaEmailService,
    private apiPessoaContatoService: ApiPessoaContatoService,
    public apiTipoDocumentoService: ApiTipoDocumentoService,
    public apiRepresentanteEl01Service: ApiRepresentanteEl01Service,
    public apiPapelPessoaService: ApiPapelPessoaService,
    public apiPessoaElService: ApiPessoaElService,
    public apiGrupoClienteService: ApiGrupoClienteService,
    public apiMicrorregiaoService: ApiMicrorregiaoService,
    public apiCanalVendaService: ApiCanalVendaService,
    public apiRegiaoService: ApiRegiaoService,

  ) {
    this.modelClienteEL01 = new ModelClienteEL01();
    this.modelClienteEL01.inCodTipoPessoaCliente = 1;
    this.apiPapelPessoaService.setInCodTipoPapel([10]);
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnDestroy() {
    this.apiPapelPessoaService.setInCodTipoPapel([]);
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
    if (this.modelClienteEL01) {
      return this.modelClienteEL01.IDPessoaCliente;
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
      this.meuForm.get('UIData_Pessoa').disable();
    }
    this.meuForm.controls['IDCliente'].disable();
  }

  private criarForm(emEdicao: boolean) {
    //Cliente Matriz
    this.clienteSuperior.chNomecliente = this.modelClienteEL01.chNomeClientePai;
    this.clienteSuperior.inCodcliente = this.modelClienteEL01.inCodClientePai;

    var UIData_ClienteSuperior = (this.clienteSuperior.inCodcliente > 0 ? this.clienteSuperior : null);
    this.modelClienteEL01['UIData_ClienteSuperior'] = UIData_ClienteSuperior;


    this.pessoa.chNomePessoa = this.modelClienteEL01.chNomeCliente;
    this.pessoa.IDPessoa = this.modelClienteEL01.IDPessoaCliente;

    var UIData_Pessoa = (this.pessoa.IDPessoa > 0 ? this.pessoa : null);
    this.modelClienteEL01['UIData_Pessoa'] = UIData_Pessoa;


    this.pagador.chNomePessoa = this.modelClienteEL01.chNomePagador;
    this.pagador.IDPapelPessoa = this.modelClienteEL01.IDPapelPessoaPagador

    var UIData_Pagador = (this.pagador.IDPapelPessoa > 0 ? this.pagador : null);
    this.modelClienteEL01['UIData_Pagador'] = UIData_Pagador;


    this.representante.chNomeRepresentante = this.modelClienteEL01.chNomeRepresentante;
    this.representante.inCodRepresentante = this.modelClienteEL01.inCodRepresentante

    var UIData_representante = (this.representante.inCodRepresentante > 0 ? this.representante : null);
    this.modelClienteEL01['UIData_representante'] = UIData_representante;

    if (this.modelClienteEL01.daDatExpLimCredito) {
      this.modelClienteEL01.daDatExpLimCredito = new Date(this.modelClienteEL01.daDatExpLimCredito);
    }


    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelClienteEL01, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDCliente: [this.modelClienteEL01.IDCliente],
        inCodCliente: [this.modelClienteEL01.inCodCliente],
        chNomeAbreviado: [this.modelClienteEL01.chNomeAbreviado, Validators.required],
        UIData_Pessoa: [UIData_Pessoa, Validators.required],
        UIData_ClienteSuperior: UIData_ClienteSuperior, //cliente matriz
        UIData_Pagador: UIData_Pagador,
        UIData_representante: [UIData_representante, Validators.required],
        chCodGrupoCliente: [this.modelClienteEL01.chCodGrupoCliente, Validators.required],
        chCodCanalVenda: [this.modelClienteEL01.chCodCanalVenda],
        chCodRegiao: [this.modelClienteEL01.chCodRegiao],
        IDMicrorregiao: [this.modelClienteEL01.IDMicrorregiao],
        chDesSuframa: [this.modelClienteEL01.chDesSuframa],
        lgPermComunic: [this.modelClienteEL01.lgPermComunic],
        deValLimCredito: [this.modelClienteEL01.deValLimCredito],
        daDatExpLimCredito: [this.modelClienteEL01.daDatExpLimCredito],
        dtDatInclusao: [this.modelClienteEL01.dtDatInclusao],
        dtDatUltAlteracao: [this.modelClienteEL01.dtDatUltAlteracao],
        chDesObservacao: [this.modelClienteEL01.chDesObservacao],
        chDesSituacaoCad: [this.modelClienteEL01.chDesSituacaoCad],
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelClienteEL01);


    if (this.meuForm.value.UIData_ClienteSuperior) {
      this.modelClienteEL01.chNomeClientePai = this.meuForm.value.UIData_ClienteSuperior.chNomecliente;
      this.modelClienteEL01.inCodClientePai = this.meuForm.value.UIData_ClienteSuperior.inCodcliente;
      if (this.meuForm.value.UIData_ClienteSuperior.objetoSelecionado) {
        this.modelClienteEL01.IDClientePai = this.meuForm.value.UIData_ClienteSuperior.objetoSelecionado.IDCliente;
      }
    } else {
      this.modelClienteEL01.chNomeClientePai = '';
      this.modelClienteEL01.IDClientePai = null;
    }

    if (this.meuForm.value.UIData_Pessoa) {
      this.modelClienteEL01.chNomeCliente = this.meuForm.value.UIData_Pessoa.chNomePessoa;
      this.modelClienteEL01.IDPessoaCliente = this.meuForm.value.UIData_Pessoa.IDPessoa;
    } else {
      this.modelClienteEL01.chNomeCliente = '';
      this.modelClienteEL01.IDPessoaCliente = null;
    }
    if (this.meuForm.value.UIData_Pagador) {
      this.modelClienteEL01.chNomePagador = this.meuForm.value.UIData_Pagador.chNomePessoa;
      this.modelClienteEL01.IDPapelPessoaPagador = this.meuForm.value.UIData_Pagador.IDPapelPessoa;
    } else {
      this.modelClienteEL01.chNomePagador = '';
      this.modelClienteEL01.IDPapelPessoaPagador = null;
    }
    if (this.meuForm.value.UIData_representante) {
      this.modelClienteEL01.chNomeRepresentante = this.meuForm.value.UIData_representante.chNomeRepresentante;
      this.modelClienteEL01.inCodRepresentante = this.meuForm.value.UIData_representante.IDRepresentante;

      if (this.meuForm.value.UIData_representante.objetoSelecionado) {
        this.modelClienteEL01.IDRepresentante = this.meuForm.value.UIData_representante.objetoSelecionado.IDRepresentante;
      }
    } else {
      this.modelClienteEL01.chNomeRepresentante = '';
      this.modelClienteEL01.inCodRepresentante = null;
      this.modelClienteEL01.IDRepresentante = null;
    }

  }

  private getPessoa() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelClienteEL01 = new ModelClienteEL01();
      this.modelClienteEL01.inCodTipoPessoaCliente = 1; //Pessoa Física
      this.modelClienteEL01.inCodTipoDocumentoCliente = 1; //CPF
      this.modelClienteEL01.IDPessoaCliente = null;
      this.modelClienteEL01.chNomeAbreviado = '';
      this.modelClienteEL01.chNomeCliente = '';
      this.modelClienteEL01.inNumIdentifCliente = null;
      this.modelClienteEL01.chDesObservacao = "";
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


      //carrego os dados da pessoa física do id recebido 
      this.apiClienteEl01Service.obter(id).then(
        pessoa => {
          this.modelClienteEL01 = pessoa;
          this.apiPessoaDocumentoService.setIdPessoa(this.modelClienteEL01.IDPessoaCliente);
          this.apiPessoaContatoService.setIdPessoa(this.modelClienteEL01.IDPessoaCliente);
          this.apiPessoaEmailService.setIdPessoa(this.modelClienteEL01.IDPessoaCliente);
          this.apiPessoaTelefoneService.setIdPessoa(this.modelClienteEL01.IDPessoaCliente);
          this.apiPessoaEnderecoService.setIdPessoa(this.modelClienteEL01.IDPessoaCliente);
          this.apiTipoDocumentoService.setInCodTipoPessoa(this.modelClienteEL01.inCodTipoDocumentoCliente);
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

  generoAlterado(genero) {
    //esse é o valor atual
    //console.log('genero = ', genero); 

    // esse é o valor antigo que será atualizado pelo formGroup automaticamente
    //console.log('form = ', this.meuForm.value.inCodSexo); 
  }

  btnCancelar() {
    this.getPessoa();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.modelClienteEL01.IDCliente > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiClienteEl01Service.excluir(this.modelClienteEL01.IDCliente).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiClienteEl01Service.alterar(this.modelClienteEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelClienteEL01 = sucesso;
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
    this.apiClienteEl01Service.criar(this.modelClienteEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelClienteEL01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('UIData_Pessoa').disable();

        //informo ao serviço dos dados filhos o ID do pai
        this.apiPessoaDocumentoService.setIdPessoa(this.modelClienteEL01.IDPessoaCliente);
        this.apiPessoaContatoService.setIdPessoa(this.modelClienteEL01.IDPessoaCliente);
        this.apiPessoaEmailService.setIdPessoa(this.modelClienteEL01.IDPessoaCliente);
        this.apiPessoaTelefoneService.setIdPessoa(this.modelClienteEL01.IDPessoaCliente);
        this.apiPessoaEnderecoService.setIdPessoa(this.modelClienteEL01.IDPessoaCliente);
        this.apiTipoDocumentoService.setInCodTipoPessoa(this.modelClienteEL01.inCodTipoDocumentoCliente);
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
