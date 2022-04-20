import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelSorteioSeg } from '../../../../models/model-sorteio-seg';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ModelSeguradora } from '../../../../models/model-seguradora';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiSorteioSegService } from '../../../../api/api-sorteio-seg.service';
import { ApiSeguradoraService } from '../../../../api/api-seguradora.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-crude-sorteio-seg-detalhe',
  templateUrl: './crude-sorteio-seg-detalhe.component.html',
  styleUrls: ['./crude-sorteio-seg-detalhe.component.scss']
})
export class CrudeSorteioSegDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelSorteioSeg: ModelSorteioSeg;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  //public idCadastroPai: number;

  //Dados provenientes de chave estrangeira
  private modelSeguradora = new ModelSeguradora();
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiSorteioSegService: ApiSorteioSegService,
    private _location: Location,
    public apiSeguradoraService: ApiSeguradoraService,
  ) {
    this.modelSorteioSeg = new ModelSorteioSeg();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    this.criarForm(true);
    //this.getDados();

  }

  /**
   * Deve ser chamada pelo evento do grid de pesquisa, 
   * seja para criar um novo registro ou para exibir 
   * para edição ou exclusão
   * @param id zero se for um novo cadastro e um valor 
   * se for para abrir para edição ou exclusão
   */
  public gridInterfaceTabCadastroFilho_setIdCadastro(id: number): void {
    this.idCadastro = Number(id);
    this.getDados();
    //this.configurarStatusForm();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm() {
    //var id = +this.route.snapshot.paramMap.get('id');
    this.meuForm.controls['IDSorteioSeg'].disable();

    if (this.idCadastro > 0) {
      this.meuForm.controls['chCodSorteioSeg'].disable();
    }
  }

  private criarForm(emEdicao: boolean) {
    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelSorteioSeg, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDSorteioSeg: [this.modelSorteioSeg.IDSorteioSeg],
        chCodSorteioSeg: [this.modelSorteioSeg.chCodSorteioSeg, Validators.required],
        chDescricao: [this.modelSorteioSeg.chDescricao, Validators.required],
        chDesExterna: [this.modelSorteioSeg.chDesExterna, Validators.required],
        chDesDetalhe: [this.modelSorteioSeg.chDesDetalhe],
        deValSorteio: [this.modelSorteioSeg.deValSorteio],
        chNumTitCap: [this.modelSorteioSeg.chNumTitCap],
      });
    }
  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = Number(this.idCadastro);

    if (id == 0) {
      this.modelSorteioSeg = new ModelSorteioSeg();
      // this.modelSequenciaValor.daDatExpedicao = null;
      // this.modelSequenciaValor.dtDatInclusao = null;
      // this.modelSequenciaValor.dtDatUltAlteracao = null;

      this.modelSorteioSeg.IDSorteioSeg = id;
      //pega da URL o id da pessoa
      this.modelSorteioSeg.IDSeguradora = +this.route.snapshot.paramMap.get('id');

      if (this.modelSorteioSeg.IDSeguradora == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelSequenciaValor.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelSorteioSeg.IDSeguradora = this.apiSorteioSegService.getIDSeguradora();
      }
      if (this.modelSorteioSeg.IDSeguradora == 0 || this.modelSorteioSeg.IDSeguradora == undefined) {
        console.error('Não foi encontrado o id do cadastro da Seguradora');
      }

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiSorteioSegService.obter(id).then(
        dados_API => {
          this.modelSorteioSeg = dados_API;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelSorteioSeg);
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
    this.apiSorteioSegService.excluir(this.modelSorteioSeg.IDSorteioSeg).then(
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
    this.apiSorteioSegService.alterar(this.modelSorteioSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSorteioSeg = sucesso;
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
    this.apiSorteioSegService.criar(this.modelSorteioSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelSorteioSeg = sucesso;
        //this.meuForm.controls['IDSequenciaValor'].disable();
        this.idCadastro = this.modelSorteioSeg.IDSorteioSeg;
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
