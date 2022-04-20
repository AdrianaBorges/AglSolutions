import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiFamComService } from '../../../../api/api-fam-com.service';
import { Location } from "@angular/common";
import { ModelFamCom } from '../../../../models/model-fam-com';

@Component({
  selector: 'app-crude-fam-com-detalhe',
  templateUrl: './crude-fam-com-detalhe.component.html',
  styleUrls: ['./crude-fam-com-detalhe.component.scss']
})
export class CrudeFamComDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelFamCom: ModelFamCom;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiFamComService: ApiFamComService,
    private _location: Location
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelFamCom = new ModelFamCom();    
  }

  ngOnInit() {
    
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getFamCom();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('chCodFamCom').disable();
    }
    this.meuForm.controls['IDFamCom'].disable();
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelFamCom, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        IDFamCom: [this.modelFamCom.IDFamCom],
        chCodFamCom: [this.modelFamCom.chCodFamCom,Validators.required],
        chDescricao: [this.modelFamCom.chDescricao, Validators.required]
      });

    }
  }

  private getFamCom() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelFamCom = new ModelFamCom();
      this.modelFamCom.IDFamCom = 0;
      this.modelFamCom.chCodFamCom = "";
      this.modelFamCom.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiFamComService.obter(id).then(
        dados_API => {

          this.modelFamCom = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelFamCom);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getFamCom();
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
    this.apiFamComService.excluir(this.modelFamCom.IDFamCom).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiFamComService.alterar(this.modelFamCom).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelFamCom = sucesso;
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
    this.apiFamComService.criar(this.modelFamCom).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelFamCom = sucesso;
        this.meuForm.controls['chCodFamCom'].disable();
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
