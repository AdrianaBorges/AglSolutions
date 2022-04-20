import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelTipoUsuario } from '../../../../models/model-tipo-usuario';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoUsuarioService } from '../../../../api/api-tipo-usuario.service';

@Component({
  selector: 'app-crude-tipo-usuario-detalhe',
  templateUrl: './crude-tipo-usuario-detalhe.component.html',
  styleUrls: ['./crude-tipo-usuario-detalhe.component.scss']
})
export class CrudeTipoUsuarioDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoUsuario: ModelTipoUsuario;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoUsuarioService: ApiTipoUsuarioService,
    private _location: Location,
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelTipoUsuario = new ModelTipoUsuario();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getTipoUsuario();
  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'tipo-usuario',
        url: '/modulos/segur/tipo-usuario'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private configurarStatusForm() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');


    if (id > 0) {
      this.meuForm.get('inCodTipoUsuario').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoUsuario, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoUsuario: new FormControl(this.modelTipoUsuario.inCodTipoUsuario, [Validators.required, Validators.maxLength(9)]),
        chDesTipoUsuario: new FormControl(this.modelTipoUsuario.chDesTipoUsuario, [Validators.required, Validators.maxLength(20)])
      });
    }

  }

  private getTipoUsuario() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id <= 0) {
      this.modelTipoUsuario = new ModelTipoUsuario();
      this.modelTipoUsuario.inCodTipoUsuario = null;
      this.modelTipoUsuario.chDesTipoUsuario = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiTipoUsuarioService.obter(id).then(
        dados_API => {
          this.modelTipoUsuario = dados_API;

          //console.log(this.modelTipoUsuario);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoUsuario);
    //console.log('this.modelTipoUsuario = ', this.modelTipoUsuario);
    //this.pessoaSexo.inCodSexo = this.meuForm.controls['inCodSexo'].value;
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTipoUsuario();
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
    this.apiTipoUsuarioService.excluir(this.modelTipoUsuario.inCodTipoUsuario).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoUsuarioService.alterar(this.modelTipoUsuario).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoUsuario = sucesso;
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
    this.apiTipoUsuarioService.criar(this.modelTipoUsuario).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoUsuario = sucesso;
        this.meuForm.controls['inCodTipoUsuario'].disable();
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
