import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiEstabelecimentoService } from '../../../../../corp/api/api-estabelecimento.service';
import { ApiTipoPessoaService } from '../../../../../corp/api/api-tipo-pessoa.service';
import { ApiFormaCobrancaEL01Service } from '../../../../../finan/api/api-forma-cobranca-el01.service';
import { ApiCampanhaEL01Service } from '../../../../api/api-campanha-el01.service';
import { ApiCampanhaParamEL01Service } from '../../../../api/api-campanha-param-el01.service';
import { ApiCampanhaVendaEL01Service } from '../../../../api/api-campanha-venda-el01.service';
import { ModelCampanhaEL01 } from '../../../../models/model-campanha-EL01';
import { ModelCampanhaParamEL01 } from '../../../../models/model-campanha-param-EL01';
import { ModelCampanhaVendaEL01 } from '../../../../models/model-campanha-venda-EL01';
import { Location } from "@angular/common";

@Component({
  selector: 'app-crude-campanha-venda-detalhe',
  templateUrl: './crude-campanha-venda-detalhe.component.html',
  styleUrls: ['./crude-campanha-venda-detalhe.component.scss']
})
export class CrudeCampanhaVendaDetalheComponent implements OnInit {

  public isCNPJ: boolean = false;
  public isCPF: boolean = false;
  public maskTipoPessoa: string = "";

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  public meuForm: FormGroup;
  public modelCampanhaEL01: ModelCampanhaEL01;
  public modelCampanhaParamEL01: ModelCampanhaParamEL01;
  public modelCampanhaVendaEL01: ModelCampanhaVendaEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private consulta: boolean;
  private idCadastro: number;

  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiCampanhaEL01Service: ApiCampanhaEL01Service,
    public apiCampanhaParamEL01Service: ApiCampanhaParamEL01Service,
    public apiCampanhaVendaEL01Service: ApiCampanhaVendaEL01Service,
    public apiFormaCobrancaEL01Service: ApiFormaCobrancaEL01Service,
    public apiTipoPessoaService: ApiTipoPessoaService,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    private _location: Location,
    private router: Router,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,

  ) {
    this.modelCampanhaVendaEL01 = new ModelCampanhaVendaEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('IDCampanhaVenda');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  ngOnInit() {
    this.modelCampanhaEL01 = new ModelCampanhaEL01();
    this.inicializarDados();
    this.criarBreadCrumbs();
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
    this.carregarDadosPai();
    //this.configurarStatusForm();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private async carregarDadosPai() {
    var id = +this.route.snapshot.paramMap.get('id');
    this.modelCampanhaEL01 = await this.apiCampanhaEL01Service.obter(id);
    if (this.modelCampanhaEL01.dtDatInicio) {
      this.modelCampanhaEL01.dtDatInicio = new Date(this.modelCampanhaEL01.dtDatInicio);
    }
    if (this.modelCampanhaEL01.dtDatFim) {
      this.modelCampanhaEL01.dtDatFim = new Date(this.modelCampanhaEL01.dtDatFim);
    }
    var id_CampanhaParam: number;
    id_CampanhaParam = +this.route.snapshot.paramMap.get('IDCampanhaParam');

    this.modelCampanhaParamEL01 = await this.apiCampanhaParamEL01Service.obter(id_CampanhaParam);
    if (this.modelCampanhaParamEL01.dtDatVendaIni) {
      this.modelCampanhaParamEL01.dtDatVendaIni = new Date(this.modelCampanhaParamEL01.dtDatVendaIni);
    }
    if (this.modelCampanhaParamEL01.dtDatVendaFim) {
      this.modelCampanhaParamEL01.dtDatVendaFim = new Date(this.modelCampanhaParamEL01.dtDatVendaFim);
    }



  }


  private inicializarDados() {
    this.carregarDadosPai();
    this.criarForm(true);
    this.configurarStatusForm();
    this.getCampanhaVendaEL01();
  }

  private configurarStatusForm() {
    var id = +this.route.snapshot.paramMap.get('IDCampanhaVenda');
    this.meuForm.controls['IDCampanhaVenda'].disable();
    this.meuForm.controls['deValPremioSaldo'].disable();

  }

  private criarForm(emEdicao: boolean) {

    if (this.modelCampanhaVendaEL01.dtDatInclusao) {
      this.modelCampanhaVendaEL01.dtDatInclusao = new Date(this.modelCampanhaVendaEL01.dtDatInclusao);
    }

    if (this.modelCampanhaVendaEL01.dtDatIntegradoDestino) {
      this.modelCampanhaVendaEL01.dtDatIntegradoDestino = new Date(this.modelCampanhaVendaEL01.dtDatIntegradoDestino);
    }
    if (this.modelCampanhaVendaEL01.dtDatUltAlteracao) {
      this.modelCampanhaVendaEL01.dtDatUltAlteracao = new Date(this.modelCampanhaVendaEL01.dtDatUltAlteracao);
    }
    if (this.modelCampanhaVendaEL01.dtDatVenda) {
      this.modelCampanhaVendaEL01.dtDatVenda = new Date(this.modelCampanhaVendaEL01.dtDatVenda);
    }

    var CpfCnpj: string = (this.modelCampanhaVendaEL01.inNumIdentificacao > 0 ? (this.modelCampanhaVendaEL01.inCodTipoPessoa == 1) ? (this.modelCampanhaVendaEL01.inNumIdentificacao + '').padStart(11, "0") : (this.modelCampanhaVendaEL01.inNumIdentificacao + '').padStart(14, "0") : '');
    this.modelCampanhaVendaEL01['CpfCnpj'] = CpfCnpj;


    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCampanhaVendaEL01, emEdicao);
    }
    else {
      this.meuForm = this.formB.group({
        IDCampanhaVenda: [this.modelCampanhaVendaEL01.IDCampanhaVenda],
        dtDatVenda: [this.modelCampanhaVendaEL01.dtDatVenda, Validators.required],
        chNumTerminal: [this.modelCampanhaVendaEL01.chNumTerminal, Validators.required],
        chNumSeqOperacao: [this.modelCampanhaVendaEL01.chNumSeqOperacao, Validators.required],
        chNumDocto: [this.modelCampanhaVendaEL01.chNumDocto, Validators.required],
        chNumContadorReinicio: [this.modelCampanhaVendaEL01.chNumContadorReinicio],
        chNumSeqOperacaoEntrada: [this.modelCampanhaVendaEL01.chNumSeqOperacaoEntrada],
        deValVenda: [this.modelCampanhaVendaEL01.deValVenda, Validators.required],
        CpfCnpj: [CpfCnpj],
        IDEstabelec: [this.modelCampanhaVendaEL01.IDEstabelec, Validators.required],
        //inNumIdentificacao: [this.modelCampanhaVendaEL01.inNumIdentificacao],
        inCodTipoPessoa: [this.modelCampanhaVendaEL01.inCodTipoPessoa],
        chCodFormaCobranca: [this.modelCampanhaVendaEL01.chCodFormaCobranca],
        deValPremioGanho: [this.modelCampanhaVendaEL01.deValPremioGanho],
        deValPremioUtilizado: [this.modelCampanhaVendaEL01.deValPremioUtilizado],
        deValPremioSaldo: [this.modelCampanhaVendaEL01.deValPremioSaldo],
        lgIntegradoDestino: [this.modelCampanhaVendaEL01.lgIntegradoDestino],
        chIDDestino: [this.modelCampanhaVendaEL01.chIDDestino],
        dtDatIntegradoDestino: [this.modelCampanhaVendaEL01.dtDatIntegradoDestino],
      });
    }
  }


  private getCampanhaVendaEL01() {

    var idPai: number;
    var id: number;
    idPai = +this.route.snapshot.paramMap.get('IDCampanhaParam');
    id = +this.route.snapshot.paramMap.get('IDCampanhaVenda');
    if (id == 0) {
      this.modelCampanhaVendaEL01 = new ModelCampanhaVendaEL01();
      this.modelCampanhaVendaEL01.IDCampanhaParam = idPai;
      this.modelCampanhaVendaEL01.IDCampanhaVenda = null;
      this.modelCampanhaVendaEL01.dtDatVenda = null;
      this.modelCampanhaVendaEL01.dtDatUltAlteracao = null;
      this.modelCampanhaVendaEL01.dtDatIntegradoDestino = null;
      this.modelCampanhaVendaEL01.dtDatInclusao = null;

      this.modelCampanhaVendaEL01.IDEstabelec = null;
      this.modelCampanhaVendaEL01.lgIntegradoDestino = false;
      this.modelCampanhaVendaEL01.chIDDestino = null;
      this.modelCampanhaVendaEL01.inCodTipoPessoa = null;
      this.modelCampanhaVendaEL01.chCodFormaCobranca = null;

      this.modelCampanhaVendaEL01.deValPremioGanho = null;
      this.modelCampanhaVendaEL01.deValPremioSaldo = null;
      this.modelCampanhaVendaEL01.deValVenda = null;
      this.modelCampanhaVendaEL01.deValPremioUtilizado = null;

      this.modelCampanhaVendaEL01.inNumIdentificacao = null;

      this.modelCampanhaVendaEL01.chNumTerminal = "";
      this.modelCampanhaVendaEL01.chNumDocto = "";
      this.modelCampanhaVendaEL01.chNumSeqOperacao = "";
      this.modelCampanhaVendaEL01.chNumSeqOperacaoEntrada = "";
      this.modelCampanhaVendaEL01.chNumContadorReinicio = "";


      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiCampanhaVendaEL01Service.obter(id).then(
        dados_API => {
          this.modelCampanhaVendaEL01 = dados_API;
          this.operacao = 'edicao';
          this.criarForm(false);
        },
        erro => {
          this.apiErrorCollection = erro;
        }
      );
    }

  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCampanhaVendaEL01);
    this.modelCampanhaVendaEL01.inNumIdentificacao = this.meuForm.value.CpfCnpj;
    this.modelCampanhaVendaEL01.inCodTipoDocumento = this.modelCampanhaVendaEL01.inCodTipoPessoa;
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getCampanhaVendaEL01();
    this.cadastroBarraAcao.esconderAguarde();
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
    this.apiCampanhaVendaEL01Service.excluir(this.modelCampanhaVendaEL01.IDCampanhaVenda).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiCampanhaVendaEL01Service.alterar(this.modelCampanhaVendaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCampanhaVendaEL01 = sucesso;
        if (this.modelCampanhaVendaEL01.dtDatInclusao) {
          this.modelCampanhaVendaEL01.dtDatInclusao = new Date(this.modelCampanhaVendaEL01.dtDatInclusao);
        }

        if (this.modelCampanhaVendaEL01.dtDatIntegradoDestino) {
          this.modelCampanhaVendaEL01.dtDatIntegradoDestino = new Date(this.modelCampanhaVendaEL01.dtDatIntegradoDestino);
        }
        if (this.modelCampanhaVendaEL01.dtDatUltAlteracao) {
          this.modelCampanhaVendaEL01.dtDatUltAlteracao = new Date(this.modelCampanhaVendaEL01.dtDatUltAlteracao);
        }
        if (this.modelCampanhaVendaEL01.dtDatVenda) {
          this.modelCampanhaVendaEL01.dtDatVenda = new Date(this.modelCampanhaVendaEL01.dtDatVenda);
        }


        this.criarForm(false);
        this.configurarStatusForm();
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
    this.apiCampanhaVendaEL01Service.criar(this.modelCampanhaVendaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCampanhaVendaEL01 = sucesso;
        if (this.modelCampanhaVendaEL01.dtDatInclusao) {
          this.modelCampanhaVendaEL01.dtDatInclusao = new Date(this.modelCampanhaVendaEL01.dtDatInclusao);
        }

        if (this.modelCampanhaVendaEL01.dtDatIntegradoDestino) {
          this.modelCampanhaVendaEL01.dtDatIntegradoDestino = new Date(this.modelCampanhaVendaEL01.dtDatIntegradoDestino);
        }
        if (this.modelCampanhaVendaEL01.dtDatUltAlteracao) {
          this.modelCampanhaVendaEL01.dtDatUltAlteracao = new Date(this.modelCampanhaVendaEL01.dtDatUltAlteracao);
        }
        if (this.modelCampanhaVendaEL01.dtDatVenda) {
          this.modelCampanhaVendaEL01.dtDatVenda = new Date(this.modelCampanhaVendaEL01.dtDatVenda);
        }

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




  alterarMascara(dado) {
    if (dado == 1) {
      this.maskTipoPessoa = "000.000.000-00";
      this.isCPF = true;
      this.isCNPJ = false;
    } else {
      this.maskTipoPessoa = "00.000.000/0000-00";
      this.isCPF = false;
      this.isCNPJ = true;
    }
  }
}
