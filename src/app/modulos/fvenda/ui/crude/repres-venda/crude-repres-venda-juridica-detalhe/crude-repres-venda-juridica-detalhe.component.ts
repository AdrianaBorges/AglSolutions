import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ModelRepresVendaEL01 } from '../../../../models/model-repres-venda-EL01';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiRepresVendaEL01Service } from '../../../../api/api-repres-venda-el01.service';
import { ApiTipoRepresentanteService } from '../../../../../corp/api/api-tipo-representante.service';
import { ApiPessoaDocumentoService } from '../../../../../corp/api/api-pessoa-documento.service';
import { ApiPessoaTelefoneService } from '../../../../../corp/api/api-pessoa-telefone.service';
import { ApiPessoaEnderecoService } from '../../../../../corp/api/api-pessoa-endereco.service';
import { ApiPessoaEmailService } from '../../../../../corp/api/api-pessoa-email.service';
import { ApiPessoaContatoService } from '../../../../../corp/api/api-pessoa-contato.service';
import { ApiPessoaElService } from '../../../../../corp/api/api-pessoa-el.service';
import { ApiTipoDocumentoService } from '../../../../../corp/api/api-tipo-documento.service';


@Component({
  selector: 'app-crude-repres-venda-juridica-detalhe',
  templateUrl: './crude-repres-venda-juridica-detalhe.component.html',
  styleUrls: ['./crude-repres-venda-juridica-detalhe.component.scss']
})
export class CrudeRepresVendaJuridicaDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  cnpjAnterior: number = undefined;
  public dtNascimento: Date;
  //public modoExclusao: boolean;

  public modelRepresVendaEL01: ModelRepresVendaEL01;
  public apiErrorCollection: ApiErrorCollection;
  private representanteSuperior = {
    chNomeRepresentante: '',
    inCodRepresentante: 0
  };


  public meuForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiRepresVendaEL01Service: ApiRepresVendaEL01Service,
    public apiRepresentanteEL01SuperiorService: ApiRepresVendaEL01Service,
    public apiTipoRepresentanteService: ApiTipoRepresentanteService,
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
    this.modelRepresVendaEL01 = new ModelRepresVendaEL01();
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
        this.meuForm.get("chNomeRepresentante").setValue(r.chNomePessoa);
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
    if (this.modelRepresVendaEL01) {
      return this.modelRepresVendaEL01.IDPessoaRepresentante;
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
    this.meuForm.controls['IDRepresentante'].disable();
  }

  private criarForm(emEdicao: boolean) {

    this.representanteSuperior.chNomeRepresentante = this.modelRepresVendaEL01.chNomeRepresentantePai;
    this.representanteSuperior.inCodRepresentante = this.modelRepresVendaEL01.inCodRepresentantePai;

    var UIData_RepresentanteSuperior = (this.representanteSuperior.inCodRepresentante > 0 ? this.representanteSuperior : null);
    this.modelRepresVendaEL01['UIData_RepresentanteSuperior'] = UIData_RepresentanteSuperior;

    var CNPJ: string = (this.modelRepresVendaEL01.inNumIdentifRepresentante > 0 ? (this.modelRepresVendaEL01.inNumIdentifRepresentante + '').padStart(14, "0") : '');
    this.modelRepresVendaEL01['CNPJ'] = CNPJ;

    if (this.modelRepresVendaEL01.daDatFundacao) {
      this.modelRepresVendaEL01.daDatFundacao = new Date(this.modelRepresVendaEL01.daDatFundacao);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelRepresVendaEL01, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDRepresentante: [this.modelRepresVendaEL01.IDRepresentante],
        inCodRepresentante: [this.modelRepresVendaEL01.inCodRepresentante],
        chNomeRepresentante: [this.modelRepresVendaEL01.chNomeRepresentante, Validators.required],
        chNomeAbreviado: [this.modelRepresVendaEL01.chNomeAbreviado, Validators.required],
        daDatFundacao: [this.modelRepresVendaEL01.daDatFundacao, Validators.required],

        inCodTipoRepresentante: [this.modelRepresVendaEL01.inCodTipoRepresentante, Validators.required],
        chCxPostal: [this.modelRepresVendaEL01.chCxPostal],
        chIM: [this.modelRepresVendaEL01.chIM],
        chIE: [this.modelRepresVendaEL01.chIE],
        UIData_RepresentanteSuperior: UIData_RepresentanteSuperior,

        CNPJ: [CNPJ, Validators.required],

        chDesObservacao: [this.modelRepresVendaEL01.chDesObservacao],
        chDesSituacaoCad: [this.modelRepresVendaEL01.chDesSituacaoCad],
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelRepresVendaEL01);

    this.modelRepresVendaEL01.inNumIdentifRepresentante = this.meuForm.value.CNPJ;
    if (this.meuForm.value.UIData_RepresentanteSuperior) {
      this.modelRepresVendaEL01.chNomeRepresentantePai = this.meuForm.value.UIData_RepresentanteSuperior.chNomeRepresentante;
      this.modelRepresVendaEL01.inCodRepresentantePai = this.meuForm.value.UIData_RepresentanteSuperior.inCodRepresentante;
      if (this.meuForm.value.UIData_RepresentanteSuperior.objetoSelecionado) {
        this.modelRepresVendaEL01.IDRepresentantePai = this.meuForm.value.UIData_RepresentanteSuperior.objetoSelecionado.IDRepresentante;
      }
    } else {
      this.modelRepresVendaEL01.chNomeRepresentantePai = '';
      this.modelRepresVendaEL01.IDRepresentantePai = null;
    }

  }

  private getPessoa() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelRepresVendaEL01 = new ModelRepresVendaEL01();
      this.modelRepresVendaEL01.IDRepresentante = id;
      this.modelRepresVendaEL01.inCodTipoPessoaRepresentante = 2; //Pessoa Física
      this.modelRepresVendaEL01.inCodTipoDocumentoRepresentante = 2; //CNPJ
      this.modelRepresVendaEL01.daDatFundacao = null;
      this.modelRepresVendaEL01.chNomeAbreviado = '';
      this.modelRepresVendaEL01.chNomeRepresentante = '';
      this.modelRepresVendaEL01.chIM = '';
      this.modelRepresVendaEL01.chIE = '';
      this.modelRepresVendaEL01.chDesObservacao = "";
      this.modelRepresVendaEL01.inNumIdentifRepresentante = null;
      this.modelRepresVendaEL01.inCodTipoRepresentante = null;

      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();


      //carrego os dados da pessoa física do id recebido 
      this.apiRepresVendaEL01Service.obter(id).then(
        pessoa => {
          this.modelRepresVendaEL01 = pessoa;
          this.apiPessoaDocumentoService.setIdPessoa(this.modelRepresVendaEL01.IDPessoaRepresentante);
          this.apiPessoaContatoService.setIdPessoa(this.modelRepresVendaEL01.IDPessoaRepresentante);
          this.apiPessoaEmailService.setIdPessoa(this.modelRepresVendaEL01.IDPessoaRepresentante);
          this.apiPessoaTelefoneService.setIdPessoa(this.modelRepresVendaEL01.IDPessoaRepresentante);
          this.apiPessoaEnderecoService.setIdPessoa(this.modelRepresVendaEL01.IDPessoaRepresentante);
          this.apiTipoDocumentoService.setInCodTipoPessoa(this.modelRepresVendaEL01.inCodTipoDocumentoRepresentante);
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
    if (this.modelRepresVendaEL01.IDRepresentante > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiRepresVendaEL01Service.excluir(this.modelRepresVendaEL01.IDRepresentante).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiRepresVendaEL01Service.alterar(this.modelRepresVendaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelRepresVendaEL01 = sucesso;
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
    this.apiRepresVendaEL01Service.criar(this.modelRepresVendaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelRepresVendaEL01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('CNPJ').disable();

        this.apiPessoaDocumentoService.setIdPessoa(this.modelRepresVendaEL01.IDPessoaRepresentante);
        this.apiPessoaContatoService.setIdPessoa(this.modelRepresVendaEL01.IDPessoaRepresentante);
        this.apiPessoaEmailService.setIdPessoa(this.modelRepresVendaEL01.IDPessoaRepresentante);
        this.apiPessoaTelefoneService.setIdPessoa(this.modelRepresVendaEL01.IDPessoaRepresentante);
        this.apiPessoaEnderecoService.setIdPessoa(this.modelRepresVendaEL01.IDPessoaRepresentante);
        this.apiTipoDocumentoService.setInCodTipoPessoa(this.modelRepresVendaEL01.inCodTipoDocumentoRepresentante);
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
