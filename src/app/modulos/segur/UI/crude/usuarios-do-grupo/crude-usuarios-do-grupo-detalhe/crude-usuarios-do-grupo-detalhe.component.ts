import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelUsuariosGrupo } from '../../../../models/model-usuarios-grupo';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';

import { ApiUsuariosEL01Service } from '../../../../api/api-usuarios-el01.service';
import { Location } from '@angular/common';
import { ApiUsuariosDoGrupoService } from '../../../../api/api-usuarios-do-grupo.service';

@Component({
  selector: 'app-crude-usuarios-do-grupo-detalhe',
  templateUrl: './crude-usuarios-do-grupo-detalhe.component.html',
  styleUrls: ['./crude-usuarios-do-grupo-detalhe.component.scss']
})
export class CrudeUsuariosDoGrupoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  private usuario = {
    chCodUsuario: null,
    chNomeUsuario: null
  };
  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelUsuariosGrupo: ModelUsuariosGrupo;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiUsuariosGrupoService: ApiUsuariosDoGrupoService,
    public apiUsuarioEl01Service: ApiUsuariosEL01Service,
    private _location: Location,
  ) {
    this.modelUsuariosGrupo = new ModelUsuariosGrupo();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    this.criarForm(true);
    //this.getDados();

  }

  /**
   * Deve ser chamada pelo evento do grid de pesquisa, 
   * seja para criar um novo registro ou para exibir 
   * para edição ou exclusão
   * @param id zero se for um novo cadastro e um valor 
   * se for para abrir para edição ou exclusão
   */
  public gridInterfaceTabCadastroFilho_setIdCadastro(id: number): void {
    this.idCadastro = id;
    this.getDados();
    //this.configurarStatusForm();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm() {
    //var id = +this.route.snapshot.paramMap.get('id');

    this.meuForm.controls['IDUsuariosGrupo'].disable();
    if (this.modelUsuariosGrupo.IDUsuariosGrupo > 0) {
      this.meuForm.get('UIData_Usuarios').disable();
    }
  }

  private criarForm(emEdicao: boolean) {


    this.usuario.chCodUsuario = this.modelUsuariosGrupo.chCodUsuario;
    this.usuario.chNomeUsuario = this.modelUsuariosGrupo.chNomeUsuario;

    var UIData_Usuarios = ((this.usuario.chCodUsuario != undefined) || (this.usuario.chCodUsuario != "") ? this.usuario : null);
    this.modelUsuariosGrupo['UIData_Usuarios'] = UIData_Usuarios;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelUsuariosGrupo, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDUsuariosGrupo: new FormControl(this.modelUsuariosGrupo.IDUsuariosGrupo),
        UIData_Usuarios: new FormControl(this.modelUsuariosGrupo['UIData_Usuarios'], [Validators.required])
      });
    }


  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelUsuariosGrupo = new ModelUsuariosGrupo();
      // this.modelUsuariosGrupo.daDatExpedicao = null;
      // this.modelUsuariosGrupo.dtDatInclusao = null;
      // this.modelUsuariosGrupo.dtDatUltAlteracao = null;
      this.modelUsuariosGrupo.IDUsuariosGrupo = id;
      this.modelUsuariosGrupo.IDUsuariosGrupo = undefined;
      this.usuario.chCodUsuario = undefined;
      this.usuario.chNomeUsuario = undefined;

      this.modelUsuariosGrupo['UIData_Usuarios'] = null;


      //pega da URL o id da pessoa
      this.modelUsuariosGrupo.chCodGrupoUsuario = this.route.snapshot.paramMap.get('id');

      if (this.modelUsuariosGrupo.chCodGrupoUsuario == "0" || this.modelUsuariosGrupo.chCodGrupoUsuario == "") {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelUsuariosGrupo.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelUsuariosGrupo.chCodGrupoUsuario = this.apiUsuariosGrupoService.getCodGrupoUsuario()
      }
      if (this.modelUsuariosGrupo.chCodGrupoUsuario == "" || this.modelUsuariosGrupo.chCodGrupoUsuario == undefined || this.modelUsuariosGrupo.chCodGrupoUsuario == "0") {
        console.error('Não foi encontrado o codigo do grupo');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiUsuariosGrupoService.obter(id).then(
        dados_API => {
          this.modelUsuariosGrupo = dados_API;
          this.operacao = 'edicao';
          this.criarForm(false);

          this.cadastroBarraAcao.esconderAguarde();
        },
        erro => {
          this.cadastroBarraAcao.esconderAguarde();
          this.apiErrorCollection = erro;
        }
      );
    }
  }

  private coletarDadosForm() {
    if (this.meuForm.value.UIData_Usuarios) {
      this.modelUsuariosGrupo.chCodUsuario = this.meuForm.value.UIData_Usuarios.chCodUsuario;
      this.modelUsuariosGrupo.chNomeUsuario = this.meuForm.value.UIData_Usuarios.chNomeUsuario;
    } else {
      this.modelUsuariosGrupo.chCodUsuario = '';
      this.modelUsuariosGrupo.chNomeUsuario = "";
    }
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelUsuariosGrupo);


  }

  btnCancelar() {
    this.getDados();
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
    this.apiUsuariosGrupoService.excluir(this.modelUsuariosGrupo.IDUsuariosGrupo).then(
      sucesso => {
        //this._location.back();
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiUsuariosGrupoService.alterar(this.modelUsuariosGrupo).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelUsuariosGrupo = sucesso;
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
    this.apiUsuariosGrupoService.criar(this.modelUsuariosGrupo).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelUsuariosGrupo = sucesso;
        this.meuForm.get('UIData_Usuarios').disable();
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
