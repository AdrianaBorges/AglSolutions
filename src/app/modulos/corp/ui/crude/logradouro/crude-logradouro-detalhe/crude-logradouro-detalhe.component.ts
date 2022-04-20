import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

//Componentes
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';

//APIs
import { ApiUfService } from '../../../../api/api-uf.service';
import { ApiCidadeService } from '../../../../api/api-cidade.service';
import { ApiPaisService } from '../../../../api/api-pais.service';
import { ApiLogradouroService } from '../../../../api/api-logradouro.service';
import { ApiTipoLogradouroService } from '../../../../api/api-tipo-logradouro.service';
import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';
import { ModelLogradouro } from '../../../../models/model-logradouro';

@Component({
  selector: 'app-crude-logradouro-detalhe',
  templateUrl: './crude-logradouro-detalhe.component.html',
  styleUrls: ['./crude-logradouro-detalhe.component.scss']
})
export class CrudeLogradouroDetalheComponent implements OnInit {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public modelLogradouro: ModelLogradouro;
  public apiErrorCollection: ApiErrorCollection;
  public meuForm: FormGroup;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiUFService: ApiUfService,
    public apiPaisService: ApiPaisService,
    public apiCidadeService: ApiCidadeService,
    public apiLogradouroService: ApiLogradouroService,
    public apiTipoLogradouroService: ApiTipoLogradouroService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelLogradouro = new ModelLogradouro();
    this.apiErrorCollection = new ApiErrorCollection();
  }


  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
    this.apiPaisService.mudarOrdenacao("Pais.chNomeAbreviado", "asc");
    this.apiUFService.mudarOrdenacao("UF.chNome", "asc");
    this.apiTipoLogradouroService.mudarOrdenacao("chDescricao", "asc");
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getLogradouro();

  }

  private criarBreadCrumbs() {
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Pais',
        url: '/modulos/corp/logradouro'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');
    this.meuForm.get('IDLogradouro').disable();

    if (id > 0) {
      this.meuForm.get('IDPais').disable();
      this.meuForm.get('IDUF').disable();
      this.meuForm.get('IDCidade').disable();
      //this.meuForm.get('chNome').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelLogradouro, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        IDPais: [this.modelLogradouro.IDPais, Validators.required],
        IDUF: [this.modelLogradouro.IDUF, Validators.required],
        IDCidade: [this.modelLogradouro.IDCidade, Validators.required],
        IDLogradouro: [this.modelLogradouro.IDLogradouro],
        chNomeAbreviado: [this.modelLogradouro.chNomeAbreviado],
        chNome: [this.modelLogradouro.chNome, Validators.required],
        inCodTipoLogradouro: [this.modelLogradouro.inCodTipoLogradouro, Validators.required],
        chComplemento: [this.modelLogradouro.chComplemento],
        chBairro: [this.modelLogradouro.chBairro],
        chCEP: [this.modelLogradouro.chCEP]
      });
    }

  }

  private getLogradouro() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelLogradouro.IDPais = null;
      this.modelLogradouro.IDUF = null;
      this.modelLogradouro.IDCidade = null;
      this.modelLogradouro.IDLogradouro = null;
      this.modelLogradouro.chComplemento = "";
      this.modelLogradouro.chCodPais = "";
      this.modelLogradouro.chNome = "";
      this.modelLogradouro.chNomeAbreviado = "";
      this.modelLogradouro.chNomeAbreviadoPais = "";
      this.modelLogradouro.chNomePais = "";
      this.modelLogradouro.chSiglaUF = "";
      this.modelLogradouro.chCEP = "";
      this.modelLogradouro.chBairro = "";
      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiLogradouroService.obter(id).then(
        dados_API => {
          this.modelLogradouro = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelLogradouro);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getLogradouro();
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
    this.apiLogradouroService.excluir(this.modelLogradouro.IDLogradouro).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiLogradouroService.alterar(this.modelLogradouro).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelLogradouro = sucesso;
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
    this.apiLogradouroService.criar(this.modelLogradouro).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelLogradouro = sucesso;
        this.meuForm.controls['IDPais'].disable();
        this.meuForm.controls['IDCidade'].disable();
        this.meuForm.controls['IDUF'].disable();
        this.meuForm.controls['IDLogradouro'].disable();
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
