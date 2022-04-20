import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelUsuariosGrupo } from '../../../../models/model-usuarios-grupo';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { ApiGrupoUsuarioService } from '../../../../api/api-grupo-usuario.service';
import { ApiGruposDoUsuarioService } from '../../../../api/api-grupos-do-usuario.service';

@Component({
  selector: 'app-crude-grupos-do-usuario-detalhe',
  templateUrl: './crude-grupos-do-usuario-detalhe.component.html',
  styleUrls: ['./crude-grupos-do-usuario-detalhe.component.scss']
})
export class CrudeGruposDoUsuarioDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public meuForm: FormGroup;
  public modelUsuariosGrupo: ModelUsuariosGrupo;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: string;
  private grupo: string = ";"

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiUsuariosGrupoService: ApiGruposDoUsuarioService,
    public apiGrupoUsuarioService: ApiGrupoUsuarioService,
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
  public gridInterfaceTabCadastroFilho_setIdCadastro(id: string): void {
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
      this.meuForm.get('chCodGrupoUsuario').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelUsuariosGrupo, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDUsuariosGrupo: new FormControl(this.modelUsuariosGrupo.IDUsuariosGrupo),
        chCodGrupoUsuario: new FormControl(this.modelUsuariosGrupo.chCodGrupoUsuario)
      });
    }


  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = +this.idCadastro;

    if (id == 0) {
      this.modelUsuariosGrupo = new ModelUsuariosGrupo();
      this.modelUsuariosGrupo.chCodGrupoUsuario = "";
      // this.modelUsuariosGrupo.dtDatInclusao = null;
      // this.modelUsuariosGrupo.dtDatUltAlteracao = null;
      this.modelUsuariosGrupo.IDUsuariosGrupo = id;


      //pega da URL o id da pessoa
      this.modelUsuariosGrupo.chCodUsuario = this.route.snapshot.paramMap.get('id');

      if (this.modelUsuariosGrupo.chCodUsuario == "0" || this.modelUsuariosGrupo.chCodUsuario == "") {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelUsuariosGrupo.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelUsuariosGrupo.chCodUsuario = this.apiUsuariosGrupoService.getCodUsuario()
      }
      if (this.modelUsuariosGrupo.chCodUsuario == "" || this.modelUsuariosGrupo.chCodUsuario == undefined || this.modelUsuariosGrupo.chCodUsuario == "0") {
        console.error('Não foi encontrado o codigo do usuario');
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelUsuariosGrupo);
    this.modelUsuariosGrupo.chCodGrupoUsuario = this.grupo;
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
        this.meuForm.get('chCodGrupoUsuario').disable();
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

  valorAlteradoGrupoUsuario(id: string) {
    console.log('Valor alterado = ', id);
    this.grupo = id;
  }

}
