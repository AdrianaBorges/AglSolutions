import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiPessoaElService } from '../../../../../corp/api/api-pessoa-el.service';
import { ApiTecnicoEL01Service } from '../../../../api/api-tecnico-el01.service';
import { ApiTipoTecnicoService } from '../../../../api/api-tipo-tecnico.service';
import { ModelTecnicoEL01 } from '../../../../models/model-tecnico-EL01';
import { Location } from '@angular/common';
@Component({
  selector: 'app-crude-tecnico-detalhe',
  templateUrl: './crude-tecnico-detalhe.component.html',
  styleUrls: ['./crude-tecnico-detalhe.component.scss']
})
export class CrudeTecnicoDetalheComponent implements OnInit {


  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  private consulta: boolean;
  private pessoa = {
    chNomePessoa: '',
    IDPessoa: 0,
  };
  public formatDataSolicitacao: string = "dd/MM/yyyy HH:mm";
  public isCNPJ: boolean = false;
  public isCPF: boolean = false;
  public maskTipoPessoa: string = "";
  public meuForm: FormGroup;
  public modelTecnicoEL01: ModelTecnicoEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPessoaElService: ApiPessoaElService,
    public apiTipoTecnicoService: ApiTipoTecnicoService,
    public apiTecnicoEL01Service: ApiTecnicoEL01Service,
    private _location: Location,
    private router: Router
  ) {
    this.modelTecnicoEL01 = new ModelTecnicoEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }


  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getTecnicoEL01();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('UIPessoa').disable();
    }


  }

  private criarForm(emEdicao: boolean) {
    this.pessoa.chNomePessoa = this.modelTecnicoEL01.chNomeTecnico;
    this.pessoa.IDPessoa = this.modelTecnicoEL01.IDPessoaTecnico;

    var UIPessoa = (this.pessoa.IDPessoa > 0 ? this.pessoa : null);
    this.modelTecnicoEL01['UIPessoa'] = UIPessoa;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTecnicoEL01, emEdicao);

      // if (this.modelTecnicoEL01.inCadSituacaoCad) {
      //   if (this.modelTecnicoEL01.inCodSituacaoSolicCred != 1 && this.modelTecnicoEL01.inCodSituacaoSolicCred != 2) {
      //     this.cadastroBarraAcao.setModoConsulta();
      //   }
      // }
    }
    else {
      this.meuForm = this.formB.group({
        IDTecnico: [this.modelTecnicoEL01.IDTecnico],
        inCodTecnico: [this.modelTecnicoEL01.inCodTecnico],
        chNomAbreviado: [this.modelTecnicoEL01.chNomAbreviado, Validators.required],
        UIPessoa: [UIPessoa, Validators.required],
        inCodTipoTecnico: [this.modelTecnicoEL01.inCodTipoTecnico, Validators.required],
        chDesSituacaoCad: [this.modelTecnicoEL01.chDesSituacaoCad],
      });
    }
  }

  private getTecnicoEL01() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelTecnicoEL01 = new ModelTecnicoEL01();
      this.modelTecnicoEL01.IDTecnico = 0;
      this.modelTecnicoEL01.inCodTecnico = null;
      this.modelTecnicoEL01.IDPessoaTecnico = null;
      this.modelTecnicoEL01.chDesSituacaoCad = null;
      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiTecnicoEL01Service.obter(id).then(
        dados_API => {
          this.modelTecnicoEL01 = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTecnicoEL01);


    if (this.meuForm.value.UIPessoa) {
      this.modelTecnicoEL01.chNomeTecnico = this.meuForm.value.UIPessoa.chNomePessoa;
      this.modelTecnicoEL01.IDPessoaTecnico = this.meuForm.value.UIPessoa.IDPessoa;
    } else {
      this.modelTecnicoEL01.chNomeTecnico = '';
      this.modelTecnicoEL01.IDPessoaTecnico = null;
    }
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getTecnicoEL01();
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
    this.apiTecnicoEL01Service.excluir(this.modelTecnicoEL01.IDTecnico).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTecnicoEL01Service.alterar(this.modelTecnicoEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTecnicoEL01 = sucesso;
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
    this.apiTecnicoEL01Service.criar(this.modelTecnicoEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTecnicoEL01 = sucesso;
        this.meuForm.get('UIPessoa').disable();
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
