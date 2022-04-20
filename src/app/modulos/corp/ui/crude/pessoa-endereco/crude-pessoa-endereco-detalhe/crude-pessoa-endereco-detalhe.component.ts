import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelPessoaEndereco } from '../../../../models/model-pessoa-endereco';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPessoaEnderecoService } from '../../../../api/api-pessoa-endereco.service';
import { ApiPaisService } from '../../../../api/api-pais.service';
import { ApiCidadeService } from '../../../../api/api-cidade.service';
import { ApiUfService } from '../../../../api/api-uf.service';
import { ApiTipoDocumentoPessoaEnderecoService } from '../../../../api/api-tipo-pessoa-endereco.service';
import { ApiTipoLogradouroService } from '../../../../api/api-tipo-logradouro.service';
import { ApiLogradouroService } from '../../../../api/api-logradouro.service';
//import { CadastroBarraAcaoPai } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao-pai';


@Component({
  selector: 'app-crude-pessoa-endereco-detalhe',
  templateUrl: './crude-pessoa-endereco-detalhe.component.html',
  styleUrls: ['./crude-pessoa-endereco-detalhe.component.scss']
})
export class CrudePessoaEnderecoDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  private cepOld: string;
  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelPessoaEndereco: ModelPessoaEndereco;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPessoaEnderecoService: ApiPessoaEnderecoService,
    private _location: Location,
    public apiPaisService: ApiPaisService,
    public apiCidadeService: ApiCidadeService,
    public apiUFService: ApiUfService,
    public apiTipoPessoaEnderecoService: ApiTipoDocumentoPessoaEnderecoService,
    public apiTipoLogradouroService: ApiTipoLogradouroService,
    public apiLogradouroService: ApiLogradouroService
  ) {
    this.modelPessoaEndereco = new ModelPessoaEndereco();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  buscarCep(cep) {
    cep = cep.split(".").join("");
    cep = cep.split("-").join("");

    if (this.cepOld != undefined) {
      if (cep == this.cepOld) return;
    }


    this.apiLogradouroService.obterPorCEP(cep).
      then(r => {
        this.cepOld = cep;
        this.meuForm.get("IDPais").setValue(r.IDPais);
        this.meuForm.get("IDUF").setValue(r.IDUF);
        this.meuForm.get("IDCidade").setValue(r.IDCidade);
        this.meuForm.get("chCEP").setValue(r.chCEP);
        this.meuForm.get("chNomeLogradouro").setValue(r.chNome);
        this.meuForm.get("chBairro").setValue(r.chBairro);
        this.meuForm.get("inCodTipoLogradouro").setValue(r.inCodTipoLogradouro);
      }).catch(e => {
        console.log(e);
      });
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

    this.meuForm.controls['IDPessoaEndereco'].disable();

    if (this.modelPessoaEndereco.IDPessoaEndereco > 0) {
      this.meuForm.get('inCodTipoPessoaEndereco').disable();
    }
  }

  private criarForm(emEdicao: boolean) {

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPessoaEndereco, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDPessoaEndereco: [this.modelPessoaEndereco.IDPessoaEndereco],
        inCodTipoPessoaEndereco: [this.modelPessoaEndereco.inCodTipoPessoaEndereco, Validators.required],
        chCEP: [this.modelPessoaEndereco.chCEP, Validators.required],
        IDPessoa: [this.modelPessoaEndereco.IDPessoa],
        IDPais: [this.modelPessoaEndereco.IDPais, Validators.required],
        IDUF: [this.modelPessoaEndereco.IDUF, Validators.required],
        IDCidade: [this.modelPessoaEndereco.IDCidade, Validators.required],
        inCodTipoLogradouro: [this.modelPessoaEndereco.inCodTipoLogradouro, Validators.required],
        chNomeLogradouro: [this.modelPessoaEndereco.chNomeLogradouro, Validators.required],
        chNumeroLogradouro: [this.modelPessoaEndereco.chNumeroLogradouro],
        chComplemento: [this.modelPessoaEndereco.chComplemento],
        chBairro: [this.modelPessoaEndereco.chBairro],
        dtDatInclusao: [this.modelPessoaEndereco.dtDatInclusao],
        dtDatUltAlteracao: [this.modelPessoaEndereco.dtDatUltAlteracao],
      });
    }
  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelPessoaEndereco = new ModelPessoaEndereco();
      // this.modelPessoaEndereco.daDatExpedicao = null;
      // this.modelPessoaEndereco.dtDatInclusao = null;
      // this.modelPessoaEndereco.dtDatUltAlteracao = null;

      this.modelPessoaEndereco.IDPessoaEndereco = id;

      //pega da URL o id da pessoa
      //this.modelPessoaEndereco.IDPessoa = +this.route.snapshot.paramMap.get('id');
      this.modelPessoaEndereco.IDPessoa = this.apiPessoaEnderecoService.getIdPessoa();
      /*if (this.modelPessoaEndereco.IDPessoa == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelPessoaEndereco.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
       
      }
      if (this.modelPessoaEndereco.IDPessoa == 0 || this.modelPessoaEndereco.IDPessoa == undefined) {
        console.error('Não foi encontrado o id do cadastro da pessoa el');
      }*/

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiPessoaEnderecoService.obter(id).then(
        dados_API => {
          this.modelPessoaEndereco = dados_API;
          this.operacao = 'edicao';
          this.criarForm(false);
          this.cepOld = undefined;
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPessoaEndereco);
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
    this.apiPessoaEnderecoService.excluir(this.modelPessoaEndereco.IDPessoaEndereco).then(
      sucesso => {
        //this._location.back();
        this.cepOld = undefined;
        this.cadastroBarraAcao.esconder()
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiPessoaEnderecoService.alterar(this.modelPessoaEndereco).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaEndereco = sucesso;
        this.criarForm(false);
        this.cepOld = undefined;
        this.cadastroBarraAcao.esconderAguarde();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cepOld = undefined;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

  incluir() {
    this.apiPessoaEnderecoService.criar(this.modelPessoaEndereco).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaEndereco = sucesso;
        this.criarForm(false);
        this.operacao = 'edicao';
        this.cepOld = undefined;
        this.cadastroBarraAcao.esconderAguarde();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
        this.cepOld = undefined;
      }
    );
  }

}
