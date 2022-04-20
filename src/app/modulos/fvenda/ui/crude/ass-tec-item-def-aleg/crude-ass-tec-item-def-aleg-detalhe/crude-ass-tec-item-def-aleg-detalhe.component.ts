import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiAssTecItemDefAlegService } from '../../../../api/api-ass-tec-item-def-aleg.service';
import { ApiDefeitoEL01Service } from '../../../../api/api-defeito-el01.service';
import { ModelAssTecItemDefAleg } from '../../../../models/model-ass-tec-item-def-aleg';
import { Location } from "@angular/common";
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { ApiSelectComponent } from '../../../../../../componentes/api-select/api-select.component';

@Component({
  selector: 'app-crude-ass-tec-item-def-aleg-detalhe',
  templateUrl: './crude-ass-tec-item-def-aleg-detalhe.component.html',
  styleUrls: ['./crude-ass-tec-item-def-aleg-detalhe.component.scss']
})
export class CrudeAssTecItemDefAlegDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild("defeito", { static: true }) defeito: ApiSelectComponent;

  public meuForm: FormGroup;
  public modelAssTecItemDefAleg: ModelAssTecItemDefAleg;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiAssTecItemDefAlegService: ApiAssTecItemDefAlegService,
    private _location: Location,
    public apiDefeitoEL01Service: ApiDefeitoEL01Service,
  ) {
    this.modelAssTecItemDefAleg = new ModelAssTecItemDefAleg();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    this.criarForm(true);

  }

  validarValor(event) {    
    var data = this.defeito.data.find(f => f.IDDefeito == event);
    this.meuForm.get("chDesProblema").setValue(data.chDesProblema);
    this.meuForm.get("chDesSolucao").setValue(data.chDesSolucao);
  }

  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /**
   * Deve ser chamada pelo evento do grid de pesquisa, 
   * seja para criar um novo registro ou para exibir 
   * para edição ou exclusão
   * @param id zero se for um novo cadastro e um valor 
   * se for para abrir para edição ou exclusão
   */
  public gridInterfaceTabCadastroFilho_setIdCadastro(id: string): void {
    this.idCadastro = +id;
    this.getDados();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm() {
    this.meuForm.controls['IDAssTecItemDefAleg'].disable();

    if (this.idCadastro > 0) {
      this.meuForm.get("IDDefeito").disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelAssTecItemDefAleg, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDAssTecItemDefAleg: [this.modelAssTecItemDefAleg.IDAssTecItemDefAleg],
        IDDefeito: [this.modelAssTecItemDefAleg.IDDefeito, Validators.required],
        chDesProblema: [this.modelAssTecItemDefAleg.chDesProblema],
        chDesSolucao: [this.modelAssTecItemDefAleg.chDesSolucao],
        dtDatInclusao: [this.modelAssTecItemDefAleg.dtDatInclusao],
        chNomeUsuarioInclusao: [this.modelAssTecItemDefAleg.chNomeUsuarioInclusao],
        dtDatUltAlteracao: [this.modelAssTecItemDefAleg.dtDatUltAlteracao],
        chNomeUsuarioAlteracao: [this.modelAssTecItemDefAleg.chNomeUsuarioAlteracao],
      });
    }
  }

  private getDados() {

    var id: number;
    id = this.idCadastro;

    if (id == 0) {
      this.modelAssTecItemDefAleg = new ModelAssTecItemDefAleg();

      this.modelAssTecItemDefAleg.IDAssTecItemDefAleg = id;
      this.modelAssTecItemDefAleg.IDDefeito = null;
      this.modelAssTecItemDefAleg.chDesSolucao = "";
      this.modelAssTecItemDefAleg.chDesProblema = "";

      this.modelAssTecItemDefAleg.IDAssTecItem = this.apiAssTecItemDefAlegService.IDAssTecItem;

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiAssTecItemDefAlegService.obter(id).then(
        dados_API => {
          this.modelAssTecItemDefAleg = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelAssTecItemDefAleg);
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
    this.apiAssTecItemDefAlegService.excluir(this.modelAssTecItemDefAleg.IDAssTecItemDefAleg).then(
      sucesso => {
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiAssTecItemDefAlegService.alterar(this.modelAssTecItemDefAleg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecItemDefAleg = sucesso;


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
    this.apiAssTecItemDefAlegService.criar(this.modelAssTecItemDefAleg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecItemDefAleg = sucesso;
        this.meuForm.get("IDDefeito").disable();
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
