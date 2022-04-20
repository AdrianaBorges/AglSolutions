import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiAssistSegService } from '../../../../api/api-assist-seg.service';
import { ModelSeguradora } from '../../../../models/model-seguradora';
import { ApiSeguradoraService } from '../../../../api/api-seguradora.service';
import { ModelAssistSeg } from '../../../../models/model-assist-seg';
import { ApiSorteioSegService } from '../../../../api/api-sorteio-seg.service';
//import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';

@Component({
  selector: 'app-crude-assist-seg-detalhe',
  templateUrl: './crude-assist-seg-detalhe.component.html',
  styleUrls: ['./crude-assist-seg-detalhe.component.scss']
})
export class CrudeAssistSegDetalheComponent implements OnInit {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelAssistSeg: ModelAssistSeg;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  //public idCadastroPai: number;

  //Dados provenientes de chave estrangeira
  private modelSeguradora = new ModelSeguradora();
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiAssistSegService: ApiAssistSegService,
    public apiSorteioSegService: ApiSorteioSegService,
    private _location: Location,
    public apiSeguradoraService: ApiSeguradoraService,
  ) {
    this.modelAssistSeg = new ModelAssistSeg();
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
  public gridInterfaceTabCadastroFilho_setIdCadastro(id: number): void {
    this.idCadastro = id;
    this.getDados();
    //this.configurarStatusForm();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm() {
    //var id = +this.route.snapshot.paramMap.get('id');
    this.meuForm.controls['IDAssistSeg'].disable();

    if (this.idCadastro != 0) {
      this.meuForm.controls['chCodAssistSeg'].disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelAssistSeg, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDAssistSeg: [this.modelAssistSeg.IDAssistSeg],
        chCodAssistSeg: [this.modelAssistSeg.chCodAssistSeg, Validators.required],
        chDescricao: [this.modelAssistSeg.chDescricao, Validators.required],
        chDesExterna: [this.modelAssistSeg.chDesExterna, Validators.required],
        chDesDetalhe: [this.modelAssistSeg.chDesDetalhe],
        IDSorteioSeg: [this.modelAssistSeg.IDSorteioSeg]
      });
    }
  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = +this.idCadastro;

    if (id == 0) {
      this.modelAssistSeg = new ModelAssistSeg();
      // this.modelSequenciaValor.daDatExpedicao = null;
      // this.modelSequenciaValor.dtDatInclusao = null;
      // this.modelSequenciaValor.dtDatUltAlteracao = null;

      this.modelAssistSeg.IDAssistSeg = id;
      this.modelAssistSeg.IDSorteioSeg = null;
      this.modelAssistSeg.IDAssistSeg = 0;
      this.modelAssistSeg.chCodAssistSeg = null;
      this.modelAssistSeg.chDescricao = null;
      this.modelAssistSeg.chDesExterna = null;
      this.modelAssistSeg.chDesDetalhe = null;
      this.modelAssistSeg.IDSorteioSeg = null;
      //pega da URL o id da pessoa
      this.modelAssistSeg.IDSeguradora = +this.route.snapshot.paramMap.get('id');

      if (this.modelAssistSeg.IDSeguradora == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelSequenciaValor.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelAssistSeg.IDSeguradora = this.apiAssistSegService.getIDSeguradora();
      }
      if (this.modelAssistSeg.IDSeguradora == 0 || this.modelAssistSeg.IDSeguradora == undefined) {
        console.error('Não foi encontrado o id do cadastro da Seguradora');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiAssistSegService.obter(id).then(
        dados_API => {
          this.modelAssistSeg = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelAssistSeg);
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
    this.apiAssistSegService.excluir(this.modelAssistSeg.IDAssistSeg).then(
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
    this.apiAssistSegService.alterar(this.modelAssistSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssistSeg = sucesso;
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
    this.apiAssistSegService.criar(this.modelAssistSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssistSeg = sucesso;
        //this.meuForm.controls['IDSequenciaValor'].disable();
        this.idCadastro = this.modelAssistSeg.IDAssistSeg;
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
