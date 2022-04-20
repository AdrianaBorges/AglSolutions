import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelCanalVenda } from '../../../../models/model-canal-venda';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiCanalVendaService } from '../../../../api/api-canal-venda.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-crude-canal-venda-detalhe',
  templateUrl: './crude-canal-venda-detalhe.component.html',
  styleUrls: ['./crude-canal-venda-detalhe.component.scss']
})
export class CrudeCanalVendaDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelCanalVenda: ModelCanalVenda;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiCanalVendaService: ApiCanalVendaService,
    private _location: Location
  ) {
    this.modelCanalVenda = new ModelCanalVenda();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getCanalVenda();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.meuForm.get('chCodCanalVenda').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCanalVenda, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        chCodCanalVenda: [this.modelCanalVenda.chCodCanalVenda, Validators.required],
        chDescricao: [this.modelCanalVenda.chDescricao, Validators.required]
      });

    }
  }

  private getCanalVenda() {

    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.modelCanalVenda = new ModelCanalVenda();
      this.modelCanalVenda.chCodCanalVenda = "";
      this.modelCanalVenda.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiCanalVendaService.obter(id).then(
        dados_API => {

          this.modelCanalVenda = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCanalVenda);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getCanalVenda();
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
    this.apiCanalVendaService.excluir(this.modelCanalVenda.chCodCanalVenda).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiCanalVendaService.alterar(this.modelCanalVenda).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCanalVenda = sucesso;
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
    this.apiCanalVendaService.criar(this.modelCanalVenda).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCanalVenda = sucesso;
        this.meuForm.controls['chCodCanalVenda'].disable();
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
