import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModelGrupoUsuario } from '../../../../models/model-grupo-usuario';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiGrupoUsuarioService } from '../../../../api/api-grupo-usuario.service';
import { Location } from '@angular/common';
import { ApiUsuariosDoGrupoService } from '../../../../api/api-usuarios-do-grupo.service';

@Component({
  selector: 'app-crude-grupo-de-usuario-detalhe',
  templateUrl: './crude-grupo-de-usuario-detalhe.component.html',
  styleUrls: ['./crude-grupo-de-usuario-detalhe.component.scss']
})
export class CrudeGrupoDeUsuarioDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public meuForm: FormGroup;
  public modelGrupoUsuario: ModelGrupoUsuario;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiGrupoUsuarioService: ApiGrupoUsuarioService,
    public apiUsuariosGrupoService: ApiUsuariosDoGrupoService,
    private _location: Location,
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelGrupoUsuario = new ModelGrupoUsuario();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getGrupoUsuario();
  }

  private configurarStatusForm() {

    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.meuForm.get('chCodGrupoUsuario').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelGrupoUsuario, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        chCodGrupoUsuario: new FormControl(this.modelGrupoUsuario.chCodGrupoUsuario, [Validators.required, Validators.maxLength(20)]),
        chDesGrupoUsuario: new FormControl(this.modelGrupoUsuario.chDesGrupoUsuario, [Validators.required, Validators.maxLength(50)]),
        chDesObservacao: new FormControl(this.modelGrupoUsuario.chDesObservacao, [])
      });
    }

  }

  private getGrupoUsuario() {

    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.modelGrupoUsuario = new ModelGrupoUsuario();
      this.modelGrupoUsuario.chCodGrupoUsuario = "";
      this.modelGrupoUsuario.chDesGrupoUsuario = "";
      this.modelGrupoUsuario.chDesObservacao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {

      this.apiGrupoUsuarioService.obter(id).then(
        dados_API => {
          this.modelGrupoUsuario = dados_API;
          this.apiUsuariosGrupoService.setCodGrupoUsuario(this.modelGrupoUsuario.chCodGrupoUsuario);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelGrupoUsuario);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getGrupoUsuario();
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
    this.apiGrupoUsuarioService.excluir(this.modelGrupoUsuario.chCodGrupoUsuario).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiGrupoUsuarioService.alterar(this.modelGrupoUsuario).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrupoUsuario = sucesso;
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
    this.apiGrupoUsuarioService.criar(this.modelGrupoUsuario).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrupoUsuario = sucesso;
        this.meuForm.controls['chCodGrupoUsuario'].disable();
        this.apiUsuariosGrupoService.setCodGrupoUsuario(this.modelGrupoUsuario.chCodGrupoUsuario);
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
