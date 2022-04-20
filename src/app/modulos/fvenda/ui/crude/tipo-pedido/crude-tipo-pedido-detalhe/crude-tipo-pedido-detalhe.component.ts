import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiTipoPedidoEl01Service } from '../../../../api/api-tipo-pedido-el01.service';
import { ModelTipoPedidoEL01 } from '../../../../models/model-tipo-pedido-EL01';
import { Location } from "@angular/common";

@Component({
  selector: 'app-crude-tipo-pedido-detalhe',
  templateUrl: './crude-tipo-pedido-detalhe.component.html',
  styleUrls: ['./crude-tipo-pedido-detalhe.component.scss']
})
export class CrudeTipoPedidoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoPedidoEL01: ModelTipoPedidoEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';


  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiTipoPedidoEl01Service: ApiTipoPedidoEl01Service,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelTipoPedidoEL01 = new ModelTipoPedidoEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoPedido();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('chCodTipoPedido').disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoPedidoEL01, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDTipoPedido: [{ value: this.modelTipoPedidoEL01.IDTipoPedido, disabled: true}],
        chCodTipoPedido: [this.modelTipoPedidoEL01.chCodTipoPedido, Validators.required],
        chDescricao: [this.modelTipoPedidoEL01.chDescricao, Validators.required],
        lgConsideraVenda: [this.modelTipoPedidoEL01.lgConsideraVenda],
        chDesSituacaoCad: [{value: this.modelTipoPedidoEL01.chDesSituacaoCad, disabled: true}]
      });
    }

  }

  private getTipoPedido() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      this.modelTipoPedidoEL01 = new ModelTipoPedidoEL01();
      this.modelTipoPedidoEL01.IDTipoPedido = null;
      this.modelTipoPedidoEL01.chCodTipoPedido = '';
      this.modelTipoPedidoEL01.chDescricao = '';
      this.modelTipoPedidoEL01.lgConsideraVenda = false;
      this.modelTipoPedidoEL01.chDesSituacaoCad = '';

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiTipoPedidoEl01Service.obter(id).then(
        dados_API => {
          this.modelTipoPedidoEL01 = dados_API;

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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoPedidoEL01);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoPedido();
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
    this.apiTipoPedidoEl01Service.excluir(this.modelTipoPedidoEL01.IDTipoPedido).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoPedidoEl01Service.alterar(this.modelTipoPedidoEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoPedidoEL01 = sucesso;
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
    this.apiTipoPedidoEl01Service.criar(this.modelTipoPedidoEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoPedidoEL01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('chCodTipoPedido').disable();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

}
