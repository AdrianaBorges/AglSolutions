import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelCondPagto } from '../../../../models/model-cond-pagto';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiCondPagtoService } from '../../../../api/api-cond-pagto.service';

@Component({
  selector: 'app-crude-cond-pagto-detalhe',
  templateUrl: './crude-cond-pagto-detalhe.component.html',
  styleUrls: ['./crude-cond-pagto-detalhe.component.scss']
})
export class CrudeCondPagtoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelCondPagto: ModelCondPagto;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';


  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiCondPagtoService: ApiCondPagtoService,
    private _location: Location,
  ) {
    this.modelCondPagto = new ModelCondPagto();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    
    this.criarForm(true);
    this.configurarStatusForm();
    this.getCondPagto();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'cond-pagto',
        url: '/modulos/finan/cond-pagto'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }
      
  private configurarStatusForm() {

    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.meuForm.get('chCodCondPagto').disable();
    }

  }
      
  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCondPagto, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        chCodCondPagto: new FormControl(this.modelCondPagto.chCodCondPagto, [Validators.required, Validators.maxLength(20)]),
        chDescricao: new FormControl(this.modelCondPagto.chDescricao, [Validators.required, Validators.maxLength(50)]),
        chCondicao: new FormControl(this.modelCondPagto.chCondicao, [Validators.required, Validators.maxLength(50)])
      });
    }

  }

  private getCondPagto() {

    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.modelCondPagto = new ModelCondPagto();
      this.modelCondPagto.chCodCondPagto = "";
      this.modelCondPagto.chDescricao = "";
      this.modelCondPagto.chCondicao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiCondPagtoService.pesquisarPorId(id).then(
        dados_API => {
          this.modelCondPagto = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCondPagto);
  }
      
  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getCondPagto();
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
    this.apiCondPagtoService.excluir(this.modelCondPagto.chCodCondPagto).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }
      
  alterar() {
    this.apiCondPagtoService.alterar(this.modelCondPagto).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCondPagto = sucesso;
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
    this.apiCondPagtoService.criar(this.modelCondPagto).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCondPagto = sucesso;
        this.meuForm.controls['chCodCondPagto'].disable();
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

  inputCondicaoKeyup(event: any){
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.keyCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
    
  }
}
