import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiAssTecItemDefConstService } from '../../../../api/api-ass-tec-item-def-const.service';
import { ApiDefeitoEL01Service } from '../../../../api/api-defeito-el01.service';
import { ModelAssTecItemDefConst } from '../../../../models/model-ass-tec-item-def-const';
import { Location } from "@angular/common";
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';

@Component({
  selector: 'app-crude-ass-tec-item-def-const-detalhe',
  templateUrl: './crude-ass-tec-item-def-const-detalhe.component.html',
  styleUrls: ['./crude-ass-tec-item-def-const-detalhe.component.scss']
})
export class CrudeAssTecItemDefConstDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelAssTecItemDefConst: ModelAssTecItemDefConst;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  //public idCadastroPai: number;


  constructor(
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiAssTecItemDefConstService: ApiAssTecItemDefConstService,
    private _location: Location,
    public apiDefeitoEL01Service: ApiDefeitoEL01Service,
  ) {
    this.modelAssTecItemDefConst = new ModelAssTecItemDefConst();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    this.criarForm(true);
    //this.getDados();

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
    //this.configurarStatusForm();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm() {
    //var id = +this.route.snapshot.paramMap.get('id');


    this.meuForm.controls['IDAssTecItemDefConst'].disable();

    if (this.idCadastro > 0) {
      this.meuForm.get("IDDefeito").disable();
    }
    /* if (this.modelAssTecItemDefConst.IDPessoaContaBanco > 0) {
       this.meuForm.get('inCodTipoDocumento').disable();
     }*/
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelAssTecItemDefConst, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDAssTecItemDefConst: [this.modelAssTecItemDefConst.IDAssTecItemDefConst],
        IDDefeito: [this.modelAssTecItemDefConst.IDDefeito, Validators.required],
        chDesProblema: [this.modelAssTecItemDefConst.chDesProblema],
        dtDatInclusao: [this.modelAssTecItemDefConst.dtDatInclusao],
        chNomeUsuarioInclusao: [this.modelAssTecItemDefConst.chNomeUsuarioInclusao],
        dtDatUltAlteracao: [this.modelAssTecItemDefConst.dtDatUltAlteracao],
        chNomeUsuarioAlteracao: [this.modelAssTecItemDefConst.chNomeUsuarioAlteracao],
      });
    }


  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelAssTecItemDefConst = new ModelAssTecItemDefConst();
      // this.modelAssTecItemDefConst.daDatExpedicao = null;
      // this.modelAssTecItemDefConst.dtDatInclusao = null;
      // this.modelAssTecItemDefConst.dtDatUltAlteracao = null;

      this.modelAssTecItemDefConst.IDAssTecItemDefConst = id;
      this.modelAssTecItemDefConst.IDDefeito = null;
      this.modelAssTecItemDefConst.chDesProblema = "";

      //pega da URL o id da pessoa
      //this.modelAssTecItemDefConst.IDPessoa = +this.route.snapshot.paramMap.get('id');
      this.modelAssTecItemDefConst.IDAssTecItem = this.apiAssTecItemDefConstService.IDAssTecItem;
      /*  if (this.modelAssTecItemDefConst.IDPessoa == 0) {
          //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
          //this.modelAssTecItemDefConst.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
          
        }
        if (this.modelAssTecItemDefConst.IDPessoa == 0 || this.modelAssTecItemDefConst.IDPessoa == undefined) {
          console.error('Não foi encontrado o id do cadastro da pessoa el');
        }*/

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiAssTecItemDefConstService.obter(id).then(
        dados_API => {
          this.modelAssTecItemDefConst = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelAssTecItemDefConst);
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
    this.apiAssTecItemDefConstService.excluir(this.modelAssTecItemDefConst.IDAssTecItemDefConst).then(
      sucesso => {
        //this._location.back();
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiAssTecItemDefConstService.alterar(this.modelAssTecItemDefConst).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecItemDefConst = sucesso;


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
    this.apiAssTecItemDefConstService.criar(this.modelAssTecItemDefConst).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecItemDefConst = sucesso;
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
