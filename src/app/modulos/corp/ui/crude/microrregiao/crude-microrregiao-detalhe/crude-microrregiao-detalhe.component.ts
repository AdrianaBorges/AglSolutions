import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelMicrorregiao } from '../../../../models/model-microrregiao';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ModelEmpresa } from '../../../../models/model-empresa';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiMicrorregiaoService } from '../../../../api/api-microrregiao.service';
import { ApiEmpresaService } from '../../../../api/api-empresa.service';
import { ApiPessoaElService } from '../../../../api/api-pessoa-el.service';

@Component({
  selector: 'app-crude-microrregiao-detalhe',
  templateUrl: './crude-microrregiao-detalhe.component.html',
  styleUrls: ['./crude-microrregiao-detalhe.component.scss']
})
export class CrudeMicrorregiaoDetalheComponent implements OnInit {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelMicrorregiao: ModelMicrorregiao;
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
    public apiMicrorregiaoService: ApiMicrorregiaoService,
    public apiEmpresaService: ApiEmpresaService,
    public apiPessoaElService: ApiPessoaElService
  ) {
    this.modelMicrorregiao = new ModelMicrorregiao();
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
    this.meuForm.controls['IDMicrorregiao'].disable();

    if (this.idCadastro != 0) {
      this.meuForm.controls['chCodMicrorregiao'].disable();
    }
  }

  private criarForm(emEdicao: boolean) {


    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelMicrorregiao, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDMicrorregiao: [this.modelMicrorregiao.IDMicrorregiao],
        chCodMicrorregiao: [this.modelMicrorregiao.chCodMicrorregiao, Validators.required],
        chDescricao: [this.modelMicrorregiao.chDescricao, Validators.required],
      });
    }
  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelMicrorregiao = new ModelMicrorregiao();
      this.modelMicrorregiao.IDMicrorregiao = null;
      this.modelMicrorregiao.chCodMicrorregiao = "";
      this.modelMicrorregiao.chDescricao = "";
      //pega da URL o id da pessoa
      this.modelMicrorregiao.chCodRegiao = this.route.snapshot.paramMap.get('id');

      if (this.modelMicrorregiao.chCodRegiao == "0") {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelSequenciaValor.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelMicrorregiao.chCodRegiao = this.apiMicrorregiaoService.getChCodRegiao();
      }
      if (this.modelMicrorregiao.chCodRegiao == "0" || this.modelMicrorregiao.chCodRegiao == undefined) {
        console.error('Não foi encontrado o id do cadastro da Região');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiMicrorregiaoService.obter(id).then(
        dados_API => {
          this.modelMicrorregiao = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelMicrorregiao);
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
    this.apiMicrorregiaoService.excluir(this.modelMicrorregiao.IDMicrorregiao).then(
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
    this.apiMicrorregiaoService.alterar(this.modelMicrorregiao).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelMicrorregiao = sucesso;
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
    this.apiMicrorregiaoService.criar(this.modelMicrorregiao).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelMicrorregiao = sucesso;
        //this.meuForm.controls['IDSequenciaValor'].disable();
        this.idCadastro = this.modelMicrorregiao.IDMicrorregiao;
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
