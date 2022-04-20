import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoTaxaSeg } from '../../../../models/model-tipo-taxa-seg';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoTaxaSegService } from '../../../../api/api-tipo-taxa-seg.service';

@Component({
  selector: 'app-crude-tipo-taxa-seg-detalhe',
  templateUrl: './crude-tipo-taxa-seg-detalhe.component.html',
  styleUrls: ['./crude-tipo-taxa-seg-detalhe.component.scss']
})
export class CrudeTipoTaxaSegDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelTipoTaxaSeg: ModelTipoTaxaSeg;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoTaxaSegService: ApiTipoTaxaSegService,
    private _location: Location,
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelTipoTaxaSeg = new ModelTipoTaxaSeg();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoTaxaSeg();
  }
  
  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-taxa-seg',
        url: '/modulos/eseg/tipo-taxa-seg'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');
    if (id >0 ) {
      this.meuForm.get('inCodTipoTaxaSeg').disable();
    }

  }
  
  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoTaxaSeg, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoTaxaSeg: new FormControl(this.modelTipoTaxaSeg.inCodTipoTaxaSeg, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelTipoTaxaSeg.chDescricao, [Validators.required, Validators.maxLength(50)])
      });
    }

  }
  
  private getTipoTaxaSeg() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id <=0) {
      this.modelTipoTaxaSeg = new ModelTipoTaxaSeg();
      this.modelTipoTaxaSeg.inCodTipoTaxaSeg = null;
      this.modelTipoTaxaSeg.chDescricao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiTipoTaxaSegService.obter(id).then(
        dados_API => {
          this.modelTipoTaxaSeg = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoTaxaSeg);
    //console.log('this.modelTipoTaxaSeg = ', this.modelTipoTaxaSeg);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }
  
  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoTaxaSeg();
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
    this.apiTipoTaxaSegService.excluir(this.modelTipoTaxaSeg.inCodTipoTaxaSeg).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }
  
  alterar() {
    this.apiTipoTaxaSegService.alterar(this.modelTipoTaxaSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoTaxaSeg = sucesso;
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
    this.apiTipoTaxaSegService.criar(this.modelTipoTaxaSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoTaxaSeg = sucesso;
        this.meuForm.controls['inCodTipoTaxaSeg'].disable();
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
