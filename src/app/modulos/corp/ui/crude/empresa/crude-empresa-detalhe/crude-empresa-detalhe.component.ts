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
import { ModelEmpresa } from '../../../../models/model-empresa';

import { ApiPessoaElService } from '../../../../api/api-pessoa-el.service';
import { ApiEmpresaService } from '../../../../api/api-empresa.service';
import { ApiEstabelecimentoService } from '../../../../api/api-estabelecimento.service';
@Component({
  selector: 'app-crude-empresa-detalhe',
  templateUrl: './crude-empresa-detalhe.component.html',
  styleUrls: ['./crude-empresa-detalhe.component.scss']
})
export class CrudeEmpresaDetalheComponent implements OnInit {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public modelEmpresa: ModelEmpresa;
  public apiErrorCollection: ApiErrorCollection;
  private pessoa = {
    IDPessoa: 0,
    chNomeEmpresa: "",
    inCNPJEmpresa: 0,
    chNomeFantasia: ""
  };

  public meuForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiPessoaElService: ApiPessoaElService,
    public apiEmpresaService: ApiEmpresaService,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelEmpresa = new ModelEmpresa();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDadosTab_Empresa();
  }

  /**
   * Retorna o id do cadastro sendo acessado
   * Implementação do método da interface CadastroBarraAcaoPai
   */
  public cadastroBarraAcaoPai_getIdCadastro(): number {
    if (this.modelEmpresa) {
      return this.modelEmpresa.IDEmpresa;
    } else {
      return 0;
    }
  }


  private inicializarDadosTab_Empresa() {
    //Crio a instância dos formControls sem dados para não dar erro na interface
    this.criarForm(true);

    //Configuro quais controles estarão desabilitados
    this.configurarStatusForm();

    //Carrego os dados de pessoa
    this.getEmpresa();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');
    this.meuForm.get('IDEmpresa').disable();

    if (id > 0) {
      this.meuForm.controls['IDPessoa'].disable();
      this.meuForm.controls['chCodEmpresa'].disable();
      this.meuForm.controls['UIData_CodPessoa'].disable();

    }

  }

  private criarForm(emEdicao: boolean) {
    //emEdicao = emEdicao || false;

    this.pessoa.IDPessoa = this.modelEmpresa.IDPessoa;
    this.pessoa.inCNPJEmpresa = this.modelEmpresa.inCNPJEmpresa;
    this.pessoa.chNomeEmpresa = this.modelEmpresa.chNomeEmpresa;
    this.pessoa.chNomeFantasia = this.modelEmpresa.chNomeEmpresa;

    var UIData_CodPessoa = (this.pessoa.IDPessoa > 0 ? this.pessoa : null);
    this.modelEmpresa['UIData_CodPessoa'] = UIData_CodPessoa;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelEmpresa, emEdicao);
    } else {
      //Cria o formulário a primeira vez

      this.meuForm = this.formB.group({

        //Dados essenciais
        IDPessoa: [this.modelEmpresa.IDPessoa],
        IDEmpresa: [this.modelEmpresa.IDEmpresa],
        chCodEmpresa: [this.modelEmpresa.chCodEmpresa, Validators.required],
        chNomeEmpresa: [this.modelEmpresa.chNomeEmpresa],
        inCNPJEmpresa: [this.modelEmpresa.inCNPJEmpresa],
        UIData_CodPessoa: [UIData_CodPessoa, Validators.required]
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelEmpresa);

    if (this.meuForm.value.UIData_CodPessoa) {
      this.modelEmpresa.IDPessoa = this.meuForm.value.UIData_CodPessoa.IDPessoa;
      this.modelEmpresa.chNomeEmpresa = this.meuForm.value.UIData_CodPessoa.chNomePessoa;
      this.modelEmpresa.inCNPJEmpresa = this.meuForm.value.UIData_CodPessoa.inNumIdentificacao;
    } else {
      this.modelEmpresa.IDPessoa = null;
      this.modelEmpresa.chNomeEmpresa = "";
      this.modelEmpresa.inCNPJEmpresa = null;
    }

  }

  private getEmpresa() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelEmpresa = new ModelEmpresa();
      this.modelEmpresa.IDEmpresa = null;
      this.modelEmpresa.IDPapelPessoa = null;
      this.modelEmpresa.IDPessoa = null;
      this.modelEmpresa.chCodEmpresa = "";
      this.modelEmpresa.chNomeEmpresa = "";
      this.modelEmpresa.inCNPJEmpresa = null;
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai
      this.apiEstabelecimentoService.setIDEmpresa(id);

      //carrego os dados da pessoa física do id recebido 
      this.apiEmpresaService.obter(id).then(
        empresa => {
          this.modelEmpresa = empresa;
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
    this.getEmpresa();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.modelEmpresa.IDEmpresa > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiEmpresaService.excluir(this.modelEmpresa.IDEmpresa).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiEmpresaService.alterar(this.modelEmpresa).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelEmpresa = sucesso;
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
    this.apiEmpresaService.criar(this.modelEmpresa).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelEmpresa = sucesso;
        this.criarForm(false);
        this.meuForm.get('IDEmpresa').disable();
        this.meuForm.controls['IDPessoa'].disable();
        this.meuForm.controls['chCodEmpresa'].disable();
        this.meuForm.controls['UIData_CodPessoa'].disable();
        this.cadastroBarraAcao.esconderAguarde();
        this.apiEstabelecimentoService.setIDEmpresa(this.modelEmpresa.IDEmpresa);
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
