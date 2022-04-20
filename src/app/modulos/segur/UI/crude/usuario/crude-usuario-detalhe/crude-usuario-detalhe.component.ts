import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModelUsuario } from '../../../../models/model-usuario';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiTipoUsuarioService } from '../../../../api/api-tipo-usuario.service';
import { ApiPessoaElService } from '../../../../../corp/api/api-pessoa-el.service';
import { Location } from "@angular/common";
import { ApiUsuariosEL01Service } from '../../../../api/api-usuarios-el01.service';
import { ApiPapelPessoaService } from '../../../../../corp/api/api-papel-pessoa.service';
import { ApiGruposDoUsuarioService } from '../../../../api/api-grupos-do-usuario.service';
import { InputModalPesquisaComponent } from '../../../../../../componentes/input-modal-pesquisa/input-modal-pesquisa.component';

@Component({
  selector: 'app-crude-usuario-detalhe',
  templateUrl: './crude-usuario-detalhe.component.html',
  styleUrls: ['./crude-usuario-detalhe.component.scss']
})
export class CrudeUsuarioDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('PessoaVinculado', { static: true }) UIPessoaVinculado: InputModalPesquisaComponent;
  private pessoa = {
    IDPessoa: 0,
    chNomePessoa: ""
  };

  private pessoaVinculada = {
    IDPapelPessoa: 0,
    chNomePessoa: ""
  };

  public meuForm: FormGroup;
  public modelUsuario: ModelUsuario;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiUsuarioService: ApiUsuariosEL01Service,
    public apiUsuariosGrupoService: ApiGruposDoUsuarioService,
    public apiTipoUsuarioService: ApiTipoUsuarioService,
    public apiPessoaService: ApiPessoaElService,
    public apiPessoaVinculadaService: ApiPapelPessoaService,
    private _location: Location,
  ) {
    this.apiErrorCollection = new ApiErrorCollection();
    this.modelUsuario = new ModelUsuario();
  }

  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados() {

    this.criarForm(true);
    this.configurarStatusForm();
    this.getUsuario();
  }

  private configurarStatusForm() {

    var id = this.route.snapshot.paramMap.get('id');

    if (id != "0") {
      this.meuForm.get('chCodUsuario').disable();
      this.meuForm.get('UIData_PessoaUsuario').disable();
    }

  }

  public alterarPessoaVinculada(dados) {
    if (((this.operacao == 'edicao') && (this.modelUsuario.inCodTipoUsuario == dados))) {
      this.pessoaVinculada.IDPapelPessoa = this.modelUsuario.IDPapelPessoaVinculada;
      this.pessoaVinculada.chNomePessoa = this.modelUsuario.chNomePessoaVinculada;
      this.meuForm.get("UIData_PessoaVinculada").setValue(this.pessoaVinculada);
    } else {
      this.meuForm.get("UIData_PessoaVinculada").setValue(null);
      if (Number(dados) < 100) {
        this.apiPessoaVinculadaService.setInCodTipoPapel([1, 2]);
        this.UIPessoaVinculado.filtroAlterado("PapelPessoa.inCodTipoPapel", 'in', "(" + [1, 2].join(',') + ")");

      }
      else if (Number(dados) == 100) {
        this.apiPessoaVinculadaService.setInCodTipoPapel([4]);
        this.UIPessoaVinculado.filtroAlterado("PapelPessoa.inCodTipoPapel", 'in', "(" + [4].join(',') + ")");
      }
      else if (Number(dados) == 101) {
        this.apiPessoaVinculadaService.setInCodTipoPapel([5]);
        this.UIPessoaVinculado.filtroAlterado("PapelPessoa.inCodTipoPapel", 'in', "(" + [5].join(',') + ")");
      }
      else if (Number(dados) == 102) {
        this.apiPessoaVinculadaService.setInCodTipoPapel([6]);
        this.UIPessoaVinculado.filtroAlterado("PapelPessoa.inCodTipoPapel", 'in', "(" + [6].join(',') + ")");
      }
      else if (Number(dados) == 103) {
        this.apiPessoaVinculadaService.setInCodTipoPapel([8]);
        this.UIPessoaVinculado.filtroAlterado("PapelPessoa.inCodTipoPapel", 'in', "(" + [8].join(',') + ")");
      }
      else if (Number(dados) == 104) {
        this.apiPessoaVinculadaService.setInCodTipoPapel([12]);
        this.UIPessoaVinculado.filtroAlterado("PapelPessoa.inCodTipoPapel", 'in', "(" + [12].join(',') + ")");
      }
      else if (Number(dados) == 105) {
        this.apiPessoaVinculadaService.setInCodTipoPapel([9]);
        this.UIPessoaVinculado.filtroAlterado("PapelPessoa.inCodTipoPapel", 'in', "(" + [9].join(',') + ")");
      }
    }

    if (Number(dados) < 100) {
      this.apiPessoaVinculadaService.setInCodTipoPapel([1, 2]);
    }
    else if (Number(dados) == 100) {
      this.apiPessoaVinculadaService.setInCodTipoPapel([4]);
    }
    else if (Number(dados) == 101) {
      this.apiPessoaVinculadaService.setInCodTipoPapel([5]);
    }
    else if (Number(dados) == 102) {
      this.apiPessoaVinculadaService.setInCodTipoPapel([6]);
    }
    else if (Number(dados) == 103) {
      this.apiPessoaVinculadaService.setInCodTipoPapel([8]);
    }
    else if (Number(dados) == 104) {
      this.apiPessoaVinculadaService.setInCodTipoPapel([12]);
    }
    else if (Number(dados) == 105) {
      this.apiPessoaVinculadaService.setInCodTipoPapel([9]);
    }



  }

  private criarForm(emEdicao: boolean) {

    this.pessoa.IDPessoa = this.modelUsuario.IDPessoaUsuario;
    this.pessoa.chNomePessoa = this.modelUsuario.chNomePessoaUsuario;
    var UIData_PessoaUsuario = (this.pessoa.IDPessoa > 0 ? this.pessoa : null);
    this.modelUsuario['UIData_PessoaUsuario'] = UIData_PessoaUsuario;

    this.pessoaVinculada.IDPapelPessoa = this.modelUsuario.IDPapelPessoaVinculada;
    this.pessoaVinculada.chNomePessoa = this.modelUsuario.chNomePessoaVinculada;
    var UIData_PessoaVinculada = (this.pessoaVinculada.IDPapelPessoa > 0 ? this.pessoaVinculada : null);
    this.modelUsuario['UIData_PessoaVinculada'] = UIData_PessoaVinculada;

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelUsuario, emEdicao);

      this.meuForm.get("UIData_PessoaVinculada").setValue(UIData_PessoaVinculada);
      this.meuForm.get("UIData_PessoaUsuario").setValue(UIData_PessoaUsuario);
    } else {
      this.meuForm = this.formB.group({
        chCodUsuario: new FormControl(this.modelUsuario.chCodUsuario, [Validators.required, Validators.maxLength(50)]),
        IDPessoaUsuario: [this.modelUsuario.IDPessoaUsuario],
        UIData_PessoaUsuario: [UIData_PessoaUsuario, [Validators.required]],
        UIData_PessoaVinculada: new FormControl(UIData_PessoaVinculada),
        chNomeUsuario: new FormControl(this.modelUsuario.chNomeUsuario, [Validators.required, Validators.maxLength(50)]),
        chEMail: new FormControl(this.modelUsuario.chEMail, [Validators.required, Validators.maxLength(50)]),
        inCodTipoUsuario: new FormControl(this.modelUsuario.inCodTipoUsuario, [Validators.required]),
        chDesSituacaoCad: new FormControl(this.modelUsuario.chDesSituacaoCad),
        lgAlteraPass1oAcesso: new FormControl(this.modelUsuario.lgAlteraPass1oAcesso)
      });
    }

  }

  private getUsuario() {

    var id: string;
    id = this.route.snapshot.paramMap.get('id');

    if (id == "0") {
      this.modelUsuario = new ModelUsuario();
      this.modelUsuario.chCodUsuario = "";
      //this.modelUsuario.IDPessoaVinculada = undefined;
      this.modelUsuario.IDPapelPessoaVinculada = undefined;
      this.modelUsuario.IDPessoaUsuario = undefined;
      this.modelUsuario.chNomeUsuario = "";
      this.modelUsuario.chEMail = "";
      this.modelUsuario.inCodTipoUsuario = undefined;
      this.modelUsuario.lgAlteraPass1oAcesso = true;
      this.modelUsuario.chDesSituacaoCad = "";
      this.criarForm(true);
      this.operacao = 'inclusao';
    } else {

      this.apiUsuarioService.obter(id).then(
        dados_API => {
          this.modelUsuario = dados_API;
          this.apiUsuariosGrupoService.setCodUsuario(this.modelUsuario.chCodUsuario);
          this.operacao = 'edicao';
          this.criarForm(false);
          this.alterarPessoaVinculada(this.modelUsuario.inCodTipoUsuario);


        },
        erro => {
          this.apiErrorCollection = erro;
        }
      );
    }

  }

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelUsuario);
    if (this.meuForm.value.UIData_PessoaUsuario) {
      this.modelUsuario.IDPessoaUsuario = this.meuForm.value.UIData_PessoaUsuario.IDPessoa;
      this.modelUsuario.chNomePessoaUsuario = this.meuForm.value.UIData_PessoaUsuario.chNomePessoa;
    } else {
      this.modelUsuario.IDPessoaUsuario = null;
      this.modelUsuario.chNomePessoaUsuario = null;
    }
    if (this.meuForm.value.UIData_PessoaVinculada) {
      this.modelUsuario.IDPapelPessoaVinculada = this.meuForm.value.UIData_PessoaVinculada.IDPapelPessoa;
      this.modelUsuario.chNomePessoaVinculada = this.meuForm.value.UIData_PessoaVinculada.chNomePessoa;
    } else {
      this.modelUsuario.IDPapelPessoaVinculada = null;
      this.modelUsuario.chNomePessoaVinculada = null;
    }

  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getUsuario();
    this.cadastroBarraAcao.esconderAguarde();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    this.modelUsuario.IDPapelPessoaVinculada = (this.modelUsuario.IDPapelPessoaVinculada == 0) ? null : this.modelUsuario.IDPapelPessoaVinculada;
    this.modelUsuario.IDPapelPessoaVinculada = (this.modelUsuario.IDPapelPessoaVinculada == undefined) ? null : this.modelUsuario.IDPapelPessoaVinculada;
    if (this.operacao == 'edicao') {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiUsuarioService.excluir(this.modelUsuario.chCodUsuario).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiUsuarioService.alterar(this.modelUsuario).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelUsuario = sucesso;
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
    this.apiUsuarioService.criar(this.modelUsuario).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelUsuario = sucesso;
        this.meuForm.controls['chCodUsuario'].disable();
        this.meuForm.controls['UIData_PessoaUsuario'].disable();
        this.apiUsuariosGrupoService.setCodUsuario(this.modelUsuario.chCodUsuario);
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