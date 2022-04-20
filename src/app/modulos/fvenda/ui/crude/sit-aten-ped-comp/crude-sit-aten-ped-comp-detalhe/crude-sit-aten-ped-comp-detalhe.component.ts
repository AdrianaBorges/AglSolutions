import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiSitAtenPedCompService } from '../../../../api/api-sit-aten-ped-comp.service';
import { ModelSitAtenPedComp } from '../../../../models/model-sit-aten-ped-comp';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crude-sit-aten-ped-comp-detalhe',
  templateUrl: './crude-sit-aten-ped-comp-detalhe.component.html',
  styleUrls: ['./crude-sit-aten-ped-comp-detalhe.component.scss']
})
export class CrudeSitAtenPedCompDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSitAtenPedComp: ModelSitAtenPedComp;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSitAtenPedCompService: ApiSitAtenPedCompService,
    private _location: Location
  ) {
    this.modelSitAtenPedComp = new ModelSitAtenPedComp();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSitAtenPedCompService();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodSitAtenPedComp').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSitAtenPedComp, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodSitAtenPedComp: [this.modelSitAtenPedComp.inCodSitAtenPedComp, Validators.required],
        chDescricao: [this.modelSitAtenPedComp.chDescricao, Validators.required]
      });

    }
  }

  private getSitAtenPedCompService() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSitAtenPedComp = new ModelSitAtenPedComp();
      this.modelSitAtenPedComp.inCodSitAtenPedComp = null;
      this.modelSitAtenPedComp.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiSitAtenPedCompService.obter(id).then(
        dados_API => {

          this.modelSitAtenPedComp = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSitAtenPedComp);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSitAtenPedCompService();
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
    this.apiSitAtenPedCompService.excluir(this.modelSitAtenPedComp.inCodSitAtenPedComp).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSitAtenPedCompService.alterar(this.modelSitAtenPedComp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSitAtenPedComp = sucesso;
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
    this.apiSitAtenPedCompService.criar(this.modelSitAtenPedComp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSitAtenPedComp = sucesso;
        this.meuForm.controls['inCodSitAtenPedComp'].disable();
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
