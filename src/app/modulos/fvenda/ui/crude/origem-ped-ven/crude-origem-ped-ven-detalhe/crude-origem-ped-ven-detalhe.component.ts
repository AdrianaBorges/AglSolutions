import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiOrigemPedVenService } from '../../../../api/api-origem-ped-ven.service';
import { ModelOrigemPedVen } from '../../../../models/model-origem-ped-ven';
import { Location } from "@angular/common";
@Component({
  selector: 'app-crude-origem-ped-ven-detalhe',
  templateUrl: './crude-origem-ped-ven-detalhe.component.html',
  styleUrls: ['./crude-origem-ped-ven-detalhe.component.scss']
})
export class CrudeOrigemPedVenDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelOrigemPedVen: ModelOrigemPedVen;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiOrigemPedVenService: ApiOrigemPedVenService,
    private _location: Location
  ) {
    this.modelOrigemPedVen = new ModelOrigemPedVen();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getOrigemPedidoVenda();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodOrigemPedVen').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelOrigemPedVen, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodOrigemPedVen: [this.modelOrigemPedVen.inCodOrigemPedVen, Validators.required],
        chDescricao: [this.modelOrigemPedVen.chDescricao, Validators.required]
      });

    }
  }

  private getOrigemPedidoVenda() {
    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelOrigemPedVen = new ModelOrigemPedVen();
      this.modelOrigemPedVen.inCodOrigemPedVen = null;
      this.modelOrigemPedVen.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiOrigemPedVenService.obter(id).then(
        dados_API => {

          this.modelOrigemPedVen = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelOrigemPedVen);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getOrigemPedidoVenda();
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
    this.apiOrigemPedVenService.excluir(this.modelOrigemPedVen.inCodOrigemPedVen).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiOrigemPedVenService.alterar(this.modelOrigemPedVen).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelOrigemPedVen = sucesso;
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
    this.apiOrigemPedVenService.criar(this.modelOrigemPedVen).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelOrigemPedVen = sucesso;
        this.meuForm.controls['inCodOrigemPedVen'].disable();
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
