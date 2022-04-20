import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelProdSeg } from '../../../../models/model-prod-seg';
import { ModelProdSegCondPagto } from '../../../../models/model-prod-seg-cond-pagto';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiProdSegCondPagtoService } from '../../../../api/api-prod-seg-cond-pagto.service';
import { ApiProdSegService } from '../../../../api/api-prod-seg.service';
import { ApiCondPagtoService } from '../../../../../finan/api/api-cond-pagto.service';

@Component({
  selector: 'app-crude-prod-seg-cond-pagto-detalhe',
  templateUrl: './crude-prod-seg-cond-pagto-detalhe.component.html',
  styleUrls: ['./crude-prod-seg-cond-pagto-detalhe.component.scss']
})
export class CrudeProdSegCondPagtoDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public meuForm: FormGroup;
  public modelProdSeg: ModelProdSeg;
  public modelProdSegCondPagto: ModelProdSegCondPagto;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiProdSegCondPagtoService: ApiProdSegCondPagtoService,
    public apiProdSegService: ApiProdSegService,
    public apiCondPagtoService: ApiCondPagtoService
  ) {
    this.modelProdSegCondPagto = new ModelProdSegCondPagto();
    this.modelProdSeg = new ModelProdSeg();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    //var idPai = +this.route.snapshot.paramMap.get('id');
    this.modelProdSeg = this.apiProdSegCondPagtoService.getProdSeg();
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

    this.meuForm.controls['IDProdSegCondPagto'].disable();

    if (this.modelProdSegCondPagto.IDProdSegCondPagto > 0) {
      this.meuForm.get('chCodCondPagto').disable();
      this.meuForm.get('daDatIniVig').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.modelProdSegCondPagto.daDatFimVig) {
      this.modelProdSegCondPagto.daDatFimVig = new Date(this.modelProdSegCondPagto.daDatFimVig);
    }

    if (this.modelProdSegCondPagto.daDatIniVig) {
      this.modelProdSegCondPagto.daDatIniVig = new Date(this.modelProdSegCondPagto.daDatIniVig);
    }
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelProdSegCondPagto, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDProdSegCondPagto: [this.modelProdSegCondPagto.IDProdSegCondPagto],
        chCodCondPagto: [this.modelProdSegCondPagto.chCodCondPagto, Validators.required],
        daDatIniVig: [this.modelProdSegCondPagto.daDatIniVig, Validators.required],
        daDatFimVig: [this.modelProdSegCondPagto.daDatFimVig, Validators.required],
      });

    }


  }

  private getDados() {

    var id: number;
    id = Number(this.idCadastro);



    if (id == 0) {
      this.modelProdSegCondPagto = new ModelProdSegCondPagto();
      this.modelProdSegCondPagto.IDProdSegCondPagto = id;
      this.modelProdSegCondPagto.chCodCondPagto = "";
      this.modelProdSegCondPagto.daDatFimVig = null;
      this.modelProdSegCondPagto.daDatIniVig = null;

      //pega da URL o id da pessoa
      this.modelProdSegCondPagto.IDProdSeg = +this.route.snapshot.paramMap.get('id');

      if (this.modelProdSegCondPagto.IDProdSeg == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelProdSegCondPagto.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelProdSegCondPagto.IDProdSeg = this.apiProdSegCondPagtoService.getProdSeg().IDProdSeg
      }
      if (this.modelProdSegCondPagto.IDProdSeg == 0) {
        console.error('Não foi encontrado o ID do seguro');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiProdSegCondPagtoService.obter(id).then(
        dados_API => {
          this.modelProdSegCondPagto = dados_API;
          this.modelProdSegCondPagto.daDatFimVig = new Date(dados_API.daDatFimVig);
          this.modelProdSegCondPagto.daDatIniVig = new Date(dados_API.daDatIniVig);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelProdSegCondPagto);
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
    this.apiProdSegCondPagtoService.excluir(this.modelProdSegCondPagto.IDProdSegCondPagto).then(
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
    this.apiProdSegCondPagtoService.alterar(this.modelProdSegCondPagto).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSegCondPagto = sucesso;
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
    this.apiProdSegCondPagtoService.criar(this.modelProdSegCondPagto).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSegCondPagto = sucesso;
        this.meuForm.get('chCodCondPagto').disable();
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
