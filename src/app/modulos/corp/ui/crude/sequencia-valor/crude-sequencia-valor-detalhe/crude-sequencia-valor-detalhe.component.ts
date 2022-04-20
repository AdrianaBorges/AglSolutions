import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSequenciaValor } from '../../../../models/model-sequencia-valor';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSequeciaValorService } from '../../../../api/api-sequecia-valor.service';
import { ModelSequencia } from '../../../../models/model-sequencia';
import { ApiSequeciaService } from '../../../../api/api-sequecia.service';
//import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';

@Component({
  selector: 'app-crude-sequencia-valor-detalhe',
  templateUrl: './crude-sequencia-valor-detalhe.component.html',
  styleUrls: ['./crude-sequencia-valor-detalhe.component.scss']
})
export class CrudeSequenciaValorDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelSequenciaValor: ModelSequenciaValor;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  //public idCadastroPai: number;

  //Dados provenientes de chave estrangeira
  private modelSequencia = new ModelSequencia;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSequenciaValorService: ApiSequeciaValorService,
    private _location: Location,
    public apiSequenciaService: ApiSequeciaService
  ) {
    this.modelSequenciaValor = new ModelSequenciaValor();
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
    this.meuForm.controls['IDSequenciaValor'].disable();
  }

  private criarForm(emEdicao: boolean) {
    if (this.modelSequenciaValor.dtDatUltNum) {
      this.modelSequenciaValor.dtDatUltNum = new Date(this.modelSequenciaValor.dtDatUltNum);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSequenciaValor, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDSequenciaValor: [this.modelSequenciaValor.IDSequenciaValor],
        inNumLimInferior: [this.modelSequenciaValor.inNumLimInferior, Validators.required],
        inNumLimSuperior: [this.modelSequenciaValor.inNumLimSuperior, Validators.required],
        inNumIncremento: [this.modelSequenciaValor.inNumIncremento, Validators.required],
        inNumUltimo: [this.modelSequenciaValor.inNumUltimo],
        dtDatUltNum: [this.modelSequenciaValor.dtDatUltNum],
      });
    }
  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelSequenciaValor = new ModelSequenciaValor();
      // this.modelSequenciaValor.daDatExpedicao = null;
      // this.modelSequenciaValor.dtDatInclusao = null;
      // this.modelSequenciaValor.dtDatUltAlteracao = null;

      this.modelSequenciaValor.IDSequenciaValor = id;
      //pega da URL o id da pessoa
      this.modelSequenciaValor.chCodSequencia = this.route.snapshot.paramMap.get('id');
      if (this.modelSequenciaValor.chCodSequencia == "") {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelSequenciaValor.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelSequenciaValor.chCodSequencia = this.apiSequenciaValorService.getChCodSequencia();
      }
      if (this.modelSequenciaValor.chCodSequencia == "" || this.modelSequenciaValor.chCodSequencia == undefined) {
        console.error('Não foi encontrado o id do cadastro da sequencia');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiSequenciaValorService.obter(id).then(
        dados_API => {
          this.modelSequenciaValor = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSequenciaValor);

    // //Tipo de documento
    // if(this.meuForm.value.UIData_pessoaTipoDocumento){
    //   this.modelSequenciaValor.chDesTipoDocumento = this.meuForm.value.UIData_CodProfissao.chDesTipoDocumento;
    //   this.modelSequenciaValor.inCodTipoDocumento = this.meuForm.value.UIData_CodProfissao.inCodTipoDocumento;
    // }else{
    //   this.modelSequenciaValor.chDesTipoDocumento = '';
    //   this.modelSequenciaValor.inCodTipoDocumento = null;
    // }
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
    this.apiSequenciaValorService.excluir(this.modelSequenciaValor.IDSequenciaValor).then(
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
    this.apiSequenciaValorService.alterar(this.modelSequenciaValor).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSequenciaValor = sucesso;
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
    this.apiSequenciaValorService.criar(this.modelSequenciaValor).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSequenciaValor = sucesso;
        //this.meuForm.controls['IDSequenciaValor'].disable();
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
