import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiProdSegCoberturaService } from '../../../../api/api-prod-seg-cobertura.service';
import { ApiProdSegService } from '../../../../api/api-prod-seg.service';
import { ModelProdSeg } from '../../../../models/model-prod-seg';
import { ModelProdSegCobertura } from '../../../../models/model-prod-seg-cobertura';
import { ApiCoberturaSegService } from '../../../../api/api-cobertura-seg.service';

@Component({
  selector: 'app-crude-prod-seg-cobertura-detalhe',
  templateUrl: './crude-prod-seg-cobertura-detalhe.component.html',
  styleUrls: ['./crude-prod-seg-cobertura-detalhe.component.scss']
})
export class CrudeProdSegCoberturaDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public meuForm: FormGroup;
  public modelProdSeg: ModelProdSeg;
  public modelProdSegCobertura: ModelProdSegCobertura;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiProdSegCoberturaService: ApiProdSegCoberturaService,
    public apiProdSegService: ApiProdSegService,
    public apiCoberturaSegService: ApiCoberturaSegService
  ) {
    this.modelProdSegCobertura = new ModelProdSegCobertura();
    this.modelProdSeg = new ModelProdSeg();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    //var idPai = +this.route.snapshot.paramMap.get('id');
    this.modelProdSeg = this.apiProdSegCoberturaService.getProdSeg();
    this.apiCoberturaSegService.setIDSeguradora(this.modelProdSeg.IDSeguradora);
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

    this.meuForm.controls['IDProdSegCobertura'].disable();

    if (this.modelProdSegCobertura.IDProdSegCobertura > 0) {
      this.meuForm.get('IDCoberturaSeg').disable();
      this.meuForm.get('daDatIniVig').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.modelProdSegCobertura.daDatFimVig) {
      this.modelProdSegCobertura.daDatFimVig = new Date(this.modelProdSegCobertura.daDatFimVig);
    }

    if (this.modelProdSegCobertura.daDatIniVig) {
      this.modelProdSegCobertura.daDatIniVig = new Date(this.modelProdSegCobertura.daDatIniVig);
    }
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelProdSegCobertura, emEdicao);
      this.configurarStatusForm();
    } else {
      if (this.modelProdSeg.inCodTipoSeguro == 1) {
        this.meuForm = this.formB.group({
          IDProdSegCobertura: [this.modelProdSegCobertura.IDProdSegCobertura],
          IDCoberturaSeg: [this.modelProdSegCobertura.IDCoberturaSeg, Validators.required],
          daDatIniVig: [this.modelProdSegCobertura.daDatIniVig, Validators.required],
          daDatFimVig: [this.modelProdSegCobertura.daDatFimVig, Validators.required],
          deValCobertura: [this.modelProdSegCobertura.deValCobertura, Validators.required],
          deValCoberturaMin: [this.modelProdSegCobertura.deValCoberturaMin],
          deValCoberturaMax: [this.modelProdSegCobertura.deValCoberturaMax],
          inNumDiaCarencia: [this.modelProdSegCobertura.inNumDiaCarencia],
          inNumDiaFranquia: [this.modelProdSegCobertura.inNumDiaFranquia],
          deValLimitePorCPF: [this.modelProdSegCobertura.deValLimitePorCPF],

        });

      } else if (this.modelProdSeg.inCodTipoSeguro == 2) {
        this.meuForm = this.formB.group({
          IDProdSegCobertura: [this.modelProdSegCobertura.IDProdSegCobertura],
          IDCoberturaSeg: [this.modelProdSegCobertura.IDCoberturaSeg, Validators.required],
          daDatIniVig: [this.modelProdSegCobertura.daDatIniVig, Validators.required],
          daDatFimVig: [this.modelProdSegCobertura.daDatFimVig, Validators.required],
          deValCobertura: [this.modelProdSegCobertura.deValCobertura],
          deValCoberturaMin: [this.modelProdSegCobertura.deValCoberturaMin],
          deValCoberturaMax: [this.modelProdSegCobertura.deValCoberturaMax, Validators.required],
          inNumDiaCarencia: [this.modelProdSegCobertura.inNumDiaCarencia],
          inNumDiaFranquia: [this.modelProdSegCobertura.inNumDiaFranquia],
          deValLimitePorCPF: [this.modelProdSegCobertura.deValLimitePorCPF],

        });

      }

    }


  }

  private getDados() {

    var id: number;
    id = Number(this.idCadastro);



    if (id == 0) {
      this.modelProdSegCobertura = new ModelProdSegCobertura();
      this.modelProdSegCobertura.IDProdSegCobertura = id;
      this.modelProdSegCobertura.daDatFimVig = null;
      this.modelProdSegCobertura.daDatIniVig = null;
      this.modelProdSegCobertura.IDCoberturaSeg = null;
      this.modelProdSegCobertura.deValCobertura = null;
      this.modelProdSegCobertura.deValCoberturaMin = null;
      this.modelProdSegCobertura.deValCoberturaMax = null;
      this.modelProdSegCobertura.inNumDiaCarencia = null;
      this.modelProdSegCobertura.inNumDiaFranquia = null;
      this.modelProdSegCobertura.deValLimitePorCPF = null;

      //pega da URL o id da pessoa
      this.modelProdSegCobertura.IDProdSeg = Number(this.route.snapshot.paramMap.get('id'));

      if (this.modelProdSegCobertura.IDProdSeg == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelProdSegCobertura.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelProdSegCobertura.IDProdSeg = this.apiProdSegCoberturaService.getProdSeg().IDProdSeg
      }
      if (this.modelProdSegCobertura.IDProdSeg == 0) {
        console.error('Não foi encontrado o ID do seguro');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiProdSegCoberturaService.obter(id).then(
        dados_API => {
          this.modelProdSegCobertura = dados_API;
          this.modelProdSegCobertura.daDatFimVig = new Date(dados_API.daDatFimVig);
          this.modelProdSegCobertura.daDatIniVig = new Date(dados_API.daDatIniVig);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelProdSegCobertura);
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
    this.apiProdSegCoberturaService.excluir(this.modelProdSegCobertura.IDProdSegCobertura).then(
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
    this.apiProdSegCoberturaService.alterar(this.modelProdSegCobertura).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSegCobertura = sucesso;
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
    this.apiProdSegCoberturaService.criar(this.modelProdSegCobertura).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSegCobertura = sucesso;
        this.meuForm.get('IDCoberturaSeg').disable();
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
