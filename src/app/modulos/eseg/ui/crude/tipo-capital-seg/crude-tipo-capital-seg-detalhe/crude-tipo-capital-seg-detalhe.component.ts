import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoCapitalSeg } from '../../../../models/model-tipo-capital-seg';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoCapitalSegService } from '../../../../api/api-tipo-capital-seg.service';

@Component({
  selector: 'app-crude-tipo-capital-seg-detalhe',
  templateUrl: './crude-tipo-capital-seg-detalhe.component.html',
  styleUrls: ['./crude-tipo-capital-seg-detalhe.component.scss']
})
export class CrudeTipoCapitalSegDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelTipoCapitalSeg: ModelTipoCapitalSeg;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoCapitalSegService: ApiTipoCapitalSegService,
    private _location: Location,
  ) { 
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelTipoCapitalSeg = new ModelTipoCapitalSeg();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoCapitalSeg();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-capital-seg',
        url: '/modulos/eseg/tipo-capital-seg'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }
    
  private configurarStatusForm() {

    var id :number;
    id = +this.route.snapshot.paramMap.get('id');
    //console.log(id);
    if (id >0) {
      this.meuForm.get('inCodTipoCapitalSeg').disable();
    }

  }
    
  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoCapitalSeg, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoCapitalSeg: new FormControl(this.modelTipoCapitalSeg.inCodTipoCapitalSeg, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelTipoCapitalSeg.chDescricao, [Validators.required, Validators.maxLength(50)])          });
    }

  }
    
  private getTipoCapitalSeg() {

    var id = +this.route.snapshot.paramMap.get('id');
    
    if (id <=0) {
      this.modelTipoCapitalSeg = new ModelTipoCapitalSeg();
      this.modelTipoCapitalSeg.inCodTipoCapitalSeg = null;
      this.modelTipoCapitalSeg.chDescricao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiTipoCapitalSegService.obter(id).then(
        dados_API => {
          this.modelTipoCapitalSeg = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoCapitalSeg);
    //console.log('this.modelParamCorp = ', this.modelTipoCapitalSeg);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }
    
  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoCapitalSeg();
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
    this.apiTipoCapitalSegService.excluir(this.modelTipoCapitalSeg.inCodTipoCapitalSeg).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }
    
  alterar() {
    this.apiTipoCapitalSegService.alterar(this.modelTipoCapitalSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoCapitalSeg = sucesso;
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
    this.apiTipoCapitalSegService.criar(this.modelTipoCapitalSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoCapitalSeg = sucesso;
        this.meuForm.controls['inCodTipoCapitalSeg'].disable();
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
