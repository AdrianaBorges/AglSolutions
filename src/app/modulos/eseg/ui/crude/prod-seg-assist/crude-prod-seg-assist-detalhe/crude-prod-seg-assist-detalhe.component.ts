import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelProdSeg } from '../../../../models/model-prod-seg';
import { ModelProdSegAssist } from '../../../../models/model-prod-seg-assist';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiProdSegAssistService } from '../../../../api/api-prod-seg-assist.service';
import { ApiProdSegService } from '../../../../api/api-prod-seg.service';
import { ApiAssistSegService } from '../../../../api/api-assist-seg.service';
import { ApiProdSegCoberturaService } from '../../../../api/api-prod-seg-cobertura.service';

@Component({
  selector: 'app-crude-prod-seg-assist-detalhe',
  templateUrl: './crude-prod-seg-assist-detalhe.component.html',
  styleUrls: ['./crude-prod-seg-assist-detalhe.component.scss']
})
export class CrudeProdSegAssistDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public meuForm: FormGroup;
  public modelProdSeg: ModelProdSeg;
  public modelProdSegAssist: ModelProdSegAssist;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiProdSegAssistService: ApiProdSegAssistService,
    public apiProdSegService: ApiProdSegService,
    public apiAssistSegService: ApiAssistSegService,
    public apiProdSegCoberturaService: ApiProdSegCoberturaService
  ) {
    this.modelProdSegAssist = new ModelProdSegAssist();
    this.modelProdSeg = new ModelProdSeg();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    //var idPai = +this.route.snapshot.paramMap.get('id');
    this.modelProdSeg = this.apiProdSegAssistService.getProdSeg();
    this.apiAssistSegService.setIDSeguradora(this.modelProdSeg.IDSeguradora);
    this.apiProdSegCoberturaService.setProdSeg(this.modelProdSeg);
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

    this.meuForm.controls['IDProdSegAssist'].disable();

    if (this.modelProdSegAssist.IDProdSegAssist > 0) {
      this.meuForm.get('IDAssistSeg').disable();
      this.meuForm.get('daDatIniVig').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.modelProdSegAssist.daDatFimVig) {
      this.modelProdSegAssist.daDatFimVig = new Date(this.modelProdSegAssist.daDatFimVig);
    }

    if (this.modelProdSegAssist.daDatIniVig) {
      this.modelProdSegAssist.daDatIniVig = new Date(this.modelProdSegAssist.daDatIniVig);
    }
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelProdSegAssist, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDProdSegAssist: [this.modelProdSegAssist.IDProdSegAssist],
        IDAssistSeg: [this.modelProdSegAssist.IDAssistSeg, Validators.required],
        daDatIniVig: [this.modelProdSegAssist.daDatIniVig, Validators.required],
        daDatFimVig: [this.modelProdSegAssist.daDatFimVig, Validators.required],
        deValLimite: [this.modelProdSegAssist.deValLimite],
        inNumDiaCarencia: [this.modelProdSegAssist.inNumDiaCarencia],
        inNumDiaFranquia: [this.modelProdSegAssist.inNumDiaFranquia],
        inQtdEventos: [this.modelProdSegAssist.inQtdEventos],
        IDCoberturaSeg: [this.modelProdSegAssist.IDCoberturaSeg],
      });


    }


  }

  private getDados() {

    var id: number;
    id = Number(this.idCadastro);



    if (id == 0) {
      this.modelProdSegAssist = new ModelProdSegAssist();
      this.modelProdSegAssist.IDProdSegAssist = id;
      this.modelProdSegAssist.IDProdSegAssist = 0;
      this.modelProdSegAssist.IDAssistSeg = undefined;
      this.modelProdSegAssist.daDatFimVig = null;
      this.modelProdSegAssist.daDatIniVig = null;
      this.modelProdSegAssist.deValLimite = null;
      this.modelProdSegAssist.inNumDiaCarencia = null;
      this.modelProdSegAssist.inNumDiaFranquia = null;
      this.modelProdSegAssist.inQtdEventos = null;
      this.modelProdSegAssist.IDCoberturaSeg = null;

      //pega da URL o id da pessoa
      this.modelProdSegAssist.IDProdSeg = +this.route.snapshot.paramMap.get('id');

      if (this.modelProdSegAssist.IDProdSeg == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelProdSegAssist.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelProdSegAssist.IDProdSeg = this.apiProdSegAssistService.getProdSeg().IDProdSeg
      }
      if (this.modelProdSegAssist.IDProdSeg == 0) {
        console.error('Não foi encontrado o ID do seguro');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiProdSegAssistService.obter(id).then(
        dados_API => {
          this.modelProdSegAssist = dados_API;
          this.modelProdSegAssist.daDatFimVig = new Date(dados_API.daDatFimVig);
          this.modelProdSegAssist.daDatIniVig = new Date(dados_API.daDatIniVig);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelProdSegAssist);
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
    this.apiProdSegAssistService.excluir(this.modelProdSegAssist.IDProdSegAssist).then(
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
    this.apiProdSegAssistService.alterar(this.modelProdSegAssist).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSegAssist = sucesso;
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
    this.apiProdSegAssistService.criar(this.modelProdSegAssist).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSegAssist = sucesso;
        this.meuForm.get('IDAssistSeg').disable();
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
