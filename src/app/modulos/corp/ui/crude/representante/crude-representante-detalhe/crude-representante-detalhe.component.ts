import { ModelRepresentanteEl01 } from '../../../../models/model-representante-El01';

import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoRepresentanteService } from '../../../../api/api-tipo-representante.service';
import { ApiPessoaDocumentoService } from '../../../../api/api-pessoa-documento.service';
import { ApiPessoaTelefoneService } from '../../../../api/api-pessoa-telefone.service';
import { ApiPessoaEnderecoService } from '../../../../api/api-pessoa-endereco.service';
import { ApiPessoaEmailService } from '../../../../api/api-pessoa-email.service';
import { ApiPessoaContatoService } from '../../../../api/api-pessoa-contato.service';
import { ApiPessoaElService } from '../../../../api/api-pessoa-el.service';
import { ApiTipoDocumentoService } from '../../../../api/api-tipo-documento.service';
import { Location } from "@angular/common";
import { ApiRepresentanteEl01Service } from '../../../../api/api-representante-el01.service';
@Component({
  selector: 'app-crude-representante-detalhe',
  templateUrl: './crude-representante-detalhe.component.html',
  styleUrls: ['./crude-representante-detalhe.component.scss']
})
export class CrudeRepresentanteDetalheComponent implements OnInit {



  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public dtNascimento: Date;
  //public modoExclusao: boolean;

  public modelRepresentanteEl01: ModelRepresentanteEl01;
  public apiErrorCollection: ApiErrorCollection;
  private representanteSuperior = {
    chNomeRepresentante: '',
    inCodRepresentante: 0
  };

  private pessoa = {
    chNomePessoa: '',
    IDPessoa: 0
  };


