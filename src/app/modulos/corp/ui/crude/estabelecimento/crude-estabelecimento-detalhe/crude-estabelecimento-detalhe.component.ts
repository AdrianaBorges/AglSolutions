import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiEstabelecimentoService } from '../../../../api/api-estabelecimento.service';
import { ApiPessoaElService } from '../../../../api/api-pessoa-el.service';
import { ModelEmpresa } from '../../../../models/model-empresa';
import { ApiEmpresaService } from '../../../../api/api-empresa.service';
import { ModelEstabelecimento } from '../../../../models/model-estabelecimento';
import { ApiGrupoEstabService } from '../../../../api/api-grupo-estab.service';
//import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';


@Component({
  selector: 'app-crude-estabelecimento-detalhe',
  templateUrl: './crude-estabelecimento-detalhe.component.html',
  styleUrls: ['./crude-estabelecimento-detalhe.component.scss']
})
export class CrudeEstabelecimentoDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelEstabelecimento: ModelEstabelecimento;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  //public idCadastroPai: number;
  private pessoa = {
    IDPessoa: 0,
    chNomeFantasia: ""
  };



  //Dados provenientes de chave estrangeira
  private modelEmpresa = new ModelEmpresa();
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    public apiGrupoEstabService: ApiGrupoEstabService,
    private _location: Location,
    public apiEmpresaService: ApiEmpresaService,
    public apiPessoaElService: ApiPessoaElService
  ) {
    this.modelEstabelecimento = new ModelEstabelecimento();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    this.criarForm(true);
    //this.getDados();

  }

  /**
   * Deve ser chamada pelo evento do grid de pesquisa, 
   * seja para criar um novo registro ou para exibir 
   * para edição ou exclusão
   * @param id zero se for um novo cadastro e um valor 
   * se for para abrir para edição ou exclusão
   */
  public gridInterfaceTabCadastroFilho_setIdCadastro(id: string): void {
    this.idCadastro = +id;
    this.getDados();
    //this.configurarStatusForm();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm() {
    //var id = +this.route.snapshot.paramMap.get('id');
    this.meuForm.controls['IDEstabelec'].disable();

    if (this.idCadastro != 0) {
      this.meuForm.controls['chCodEstabelec'].disable();
      this.meuForm.controls['UIData_CodPessoa'].disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    this.pessoa.IDPessoa = this.modelEstabelecimento.IDPessoa;
    this.pessoa.chNomeFantasia = this.modelEstabelecimento.chNomePessoaEstabelec;

    var UIData_CodPessoa = (this.pessoa.IDPessoa > 0 ? this.pessoa : null);
    this.modelEstabelecimento['UIData_CodPessoa'] = UIData_CodPessoa;


    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelEstabelecimento, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDEstabelec: [this.modelEstabelecimento.IDEstabelec],
        chCodEstabelec: [this.modelEstabelecimento.chCodEstabelec, Validators.required],
        chNomeAbreviado: [this.modelEstabelecimento.chNomeAbreviado, Validators.required],
        chNome: [this.modelEstabelecimento.chNome, Validators.required],
        IDPessoa: [this.modelEstabelecimento.IDPessoa],
        UIData_CodPessoa: [UIData_CodPessoa, Validators.required],
        inCodGrupoEstab: [this.modelEstabelecimento.inCodGrupoEstab]
      });
    }
  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelEstabelecimento = new ModelEstabelecimento();
      // this.modelSequenciaValor.daDatExpedicao = null;
      // this.modelSequenciaValor.dtDatInclusao = null;
      // this.modelSequenciaValor.dtDatUltAlteracao = null;

      this.modelEstabelecimento.inCodGrupoEstab = null;
      this.modelEstabelecimento.chCodEstabelec = "";
      this.modelEstabelecimento.chNomeAbreviado = "";
      this.modelEstabelecimento.chNome = "";
      this.modelEstabelecimento.IDPessoa = null;
      this.modelEstabelecimento.IDEstabelec = id;
      //pega da URL o id da pessoa
      this.modelEstabelecimento.IDEmpresa = +this.route.snapshot.paramMap.get('id');

      if (this.modelEstabelecimento.IDEmpresa == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelSequenciaValor.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelEstabelecimento.IDEmpresa = this.apiEstabelecimentoService.getIDEmpresa();
      }
      if (this.modelEstabelecimento.IDEmpresa == 0 || this.modelEstabelecimento.IDEmpresa == undefined) {
        console.error('Não foi encontrado o id do cadastro da sequencia');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiEstabelecimentoService.obter(id).then(
        dados_API => {
          this.modelEstabelecimento = dados_API;
          this.operacao = 'edicao';
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

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelEstabelecimento);

    if (this.meuForm.value.UIData_CodPessoa) {
      this.modelEstabelecimento.IDPessoa = this.meuForm.value.UIData_CodPessoa.IDPessoa;
    } else {
      this.modelEstabelecimento.IDPessoa = null;
    }
  }

  btnCancelar() {
    this.getDados();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.operacao == 'edicao') {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiEstabelecimentoService.excluir(this.modelEstabelecimento.IDEstabelec).then(
      sucesso => {
        //this._location.back();
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiEstabelecimentoService.alterar(this.modelEstabelecimento).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelEstabelecimento = sucesso;
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
    this.apiEstabelecimentoService.criar(this.modelEstabelecimento).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelEstabelecimento = sucesso;
        //this.meuForm.controls['IDSequenciaValor'].disable();
        this.idCadastro = this.modelEstabelecimento.IDEstabelec;
        this.criarForm(false);
        this.operacao = 'edicao';
        this.cadastroBarraAcao.esconderAguarde();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

}
