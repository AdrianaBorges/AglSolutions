import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelGrupoCliente } from '../../../../models/model-grupo-cliente';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiGrupoClienteService } from '../../../../api/api-grupo-cliente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crude-grupo-cliente-detalhe',
  templateUrl: './crude-grupo-cliente-detalhe.component.html',
  styleUrls: ['./crude-grupo-cliente-detalhe.component.scss']
})
export class CrudeGrupoClienteDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelGrupoCliente: ModelGrupoCliente;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiGrupoClienteService: ApiGrupoClienteService,
    private formB: FormBuilder,    
    private _location: Location
  ) {
    this.modelGrupoCliente = new ModelGrupoCliente();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getGrupoCliente();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }  

  private configurarStatusForm() {

    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.meuForm.get('chCodGrupoCliente').disable();
    }
  }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.inicializarDados();    
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelGrupoCliente, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        chCodGrupoCliente: [this.modelGrupoCliente.chCodGrupoCliente, Validators.required],
        chDescricao: [this.modelGrupoCliente.chDescricao, Validators.required]
      });

    }
  }

  private getGrupoCliente() {

    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.modelGrupoCliente = new ModelGrupoCliente();
      this.modelGrupoCliente.chCodGrupoCliente = "";
      this.modelGrupoCliente.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiGrupoClienteService.obter(id).then(
        dados_API => {

          this.modelGrupoCliente = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelGrupoCliente);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getGrupoCliente();
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
    this.apiGrupoClienteService.excluir(this.modelGrupoCliente.chCodGrupoCliente).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiGrupoClienteService.alterar(this.modelGrupoCliente).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrupoCliente = sucesso;
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
    this.apiGrupoClienteService.criar(this.modelGrupoCliente).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrupoCliente = sucesso;
        this.meuForm.controls['chCodGrupoCliente'].disable();
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
