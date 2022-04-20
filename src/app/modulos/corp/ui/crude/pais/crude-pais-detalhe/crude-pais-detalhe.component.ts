import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelPais } from '../../../../models/model-pais';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPaisService } from '../../../../api/api-pais.service';

@Component({
  selector: 'app-crude-pais-detalhe',
  templateUrl: './crude-pais-detalhe.component.html',
  styleUrls: ['./crude-pais-detalhe.component.scss']
})
export class CrudePaisDetalheComponent implements OnInit {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelPais: ModelPais;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPaisService: ApiPaisService,
    private _location: Location,
  ) {
    this.modelPais = new ModelPais();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getPais();

  }

  private criarBreadCrumbs() {
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Pais',
        url: '/modulos/corp/pais'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');
    this.meuForm.get('IDPais').disable();
    if (id > 0) {
      this.meuForm.get('chCodPais').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPais, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        IDPais: [this.modelPais.IDPais],
        chCodPais: [this.modelPais.chCodPais, Validators.required],
        chNomeAbreviado: [this.modelPais.chNomeAbreviado, Validators.required],
        chNome: [this.modelPais.chNome, Validators.required],
        chCodSiscomex: [this.modelPais.chCodSiscomex],
        chCodIBGE: [this.modelPais.chCodIBGE],
        chDesNacionalidade: [this.modelPais.chDesNacionalidade]
      });
    }

  }

  private getPais() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelPais = new ModelPais();
      this.modelPais.IDPais = null;
      this.modelPais.chCodPais = "";
      this.modelPais.chCodSiscomex = "";
      this.modelPais.chDesNacionalidade = "";
      this.modelPais.chNomeAbreviado = "";
      this.modelPais.chCodIBGE = "";
      this.modelPais.chNome = "";
      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiPaisService.obter(id).then(
        dados_API => {
          this.modelPais = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPais);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getPais();
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
    this.apiPaisService.excluir(this.modelPais.IDPais).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiPaisService.alterar(this.modelPais).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPais = sucesso;
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
    this.apiPaisService.criar(this.modelPais).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPais = sucesso;
        this.meuForm.controls['IDPais'].disable();
        this.meuForm.controls['chCodPais'].disable();
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
