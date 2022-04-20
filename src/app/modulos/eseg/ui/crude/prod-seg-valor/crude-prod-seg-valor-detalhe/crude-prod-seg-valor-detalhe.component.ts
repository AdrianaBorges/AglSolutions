import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelProdSeg } from '../../../../models/model-prod-seg';
import { ModelProdSegValor } from '../../../../models/model-prod-seg-valor';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiProdSegValorService } from '../../../../api/api-prod-seg-valor.service';
import { ApiProdSegService } from '../../../../api/api-prod-seg.service';

@Component({
  selector: 'app-crude-prod-seg-valor-detalhe',
  templateUrl: './crude-prod-seg-valor-detalhe.component.html',
  styleUrls: ['./crude-prod-seg-valor-detalhe.component.scss']
})
export class CrudeProdSegValorDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public meuForm: FormGroup;
  public modelProdSeg: ModelProdSeg;
  public modelProdSegValor: ModelProdSegValor;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiProdSegValorService: ApiProdSegValorService,
    public apiProdSegService: ApiProdSegService,
  ) {
    this.modelProdSegValor = new ModelProdSegValor();
    this.modelProdSeg = new ModelProdSeg();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }
  calculaPremioLiquido() {
    var premioBruto = Number(this.meuForm.get('deValPremioBruto').value);
    var valorIoF = Number(this.meuForm.get('deValIOF').value);
    var valorServico = Number(this.meuForm.get('deValServico').value);
    var liquido = premioBruto - valorIoF - valorServico;
    this.meuForm.get('deValPremioLiquido').setValue(liquido);
  }
  private inicializarDados() {

    //var idPai = +this.route.snapshot.paramMap.get('id');
    this.modelProdSeg = this.apiProdSegValorService.getProdSeg();
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

    this.meuForm.controls['IDProdSegValor'].disable();

    if (this.modelProdSegValor.IDProdSegValor > 0) {
      this.meuForm.get('deValPremioBruto').disable();
      this.meuForm.get('daDatIniVig').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.modelProdSegValor.daDatFimVig) {
      this.modelProdSegValor.daDatFimVig = new Date(this.modelProdSegValor.daDatFimVig);
    }

    if (this.modelProdSegValor.daDatIniVig) {
      this.modelProdSegValor.daDatIniVig = new Date(this.modelProdSegValor.daDatIniVig);
    }
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelProdSegValor, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDProdSegValor: [this.modelProdSegValor.IDProdSegValor],
        deValPremioBruto: [this.modelProdSegValor.deValPremioBruto, Validators.required],
        deValPremioLiquido: [this.modelProdSegValor.deValPremioLiquido],
        deValCapital: [this.modelProdSegValor.deValCapital, Validators.required],
        deValIOF: [this.modelProdSegValor.deValIOF],
        deValServico: [this.modelProdSegValor.deValServico],
        daDatIniVig: [this.modelProdSegValor.daDatIniVig, Validators.required],
        daDatFimVig: [this.modelProdSegValor.daDatFimVig, Validators.required],
      });

    }


  }

  private getDados() {

    var id: number;
    id = this.idCadastro;



    if (id == 0) {
      this.modelProdSegValor = new ModelProdSegValor();
      this.modelProdSegValor.IDProdSegValor = 0;
      this.modelProdSegValor.deValPremioBruto = null;
      this.modelProdSegValor.deValServico = null;
      this.modelProdSegValor.deValCapital = null;
      this.modelProdSegValor.deValIOF = null;
      this.modelProdSegValor.deValPremioLiquido = null;
      this.modelProdSegValor.daDatFimVig = null;
      this.modelProdSegValor.daDatIniVig = null;

      //pega da URL o id da pessoa
      this.modelProdSegValor.IDProdSeg = +this.route.snapshot.paramMap.get('id');

      if (this.modelProdSegValor.IDProdSeg == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelProdSegValor.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelProdSegValor.IDProdSeg = this.apiProdSegValorService.getProdSeg().IDProdSeg
      }
      if (this.modelProdSegValor.IDProdSeg == 0) {
        console.error('Não foi encontrado o ID do seguro');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiProdSegValorService.obter(id).then(
        dados_API => {
          this.modelProdSegValor = dados_API;
          this.modelProdSegValor.daDatFimVig = new Date(dados_API.daDatFimVig);
          this.modelProdSegValor.daDatIniVig = new Date(dados_API.daDatIniVig);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelProdSegValor);
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
    this.apiProdSegValorService.excluir(this.modelProdSegValor.IDProdSegValor).then(
      sucesso => {
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiProdSegValorService.alterar(this.modelProdSegValor).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSegValor = sucesso;
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
    this.apiProdSegValorService.criar(this.modelProdSegValor).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSegValor = sucesso;
        this.meuForm.get('deValPremioBruto').disable();
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
