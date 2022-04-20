import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSegurancaPrograma } from '../../../../models/model-seguranca-programa';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSegurancaProgramaService } from '../../../../api/api-seguranca-programa.service';
import { ApiGrupoUsuarioService } from '../../../../api/api-grupo-usuario.service';
import { ModelProgramaNivel } from '../../../../models/model-programa-nivel';
import { ApiProgramaNivelService } from '../../../../api/api-programa-nivel.service';
@Component({
  selector: 'app-crude-seguranca-programa-detalhe',
  templateUrl: './crude-seguranca-programa-detalhe.component.html',
  styleUrls: ['./crude-seguranca-programa-detalhe.component.scss']
})
export class CrudeSegurancaProgramaDetalheComponent implements OnInit {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelSegurancaPrograma: ModelSegurancaPrograma;
  public modelProgramaNivel: ModelProgramaNivel;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSegurancaProgramaService: ApiSegurancaProgramaService,
    public apiGrupoUsuarioService: ApiGrupoUsuarioService,
    public apiProgramaNivelService: ApiProgramaNivelService,
  ) {
    this.modelSegurancaPrograma = new ModelSegurancaPrograma();
    this.modelProgramaNivel = new ModelProgramaNivel();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }


  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('IDSegurancaPrograma');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private inicializarDados() {
    this.getDados();
    this.criarForm(true);
    this.criarBreadCrumbs();
    this.configurarStatusForm();
    //this.getDados();

    var id_programa: string;
    var id_nivel: string;
    id_programa = this.route.snapshot.paramMap.get('id');
    id_nivel = this.route.snapshot.paramMap.get('IDProgramaNivel');
    this.carregarDadosPai(id_nivel);

  }

  private carregarDadosPai(id: any) {
    this.apiProgramaNivelService.obter(id).then(
      programa => {
        this.modelProgramaNivel = programa;
      }
    );
  }

  /*
    private carregarDadosPai() {
      var id = this.route.snapshot.paramMap.get('id');
      this.apiProgramaService.obter(id).then(
        programa => {
          this.modelProgramaNivel = programa;
        }
      );
    }*/

  codigoGrupoAlterado(valor) {

    console.log(valor);
    this.modelSegurancaPrograma.chCodGrupoUsuario = valor;
    this.meuForm.get("chCodGrupoUsuario").setValue(valor);
    console.log(this.modelSegurancaPrograma.chCodGrupoUsuario);
    console.log(this.meuForm.get("chCodGrupoUsuario").value);


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

    this.meuForm.controls['IDSegurancaPrograma'].disable();
    if (this.modelSegurancaPrograma.IDSegurancaPrograma > 0) {
      this.meuForm.get('chCodGrupoUsuario').disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSegurancaPrograma, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDSegurancaPrograma: [this.modelSegurancaPrograma.IDSegurancaPrograma],
        chCodGrupoUsuario: [this.modelSegurancaPrograma.chCodGrupoUsuario, [Validators.required]]
      });
    }


  }

  private getDados() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('IDSegurancaPrograma');
    //id = this.idCadastro;

    if (id == 0) {
      this.modelSegurancaPrograma = new ModelSegurancaPrograma();

      this.modelSegurancaPrograma.IDSegurancaPrograma = id;
      this.modelSegurancaPrograma.chCodGrupoUsuario = "";
      this.modelSegurancaPrograma.IDProgramaNivel = +this.route.snapshot.paramMap.get('IDProgramaNivel');//this.apiSegurancaProgramaService.getIDProgramaNivel();
      //pega da URL o id da pessoa
      this.modelSegurancaPrograma.chCodPrograma = this.route.snapshot.paramMap.get('id');
      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiSegurancaProgramaService.obter(id).then(
        dados_API => {
          this.modelSegurancaPrograma = dados_API;
          this.apiSegurancaProgramaService.setIDProgramaNivel(this.modelSegurancaPrograma.IDProgramaNivel);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSegurancaPrograma);
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
    this.apiSegurancaProgramaService.excluir(this.modelSegurancaPrograma.IDSegurancaPrograma).then(
      sucesso => {
        this.cabecalhoBreadcrumbService.voltar();
        //this.cadastroBarraAcao.esconder();
        //this._location.back();
        
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiSegurancaProgramaService.alterar(this.modelSegurancaPrograma).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSegurancaPrograma = sucesso;
        this.apiSegurancaProgramaService.setIDProgramaNivel(this.modelSegurancaPrograma.IDProgramaNivel);
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
    this.apiSegurancaProgramaService.criar(this.modelSegurancaPrograma).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSegurancaPrograma = sucesso;
        this.meuForm.get('chCodGrupoUsuario').disable();
        this.apiSegurancaProgramaService.setIDProgramaNivel(this.modelSegurancaPrograma.IDProgramaNivel);
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
