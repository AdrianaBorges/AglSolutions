import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiSelectComponent } from '../../../../../../componentes/api-select/api-select.component';
import { InputModalPesquisaComponent } from '../../../../../../componentes/input-modal-pesquisa/input-modal-pesquisa.component';
import { ModelCtoCorSegEL01 } from '../../../../models/model-cto-cor-seg-el01';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiCtoCorSegEL01Service } from '../../../../api/api-cto-cor-seg-el01.service';
import { ApiPessoaElService } from '../../../../../corp/api/api-pessoa-el.service';
import { ApiTipoPapelService } from '../../../../../corp/api/api-tipo-papel.service';

@Component({
  selector: 'app-crude-cto-cor-seg-detalhe',
  templateUrl: './crude-cto-cor-seg-detalhe.component.html',
  styleUrls: ['./crude-cto-cor-seg-detalhe.component.scss']
})
export class CrudeCtoCorSegDetalheComponent implements OnInit {

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('selectTipoPapel', { static: true }) selectTipoPapel: ApiSelectComponent;
  @ViewChild('corretor', { static: true }) corretor: InputModalPesquisaComponent;
  @ViewChild('vinculoSuperior', { static: true }) vinculoSuperior: InputModalPesquisaComponent;

  public daDatIniVig: Date;
  public daDatFimVig: Date;
  public daDatRegSusep: Date;
  public daDatExpSusep: Date;

  private pessoa = {
    IDPessoa: 0,
    chNomePessoa: ""
  };
  private corretorUi = {
    chNumCtoCorSeg: "",
    chNomePessoa: ""
  };
  private vinculoSuperiorUi = {
    chNumCtoCorSeg: "",
    chNomePessoa: ""
  };


  public modelCtoCorSeg: ModelCtoCorSegEL01;
  public apiErrorCollection: ApiErrorCollection;


