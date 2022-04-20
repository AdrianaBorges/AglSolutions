import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModelCondPagtoVenda } from '../../../../models/model-cond-pagto-venda';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiCondPagtoVendaService } from '../../../../api/api-cond-pagto-venda.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-crude-cond-pagto-venda-detalhe',
  templateUrl: './crude-cond-pagto-venda-detalhe.component.html',
  styleUrls: ['./crude-cond-pagto-venda-detalhe.component.scss']
})
export class CrudeCondPagtoVendaDetalheComponent implements OnInit {



  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelCondPagtoVenda: ModelCondPagtoVenda;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiCondPagtoVendaService: ApiCondPagtoVendaService,
    private _location: Location
  ) {
    this.modelCondPagtoVenda = new ModelCondPagtoVenda();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getCondPagtoVenda();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.meuForm.get('chCodCondPagtoVenda').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCondPagtoVenda, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        chCodCondPagtoVenda: [this.modelCondPagtoVenda.chCodCondPagtoVenda, Validators.required],
        chDescricao: [this.modelCondPagtoVenda.chDescricao, Validators.required],
        chCondicao: [this.modelCondPagtoVenda.chCondicao, Validators.required]
      });

    }
  }

  private getCondPagtoVenda() {

    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.modelCondPagtoVenda = new ModelCondPagtoVenda();
      this.modelCondPagtoVenda.chCodCondPagtoVenda = "";
      this.modelCondPagtoVenda.chDescricao = "";
      this.modelCondPagtoVenda.chCondicao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiCondPagtoVendaService.obter(id).then(
        dados_API => {

          this.modelCondPagtoVenda = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCondPagtoVenda);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getCondPagtoVenda();
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
    this.apiCondPagtoVendaService.excluir(this.modelCondPagtoVenda.chCodCondPagtoVenda).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiCondPagtoVendaService.alterar(this.modelCondPagtoVenda).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCondPagtoVenda = sucesso;
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
    this.apiCondPagtoVendaService.criar(this.modelCondPagtoVenda).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCondPagtoVenda = sucesso;
        this.meuForm.controls['chCodCondPagtoVenda'].disable();
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


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 47) {
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
    }
    return true;

  }


}
