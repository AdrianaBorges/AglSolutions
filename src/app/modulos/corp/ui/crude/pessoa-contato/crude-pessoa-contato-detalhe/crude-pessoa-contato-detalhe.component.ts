import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelPessoaContato } from '../../../../models/model-pessoa-contato';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPessoaContatoService } from '../../../../api/api-pessoa-contato.service';
import { ApiTipoPessoaContatoService } from '../../../../api/api-tipo-pessoa-contato.service';


@Component({
  selector: 'app-crude-pessoa-contato-detalhe',
  templateUrl: './crude-pessoa-contato-detalhe.component.html',
  styleUrls: ['./crude-pessoa-contato-detalhe.component.scss']
})
export class CrudePessoaContatoDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho {
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;

  /**
   * Instancia do cadastro pai
   */
  //@Input() cadastroBarraAcaoPai: CadastroBarraAcaoPai;

  public meuForm: FormGroup;
  public modelPessoaContato: ModelPessoaContato;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private idCadastro: number;
  //public idCadastroPai: number;

  public dataAniversario: Date;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiPessoaContatoService: ApiPessoaContatoService,
    private _location: Location,
    public apiTipoPessoaContatoService: ApiTipoPessoaContatoService
  ) {
    this.modelPessoaContato = new ModelPessoaContato();
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

    this.meuForm.controls['IDPessoaContato'].disable();

    /* if (this.modelPessoaContato.IDPessoaContato > 0) {
       this.meuForm.get('inCodTipoDocumento').disable();
     }*/
  }

  private criarForm(emEdicao: boolean) {


    this.dataAniversario = undefined;

    if ((this.modelPessoaContato.inAniverMes != undefined) && (this.modelPessoaContato.inAniverDia != undefined)) {
      this.dataAniversario = new Date(new Date().getFullYear(), this.modelPessoaContato.inAniverMes - 1, this.modelPessoaContato.inAniverDia);
      this.modelPessoaContato["dtAniversario"] = this.dataAniversario;
    }


    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelPessoaContato, emEdicao);
      this.configurarStatusForm();
    } else {
      this.meuForm = this.formB.group({
        IDPessoaContato: [this.modelPessoaContato.IDPessoaContato],
        IDPessoa: [this.modelPessoaContato.IDPessoa],
        inCodTipoPessoaContato: [this.modelPessoaContato.inCodTipoPessoaContato, Validators.required],
        dtAniversario: this.dataAniversario,
        inCPF: [this.modelPessoaContato.inCPF],
        chNome: [this.modelPessoaContato.chNome, Validators.required],
        chDDDTelefone: [this.modelPessoaContato.chDDDTelefone],
        chNumTelefone: [this.modelPessoaContato.chNumTelefone],
        chNumRamal: [this.modelPessoaContato.chNumRamal],
        chDDDCelular: [this.modelPessoaContato.chDDDCelular],
        chNumCelular: [this.modelPessoaContato.chNumCelular],
        chEMail: [this.modelPessoaContato.chEMail],
        chDesCargo: [this.modelPessoaContato.chDesCargo],
        chDesDepartamento: [this.modelPessoaContato.chDesDepartamento],
        chDesObservacao: [this.modelPessoaContato.chDesObservacao],
        dtDatInclusao: [this.modelPessoaContato.dtDatInclusao],
        dtDatUltAlteracao: [this.modelPessoaContato.dtDatUltAlteracao],
      });
    }


  }

  private getDados() {

    var id: number;
    //id = +this.route.snapshot.paramMap.get('id');
    id = this.idCadastro;

    if (id == 0) {
      this.modelPessoaContato = new ModelPessoaContato();
      // this.modelPessoaContato.daDatExpedicao = null;
      // this.modelPessoaContato.dtDatInclusao = null;
      // this.modelPessoaContato.dtDatUltAlteracao = null;

      this.modelPessoaContato.IDPessoaContato = id;

      //pega da URL o id da pessoa
      //this.modelPessoaContato.IDPessoa = +this.route.snapshot.paramMap.get('id');
      
      this.modelPessoaContato.IDPessoa = this.apiPessoaContatoService.getIdPessoa()
      /*if (this.modelPessoaContato.IDPessoa == 0) {
        //ou no caso de ter sido uma inclusão, pega o id do cadastro pai
        //this.modelPessoaContato.IDPessoa  = this.cadastroBarraAcaoPai.cadastroBarraAcaoPai_getIdCadastro();
        this.modelPessoaContato.IDPessoa = this.apiPessoaContatoService.getIdPessoa()
      }
      if (this.modelPessoaContato.IDPessoa == 0 || this.modelPessoaContato.IDPessoa == undefined) {
        console.error('Não foi encontrado o id do cadastro da pessoa el');
      }*/

      this.criarForm(true);
      this.operacao = 'inclusao';

    } else {
      this.cadastroBarraAcao.exibirAguarde();

      this.apiPessoaContatoService.obter(id).then(
        dados_API => {
          this.modelPessoaContato = dados_API;

          if ((dados_API.inCPF.toString().length < 11)) {

            this.modelPessoaContato.inCPF = "0".repeat(11 - this.modelPessoaContato.inCPF.toString().length) + this.modelPessoaContato.inCPF.toString();

          } else {
            this.modelPessoaContato.inCPF = this.modelPessoaContato.inCPF.toString();
          }
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelPessoaContato);
    this.modelPessoaContato.inAniverDia =this.modelPessoaContato["dtAniversario"] .getDate();
    this.modelPessoaContato.inAniverMes = this.modelPessoaContato["dtAniversario"] .getMonth() + 1;
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
    this.apiPessoaContatoService.excluir(this.modelPessoaContato.IDPessoaContato).then(
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
    this.apiPessoaContatoService.alterar(this.modelPessoaContato).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaContato = sucesso;
        if ((sucesso.inCPF.toString().length < 11)) {

          this.modelPessoaContato.inCPF = "0".repeat(11 - this.modelPessoaContato.inCPF.toString().length) + this.modelPessoaContato.inCPF.toString();

        } else {
          this.modelPessoaContato.inCPF = this.modelPessoaContato.inCPF.toString();
        }
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
    this.apiPessoaContatoService.criar(this.modelPessoaContato).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelPessoaContato = sucesso;
        if ((sucesso.inCPF.toString().length < 11)) {

          this.modelPessoaContato.inCPF = "0".repeat(11 - this.modelPessoaContato.inCPF.toString().length) + this.modelPessoaContato.inCPF.toString();

        } else {
          this.modelPessoaContato.inCPF = this.modelPessoaContato.inCPF.toString();
        }
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
