import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiCoberturaSegService } from '../../../../api/api-cobertura-seg.service';
import { ModelSeguradora } from '../../../../models/model-seguradora';
import { ApiSeguradoraService } from '../../../../api/api-seguradora.service';
import { ModelCoberturaSeg } from '../../../../models/model-cobertura-seg';
//import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';

@Component({
  selector: 'app-crude-cobertura-seg-detalhe',
  templateUrl: './crude-cobertura-seg-detalhe.component.html',
  styleUrls: ['./crude-cobertura-seg-detalhe.component.scss']
})
export class CrudeCoberturaSegDetalheComponent implements OnInit {
  public formatOptions: any = {
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'name'
  };
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelCoberturaSeg: ModelCoberturaSeg;
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
    public apiCoberturaSegService: ApiCoberturaSegService,
    private _location: Location,
    public apiSeguradoraService: ApiSeguradoraService,
  ) {
    this.modelCoberturaSeg = new ModelCoberturaSeg();
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
    this.meuForm.controls['IDCoberturaSeg'].disable();

    if (this.idCadastro != 0) {
      this.meuForm.controls['chCodCoberturaSeg'].disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCoberturaSeg, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDCoberturaSeg: [this.modelCoberturaSeg.IDCoberturaSeg],
        chCodCoberturaSeg: [this.modelCoberturaSeg.chCodCoberturaSeg, Validators.required],
        chDescricao: [this.modelCoberturaSeg.chDescricao, Validators.required],
        chDesExterna: [this.modelCoberturaSeg.chDesExterna, Validators.required],
        chDesDetalhe: [this.modelCoberturaSeg.chDesDetalhe],
        deValLimitePorCPF: [this.modelCoberturaSeg.deValLimitePorCPF],
      });
    }
  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = +this.idCadastro;

    if (id == 0) {
      this.modelCoberturaSeg = new ModelCoberturaSeg();
      this.modelCoberturaSeg.chCodCoberturaSeg = null;
      this.modelCoberturaSeg.chDescricao = null;
      this.modelCoberturaSeg.chDesExterna = null;
      this.modelCoberturaSeg.chDesDetalhe = null;
      this.modelCoberturaSeg.deValLimitePorCPF = null;
      this.modelCoberturaSeg.IDCoberturaSeg = id;
      //pega da URL o id da pessoa
      this.modelCoberturaSeg.IDSeguradora = +this.route.snapshot.paramMap.get('id');

      if (this.modelCoberturaSeg.IDSeguradora == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelSequenciaValor.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelCoberturaSeg.IDSeguradora = this.apiCoberturaSegService.getIDSeguradora();
      }
      if (this.modelCoberturaSeg.IDSeguradora == 0 || this.modelCoberturaSeg.IDSeguradora == undefined) {
        console.error('Não foi encontrado o id do cadastro da Seguradora');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiCoberturaSegService.obter(id).then(
        dados_API => {
          this.modelCoberturaSeg = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCoberturaSeg);
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
    this.apiCoberturaSegService.excluir(this.modelCoberturaSeg.IDCoberturaSeg).then(
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
    this.apiCoberturaSegService.alterar(this.modelCoberturaSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCoberturaSeg = sucesso;
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
    this.apiCoberturaSegService.criar(this.modelCoberturaSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCoberturaSeg = sucesso;
        //this.meuForm.controls['IDSequenciaValor'].disable();
        this.idCadastro = this.modelCoberturaSeg.IDCoberturaSeg;
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
