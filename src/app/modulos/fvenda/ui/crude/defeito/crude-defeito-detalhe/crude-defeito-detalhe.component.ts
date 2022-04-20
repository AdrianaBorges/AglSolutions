import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiDefeitoEL01Service } from '../../../../api/api-defeito-el01.service';
import { ApiTipoDefeitoService } from '../../../../api/api-tipo-defeito.service';
import { ModelDefeitoEL01 } from '../../../../models/model-defeito-EL01';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-crude-defeito-detalhe',
  templateUrl: './crude-defeito-detalhe.component.html',
  styleUrls: ['./crude-defeito-detalhe.component.scss']
})
export class CrudeDefeitoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  public modelDefeitoEL01: ModelDefeitoEL01;
  public apiErrorCollection: ApiErrorCollection;
  
  public meuForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiDefeitoEL01Service: ApiDefeitoEL01Service,
    public apiTipoDefeitoService: ApiTipoDefeitoService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelDefeitoEL01 = new ModelDefeitoEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDadosTab_DadosDefeitois();
    this.criarBreadCrumbs();
    //Promise.resolve(null).then(() => this.inicializarDadosTab_DadosDefeitois());
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  
  public ngAfterViewInit() {
    //Promise.resolve(null).then(() => this.kendoTabStripInstance.selectTab(0));
  }

  /**
   * Retorna o id do cadastro sendo acessado
   * Implementação do método da interface CadastroBarraAcaoPai
   */
  public cadastroBarraAcaoPai_getIdCadastro(): number {
    if (this.modelDefeitoEL01) {
      return this.modelDefeitoEL01.IDDefeito;
    } else {
      return 0;
    }
  }

  private inicializarDadosTab_DadosDefeitois() {
    //Crio a instância dos formControls sem dados para não dar erro na interface
    this.criarForm(true);

    //Configuro quais controles estarão desabilitados
    this.configurarStatusForm();

    //Carrego os dados de pessoa
    this.getDefeito();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('chCodDefeito').disable();
      this.meuForm.get('inCodTipoDefeito').disable();
    }
    this.meuForm.controls['IDDefeito'].disable();
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelDefeitoEL01, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDDefeito: [this.modelDefeitoEL01.IDDefeito],
        inCodTipoDefeito: [this.modelDefeitoEL01.inCodTipoDefeito, Validators.required],
        chCodDefeito: [this.modelDefeitoEL01.chCodDefeito, Validators.required],
        chDescricao: [this.modelDefeitoEL01.chDescricao, Validators.required],
        chDesProblema: [this.modelDefeitoEL01.chDesProblema],
        chDesSolucao: [this.modelDefeitoEL01.chDesSolucao],
        chDesSituacaoCad: [this.modelDefeitoEL01.chDesSituacaoCad],
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelDefeitoEL01);
  }

  private getDefeito() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelDefeitoEL01 = new ModelDefeitoEL01();
      this.modelDefeitoEL01.IDDefeito = 0;
      this.modelDefeitoEL01.chCodDefeito = "";
      this.modelDefeitoEL01.chDesProblema = '';
      this.modelDefeitoEL01.chDesSolucao = '';
      this.modelDefeitoEL01.inCodTipoDefeito = null;
      this.modelDefeitoEL01.inCodSituacaoCad = null;
      this.modelDefeitoEL01.chDescricao = '';
      this.modelDefeitoEL01.chDesTipoDefeito = '';
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


      //carrego os dados da pessoa física do id recebido 
      this.apiDefeitoEL01Service.obter(id).then(
        pessoa => {
          this.modelDefeitoEL01 = pessoa;
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
    this.getDefeito();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.modelDefeitoEL01.IDDefeito > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiDefeitoEL01Service.excluir(this.modelDefeitoEL01.IDDefeito).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiDefeitoEL01Service.alterar(this.modelDefeitoEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelDefeitoEL01 = sucesso;
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
    this.apiDefeitoEL01Service.criar(this.modelDefeitoEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelDefeitoEL01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('chCodDefeito').disable();
        this.meuForm.get('inCodTipoDefeito').disable();
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
