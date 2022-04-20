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
import { ModelSeguradora } from '../../../../models/model-seguradora';

import { ApiPessoaElService } from '../../../../../corp/api/api-pessoa-el.service';
import { ApiSeguradoraService } from '../../../../api/api-seguradora.service';
import { ApiAssistSegService } from '../../../../api/api-assist-seg.service';
import { ApiCoberturaSegService } from '../../../../api/api-cobertura-seg.service';
import { ApiSorteioSegService } from '../../../../api/api-sorteio-seg.service';

@Component({
  selector: 'app-crude-seguradora-detalhe',
  templateUrl: './crude-seguradora-detalhe.component.html',
  styleUrls: ['./crude-seguradora-detalhe.component.scss']
})
export class CrudeSeguradoraDetalheComponent implements OnInit {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public modelSeguradora: ModelSeguradora;
  public apiErrorCollection: ApiErrorCollection;
  private pessoa = {
    IDPessoa: 0,
    chNomeSeguradora: "",
    inCNPJSeguradora: 0,
    chNomeFantasia: ""
  };

  public meuForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiPessoaElService: ApiPessoaElService,
    public apiSeguradoraService: ApiSeguradoraService,
    public apiAssistSegService: ApiAssistSegService,
    public apiCoberturaSegService: ApiCoberturaSegService,
    public apiSorteioSegService: ApiSorteioSegService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelSeguradora = new ModelSeguradora();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDadosTab_Seguradora();
  }

  /**
   * Retorna o id do cadastro sendo acessado
   * Implementação do método da interface CadastroBarraAcaoPai
   */
  public cadastroBarraAcaoPai_getIdCadastro(): number {
    if (this.modelSeguradora) {
      return this.modelSeguradora.IDSeguradora;
    } else {
      return 0;
    }
  }


  private inicializarDadosTab_Seguradora() {
    //Crio a instância dos formControls sem dados para não dar erro na interface
    this.criarForm(true);

    //Configuro quais controles estarão desabilitados
    this.configurarStatusForm();

    //Carrego os dados de pessoa
    this.getSeguradora();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');
    this.meuForm.get('IDSeguradora').disable();

    if (id > 0) {
     // this.meuForm.controls['IDPessoa'].disable();
      this.meuForm.controls['UIData_CodPessoa'].disable();
    }

  }

  private criarForm(emEdicao: boolean) {
    //emEdicao = emEdicao || false;

    this.pessoa.IDPessoa = this.modelSeguradora.IDPessoaSeguradora;
    this.pessoa.inCNPJSeguradora = this.modelSeguradora.inCNPJSeguradora;
    this.pessoa.chNomeSeguradora = this.modelSeguradora.chNomeSeguradora;
    this.pessoa.chNomeFantasia = this.modelSeguradora.chNomeSeguradora;

    var UIData_CodPessoa = (this.pessoa.IDPessoa > 0 ? this.pessoa : null);
    this.modelSeguradora['UIData_CodPessoa'] = UIData_CodPessoa;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSeguradora, emEdicao);
    } else {
      //Cria o formulário a primeira vez

      this.meuForm = this.formB.group({

        //Dados essenciais
        IDPessoaSeguradora: [this.modelSeguradora.IDPessoaSeguradora],
        IDSeguradora: [this.modelSeguradora.IDSeguradora],
        chNumSusep: [this.modelSeguradora.chNumSusep, Validators.required],
        chNomeAbreviado: [this.modelSeguradora.chNomeAbreviado, Validators.required],
        chNomeSeguradora: [this.modelSeguradora.chNomeSeguradora],
        inCNPJSeguradora: [this.modelSeguradora.inCNPJSeguradora],
        UIData_CodPessoa: [UIData_CodPessoa, Validators.required]
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSeguradora);

    if (this.meuForm.value.UIData_CodPessoa) {
      this.modelSeguradora.IDPessoaSeguradora = this.meuForm.value.UIData_CodPessoa.IDPessoa;
      this.modelSeguradora.chNomeSeguradora = this.meuForm.value.UIData_CodPessoa.chNomePessoa;
      this.modelSeguradora.inCNPJSeguradora = this.meuForm.value.UIData_CodPessoa.inNumIdentificacao;
    } else {
      this.modelSeguradora.IDPessoaSeguradora = null;
      this.modelSeguradora.chNomeSeguradora = "";
      this.modelSeguradora.inCNPJSeguradora = null;
    }

  }

  private getSeguradora() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelSeguradora = new ModelSeguradora();
      this.modelSeguradora.IDSeguradora = null;
      this.modelSeguradora.IDPapelPessoaSeguradora = null;
      this.modelSeguradora.IDPessoaSeguradora = null;
      this.modelSeguradora.chNumSusep = "";
      this.modelSeguradora.chNomeSeguradora = "";
      this.modelSeguradora.chNomeAbreviado = "";
      this.modelSeguradora.inCNPJSeguradora = null;
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai
      this.apiAssistSegService.setIDSeguradora(id);
      this.apiCoberturaSegService.setIDSeguradora(id);
      this.apiSorteioSegService.setIDSeguradora(id);

      //carrego os dados da pessoa física do id recebido 
      this.apiSeguradoraService.obter(id).then(
        Seguradora => {
          this.modelSeguradora = Seguradora;
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
    this.getSeguradora();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.modelSeguradora.IDSeguradora > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiSeguradoraService.excluir(this.modelSeguradora.IDSeguradora).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSeguradoraService.alterar(this.modelSeguradora).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSeguradora = sucesso;
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
    this.apiSeguradoraService.criar(this.modelSeguradora).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSeguradora = sucesso;
        this.criarForm(false);
        this.meuForm.get('IDSeguradora').disable();
        this.meuForm.controls['UIData_CodPessoa'].disable();
        this.cadastroBarraAcao.esconderAguarde();
        this.apiAssistSegService.setIDSeguradora(this.modelSeguradora.IDSeguradora);
        this.apiCoberturaSegService.setIDSeguradora(this.modelSeguradora.IDSeguradora);
        this.apiSorteioSegService.setIDSeguradora(this.modelSeguradora.IDSeguradora);
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
