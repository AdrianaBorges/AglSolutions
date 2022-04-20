import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoPerContrib } from '../../../../models/model-tipo-per-contrib';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoPerContribService } from '../../../../api/api-tipo-per-contrib.service';

@Component({
  selector: 'app-crude-tipo-per-contrib-detalhe',
  templateUrl: './crude-tipo-per-contrib-detalhe.component.html',
  styleUrls: ['./crude-tipo-per-contrib-detalhe.component.scss']
})
export class CrudeTipoPerContribDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelTipoPerContrib: ModelTipoPerContrib;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(

    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoPerContribService: ApiTipoPerContribService,
    private _location: Location,
  ) { 
    this.modelTipoPerContrib = new ModelTipoPerContrib();
    this.apiErrorCollection = new ApiErrorCollection();    
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }
  
  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoPerContrib();

  }
  
  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-per-contrib',
        url: '/modulos/eseg/tipo-per-contrib'
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
      this.meuForm.get('inCodTipoPerContrib').disable();
    }

  }
    
  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoPerContrib, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoPerContrib: new FormControl(this.modelTipoPerContrib.inCodTipoPerContrib, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelTipoPerContrib.chDescricao, [Validators.required, Validators.maxLength(50)]),
        inNumSomaMes: new FormControl(this.modelTipoPerContrib.inNumSomaMes, [Validators.maxLength(4)])
      });
    }

  }
    
  private getTipoPerContrib() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id <=0) {
      this.modelTipoPerContrib = new ModelTipoPerContrib();
      this.modelTipoPerContrib.inCodTipoPerContrib = null;
      this.modelTipoPerContrib.chDescricao = "";
      this.modelTipoPerContrib.inNumSomaMes = null;
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiTipoPerContribService.obter(id).then(
        dados_API => {
          this.modelTipoPerContrib = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoPerContrib);
  }
    
  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoPerContrib();
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
    this.apiTipoPerContribService.excluir(this.modelTipoPerContrib.inCodTipoPerContrib).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }
    
  alterar() {
    this.apiTipoPerContribService.alterar(this.modelTipoPerContrib).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoPerContrib = sucesso;
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
    this.apiTipoPerContribService.criar(this.modelTipoPerContrib).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoPerContrib = sucesso;
        this.meuForm.get('inCodTipoPerContrib').disable();
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
