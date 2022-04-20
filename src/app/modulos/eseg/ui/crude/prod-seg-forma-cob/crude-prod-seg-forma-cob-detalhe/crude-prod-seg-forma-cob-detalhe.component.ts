import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelProdSeg } from '../../../../models/model-prod-seg';
import { ModelProdSegFormaCob } from '../../../../models/model-prod-seg-forma-cob';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiProdSegFormaCobService } from '../../../../api/api-prod-seg-forma-cob.service';
import { ApiProdSegService } from '../../../../api/api-prod-seg.service';
import { ApiFormaCobrancaEL01Service } from '../../../../../finan/api/api-forma-cobranca-el01.service';

@Component({
  selector: 'app-crude-prod-seg-forma-cob-detalhe',
  templateUrl: './crude-prod-seg-forma-cob-detalhe.component.html',
  styleUrls: ['./crude-prod-seg-forma-cob-detalhe.component.scss']
})
export class CrudeProdSegFormaCobDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public meuForm: FormGroup;
  public modelProdSeg: ModelProdSeg;
  public modelProdSegFormaCob: ModelProdSegFormaCob;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiProdSegFormaCobService: ApiProdSegFormaCobService,
    public apiProdSegService: ApiProdSegService,
    public apiFormaCobrancaEL01Service: ApiFormaCobrancaEL01Service
  ) {
    this.modelProdSegFormaCob = new ModelProdSegFormaCob();
    this.modelProdSeg = new ModelProdSeg();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    //var idPai = +this.route.snapshot.paramMap.get('id');
    this.modelProdSeg = this.apiProdSegFormaCobService.getProdSeg();
    this.criarForm(true);

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
    var id = +this.route.snapshot.paramMap.get('id');

    this.meuForm.controls['IDProdSegFormaCob'].disable();

    if (this.modelProdSegFormaCob.IDProdSegFormaCob > 0) {
      this.meuForm.get('chCodFormaCobranca').disable();
      this.meuForm.get('daDatIniVig').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.modelProdSegFormaCob.daDatFimVig) {
      this.modelProdSegFormaCob.daDatFimVig = new Date(this.modelProdSegFormaCob.daDatFimVig);
    }

    if (this.modelProdSegFormaCob.daDatIniVig) {
      this.modelProdSegFormaCob.daDatIniVig = new Date(this.modelProdSegFormaCob.daDatIniVig);
    }
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelProdSegFormaCob, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDProdSegFormaCob: [this.modelProdSegFormaCob.IDProdSegFormaCob],
        chCodFormaCobranca: [this.modelProdSegFormaCob.chCodFormaCobranca, Validators.required],
        daDatIniVig: [this.modelProdSegFormaCob.daDatIniVig, Validators.required],
        daDatFimVig: [this.modelProdSegFormaCob.daDatFimVig, Validators.required],
      });

    }


  }

  private getDados() {

    var id: number;
    id = Number(this.idCadastro);


    if (id == 0) {
      this.modelProdSegFormaCob = new ModelProdSegFormaCob();
      this.modelProdSegFormaCob.IDProdSegFormaCob = id;
      this.modelProdSegFormaCob.chCodFormaCobranca = "";
      this.modelProdSegFormaCob.daDatFimVig = null;
      this.modelProdSegFormaCob.daDatIniVig = null;

      //pega da URL o id da pessoa
      this.modelProdSegFormaCob.IDProdSeg = +this.route.snapshot.paramMap.get('id');

      if (this.modelProdSegFormaCob.IDProdSeg == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelProdSegFormaCob.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelProdSegFormaCob.IDProdSeg = this.apiProdSegFormaCobService.getProdSeg().IDProdSeg
      }
      if (this.modelProdSegFormaCob.IDProdSeg == 0) {
        console.error('Não foi encontrado o ID do seguro');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiProdSegFormaCobService.obter(id).then(
        dados_API => {
          this.modelProdSegFormaCob = dados_API;
          this.modelProdSegFormaCob.daDatFimVig = new Date(dados_API.daDatFimVig);
          this.modelProdSegFormaCob.daDatIniVig = new Date(dados_API.daDatIniVig);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelProdSegFormaCob);
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
    this.apiProdSegFormaCobService.excluir(this.modelProdSegFormaCob.IDProdSegFormaCob).then(
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
    this.apiProdSegFormaCobService.alterar(this.modelProdSegFormaCob).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSegFormaCob = sucesso;
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
    this.apiProdSegFormaCobService.criar(this.modelProdSegFormaCob).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSegFormaCob = sucesso;
        this.meuForm.get('chCodFormaCobranca').disable();
        this.meuForm.get('daDatIniVig').disable();
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
