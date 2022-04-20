import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiCampanhaEL01Service } from '../../../../api/api-campanha-el01.service';
import { ApiTipoCampanhaService } from '../../../../api/api-tipo-campanha.service';
import { ApiTipoIntegraCampService } from '../../../../api/api-tipo-integra-camp.service';
import { ModelCampanhaEL01 } from '../../../../models/model-campanha-EL01';
import { Location } from "@angular/common";
import { ApiSelectComponent } from '../../../../../../componentes/api-select/api-select.component';
@Component({
  selector: 'app-crude-campanha-detalhe',
  templateUrl: './crude-campanha-detalhe.component.html',
  styleUrls: ['./crude-campanha-detalhe.component.scss']
})
export class CrudeCampanhaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  @ViewChild('origemVenda', { static: true }) origemVenda: ApiSelectComponent;
  @ViewChild('destinoVenda', { static: true }) destinoVenda: ApiSelectComponent;
  @ViewChild('informaPremio', { static: true }) informaPremio: ApiSelectComponent;
  public meuForm: FormGroup;
  public modelCampanhaEL01: ModelCampanhaEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiCampanhaEL01Service: ApiCampanhaEL01Service,
    public apiTipoCampanhaService: ApiTipoCampanhaService,
    public apiTipoIntegraCampOrigemService: ApiTipoIntegraCampService,
    public apiTipoIntegraCampDestinoService: ApiTipoIntegraCampService,
    public apiTipoIntegraCampPremioService: ApiTipoIntegraCampService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelCampanhaEL01 = new ModelCampanhaEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  IsSorteioIntantanio() {
    return this.meuForm.get('inCodTipoCampanha').value == 2
  }
  
  IsVendasAcumuladas() {
    return this.meuForm.get('inCodTipoCampanha').value == 1
  }

  mudancaCampanha(dado: any) {
    if (dado == 2) {
      this.meuForm.get('lgIdentifClienteVenda').setValue(true);
      this.meuForm.get('lgIdentifClienteVenda').disable();
    } else {
      this.meuForm.get('lgIdentifClienteVenda').setValue(null);
      this.meuForm.get('lgIdentifClienteVenda').enable();
    }
  }

  destivarLg() {
    return this.meuForm.get("inCodTipoCampanha").value == 2;
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getCampanha();
  }

  private configurarStatusForm() {
    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('chCodCampanha').disable();
      this.meuForm.get('inCodTipoCampanha').disable();
      this.meuForm.get('inCodOrigemVenda').disable();
      this.meuForm.get('inCodDestinoVenda').disable();
      this.meuForm.get('inCodInformaPremio').disable();
    }
    this.meuForm.controls['IDCampanha'].disable();
  }

  private criarForm(emEdicao: boolean) {
    if (this.modelCampanhaEL01.dtDatFim) {
      this.modelCampanhaEL01.dtDatFim = new Date(this.modelCampanhaEL01.dtDatFim);
    }

    if (this.modelCampanhaEL01.dtDatInicio) {
      this.modelCampanhaEL01.dtDatInicio = new Date(this.modelCampanhaEL01.dtDatInicio);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCampanhaEL01, emEdicao);
      if (this.modelCampanhaEL01.inCodSituacaoCamp) {
        if (this.modelCampanhaEL01.inCodSituacaoCamp != 1) {
          this.cadastroBarraAcao.setModoConsulta();
        }
      }
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({
        //Dados essenciais
        IDCampanha: [this.modelCampanhaEL01.IDCampanha],
        chCodCampanha: [this.modelCampanhaEL01.chCodCampanha, Validators.required],
        inCodTipoCampanha: [this.modelCampanhaEL01.inCodTipoCampanha, Validators.required],
        inCodOrigemVenda: [this.modelCampanhaEL01.inCodOrigemVenda],
        inCodDestinoVenda: [this.modelCampanhaEL01.inCodDestinoVenda],
        inCodInformaPremio: [this.modelCampanhaEL01.inCodInformaPremio],
        chDesSituacaoCamp: [this.modelCampanhaEL01.chDesSituacaoCamp],
        dtDatInicio: [this.modelCampanhaEL01.dtDatInicio, Validators.required],
        dtDatFim: [this.modelCampanhaEL01.dtDatFim, Validators.required],
        chDescricao: [this.modelCampanhaEL01.chDescricao, Validators.required],
        lgIdentifClienteVenda: [this.modelCampanhaEL01.lgIdentifClienteVenda],
      });
    }
  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCampanhaEL01);
  }

  private getCampanha() {
    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelCampanhaEL01 = new ModelCampanhaEL01();
      this.modelCampanhaEL01.IDCampanha = 0;
      this.modelCampanhaEL01.inCodDestinoVenda = null;
      this.modelCampanhaEL01.inCodInformaPremio = null;
      this.modelCampanhaEL01.inCodOrigemVenda = null;
      this.modelCampanhaEL01.inCodTipoCampanha = null;

      this.modelCampanhaEL01.chCodCampanha = '';
      this.modelCampanhaEL01.chDescricao = '';
      this.modelCampanhaEL01.chDesSituacaoCamp = '';

      this.modelCampanhaEL01.dtDatFim = null;
      this.modelCampanhaEL01.dtDatInicio = null;
      this.modelCampanhaEL01.lgIdentifClienteVenda = null;

      this.operacao = 'inclusao';
      this.criarForm(true);
    } else {
      this.cadastroBarraAcao.exibirAguarde();
      this.apiCampanhaEL01Service.obter(id).then(
        dados_API => {
          this.modelCampanhaEL01 = dados_API;
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

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getCampanha();
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
    this.apiCampanhaEL01Service.excluir(this.modelCampanhaEL01.IDCampanha).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiCampanhaEL01Service.alterar(this.modelCampanhaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCampanhaEL01 = sucesso;
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
    this.apiCampanhaEL01Service.criar(this.modelCampanhaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCampanhaEL01 = sucesso;
        this.criarForm(false);
        this.operacao = 'edicao';
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('chCodCampanha').disable();
        this.meuForm.get('inCodTipoCampanha').disable();
        this.meuForm.get('inCodOrigemVenda').disable();
        this.meuForm.get('inCodDestinoVenda').disable();
        this.meuForm.get('inCodInformaPremio').disable();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }
}
