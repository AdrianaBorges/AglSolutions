import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelRepresVendaEL01 } from '../../../../models/model-repres-venda-EL01';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
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
import { ApiPessoaContaBancoService } from '../../../../../corp/api/api-pessoa-conta-banco.service';
import { Location } from '@angular/common'
import { ApiPessoaElService } from '../../../../../corp/api/api-pessoa-el.service';
import { ApiTipoDocumentoService } from '../../../../../corp/api/api-tipo-documento.service';
@Component({
  selector: 'app-crude-repres-venda-fisica-detalhe',
  templateUrl: './crude-repres-venda-fisica-detalhe.component.html',
  styleUrls: ['./crude-repres-venda-fisica-detalhe.component.scss']
})
export class CrudeRepresVendaFisicaDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public dtNascimento: Date;
  //public modoExclusao: boolean;

  public modelRepresVendaEL01: ModelRepresVendaEL01;
  public apiErrorCollection: ApiErrorCollection;
  private representanteSuperior = {
    chNomeRepresentante: '',
    inCodRepresentante: 0
  };
  cpfAnterior: number = undefined;

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

  procurarPorCPF(cpf) {
    cpf = cpf.split(".").join("");
    cpf = cpf.split("-").join("");
    cpf = cpf.split("/").join("");

    if (this.cpfAnterior != undefined) {
      if (cpf == this.cpfAnterior) return;
    }

    this.apiPessoaElService.getByCpf(cpf).
      then((r) => {
        this.cpfAnterior = cpf;
        this.meuForm.get("CPF").setValue((r.inNumIdentificacao > 0 ? (r.inNumIdentificacao + '').padStart(11, "0") : ''));
        this.meuForm.get("chNomeRepresentante").setValue(r.chNomePessoa);
        this.meuForm.get("chNomeMae").setValue(r.chNomeMae);
        this.meuForm.get("chNomePai").setValue(r.chNomePai);
        this.meuForm.get("daDatNascim").setValue(new Date(r.daDatNascim));

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
      this.meuForm.get('CPF').disable();
    }
    this.meuForm.controls['IDRepresentante'].disable();
  }

  private criarForm(emEdicao: boolean) {

    this.representanteSuperior.chNomeRepresentante = this.modelRepresVendaEL01.chNomeRepresentantePai;
    this.representanteSuperior.inCodRepresentante = this.modelRepresVendaEL01.inCodRepresentantePai;

    var UIData_RepresentanteSuperior = (this.representanteSuperior.inCodRepresentante > 0 ? this.representanteSuperior : null);
    this.modelRepresVendaEL01['UIData_RepresentanteSuperior'] = UIData_RepresentanteSuperior;

    var CPF: string = (this.modelRepresVendaEL01.inNumIdentifRepresentante > 0 ? (this.modelRepresVendaEL01.inNumIdentifRepresentante + '').padStart(11, "0") : '');
    this.modelRepresVendaEL01['CPF'] = CPF;

    if (this.modelRepresVendaEL01.daDatNascim) {
      this.modelRepresVendaEL01.daDatNascim = new Date(this.modelRepresVendaEL01.daDatNascim);
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
        daDatNascim: [this.modelRepresVendaEL01.daDatNascim, Validators.required],


        inCodTipoRepresentante: [this.modelRepresVendaEL01.inCodTipoRepresentante, Validators.required],
        chCxPostal: [this.modelRepresVendaEL01.chCxPostal],
        UIData_RepresentanteSuperior: UIData_RepresentanteSuperior,

        CPF: [CPF, Validators.required],

        chNomeMae: [this.modelRepresVendaEL01.chNomeMae],
        chNomePai: [this.modelRepresVendaEL01.chNomePai],
        chDesObservacao: [this.modelRepresVendaEL01.chDesObservacao],
        chDesSituacaoCad: [this.modelRepresVendaEL01.chDesSituacaoCad],
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelRepresVendaEL01);

    this.modelRepresVendaEL01.inNumIdentifRepresentante = this.meuForm.value.CPF;
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
      this.modelRepresVendaEL01.inCodTipoPessoaRepresentante = 1; //Pessoa Física
      this.modelRepresVendaEL01.inCodTipoDocumentoRepresentante = 1; //CPF
      this.modelRepresVendaEL01.daDatNascim = null;
      this.modelRepresVendaEL01.chNomeAbreviado = '';
      this.modelRepresVendaEL01.chNomeRepresentante = '';
      this.modelRepresVendaEL01.inNumIdentifRepresentante = null;
      this.modelRepresVendaEL01.inCodTipoRepresentante = null;
      this.modelRepresVendaEL01.chNomePai = '';
      this.modelRepresVendaEL01.chNomeMae = '';
      this.modelRepresVendaEL01.chDesObservacao = "";
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


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
        this.meuForm.get('CPF').disable();

        //informo ao serviço dos dados filhos o ID do pai
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
