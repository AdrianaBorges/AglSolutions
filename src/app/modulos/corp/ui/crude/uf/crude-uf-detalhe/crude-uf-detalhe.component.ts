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
import { ModelUF } from '../../../../models/model-uf';

//APIs
import { ApiUfService } from '../../../../api/api-uf.service';
import { ApiPaisService } from '../../../../api/api-pais.service';
import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';

@Component({
  selector: 'app-crude-uf-detalhe',
  templateUrl: './crude-uf-detalhe.component.html',
  styleUrls: ['./crude-uf-detalhe.component.scss']
})
export class CrudeUfDetalheComponent implements OnInit {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public modelUf: ModelUF;
  public apiErrorCollection: ApiErrorCollection;
  public meuForm: FormGroup;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiUFService: ApiUfService,
    public apiPaisService: ApiPaisService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelUf = new ModelUF();
    this.apiErrorCollection = new ApiErrorCollection();
  }


  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
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
        url: '/modulos/corp/uf'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');
    this.meuForm.get('IDUF').disable()

    if (id > 0) {
      this.meuForm.get('IDPais').disable()
      this.meuForm.get('chSigla').disable()
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelUf, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        IDPais: [this.modelUf.IDPais, Validators.required],
        IDUF: [this.modelUf.IDUF],
        chSigla: [this.modelUf.chSigla, Validators.required],
        chNome: [this.modelUf.chNome, Validators.required],
        chCodIBGE: [this.modelUf.chCodIBGE]
      });
    }

  }

  private getUF() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelUf.IDPais = null;
      this.modelUf.IDUF = null;
      this.modelUf.chCodIBGE = "";
      this.modelUf.chCodPais = "";
      this.modelUf.chNome = "";
      this.modelUf.chNomeAbreviadoPais = "";
      this.modelUf.chNomePais = "";
      this.modelUf.chSigla = "";
      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiUFService.obter(id).then(
        dados_API => {
          this.modelUf = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelUf);
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
    this.apiUFService.excluir(this.modelUf.IDUF).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiUFService.alterar(this.modelUf).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelUf = sucesso;
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
    this.apiUFService.criar(this.modelUf).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelUf = sucesso;
        this.meuForm.controls['IDPais'].disable();
        this.meuForm.controls['chSigla'].disable();
        this.meuForm.controls['IDUF'].disable();
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
