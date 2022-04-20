import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

//Componentes
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';

//model
import { ModelCidade } from '../../../../models/model-cidade';

//APIs
import { ApiUfService } from '../../../../api/api-uf.service';
import { ApiCidadeService } from '../../../../api/api-cidade.service';
import { ApiPaisService } from '../../../../api/api-pais.service';
import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';

@Component({
  selector: 'app-crude-cidade-detalhe',
  templateUrl: './crude-cidade-detalhe.component.html',
  styleUrls: ['./crude-cidade-detalhe.component.scss']
})
export class CrudeCidadeDetalheComponent implements OnInit {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public modelCidade: ModelCidade;
  public apiErrorCollection: ApiErrorCollection;
  public meuForm: FormGroup;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiUFService: ApiUfService,
    public apiPaisService: ApiPaisService,
    public apiCidadeService: ApiCidadeService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelCidade = new ModelCidade();
    this.apiErrorCollection = new ApiErrorCollection();
  }


  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
    this.apiPaisService.mudarOrdenacao("chNomeAbreviado", "asc");
    this.apiUFService.mudarOrdenacao("chNome", "asc");
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getUF();

  }

  private criarBreadCrumbs() {
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Pais',
        url: '/modulos/corp/cidade'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');
    this.meuForm.get('IDCidade').disable();

    if (id > 0) {
      this.meuForm.get('IDPais').disable();
      this.meuForm.get('IDUF').disable();
      this.meuForm.get('chNome').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCidade, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        IDPais: [this.modelCidade.IDPais, Validators.required],
        IDUF: [this.modelCidade.IDUF, Validators.required],
        IDCidade: [this.modelCidade.IDCidade],
        chNomeAbreviado: [this.modelCidade.chNomeAbreviado],
        chNome: [this.modelCidade.chNome, Validators.required],
        chCodIBGE: [this.modelCidade.chCodIBGE],
        chCEPUnico: [this.modelCidade.chCEPUnico]
      });
    }

  }

  private getUF() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelCidade.IDPais = null;
      this.modelCidade.IDUF = null;
      this.modelCidade.IDCidade = null;
      this.modelCidade.chCodIBGE = "";
      this.modelCidade.chCodPais = "";
      this.modelCidade.chNome = "";
      this.modelCidade.chNomeAbreviado = "";
      this.modelCidade.chNomeAbreviadoPais = "";
      this.modelCidade.chNomePais = "";
      this.modelCidade.chSiglaUF = "";
      this.modelCidade.chCEPUnico = "";
      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiCidadeService.obter(id).then(
        dados_API => {
          this.modelCidade = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCidade);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getUF();
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
    this.apiCidadeService.excluir(this.modelCidade.IDCidade).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiCidadeService.alterar(this.modelCidade).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCidade = sucesso;
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
    this.apiCidadeService.criar(this.modelCidade).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCidade = sucesso;
        this.meuForm.controls['IDPais'].disable();
        this.meuForm.controls['IDCidade'].disable();
        this.meuForm.controls['IDUF'].disable();
        this.meuForm.controls['chNome'].disable();

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
