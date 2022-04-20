import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ModelCampanhaEL01 } from '../../../../models/model-campanha-EL01';
import { ModelCampanhaParamEL01 } from '../../../../models/model-campanha-param-EL01';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCampanhaEL01Service } from '../../../../api/api-campanha-el01.service';
import { ApiCampanhaParamEL01Service } from '../../../../api/api-campanha-param-el01.service';
import { ApiEstabelecimentoService } from '../../../../../corp/api/api-estabelecimento.service';
import { ApiGrupoEstabService } from '../../../../../corp/api/api-grupo-estab.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
@Component({
  selector: 'app-crude-campanha-param-detalhe',
  templateUrl: './crude-campanha-param-detalhe.component.html',
  styleUrls: ['./crude-campanha-param-detalhe.component.scss']
})
export class CrudeCampanhaParamDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  public meuForm: FormGroup;
  public modelCampanhaEL01: ModelCampanhaEL01;
  public modelCampanhaParamEL01: ModelCampanhaParamEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private consulta: boolean;
  private idCadastro: number;

  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiCampanhaEL01Service: ApiCampanhaEL01Service,
    public apiCampanhaParamEL01Service: ApiCampanhaParamEL01Service,
    public apiGrupoEstabService: ApiGrupoEstabService,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    private _location: Location,
    private router: Router,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,

  ) {
    this.modelCampanhaParamEL01 = new ModelCampanhaParamEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('IDCampanhaParam');
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

  private carregarDadosPai() {
    var idPai = +this.route.snapshot.paramMap.get('id');
    this.apiCampanhaEL01Service.obter(idPai).then(
      programa => {
        this.modelCampanhaEL01 = programa;
        if (this.modelCampanhaEL01.dtDatInicio) {
          this.modelCampanhaEL01.dtDatInicio = new Date(this.modelCampanhaEL01.dtDatInicio);
        }
        if (this.modelCampanhaEL01.dtDatFim) {
          this.modelCampanhaEL01.dtDatFim = new Date(this.modelCampanhaEL01.dtDatFim);
        }
      }
    );
  }

  private inicializarDados() {
    this.carregarDadosPai();
    this.criarForm(true);
    this.configurarStatusForm();
    this.getCampanhaParamEL01();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('IDCampanhaParam');
    this.meuForm.controls['IDCampanhaParam'].disable();
    this.meuForm.controls['lgPremioInstSorteado'].disable();


  }

  private criarForm(emEdicao: boolean) {

    if (this.modelCampanhaParamEL01.dtDatVendaFim) {
      this.modelCampanhaParamEL01.dtDatVendaFim = new Date(this.modelCampanhaParamEL01.dtDatVendaFim);
    }

    if (this.modelCampanhaParamEL01.dtDatVendaIni) {
      this.modelCampanhaParamEL01.dtDatVendaIni = new Date(this.modelCampanhaParamEL01.dtDatVendaIni);
    }


    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCampanhaParamEL01, emEdicao);
      if (this.modelCampanhaParamEL01) {
        if (this.modelCampanhaParamEL01.inCodTipoCampanha == 1) {
          if (this.modelCampanhaParamEL01.inCodSituacaoCamp != 1) this.cadastroBarraAcao.setModoConsulta();
        } else if (this.modelCampanhaParamEL01.inCodTipoCampanha == 2) {
          if ((new Date(this.modelCampanhaParamEL01.dtDatVendaIni) <= new Date())) this.cadastroBarraAcao.setModoConsulta();
        }

      }
    }
    else {
      this.meuForm = this.formB.group({
        IDCampanhaParam: [this.modelCampanhaParamEL01.IDCampanhaParam],
        dtDatVendaIni: [this.modelCampanhaParamEL01.dtDatVendaIni, Validators.required],
        dtDatVendaFim: [this.modelCampanhaParamEL01.dtDatVendaFim, Validators.required],
        IDEstabelec: [this.modelCampanhaParamEL01.IDEstabelec],
        inCodGrupoEstab: [this.modelCampanhaParamEL01.inCodGrupoEstab],
        deValVendaMinimo: [this.modelCampanhaParamEL01.deValVendaMinimo, Validators.required],
        deValPremio: [this.modelCampanhaParamEL01.deValPremio],
        lgPremioInstSorteado: [this.modelCampanhaParamEL01.lgPremioInstSorteado],
      });
    }
  }


  private getCampanhaParamEL01() {

    var idPai: number;
    var id: number;
    idPai = +this.route.snapshot.paramMap.get('id');
    id = +this.route.snapshot.paramMap.get('IDCampanhaParam');
    if (id == 0) {
      this.modelCampanhaParamEL01 = new ModelCampanhaParamEL01();
      this.modelCampanhaParamEL01.IDCampanha = idPai;
      this.modelCampanhaParamEL01.inCodGrupoEstab = null;
      this.modelCampanhaParamEL01.IDEstabelec = null;
      this.modelCampanhaParamEL01.dtDatVendaFim = null;
      this.modelCampanhaParamEL01.dtDatVendaIni = null;
      this.modelCampanhaParamEL01.deValPremio = null;

      this.modelCampanhaParamEL01.deValVendaMinimo = null;
      this.modelCampanhaParamEL01.lgPremioInstSorteado = false;
      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiCampanhaParamEL01Service.obter(id).then(
        dados_API => {
          this.modelCampanhaParamEL01 = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCampanhaParamEL01);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getCampanhaParamEL01();
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
    this.apiCampanhaParamEL01Service.excluir(this.modelCampanhaParamEL01.IDCampanhaParam).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiCampanhaParamEL01Service.alterar(this.modelCampanhaParamEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCampanhaParamEL01 = sucesso;
        if (this.modelCampanhaParamEL01.dtDatVendaFim) {
          this.modelCampanhaParamEL01.dtDatVendaFim = new Date(this.modelCampanhaParamEL01.dtDatVendaFim);
        }

        if (this.modelCampanhaParamEL01.dtDatVendaIni) {
          this.modelCampanhaParamEL01.dtDatVendaIni = new Date(this.modelCampanhaParamEL01.dtDatVendaIni);
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
    this.apiCampanhaParamEL01Service.criar(this.modelCampanhaParamEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCampanhaParamEL01 = sucesso;
        if (this.modelCampanhaParamEL01.dtDatVendaFim) {
          this.modelCampanhaParamEL01.dtDatVendaFim = new Date(this.modelCampanhaParamEL01.dtDatVendaFim);
        }

        if (this.modelCampanhaParamEL01.dtDatVendaIni) {
          this.modelCampanhaParamEL01.dtDatVendaIni = new Date(this.modelCampanhaParamEL01.dtDatVendaIni);
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

}
