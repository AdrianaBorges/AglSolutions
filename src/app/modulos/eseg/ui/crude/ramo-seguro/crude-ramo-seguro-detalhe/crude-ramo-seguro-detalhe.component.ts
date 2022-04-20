import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiRamoSeguroService } from '../../../../api/api-ramo-seguro.service';
import { ModelGrupoSeguro } from '../../../../models/model-grupo-seguro';
import { ApiGrupoSeguroService } from '../../../../api/api-grupo-seguro.service';
import { ModelRamoSeguro } from '../../../../models/model-ramo-seguro';
//import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';

@Component({
  selector: 'app-crude-ramo-seguro-detalhe',
  templateUrl: './crude-ramo-seguro-detalhe.component.html',
  styleUrls: ['./crude-ramo-seguro-detalhe.component.scss']
})
export class CrudeRamoSeguroDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelRamoSeguro: ModelRamoSeguro;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  //public idCadastroPai: number;

  //Dados provenientes de chave estrangeira
  private modelGrupoSeguro = new ModelGrupoSeguro();
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiRamoSeguroService: ApiRamoSeguroService,
    private _location: Location,
    public apiGrupoSeguroService: ApiGrupoSeguroService,
  ) {
    this.modelRamoSeguro = new ModelRamoSeguro();
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
    this.meuForm.controls['IDRamoSeguro'].disable();

    if (this.idCadastro != 0) {
      this.meuForm.controls['inCodRamoSeguro'].disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelRamoSeguro, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDRamoSeguro: [this.modelRamoSeguro.IDRamoSeguro],
        inCodRamoSeguro: [this.modelRamoSeguro.inCodRamoSeguro, Validators.required],
        chDescricao: [this.modelRamoSeguro.chDescricao, Validators.required]
      });
    }
  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelRamoSeguro = new ModelRamoSeguro();
      // this.modelSequenciaValor.daDatExpedicao = null;
      // this.modelSequenciaValor.dtDatInclusao = null;
      // this.modelSequenciaValor.dtDatUltAlteracao = null;

      this.modelRamoSeguro.IDRamoSeguro = id;
      //pega da URL o id da pessoa
      this.modelRamoSeguro.inCodGrupoSeguro = +this.route.snapshot.paramMap.get('id');

      if (this.modelRamoSeguro.inCodGrupoSeguro == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelSequenciaValor.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelRamoSeguro.inCodGrupoSeguro = this.apiRamoSeguroService.getInCodGrupoSeguro();
      }
      if (this.modelRamoSeguro.inCodGrupoSeguro == 0 || this.modelRamoSeguro.inCodGrupoSeguro == undefined) {
        console.error('Não foi encontrado o id do cadastro da sequencia');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiRamoSeguroService.obter(id).then(
        dados_API => {
          this.modelRamoSeguro = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelRamoSeguro);
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
    this.apiRamoSeguroService.excluir(this.modelRamoSeguro.IDRamoSeguro).then(
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
    this.apiRamoSeguroService.alterar(this.modelRamoSeguro).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelRamoSeguro = sucesso;
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
    this.apiRamoSeguroService.criar(this.modelRamoSeguro).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelRamoSeguro = sucesso;
        //this.meuForm.controls['IDSequenciaValor'].disable();
        this.idCadastro = this.modelRamoSeguro.IDRamoSeguro;
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
