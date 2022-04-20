import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiMotRejPedCompService } from '../../../../api/api-mot-rej-ped-comp.service';
import { ModelMotRejPedComp } from '../../../../models/model-mot-rej-ped-comp';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crude-mot-rej-ped-comp-detalhe',
  templateUrl: './crude-mot-rej-ped-comp-detalhe.component.html',
  styleUrls: ['./crude-mot-rej-ped-comp-detalhe.component.scss']
})
export class CrudeMotRejPedCompDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelMotRejPedComp: ModelMotRejPedComp;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiMotRejPedCompService: ApiMotRejPedCompService,
    private _location: Location
  ) {
    this.modelMotRejPedComp = new ModelMotRejPedComp();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getMotRejPedCompService();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodMotRejPedComp').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelMotRejPedComp, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodMotRejPedComp: [this.modelMotRejPedComp.inCodMotRejPedComp, Validators.required],
        chDescricao: [this.modelMotRejPedComp.chDescricao, Validators.required]
      });

    }
  }

  private getMotRejPedCompService() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelMotRejPedComp = new ModelMotRejPedComp();
      this.modelMotRejPedComp.inCodMotRejPedComp = null;
      this.modelMotRejPedComp.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiMotRejPedCompService.obter(id).then(
        dados_API => {

          this.modelMotRejPedComp = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelMotRejPedComp);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getMotRejPedCompService();
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
    this.apiMotRejPedCompService.excluir(this.modelMotRejPedComp.inCodMotRejPedComp).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiMotRejPedCompService.alterar(this.modelMotRejPedComp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelMotRejPedComp = sucesso;
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
    this.apiMotRejPedCompService.criar(this.modelMotRejPedComp).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelMotRejPedComp = sucesso;
        this.meuForm.controls['inCodMotRejPedComp'].disable();
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
