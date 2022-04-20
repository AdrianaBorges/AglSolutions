import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelTipoTecnico } from '../../../../models/model-tipo-tecnico';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoTecnicoService } from '../../../../api/api-tipo-tecnico.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-crude-tipo-tecnico-detalhe',
  templateUrl: './crude-tipo-tecnico-detalhe.component.html',
  styleUrls: ['./crude-tipo-tecnico-detalhe.component.scss']
})
export class CrudeTipoTecnicoDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  public meuForm: FormGroup;
  public modelTipoTecnico: ModelTipoTecnico;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiTipoTecnicoService: ApiTipoTecnicoService,
    private _location: Location
  ) {
    this.modelTipoTecnico = new ModelTipoTecnico();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getMotivoRejeita();

  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('inCodTipoTecnico').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelTipoTecnico, emEdicao);
    } else {
      this.meuForm = this.formB.group({
        inCodTipoTecnico: [this.modelTipoTecnico.inCodTipoTecnico, Validators.required],
        chDescricao: [this.modelTipoTecnico.chDescricao, Validators.required]
      });

    }
  }

  private getMotivoRejeita() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelTipoTecnico = new ModelTipoTecnico();
      this.modelTipoTecnico.inCodTipoTecnico = null;
      this.modelTipoTecnico.chDescricao = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiTipoTecnicoService.obter(id).then(
        dados_API => {

          this.modelTipoTecnico = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelTipoTecnico);
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getMotivoRejeita();
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
    this.apiTipoTecnicoService.excluir(this.modelTipoTecnico.inCodTipoTecnico).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiTipoTecnicoService.alterar(this.modelTipoTecnico).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoTecnico = sucesso;
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
    this.apiTipoTecnicoService.criar(this.modelTipoTecnico).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelTipoTecnico = sucesso;
        this.meuForm.controls['inCodTipoTecnico'].disable();
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
