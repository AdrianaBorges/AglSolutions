import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModelPrograma } from '../../../../models/model-programa';
import { ModelProgramaNivel } from '../../../../models/model-programa-nivel';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiProgramaNivelService } from '../../../../api/api-programa-nivel.service';
import { ApiSegurancaProgramaService } from '../../../../api/api-seguranca-programa.service';
import { Location } from "@angular/common";
import { ApiProgramaService } from '../../../../api/api-programa.service';

@Component({
  selector: 'app-crude-programa-nivel-detalhe',
  templateUrl: './crude-programa-nivel-detalhe.component.html',
  styleUrls: ['./crude-programa-nivel-detalhe.component.scss']
})
export class CrudeProgramaNivelDetalheComponent implements OnInit {

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelPrograma: ModelPrograma;
  public modelProgramaNivel: ModelProgramaNivel;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiProgramaNivelService: ApiProgramaNivelService,
    public apiProgramaService: ApiProgramaService,
    public apiSegurancaPrograma: ApiSegurancaProgramaService,
    private _location: Location,
  ) {
    this.modelPrograma = new ModelPrograma();
    this.modelProgramaNivel = new ModelProgramaNivel();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('IDProgramaNivel');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private inicializarDados() {
    this.carregarDadosPai();
    this.criarForm(true);
    this.configurarStatusForm();
    this.getDados();

  }

  private carregarDadosPai() {
    var id = this.route.snapshot.paramMap.get('id');
    this.apiProgramaService.obter(id).then(
      programa => {
        this.modelPrograma = programa;
      }
    );
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
    this.configurarStatusForm();
    this.getDados();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm() {
    var id = +this.route.snapshot.paramMap.get('IDProgramaNivel');

    this.meuForm.controls['IDProgramaNivel'].disable();
    if (this.modelProgramaNivel.IDProgramaNivel > 0) {
      this.meuForm.get('inCodNivel').disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelProgramaNivel, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDProgramaNivel: new FormControl(this.modelProgramaNivel.IDProgramaNivel),
        inCodNivel: new FormControl(this.modelProgramaNivel.inCodNivel, [Validators.required]),
        chDesProgramaNivel: new FormControl(this.modelProgramaNivel.chDesProgramaNivel, [Validators.required, Validators.maxLength(50)]),
        chDesComandoExecuta: new FormControl(this.modelProgramaNivel.chDesComandoExecuta, [Validators.maxLength(100)]),
        chDesOperacao: new FormControl(this.modelProgramaNivel.chDesOperacao, [Validators.required]),
        chDesObservacao: new FormControl(this.modelProgramaNivel.chDesObservacao),

      });
    }


  }

  private getDados() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('IDProgramaNivel');//IDProgramaNivel

    //id = this.idCadastro;

    if (id == 0) {
      this.modelProgramaNivel = new ModelProgramaNivel();

      this.modelProgramaNivel.IDProgramaNivel = id;
      this.modelProgramaNivel.chDesComandoExecuta = "";
      this.modelProgramaNivel.chDesObservacao = "";
      this.modelProgramaNivel.chDesOperacao = "";
      this.modelProgramaNivel.chDesProgramaNivel = "";

      //pega da URL o id da pessoa
      this.modelProgramaNivel.chCodPrograma = this.route.snapshot.paramMap.get('id');

      if (this.modelProgramaNivel.chCodPrograma == "0" || this.modelProgramaNivel.chCodPrograma == "") {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelProgramaNivel.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelProgramaNivel.chCodPrograma = this.apiProgramaNivelService.getChCodPrograma();
      }
      if (this.modelProgramaNivel.chCodPrograma == "" || this.modelProgramaNivel.chCodPrograma == undefined || this.modelProgramaNivel.chCodPrograma == "0") {
        console.error('Não foi encontrado o codigo do grupo');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
   //   this.cadastroBarraAcao.exibirAguarde();

      this.apiProgramaNivelService.obter(id).then(
        dados_API => {
          this.modelProgramaNivel = dados_API;
          this.apiSegurancaPrograma.setIDProgramaNivel(this.modelProgramaNivel.IDProgramaNivel);
          this.operacao = 'edicao';
          this.criarForm(false);

          //this.cadastroBarraAcao.esconderAguarde();
        },
        erro => {
          //this.cadastroBarraAcao.esconderAguarde();
          this.apiErrorCollection = erro;
        }
      );
    }
  }

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelProgramaNivel);
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
    this.apiProgramaNivelService.excluir(this.modelProgramaNivel.IDProgramaNivel).then(
      sucesso => {
        this.cabecalhoBreadcrumbService.voltar();
        //this.cadastroBarraAcao.esconder()
        //this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiProgramaNivelService.alterar(this.modelProgramaNivel).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProgramaNivel = sucesso;
        this.apiSegurancaPrograma.setIDProgramaNivel(this.modelProgramaNivel.IDProgramaNivel);
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
    this.apiProgramaNivelService.criar(this.modelProgramaNivel).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProgramaNivel = sucesso;
        this.meuForm.get('inCodNivel').disable();
        this.apiSegurancaPrograma.setIDProgramaNivel(this.modelProgramaNivel.IDProgramaNivel);
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
