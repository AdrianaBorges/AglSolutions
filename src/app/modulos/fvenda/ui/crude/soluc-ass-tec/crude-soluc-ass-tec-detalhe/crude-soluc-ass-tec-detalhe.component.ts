import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiSolucAssTecService } from '../../../../api/api-soluc-ass-tec.service';
import { ModelSolucAssTec } from '../../../../models/model-soluc-ass-tec';
import { Location } from "@angular/common";

@Component({
  selector: 'app-crude-soluc-ass-tec-detalhe',
  templateUrl: './crude-soluc-ass-tec-detalhe.component.html',
  styleUrls: ['./crude-soluc-ass-tec-detalhe.component.scss']
})
export class CrudeSolucAssTecDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSolucAssTec: ModelSolucAssTec;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSolucAssTecService: ApiSolucAssTecService,
    private _location: Location
  ) {
    this.modelSolucAssTec = new ModelSolucAssTec();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getSolucAssTec();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodSolucAssTec').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSolucAssTec, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodSolucAssTec: [this.modelSolucAssTec.inCodSolucAssTec, Validators.required],
        chDescricao: [this.modelSolucAssTec.chDescricao, Validators.required]
      });

    }
  }

  private getSolucAssTec() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelSolucAssTec = new ModelSolucAssTec();
      this.modelSolucAssTec.inCodSolucAssTec = null;
      this.modelSolucAssTec.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiSolucAssTecService.obter(id).then(
        dados_API => {

          this.modelSolucAssTec = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSolucAssTec);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSolucAssTec();
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
    this.apiSolucAssTecService.excluir(this.modelSolucAssTec.inCodSolucAssTec).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSolucAssTecService.alterar(this.modelSolucAssTec).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSolucAssTec = sucesso;
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
    this.apiSolucAssTecService.criar(this.modelSolucAssTec).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSolucAssTec = sucesso;
        this.meuForm.controls['inCodSolucAssTec'].disable();
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