  public meuForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiCtoCorSegEL01Service: ApiCtoCorSegEL01Service,
    public apiCtoCorSegVinculoService: ApiCtoCorSegEL01Service,
    public apiCtoCorSegCorretorService: ApiCtoCorSegEL01Service,
    public apiTipoPapelService: ApiTipoPapelService,
    public apiPessoaElService: ApiPessoaElService,
    private formB: FormBuilder,
    private _location: Location,
  ) {
    this.modelCtoCorSeg = new ModelCtoCorSegEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }
  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  public getDialogCtor() {
    return this.apiCtoCorSegEL01Service.getColunasGridDialog();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.getCtoCorSeg();
    this.configurarStatusForm();
  }
  ngOnInit() {
    this.criarBreadCrumbs();
    this.inicializarDados();

  }

  private configurarStatusForm() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    this.meuForm.controls['IDCtoCorSeg'].disable();
    if (id > 0) {
      this.meuForm.get('chNumCtoCorSeg').disable();
      this.meuForm.get('inCodTipoPapel').disable();
      this.meuForm.get('UIData_PessoaUsuario').disable();

      if (this.modelCtoCorSeg.inCodSituacaoCad != 1) {
        this.meuForm.get('daDatIniVig').disable();
        this.meuForm.get('daDatFimVig').disable();
      } else {
        this.meuForm.get('daDatIniVig').enable();
        this.meuForm.get('daDatFimVig').enable();
      }
    }

  }

  private criarForm(emEdicao: boolean) {
    //emEdicao = emEdicao || false;

    this.pessoa.IDPessoa = this.modelCtoCorSeg.IDPessoa;
    this.pessoa.chNomePessoa = this.modelCtoCorSeg.chNomePessoa;
    var UIData_Pessoa = (this.pessoa.IDPessoa > 0 ? this.pessoa : null);
    this.modelCtoCorSeg['UIData_PessoaUsuario'] = UIData_Pessoa;

    this.corretorUi.chNumCtoCorSeg = this.modelCtoCorSeg.chNumCtoCorSegCorretor;//this.corretorUi.IDCtoCorSeg = this.modelCtoCorSeg.IDCtoCorSegCorretor;
    this.corretorUi.chNomePessoa = this.modelCtoCorSeg.chNomeCorretor;
    var UIData_PessoaCorretor = (this.corretorUi.chNumCtoCorSeg != null ? this.corretorUi : null);
    this.modelCtoCorSeg['UIData_PessoaCorretor'] = UIData_PessoaCorretor;


    this.vinculoSuperiorUi.chNumCtoCorSeg = this.modelCtoCorSeg.chNumCtoCorSegPai;
    this.vinculoSuperiorUi.chNomePessoa = this.modelCtoCorSeg.chNomePai;
    var UIData_PessoaVinculoSuperior = (this.vinculoSuperiorUi.chNumCtoCorSeg != null ? this.vinculoSuperiorUi : null);
    this.modelCtoCorSeg['UIData_PessoaVinculoSuperior'] = UIData_PessoaVinculoSuperior;

    if (this.modelCtoCorSeg.daDatFimVig) {
      this.modelCtoCorSeg.daDatFimVig = new Date(this.modelCtoCorSeg.daDatFimVig);
    }

    if (this.modelCtoCorSeg.daDatIniVig) {
      this.modelCtoCorSeg.daDatIniVig = new Date(this.modelCtoCorSeg.daDatIniVig);
    }

    if (this.modelCtoCorSeg.daDatRegSusep) {
      this.modelCtoCorSeg.daDatRegSusep = new Date(this.modelCtoCorSeg.daDatRegSusep);
    }

    if (this.modelCtoCorSeg.daDatExpSusep) {
      this.modelCtoCorSeg.daDatExpSusep = new Date(this.modelCtoCorSeg.daDatExpSusep);
    }


    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelCtoCorSeg, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDCtoCorSeg: [this.modelCtoCorSeg.IDCtoCorSeg],
        UIData_PessoaUsuario: [this.modelCtoCorSeg['UIData_PessoaUsuario'], Validators.required],
        UIData_PessoaCorretor: [this.modelCtoCorSeg['UIData_PessoaCorretor']],
        UIData_PessoaVinculoSuperior: [this.modelCtoCorSeg['UIData_PessoaVinculoSuperior']],
        daDatIniVig: [this.modelCtoCorSeg.daDatIniVig, Validators.required],
        daDatFimVig: [this.modelCtoCorSeg.daDatFimVig, Validators.required],
        chNomeAbreviado: [this.modelCtoCorSeg.chNomeAbreviado, Validators.required],
        chNumCtoCorSeg: [this.modelCtoCorSeg.chNumCtoCorSeg, Validators.required],
        chNumSusep: [this.modelCtoCorSeg.chNumSusep],
        daDatRegSusep: [this.modelCtoCorSeg.daDatRegSusep],
        daDatExpSusep: [this.modelCtoCorSeg.daDatExpSusep],
        inCodTipoPapel: [this.modelCtoCorSeg.inCodTipoPapel, Validators.required]
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {


    if (this.meuForm.get("UIData_PessoaUsuario").value) {
      this.modelCtoCorSeg.IDPessoa = this.meuForm.get("UIData_PessoaUsuario").value.IDPessoa;

    } else {
      this.modelCtoCorSeg.IDPessoa = null;;
    }


    if (this.meuForm.value.UIData_PessoaCorretor) {
      //IDCtoCorSegCorretor
      this.modelCtoCorSeg.chNumCtoCorSegCorretor = this.meuForm.value.UIData_PessoaCorretor.chNumCtoCorSeg;
      //pego a chave estrangeira
      if (this.meuForm.value.UIData_PessoaCorretor.objetoSelecionado) {
        this.modelCtoCorSeg.IDCtoCorSegCorretor = this.meuForm.value.UIData_PessoaCorretor.objetoSelecionado.IDCtoCorSeg;
      }

    } else {
      this.modelCtoCorSeg.IDCtoCorSegCorretor = null;
    }

    if (this.meuForm.value.UIData_PessoaVinculoSuperior) {
      //IDCtoCorSegCorretor
      this.modelCtoCorSeg.chNumCtoCorSegPai = this.meuForm.value.UIData_PessoaVinculoSuperior.chNumCtoCorSeg;
      if (this.meuForm.value.UIData_PessoaVinculoSuperior.objetoSelecionado) {
        this.modelCtoCorSeg.IDCtoCorSegPai = this.meuForm.value.UIData_PessoaVinculoSuperior.objetoSelecionado.IDCtoCorSeg;
      }


    } else {
      this.modelCtoCorSeg.IDCtoCorSegPai = null;;
    }

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelCtoCorSeg);




  }

  private getCtoCorSeg() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma ProdSeg física nova
      this.modelCtoCorSeg = new ModelCtoCorSegEL01();
      this.modelCtoCorSeg.IDCtoCorSeg = 0;
      this.modelCtoCorSeg.daDatFimVig = null;
      this.modelCtoCorSeg.daDatIniVig = null;
      this.modelCtoCorSeg.daDatExpSusep = null;
      this.modelCtoCorSeg.daDatRegSusep = null;

      this.modelCtoCorSeg.inCodSituacaoCad = 0;
      this.modelCtoCorSeg.chDesSituacaoCad = "";


      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


      //carrego os dados da ProdSeg física do id recebido 
      this.apiCtoCorSegEL01Service.obter(id).then(
        ProdSeg => {
          this.modelCtoCorSeg = ProdSeg;
          this.configurarStatusForm();
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

  btnCancelar() {
    this.getCtoCorSeg();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.modelCtoCorSeg.IDCtoCorSeg > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiCtoCorSegEL01Service.excluir(this.modelCtoCorSeg.IDCtoCorSeg).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiCtoCorSegEL01Service.alterar(this.modelCtoCorSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCtoCorSeg = sucesso;
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
    this.apiCtoCorSegEL01Service.criar(this.modelCtoCorSeg).then(
      sucesso => {
        //this.meuForm.reset();
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelCtoCorSeg = sucesso;
        //this.meuForm.controls['inNumIdentificacao'].disable();
        this.criarForm(false);
        this.meuForm.get('chNumCtoCorSeg').disable();
        this.meuForm.get('inCodTipoPapel').disable();
        this.meuForm.get('UIData_PessoaUsuario').disable();

        if (this.modelCtoCorSeg.inCodSituacaoCad != 1) {
          this.meuForm.get('daDatIniVig').disable();
          this.meuForm.get('daDatFimVig').disable();
        }
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