  public meuForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiRepresentanteEl01Service: ApiRepresentanteEl01Service,
    public apiRepresentanteEl01SuperiorService: ApiRepresentanteEl01Service,
    public apiTipoRepresentanteService: ApiTipoRepresentanteService,
    private formB: FormBuilder,
    private _location: Location,
    private apiPessoaDocumentoService: ApiPessoaDocumentoService,
    private apiPessoaTelefoneService: ApiPessoaTelefoneService,
    private apiPessoaEnderecoService: ApiPessoaEnderecoService,
    private apiPessoaEmailService: ApiPessoaEmailService,
    private apiPessoaContatoService: ApiPessoaContatoService,
    public apiPessoaElService: ApiPessoaElService,
    public apiTipoDocumentoService: ApiTipoDocumentoService,
  ) {
    this.modelRepresentanteEl01 = new ModelRepresentanteEl01();
    this.modelRepresentanteEl01.inCodTipoPessoaRepresentante = 1;
    this.apiErrorCollection = new ApiErrorCollection();
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
    if (this.modelRepresentanteEl01) {
      return this.modelRepresentanteEl01.IDPessoaRepresentante;
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
    this.meuForm.controls['IDRepresentante'].disable();
  }

  private criarForm(emEdicao: boolean) {

    this.representanteSuperior.chNomeRepresentante = this.modelRepresentanteEl01.chNomeRepresentantePai;
    this.representanteSuperior.inCodRepresentante = this.modelRepresentanteEl01.inCodRepresentantePai;

    var UIData_RepresentanteSuperior = (this.representanteSuperior.inCodRepresentante > 0 ? this.representanteSuperior : null);
    this.modelRepresentanteEl01['UIData_RepresentanteSuperior'] = UIData_RepresentanteSuperior;


    this.pessoa.chNomePessoa = this.modelRepresentanteEl01.chNomeRepresentante;
    this.pessoa.IDPessoa = this.modelRepresentanteEl01.IDPessoaRepresentante;

    var UIData_Pessoa = (this.pessoa.IDPessoa > 0 ? this.pessoa : null);
    this.modelRepresentanteEl01['UIData_Pessoa'] = UIData_Pessoa;




    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelRepresentanteEl01, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDRepresentante: [this.modelRepresentanteEl01.IDRepresentante],
        inCodRepresentante: [this.modelRepresentanteEl01.inCodRepresentante],
        chNomeAbreviado: [this.modelRepresentanteEl01.chNomeAbreviado, Validators.required],
        UIData_Pessoa: [UIData_Pessoa, Validators.required],
        inCodTipoRepresentante: [this.modelRepresentanteEl01.inCodTipoRepresentante, Validators.required],
        UIData_RepresentanteSuperior: UIData_RepresentanteSuperior,
        chDesObservacao: [this.modelRepresentanteEl01.chDesObservacao],
        chDesSituacaoCad: [this.modelRepresentanteEl01.chDesSituacaoCad],
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelRepresentanteEl01);


    if (this.meuForm.value.UIData_RepresentanteSuperior) {
      this.modelRepresentanteEl01.chNomeRepresentantePai = this.meuForm.value.UIData_RepresentanteSuperior.chNomeRepresentante;
      this.modelRepresentanteEl01.inCodRepresentantePai = this.meuForm.value.UIData_RepresentanteSuperior.inCodRepresentante;
      if (this.meuForm.value.UIData_RepresentanteSuperior.objetoSelecionado) {
        this.modelRepresentanteEl01.IDRepresentantePai = this.meuForm.value.UIData_RepresentanteSuperior.objetoSelecionado.IDRepresentante;
      }
    } else {
      this.modelRepresentanteEl01.chNomeRepresentantePai = '';
      this.modelRepresentanteEl01.IDRepresentantePai = null;
    }

    if (this.meuForm.value.UIData_Pessoa) {
      this.modelRepresentanteEl01.chNomeRepresentante = this.meuForm.value.UIData_Pessoa.chNomePessoa;
      this.modelRepresentanteEl01.IDPessoaRepresentante = this.meuForm.value.UIData_Pessoa.IDPessoa;
    } else {
      this.modelRepresentanteEl01.chNomeRepresentante = '';
      this.modelRepresentanteEl01.IDPessoaRepresentante = null;
    }

  }

  private getPessoa() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelRepresentanteEl01 = new ModelRepresentanteEl01();
      this.modelRepresentanteEl01.inCodTipoPessoaRepresentante = 1; //Pessoa Física
      this.modelRepresentanteEl01.inCodTipoDocumentoRepresentante = 1; //CPF
      this.modelRepresentanteEl01.IDPessoaRepresentante = null;
      this.modelRepresentanteEl01.chNomeAbreviado = '';
      this.modelRepresentanteEl01.chNomeRepresentante = '';
      this.modelRepresentanteEl01.inNumIdentifRepresentante = null;
      this.modelRepresentanteEl01.inCodTipoRepresentante = null;
      this.modelRepresentanteEl01.chDesObservacao = "";
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


      //carrego os dados da pessoa física do id recebido 
      this.apiRepresentanteEl01Service.obter(id).then(
        pessoa => {
          this.modelRepresentanteEl01 = pessoa;

          this.modelRepresentanteEl01.inCodTipoPessoaRepresentante
          this.apiPessoaDocumentoService.setIdPessoa(this.modelRepresentanteEl01.IDPessoaRepresentante);
          this.apiPessoaContatoService.setIdPessoa(this.modelRepresentanteEl01.IDPessoaRepresentante);
          this.apiPessoaEmailService.setIdPessoa(this.modelRepresentanteEl01.IDPessoaRepresentante);
          this.apiPessoaTelefoneService.setIdPessoa(this.modelRepresentanteEl01.IDPessoaRepresentante);
          this.apiPessoaEnderecoService.setIdPessoa(this.modelRepresentanteEl01.IDPessoaRepresentante);
          this.apiTipoDocumentoService.setInCodTipoPessoa(this.modelRepresentanteEl01.inCodTipoDocumentoRepresentante);
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
    if (this.modelRepresentanteEl01.IDRepresentante > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiRepresentanteEl01Service.excluir(this.modelRepresentanteEl01.IDRepresentante).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiRepresentanteEl01Service.alterar(this.modelRepresentanteEl01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelRepresentanteEl01 = sucesso;
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
    this.apiRepresentanteEl01Service.criar(this.modelRepresentanteEl01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelRepresentanteEl01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('UIData_Pessoa').disable();

        //informo ao serviço dos dados filhos o ID do pai
        this.apiPessoaDocumentoService.setIdPessoa(this.modelRepresentanteEl01.IDPessoaRepresentante);
        this.apiPessoaContatoService.setIdPessoa(this.modelRepresentanteEl01.IDPessoaRepresentante);
        this.apiPessoaEmailService.setIdPessoa(this.modelRepresentanteEl01.IDPessoaRepresentante);
        this.apiPessoaTelefoneService.setIdPessoa(this.modelRepresentanteEl01.IDPessoaRepresentante);
        this.apiPessoaEnderecoService.setIdPessoa(this.modelRepresentanteEl01.IDPessoaRepresentante);
        this.apiTipoDocumentoService.setInCodTipoPessoa(this.modelRepresentanteEl01.inCodTipoDocumentoRepresentante);
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
