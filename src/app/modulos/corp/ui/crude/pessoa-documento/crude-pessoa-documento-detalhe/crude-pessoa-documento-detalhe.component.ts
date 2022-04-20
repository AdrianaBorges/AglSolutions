import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelPessoaDocumento } from '../../../../models/model-pessoa-documento';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPessoaDocumentoService } from '../../../../api/api-pessoa-documento.service';
import { ApiTipoDocumentoService } from '../../../../api/api-tipo-documento.service';
import { ModelTipoDocumento } from '../../../../models/model-tipo-documento';
//import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';


@Component({
  selector: 'app-crude-pessoa-documento-detalhe',
  templateUrl: './crude-pessoa-documento-detalhe.component.html',
  styleUrls: ['./crude-pessoa-documento-detalhe.component.scss']
})
export class CrudePessoaDocumentoDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelPessoaDocumento: ModelPessoaDocumento;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao'; 
  private idCadastro: number;
  //public idCadastroPai: number;

  //Dados provenientes de chave estrangeira
  private pessoaTipoDocumento = new ModelTipoDocumento;

  constructor( 
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPessoaDocumentoService: ApiPessoaDocumentoService,
    private _location: Location,
    public apiTipoDocumentoService: ApiTipoDocumentoService,
  ) {
    this.modelPessoaDocumento = new ModelPessoaDocumento();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados(){

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
  public gridInterfaceTabCadastroFilho_setIdCadastro(id: string): void{
    this.idCadastro = +id;
    this.getDados();
    //this.configurarStatusForm();
  }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent{
    return this.cadastroBarraAcao;
  }

  private configurarStatusForm(){
    //var id = +this.route.snapshot.paramMap.get('id');

    this.meuForm.controls['IDPessoaDocumento'].disable();

    if(this.modelPessoaDocumento.IDPessoaDocumento > 0){
      this.meuForm.get('inCodTipoDocumento').disable();
    }
  }

  private criarForm(emEdicao: boolean){
    this.pessoaTipoDocumento.inCodTipoDocumento = this.modelPessoaDocumento.inCodTipoDocumento;
    this.pessoaTipoDocumento.chDesTipoDocumento = this.modelPessoaDocumento.chDesTipoDocumento;

    if(this.modelPessoaDocumento.daDatExpedicao){
      this.modelPessoaDocumento.daDatExpedicao = new Date(this.modelPessoaDocumento.daDatExpedicao);
    }
    // var UIData_pessoaTipoDocumento = (this.modelPessoaDocumento.inCodTipoDocumento > 0 ? this.pessoaTipoDocumento : null);
    // this.modelPessoaDocumento['UIData_inCodTipoDocumento'] = UIData_pessoaTipoDocumento;

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPessoaDocumento, emEdicao);
      this.configurarStatusForm();
    }else{
      this.meuForm = this.formB.group({
        IDPessoaDocumento: [this.modelPessoaDocumento.IDPessoaDocumento],
        inCodTipoDocumento: [this.modelPessoaDocumento.inCodTipoDocumento, Validators.required],
        chNumero: [this.modelPessoaDocumento.chNumero,Validators.required],
        chDesOrgaoExpedidor: [this.modelPessoaDocumento.chDesOrgaoExpedidor,Validators.required],
        daDatExpedicao: [this.modelPessoaDocumento.daDatExpedicao,Validators.required],
        dtDatInclusao: [this.modelPessoaDocumento.dtDatInclusao],
        dtDatUltAlteracao: [this.modelPessoaDocumento.dtDatUltAlteracao],
      });
    }

    // this.meuForm.get('IDPessoaDocumento').disable();
    // //this.meuForm.controls['IDPessoaDocumento'].disable();

    // if(this.modelPessoaDocumento.IDPessoaDocumento > 0){
    //   this.meuForm.get('inCodTipoDocumento').disable();
    // }

    //this.configurarStatusForm();
  }

  private getDados(){

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id==0){
      this.modelPessoaDocumento = new ModelPessoaDocumento();
      // this.modelPessoaDocumento.daDatExpedicao = null;
      // this.modelPessoaDocumento.dtDatInclusao = null;
      // this.modelPessoaDocumento.dtDatUltAlteracao = null;

      this.modelPessoaDocumento.IDPessoaDocumento = id;

      //pega da URL o id da pessoa
      //this.modelPessoaDocumento.IDPessoa = +this.route.snapshot.paramMap.get('id');
      this.modelPessoaDocumento.IDPessoa = this.apiPessoaDocumentoService.getIdPessoa()
      /*if (this.modelPessoaDocumento.IDPessoa == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelPessoaDocumento.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        
      }
      if(this.modelPessoaDocumento.IDPessoa == 0 || this.modelPessoaDocumento.IDPessoa == undefined){
        console.error('Não foi encontrado o id do cadastro da pessoa el');
      }*/

      this.criarForm(true);
      this.operacao = 'inclusao';

    }else{
      this.cadastroBarraAcao.exibirAguarde();

      this.apiPessoaDocumentoService.obter(id).then(
        dados_API =>{
          this.modelPessoaDocumento = dados_API;
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

  private coletarDadosForm(){
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPessoaDocumento);

    // //Tipo de documento
    // if(this.meuForm.value.UIData_pessoaTipoDocumento){
    //   this.modelPessoaDocumento.chDesTipoDocumento = this.meuForm.value.UIData_CodProfissao.chDesTipoDocumento;
    //   this.modelPessoaDocumento.inCodTipoDocumento = this.meuForm.value.UIData_CodProfissao.inCodTipoDocumento;
    // }else{
    //   this.modelPessoaDocumento.chDesTipoDocumento = '';
    //   this.modelPessoaDocumento.inCodTipoDocumento = null;
    // }
  }

  btnCancelar(){
    this.getDados();
  }

  btnConfirmar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if(this.operacao == 'edicao'){
      this.alterar();
    }else{
      this.incluir();
    }
  }

  btnExcluir(){
    this.apiPessoaDocumentoService.excluir(this.modelPessoaDocumento.IDPessoaDocumento).then(
      sucesso => {
        //this._location.back();
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    this.apiPessoaDocumentoService.alterar(this.modelPessoaDocumento).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaDocumento = sucesso;
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

  incluir(){
    this.apiPessoaDocumentoService.criar(this.modelPessoaDocumento).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaDocumento = sucesso;
        //this.meuForm.controls['IDPessoaDocumento'].disable();
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