import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSequencia } from '../../../../models/model-sequencia';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSequeciaService } from '../../../../api/api-sequecia.service';
import { ApiSequeciaValorService } from '../../../../api/api-sequecia-valor.service';


@Component({
  selector: 'app-crude-sequencia-detalhe',
  templateUrl: './crude-sequencia-detalhe.component.html',
  styleUrls: ['./crude-sequencia-detalhe.component.scss']
})
export class CrudeSequenciaDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  //@ViewChild('breadcrumb_traducao') breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSequencia: ModelSequencia;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSequenciaService: ApiSequeciaService,
    public apiSequenciaValorService: ApiSequeciaValorService,
    private _location: Location,
  ) {
    this.modelSequencia = new ModelSequencia();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    //this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getSequencia();

  }
  /*
    private criarBreadCrumbs(){
      this.cabecalhoBreadcrumbService.setBreadcrumbs([
        {
          texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
          url: '/modulos'
        },
        {
          texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Sequencia',
          url: '/modulos/corp/sequencia'
        },
        {
          texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
          url: null
        }
      ]);
    }
  */
  private configurarStatusForm() {

    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.meuForm.get('chCodSequencia').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSequencia, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        chCodSequencia: [this.modelSequencia.chCodSequencia, Validators.required],
        chDescricao: [this.modelSequencia.chDescricao, Validators.required]
      });
    }

  }

  private getSequencia() {

    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.modelSequencia = new ModelSequencia();
      this.modelSequencia.chCodSequencia = "";
      this.modelSequencia.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      //informo ao serviço dos dados filhos o ID do pai
      this.apiSequenciaValorService.setChCodSequencia(id);
      this.apiSequenciaService.obter(id).then(
        dados_API => {
          this.modelSequencia = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSequencia);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getSequencia();
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
    this.apiSequenciaService.excluir(this.modelSequencia.chCodSequencia).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSequenciaService.alterar(this.modelSequencia).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSequencia = sucesso;
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
    this.apiSequenciaService.criar(this.modelSequencia).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSequencia = sucesso;
        this.meuForm.controls['chCodSequencia'].disable();
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
