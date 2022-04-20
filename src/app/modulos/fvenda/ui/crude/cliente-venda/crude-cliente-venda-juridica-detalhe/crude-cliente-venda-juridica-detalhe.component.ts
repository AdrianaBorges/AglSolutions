import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ModelClienteEl02 } from '../../../../models/model-cliente-EL02';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiClienteEL02Service } from '../../../../api/api-cliente-el02.service';
import { ApiRepresVendaEL01Service } from '../../../../api/api-repres-venda-el01.service';
import { ApiGrupoClienteService } from '../../../../../corp/api/api-grupo-cliente.service';
import { ApiRegiaoService } from '../../../../../corp/api/api-regiao.service';
import { ApiMicrorregiaoService } from '../../../../../corp/api/api-microrregiao.service';
import { ApiPapelPessoaService } from '../../../../../corp/api/api-papel-pessoa.service';
import { ApiCanalVendaService } from '../../../../../corp/api/api-canal-venda.service';
import { ApiPessoaDocumentoService } from '../../../../../corp/api/api-pessoa-documento.service';
import { ApiPessoaTelefoneService } from '../../../../../corp/api/api-pessoa-telefone.service';
import { ApiPessoaEnderecoService } from '../../../../../corp/api/api-pessoa-endereco.service';
import { ApiPessoaEmailService } from '../../../../../corp/api/api-pessoa-email.service';
import { ApiPessoaContatoService } from '../../../../../corp/api/api-pessoa-contato.service';
import { ApiPessoaElService } from '../../../../../corp/api/api-pessoa-el.service';
import { ApiTipoDocumentoService } from '../../../../../corp/api/api-tipo-documento.service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-crude-cliente-venda-juridica-detalhe',
  templateUrl: './crude-cliente-venda-juridica-detalhe.component.html',
  styleUrls: ['./crude-cliente-venda-juridica-detalhe.component.scss']
})
export class CrudeClienteVendaJuridicaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public dtNascimento: Date;
  //public modoExclusao: boolean;

  public modelClienteEl02: ModelClienteEl02;
  public apiErrorCollection: ApiErrorCollection;
  private representante = {
    chNomeRepresentante: '',
    inCodRepresentante: 0
  };
  private clienteMatriz = {
    chNomeCliente: '',
    inCodCliente: 0
  };

  private pagador = {
    chNomePessoa: '',
    IDPapelPessoa: 0
  };
  cnpjAnterior: number = undefined;

  public meuForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiClienteEL02Service: ApiClienteEL02Service,
    public apiClienteEL02MatrizService: ApiClienteEL02Service,
    public apiRepresVendaEL01Service: ApiRepresVendaEL01Service,
    public apiGrupoClienteService: ApiGrupoClienteService,
    public apiRegiaoService: ApiRegiaoService,
    public apiMicrorregiaoService: ApiMicrorregiaoService,
    public apiPapelPessoaService: ApiPapelPessoaService,
    public apiCanalVendaService: ApiCanalVendaService,
    private formB: FormBuilder,
    private _location: Location,
    private apiPessoaDocumentoService: ApiPessoaDocumentoService,
    private apiPessoaTelefoneService: ApiPessoaTelefoneService,
    private apiPessoaEnderecoService: ApiPessoaEnderecoService,
    private apiPessoaEmailService: ApiPessoaEmailService,
    private apiPessoaContatoService: ApiPessoaContatoService,
    private apiPessoaElService: ApiPessoaElService,
    public apiTipoDocumentoService: ApiTipoDocumentoService,
  ) {
    this.modelClienteEl02 = new ModelClienteEl02();
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
        this.meuForm.get("chNomeCliente").setValue(r.chNomePessoa);
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
    if (this.modelClienteEl02) {
      return this.modelClienteEl02.IDPessoaCliente;
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
    this.meuForm.controls['IDCliente'].disable();
  }

  private criarForm(emEdicao: boolean) {

    this.representante.chNomeRepresentante = this.modelClienteEl02.chNomeRepresentante;
    this.representante.inCodRepresentante = this.modelClienteEl02.inCodRepresentante;

    var UIData_Representante = (this.representante.inCodRepresentante > 0 ? this.representante : null);
    this.modelClienteEl02['UIData_Representante'] = UIData_Representante;

    this.clienteMatriz.chNomeCliente = this.modelClienteEl02.chNomeClientePai;
    this.clienteMatriz.inCodCliente = this.modelClienteEl02.inCodClientePai;

    var UIData_ClienteMatriz = (this.clienteMatriz.inCodCliente > 0 ? this.clienteMatriz : null);
    this.modelClienteEl02['UIData_ClienteMatriz'] = UIData_ClienteMatriz;


    this.pagador.chNomePessoa = this.modelClienteEl02.chNomePagador;
    this.pagador.IDPapelPessoa = this.modelClienteEl02.IDPapelPessoaPagador;

    var UIData_Pagador = (this.pagador.IDPapelPessoa > 0 ? this.pagador : null);
    this.modelClienteEl02['UIData_Pagador'] = UIData_Pagador;



    var CNPJ: string = (this.modelClienteEl02.inNumIdentifCliente > 0 ? (this.modelClienteEl02.inNumIdentifCliente + '').padStart(14, "0") : '');
    this.modelClienteEl02['CNPJ'] = CNPJ;

    if (this.modelClienteEl02.daDatFundacao) {
      this.modelClienteEl02.daDatFundacao = new Date(this.modelClienteEl02.daDatFundacao);
    }
    if (this.modelClienteEl02.daDatExpLimCredito) {
      this.modelClienteEl02.daDatExpLimCredito = new Date(this.modelClienteEl02.daDatExpLimCredito);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelClienteEl02, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDCliente: [this.modelClienteEl02.IDCliente],
        inCodCliente: [this.modelClienteEl02.inCodCliente],
        chNomeCliente: [this.modelClienteEl02.chNomeCliente, Validators.required],
        chNomeAbreviado: [this.modelClienteEl02.chNomeAbreviado, Validators.required],
        daDatFundacao: [this.modelClienteEl02.daDatFundacao, Validators.required],
        CNPJ: [CNPJ, Validators.required],

        chIE: [this.modelClienteEl02.chIE],
        chIM: [this.modelClienteEl02.chIM],
        UIData_ClienteMatriz: UIData_ClienteMatriz,
        UIData_Pagador: UIData_Pagador,
        UIData_Representante: UIData_Representante,
        chCodGrupoCliente: [this.modelClienteEl02.chCodGrupoCliente, Validators.required],
        chCodCanalVenda: [this.modelClienteEl02.chCodCanalVenda],
        chCodRegiao: [this.modelClienteEl02.chCodRegiao],
        IDMicrorregiao: [this.modelClienteEl02.IDMicrorregiao],
        chDesSuframa: [this.modelClienteEl02.chDesSuframa],
        lgPermComunic: [this.modelClienteEl02.lgPermComunic],
        deValLimCredito: [this.modelClienteEl02.deValLimCredito],
        daDatExpLimCredito: [this.modelClienteEl02.daDatExpLimCredito],
        chCxPostal: [this.modelClienteEl02.chCxPostal],
        chDesObservacao: [this.modelClienteEl02.chDesObservacao],
        chDesSituacaoCad: [this.modelClienteEl02.chDesSituacaoCad],
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelClienteEl02);

    this.modelClienteEl02.inNumIdentifCliente = this.meuForm.value.CNPJ;
    if (this.meuForm.value.UIData_Representante) {
      this.modelClienteEl02.chNomeRepresentante = this.meuForm.value.UIData_Representante.chNomeRepresentante;
      this.modelClienteEl02.inCodRepresentante = this.meuForm.value.UIData_Representante.inCodRepresentante;
      if (this.meuForm.value.UIData_Representante.objetoSelecionado) {
        this.modelClienteEl02.IDRepresentante = this.meuForm.value.UIData_Representante.objetoSelecionado.IDRepresentante;
      }
    } else {
      this.modelClienteEl02.chNomeRepresentante = '';
      this.modelClienteEl02.IDRepresentante = null;
    }

    if (this.meuForm.value.UIData_Pagador) {
      this.modelClienteEl02.chNomePagador = this.meuForm.value.UIData_Pagador.chNomePessoa;
      this.modelClienteEl02.IDPapelPessoaPagador = this.meuForm.value.UIData_Pagador.IDPapelPessoa;
    } else {
      this.modelClienteEl02.chNomePagador = '';
      this.modelClienteEl02.IDPapelPessoaPagador = null;
    }

    if (this.meuForm.value.UIData_ClienteMatriz) {
      this.modelClienteEl02.chNomeClientePai = this.meuForm.value.UIData_ClienteMatriz.chNomeCliente;
      this.modelClienteEl02.inCodClientePai = this.meuForm.value.UIData_ClienteMatriz.inCodCliente;
      if (this.meuForm.value.UIData_ClienteMatriz.objetoSelecionado) {
        this.modelClienteEl02.IDClientePai = this.meuForm.value.UIData_ClienteMatriz.objetoSelecionado.IDCliente;
      }
    } else {
      this.modelClienteEl02.chNomeClientePai = '';
      this.modelClienteEl02.IDClientePai = null;
    }



  }

  private getPessoa() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelClienteEl02 = new ModelClienteEl02();
      this.modelClienteEl02.inCodTipoDocumentoCliente = 2; //Pessoa Física
      this.modelClienteEl02.inCodTipoPessoaCliente = 2; //CPF
      this.modelClienteEl02.IDCliente = 0;
      this.modelClienteEl02.daDatFundacao = null;
      this.modelClienteEl02.chNomeAbreviado = '';
      this.modelClienteEl02.chNomeCliente = '';
      this.modelClienteEl02.inNumIdentifCliente = null;
      this.modelClienteEl02.IDMicrorregiao = null;
      this.modelClienteEl02.chCodRegiao = '';
      this.modelClienteEl02.chCodCanalVenda = '';
      this.modelClienteEl02.chCodGrupoCliente = '';
      this.modelClienteEl02.IDRepresentante = null;
      this.modelClienteEl02.IDPapelPessoaPagador = null;
      this.modelClienteEl02.IDClientePai = null;
      this.modelClienteEl02.chIE = '';
      this.modelClienteEl02.chIM = '';
      this.modelClienteEl02.chDesObservacao = "";
      this.modelClienteEl02.lgPermComunic = null;
      this.modelClienteEl02.deValLimCredito = null;
      this.modelClienteEl02.daDatExpLimCredito = null;
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


      //carrego os dados da pessoa física do id recebido 
      this.apiClienteEL02Service.obter(id).then(
        pessoa => {
          this.modelClienteEl02 = pessoa;
          this.apiPessoaDocumentoService.setIdPessoa(this.modelClienteEl02.IDPessoaCliente);
          this.apiPessoaContatoService.setIdPessoa(this.modelClienteEl02.IDPessoaCliente);
          this.apiPessoaEmailService.setIdPessoa(this.modelClienteEl02.IDPessoaCliente);
          this.apiPessoaTelefoneService.setIdPessoa(this.modelClienteEl02.IDPessoaCliente);
          this.apiPessoaEnderecoService.setIdPessoa(this.modelClienteEl02.IDPessoaCliente);
          this.apiTipoDocumentoService.setInCodTipoPessoa(this.modelClienteEl02.inCodTipoPessoaCliente);
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
    if (this.modelClienteEl02.IDCliente > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiClienteEL02Service.excluir(this.modelClienteEl02.IDCliente).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiClienteEL02Service.alterar(this.modelClienteEl02).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelClienteEl02 = sucesso;
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
    this.apiClienteEL02Service.criar(this.modelClienteEl02).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelClienteEl02 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('CNPJ').disable();

        //informo ao serviço dos dados filhos o ID do pai
        this.apiPessoaDocumentoService.setIdPessoa(this.modelClienteEl02.IDPessoaCliente);
        this.apiPessoaContatoService.setIdPessoa(this.modelClienteEl02.IDPessoaCliente);
        this.apiPessoaEmailService.setIdPessoa(this.modelClienteEl02.IDPessoaCliente);
        this.apiPessoaTelefoneService.setIdPessoa(this.modelClienteEl02.IDPessoaCliente);
        this.apiPessoaEnderecoService.setIdPessoa(this.modelClienteEl02.IDPessoaCliente);
        this.apiTipoDocumentoService.setInCodTipoPessoa(this.modelClienteEl02.inCodTipoPessoaCliente);

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
