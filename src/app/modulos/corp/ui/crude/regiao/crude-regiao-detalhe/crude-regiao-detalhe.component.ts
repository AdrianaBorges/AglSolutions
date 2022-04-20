import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelRegiao } from '../../../../models/model-regiao';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiRegiaoService } from '../../../../api/api-regiao.service';
import { Location } from "@angular/common";
import { ApiMicrorregiaoService } from '../../../../api/api-microrregiao.service';

@Component({
  selector: 'app-crude-regiao-detalhe',
  templateUrl: './crude-regiao-detalhe.component.html',
  styleUrls: ['./crude-regiao-detalhe.component.scss']
})
export class CrudeRegiaoDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public meuForm: FormGroup;
  public modelRegiao: ModelRegiao;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiRegiaoService: ApiRegiaoService,
    public apiMicrorregiaoService: ApiMicrorregiaoService,
    private _location: Location
  ) {
    this.modelRegiao = new ModelRegiao();
    this.apiErrorCollection = new ApiErrorCollection();
  }


  ngOnInit() {
    this.inicializarDadosTab_Regiao();
  }

  /**
   * Retorna o id do cadastro sendo acessado
   * Implementação do método da interface CadastroBarraAcaoPai
   */
  public cadastroBarraAcaoPai_getIdCadastro(): string {
    if (this.modelRegiao) {
      return this.modelRegiao.chCodRegiao;
    } else {
      return "0";
    }
  }


  private inicializarDadosTab_Regiao() {
    //Crio a instância dos formControls sem dados para não dar erro na interface
    this.criarForm(true);

    //Configuro quais controles estarão desabilitados
    this.configurarStatusForm();

    //Carrego os dados de pessoa
    this.getRegiao();
  }


  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getRegiao();

  }

  private configurarStatusForm() {

    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.meuForm.get('chCodRegiao').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelRegiao, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        chCodRegiao: [this.modelRegiao.chCodRegiao, Validators.required],
        chDescricao: [this.modelRegiao.chDescricao, Validators.required]
      });

    }
  }

  private getRegiao() {

    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.modelRegiao = new ModelRegiao();
      this.modelRegiao.chCodRegiao = "";
      this.modelRegiao.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiRegiaoService.obter(id).then(
        dados_API => {

          this.modelRegiao = dados_API;
          this.apiMicrorregiaoService.setChCodRegiao(this.modelRegiao.chCodRegiao);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelRegiao);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getRegiao();
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
    this.apiRegiaoService.excluir(this.modelRegiao.chCodRegiao).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiRegiaoService.alterar(this.modelRegiao).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelRegiao = sucesso;
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
    this.apiRegiaoService.criar(this.modelRegiao).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelRegiao = sucesso;
        this.apiMicrorregiaoService.setChCodRegiao(this.modelRegiao.chCodRegiao);
        this.meuForm.controls['chCodRegiao'].disable();
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
