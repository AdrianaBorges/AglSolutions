import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

//Componentes
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
//Modelo de dados
import { ModelGrupoSeguro } from '../../../../models/model-grupo-seguro';

import { ApiGrupoSeguroService } from '../../../../api/api-grupo-seguro.service';
import { ApiRamoSeguroService } from '../../../../api/api-ramo-seguro.service';

@Component({
  selector: 'app-crude-grupo-seguro-detalhe',
  templateUrl: './crude-grupo-seguro-detalhe.component.html',
  styleUrls: ['./crude-grupo-seguro-detalhe.component.scss']
})
export class CrudeGrupoSeguroDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  public modelGrupoSeguro: ModelGrupoSeguro;
  public apiErrorCollection: ApiErrorCollection;

  public meuForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiGrupoSeguroService: ApiGrupoSeguroService,
    public apiRamoSeguroService: ApiRamoSeguroService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelGrupoSeguro = new ModelGrupoSeguro();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDadosTab_GrupoSeguro();
  }

  /**
   * Retorna o id do cadastro sendo acessado
   * Implementação do método da interface CadastroBarraAcaoPai
   */
  public cadastroBarraAcaoPai_getIdCadastro(): number {
    if (this.modelGrupoSeguro) {
      return this.modelGrupoSeguro.inCodGrupoSeguro;
    } else {
      return 0;
    }
  }


  private inicializarDadosTab_GrupoSeguro() {
    //Crio a instância dos formControls sem dados para não dar erro na interface
    this.criarForm(true);

    //Configuro quais controles estarão desabilitados
    this.configurarStatusForm();

    //Carrego os dados de pessoa
    this.getGrupoSeguro();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');


    if (id > 0) {
      this.meuForm.get('inCodGrupoSeguro').disable();
    }

  }

  private criarForm(emEdicao: boolean) {
    //emEdicao = emEdicao || false;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelGrupoSeguro, emEdicao);
    } else {
      //Cria o formulário a primeira vez

      this.meuForm = this.formB.group({

        //Dados essenciais
        inCodGrupoSeguro: [this.modelGrupoSeguro.inCodGrupoSeguro, Validators.required],
        chDescricao: [this.modelGrupoSeguro.chDescricao, Validators.required]
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelGrupoSeguro);
  }

  private getGrupoSeguro() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelGrupoSeguro = new ModelGrupoSeguro();
      this.modelGrupoSeguro.inCodGrupoSeguro = null;
      this.modelGrupoSeguro.chDescricao = "";
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai
      this.apiRamoSeguroService.setInCodGrupoSeguro(id);

      //carrego os dados da pessoa física do id recebido 
      this.apiGrupoSeguroService.obter(id).then(
        GrupoSeguro => {
          this.modelGrupoSeguro = GrupoSeguro;
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

  btnCancelar() {
    this.getGrupoSeguro();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    var id: number = +this.route.snapshot.paramMap.get('id');



    if (id > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiGrupoSeguroService.excluir(this.modelGrupoSeguro.inCodGrupoSeguro).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiGrupoSeguroService.alterar(this.modelGrupoSeguro).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrupoSeguro = sucesso;
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
    this.apiGrupoSeguroService.criar(this.modelGrupoSeguro).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelGrupoSeguro = sucesso;
        this.criarForm(false);
        this.meuForm.get('inCodGrupoSeguro').disable();
        this.cadastroBarraAcao.esconderAguarde();
        this.apiRamoSeguroService.setInCodGrupoSeguro(this.modelGrupoSeguro.inCodGrupoSeguro);
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
