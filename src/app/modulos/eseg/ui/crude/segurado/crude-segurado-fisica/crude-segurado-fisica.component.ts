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
import { ApiSexoService } from '../../../../../corp/api/api-sexo.service';
import { ApiTipoDocumentoService } from '../../../../../corp/api/api-tipo-documento.service';
import { ApiEstadoCivilService } from '../../../../../corp/api/api-estado-civil.service';
import { ApiRacaCorService } from '../../../../../corp/api/api-raca-cor.service';
import { ApiGrauInstrucaoService } from '../../../../../corp/api/api-grau-instrucao.service';
import { ApiProfissaoService } from '../../../../../corp/api/api-profissao.service';
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
  selector: 'app-crude-segurado-fisica',
  templateUrl: './crude-segurado-fisica.component.html',
  styleUrls: ['./crude-segurado-fisica.component.scss']
})
export class CrudeSeguradoFisicaComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public dtNascimento: Date;
  //public modoExclusao: boolean;

  public modelSegurado: ModelSegurado;
  public apiErrorCollection: ApiErrorCollection;
  private tipoProfissao = {
    chDescricao: '',
    inCodProfissao: 0
  };

  public meuForm: FormGroup;
  public cpfAnterior: string;
  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiSeguradoService: ApiSeguradoService,
    public apiTipoPessoaService: ApiTipoPessoaService,
    public apiSexoService: ApiSexoService,
    public apiTipoDocumentoService: ApiTipoDocumentoService,
    public apiEstadoCivilService: ApiEstadoCivilService,
    public apiRacaCorService: ApiRacaCorService,
    public apiGrauInstrucaoService: ApiGrauInstrucaoService,
    public apiProfissaoService: ApiProfissaoService,
    private formB: FormBuilder,
    private _location: Location,
    private apiPessoaDocumentoService: ApiPessoaDocumentoService,
    private apiPessoaTelefoneService: ApiPessoaTelefoneService,
    private apiPessoaEnderecoService: ApiPessoaEnderecoService,
    private apiPessoaEmailService: ApiPessoaEmailService,
    private apiPessoaContatoService: ApiPessoaContatoService,
    private apiPessoaContaBancoService: ApiPessoaContaBancoService,
    private apiPessoaElService: ApiPessoaElService,
    
  ) {
    this.modelSegurado = new ModelSegurado();
    this.apiErrorCollection = new ApiErrorCollection();
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
        this.meuForm.get("chNomePessoa").setValue(r.chNomePessoa);
        this.meuForm.get("chNomeMae").setValue(r.chNomeMae);
        this.meuForm.get("chNomePai").setValue(r.chNomePai);
        this.meuForm.get("inCodEstadoCivil").setValue(r.inCodEstadoCivil);
        this.meuForm.get("inCodSexo").setValue(r.inCodSexo);
        this.meuForm.get("chDesNacionalidade").setValue(r.chDesNacionalidade);
        this.meuForm.get("chDesNacionalidade").setValue(r.chDesNacionalidade);
        this.meuForm.get("inCodGrauInst").setValue(r.inCodGrauInst);
        this.meuForm.get("inCodRacaCor").setValue(r.inCodRacaCor);

        this.meuForm.get("deValorRendaMensal").setValue(r.deValorRendaMensal);
        this.meuForm.get("lgIndPEP").setValue(r.lgIndPEP);
        this.meuForm.get("daDatNascim").setValue(new Date(r.daDatNascim));
        this.tipoProfissao.inCodProfissao = r.inCodProfissao;
        this.tipoProfissao.chDescricao = r.chDesProfissao
        var UIData_CodProfissao = this.tipoProfissao;
        this.meuForm.get("UIData_CodProfissao").setValue(UIData_CodProfissao);

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
    //   this.meuForm.get('CPF').disable();
    // }

    if (id > 0) {
      this.meuForm.get('CPF').disable();
    }
    //this.meuForm.get('CPF').disable();
    this.meuForm.controls['IDPessoa'].disable();
  }

  private criarForm(emEdicao: boolean) {
    //emEdicao = emEdicao || false;

    this.tipoProfissao.chDescricao = this.modelSegurado.chDesProfissao;
    this.tipoProfissao.inCodProfissao = this.modelSegurado.inCodProfissao;

    var UIData_CodProfissao = (this.tipoProfissao.inCodProfissao > 0 ? this.tipoProfissao : null);
    this.modelSegurado['UIData_CodProfissao'] = UIData_CodProfissao;

    var CPF: string = (this.modelSegurado.inNumIdentificacao > 0 ? (this.modelSegurado.inNumIdentificacao + '').padStart(11, "0") : '');
    this.modelSegurado['CPF'] = CPF;
    
    if (this.modelSegurado.daDatNascim) {
      this.modelSegurado.daDatNascim = new Date(this.modelSegurado.daDatNascim);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSegurado, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDPessoa: [this.modelSegurado.IDPessoa],
        chNomePessoa: [this.modelSegurado.chNomePessoa, Validators.required],
        inCodSexo: [this.modelSegurado.inCodSexo],
        daDatNascim: [this.modelSegurado.daDatNascim, Validators.required],
        //Dados pessoais
        inCodEstadoCivil: [this.modelSegurado.inCodEstadoCivil],
        inCodRacaCor: [this.modelSegurado.inCodRacaCor],
        inCodGrauInst: [this.modelSegurado.inCodGrauInst],
        UIData_CodProfissao: UIData_CodProfissao,
        chDesNacionalidade: [this.modelSegurado.chDesNacionalidade],
        deValorRendaMensal: [this.modelSegurado.deValorRendaMensal],
        lgIndPEP: [this.modelSegurado.lgIndPEP],
        //Documentação
        CPF: [CPF, Validators.required],
        //Parentesco
        chNomeMae: [this.modelSegurado.chNomeMae],
        chNomePai: [this.modelSegurado.chNomePai],
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSegurado);

    this.modelSegurado.inNumIdentificacao = this.meuForm.value.CPF;

    //Profissão
    if (this.meuForm.value.UIData_CodProfissao) {
      this.modelSegurado.chDesProfissao = this.meuForm.value.UIData_CodProfissao.chDesProfissao;
      this.modelSegurado.inCodProfissao = this.meuForm.value.UIData_CodProfissao.inCodProfissao;
    } else {
      this.modelSegurado.chDesProfissao = '';
      this.modelSegurado.inCodProfissao = null;
    }

  }

  private getPessoa() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelSegurado = new ModelSegurado();
      this.modelSegurado.inCodTipoPessoa = 1; //Pessoa Física
      this.modelSegurado.inCodTipoDocumento = 1; //CPF
      this.modelSegurado.daDatNascim = null;
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai
     

      //carrego os dados da pessoa física do id recebido 
      this.apiSeguradoService.obter(id).then(
        pessoa => {
          this.modelSegurado = pessoa;
          this.apiPessoaDocumentoService.setIdPessoa(this.modelSegurado.IDPessoa);
          this.apiPessoaContaBancoService.setIdPessoa(this.modelSegurado.IDPessoa);
          this.apiPessoaContatoService.setIdPessoa(this.modelSegurado.IDPessoa);
          this.apiPessoaEmailService.setIdPessoa(this.modelSegurado.IDPessoa);
          this.apiPessoaTelefoneService.setIdPessoa(this.modelSegurado.IDPessoa);
          this.apiPessoaEnderecoService.setIdPessoa(this.modelSegurado.IDPessoa);
          this.apiTipoDocumentoService.setInCodTipoPessoa(this.modelSegurado.inCodTipoDocumento);
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
        //this.meuForm.controls['inNumIdentificacao'].disable();
        this.criarForm(false);
        this.meuForm.get('CPF').disable();
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
        this.apiTipoDocumentoService.setInCodTipoPessoa(this.modelSegurado.inCodTipoDocumento);
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
