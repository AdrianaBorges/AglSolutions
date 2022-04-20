import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoMatriculaCob } from '../../../../models/model-tipo-matricula-cob';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoMatriculaCobService } from '../../../../api/api-tipo-matricula-cob.service';

@Component({
  selector: 'app-crude-tipo-matricula-cob-detalhe',
  templateUrl: './crude-tipo-matricula-cob-detalhe.component.html',
  styleUrls: ['./crude-tipo-matricula-cob-detalhe.component.scss']
})
export class CrudeTipoMatriculaCobDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public meuForm: FormGroup;
  public modelTipoMatriculaCob: ModelTipoMatriculaCob;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoMatriculaCobService: ApiTipoMatriculaCobService,
    private _location: Location,
  ) {
    this.modelTipoMatriculaCob = new ModelTipoMatriculaCob();
    this.apiErrorCollection = new ApiErrorCollection();
  }
  
  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoMatriculaCob();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-matricula-cob',
        url: '/modulos/finan/tipo-matricula-cob'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }
  
  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodTipoMatriculaCob').disable();
    }

  }
  
  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoMatriculaCob, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoMatriculaCob: new FormControl(this.modelTipoMatriculaCob.inCodTipoMatriculaCob, [Validators.required, Validators.maxLength(9)]),
        chDescricao: new FormControl(this.modelTipoMatriculaCob.chDescricao, [Validators.required, Validators.maxLength(50)])
      });
    }

  }
  
  private getTipoMatriculaCob() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelTipoMatriculaCob = new ModelTipoMatriculaCob();
      this.modelTipoMatriculaCob.inCodTipoMatriculaCob = null;
      this.modelTipoMatriculaCob.chDescricao = "";

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {

      this.apiTipoMatriculaCobService.pesquisarPorId(id).then(
        dados_API => {
          this.modelTipoMatriculaCob = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoMatriculaCob);
    //console.log('this.modelTipoMatriculaCob = ', this.modelTipoMatriculaCob);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoMatriculaCob();
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
    this.apiTipoMatriculaCobService.excluir(this.modelTipoMatriculaCob.inCodTipoMatriculaCob).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoMatriculaCobService.alterar(this.modelTipoMatriculaCob).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoMatriculaCob = sucesso;
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
    this.apiTipoMatriculaCobService.criar(this.modelTipoMatriculaCob).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoMatriculaCob = sucesso;
        this.meuForm.controls['inCodTipoMatriculaCob'].disable();
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
