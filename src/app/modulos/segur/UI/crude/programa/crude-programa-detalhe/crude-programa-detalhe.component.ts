import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModelPrograma } from '../../../../models/model-programa';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
//import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { ApiProgramaService } from '../../../../api/api-programa.service';
import { ApiProgramaNivelService } from '../../../../api/api-programa-nivel.service';

@Component({
  selector: 'app-crude-programa-detalhe',
  templateUrl: './crude-programa-detalhe.component.html',
  styleUrls: ['./crude-programa-detalhe.component.scss']
})
export class CrudeProgramaDetalheComponent implements OnInit {

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  
  public meuForm: FormGroup;
  public modelPrograma: ModelPrograma;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiProgramaService: ApiProgramaService,
    public apiProgramaNivelService: ApiProgramaNivelService,
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelPrograma = new ModelPrograma();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs(){
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getPrograma();
  }

  private configurarStatusForm() {

    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.meuForm.get('chCodPrograma').disable();
    }

  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPrograma, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        chCodPrograma: new FormControl(this.modelPrograma.chCodPrograma, [Validators.required, Validators.maxLength(50)]),
        lgDisponivelMenu: new FormControl(this.modelPrograma.lgDisponivelMenu, []),
        chDesTitPrograma: new FormControl(this.modelPrograma.chDesTitPrograma, [Validators.required, Validators.maxLength(80)]),
        chDesPasta: new FormControl(this.modelPrograma.chDesPasta, [Validators.maxLength(100)]),
        chDesObservacao: new FormControl(this.modelPrograma.chDesObservacao, [])
      });
    }

  }

  private getPrograma() {

    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.modelPrograma = new ModelPrograma();
      this.modelPrograma.chCodPrograma = "";
      this.modelPrograma.chDesPasta = "";
      this.modelPrograma.chDesTitPrograma = "";
      this.modelPrograma.lgDisponivelMenu = true;
      this.modelPrograma.chDesObservacao = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {
      this.apiProgramaService.obter(id).then(
        dados_API => {
          this.modelPrograma = dados_API;
          this.apiProgramaNivelService.setChCodPrograma(this.modelPrograma.chCodPrograma);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPrograma);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getPrograma();
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
    this.apiProgramaService.excluir(this.modelPrograma.chCodPrograma).then(
      sucesso => {
        this.cabecalhoBreadcrumbService.voltar();
        //this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiProgramaService.alterar(this.modelPrograma).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPrograma = sucesso;
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
    this.apiProgramaService.criar(this.modelPrograma).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPrograma = sucesso;
        this.meuForm.controls['chCodPrograma'].disable();
        this.apiProgramaNivelService.setChCodPrograma(this.modelPrograma.chCodPrograma);
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
