import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiTipoAssTecEL01Service } from '../../../../api/api-tipo-ass-tec-el01.service';
import { ModelTipoAssTecEL01 } from '../../../../models/model-tipo-ass-tec-EL01';
import { Location } from "@angular/common";
@Component({
  selector: 'app-crude-tipo-ass-tec-detalhe',
  templateUrl: './crude-tipo-ass-tec-detalhe.component.html',
  styleUrls: ['./crude-tipo-ass-tec-detalhe.component.scss']
})
export class CrudeTipoAssTecDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public pamramId: number;
  public modelTipoAssTecEL01: ModelTipoAssTecEL01;
  public apiErrorCollection: ApiErrorCollection;

  public meuForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiTipoAssTecEL01Service: ApiTipoAssTecEL01Service,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelTipoAssTecEL01 = new ModelTipoAssTecEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.pamramId = +this.route.snapshot.paramMap.get('id');
    this.inicializarDadosTab_DadosTipoAssTecis();
    this.criarBreadCrumbs();
    //Promise.resolve(null).then(() => this.inicializarDadosTab_DadosTipoAssTecis());
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
    if (this.modelTipoAssTecEL01) {
      return this.modelTipoAssTecEL01.inCodTipoAssTec;
    } else {
      return 0;
    }
  }

  private inicializarDadosTab_DadosTipoAssTecis() {
    //Crio a instância dos formControls sem dados para não dar erro na interface
    this.criarForm(true);

    //Configuro quais controles estarão desabilitados
    this.configurarStatusForm();

    //Carrego os dados de pessoa
    this.getTipoAssTec();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodTipoAssTec').disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoAssTecEL01, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        inCodTipoAssTec: [this.modelTipoAssTecEL01.inCodTipoAssTec, Validators.required],
        chDescricao: [this.modelTipoAssTecEL01.chDescricao, Validators.required],
        chDesSituacaoCad: [this.modelTipoAssTecEL01.chDesSituacaoCad],
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoAssTecEL01);
  }

  private getTipoAssTec() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma pessoa física nova
      this.modelTipoAssTecEL01 = new ModelTipoAssTecEL01();
      this.modelTipoAssTecEL01.inCodTipoAssTec = null;
      this.modelTipoAssTecEL01.inCodSituacaoCad = null;
      this.modelTipoAssTecEL01.chDescricao = '';
      this.modelTipoAssTecEL01.chDesSituacaoCad = '';
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


      //carrego os dados da pessoa física do id recebido 
      this.apiTipoAssTecEL01Service.obter(id).then(
        pessoa => {
          this.modelTipoAssTecEL01 = pessoa;
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
    this.getTipoAssTec();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.pamramId > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiTipoAssTecEL01Service.excluir(this.modelTipoAssTecEL01.inCodTipoAssTec).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoAssTecEL01Service.alterar(this.modelTipoAssTecEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoAssTecEL01 = sucesso;
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
    this.apiTipoAssTecEL01Service.criar(this.modelTipoAssTecEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoAssTecEL01 = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
        this.meuForm.get('inCodTipoAssTec').disable();
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
