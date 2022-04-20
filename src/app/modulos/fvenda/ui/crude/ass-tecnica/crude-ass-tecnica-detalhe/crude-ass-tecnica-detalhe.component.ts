import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { ApiEstabelecimentoService } from '../../../../../corp/api/api-estabelecimento.service';
import { ApiPapelPessoaService } from '../../../../../corp/api/api-papel-pessoa.service';
import { ApiAssTecnicaEL01Service } from '../../../../api/api-ass-tecnica-el01.service';
import { ApiClienteEL02Service } from '../../../../api/api-cliente-el02.service';
import { ApiOrigemAssTecService } from '../../../../api/api-origem-ass-tec.service';
import { ApiRepresVendaEL01Service } from '../../../../api/api-repres-venda-el01.service';
import { ApiTipoAssTecEL01Service } from '../../../../api/api-tipo-ass-tec-el01.service';
import { ApiTipoTecnicoService } from '../../../../api/api-tipo-tecnico.service';
import { ModelAssTecnicaEL01 } from '../../../../models/model-ass-tecnica-EL01';
import { Location } from "@angular/common";
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { InputModalPesquisaComponent } from '../../../../../../componentes/input-modal-pesquisa/input-modal-pesquisa.component';
import { ApiTecnicoEL01Service } from '../../../../api/api-tecnico-el01.service';

@Component({
  selector: 'app-crude-ass-tecnica-detalhe',
  templateUrl: './crude-ass-tecnica-detalhe.component.html',
  styleUrls: ['./crude-ass-tecnica-detalhe.component.scss']
})
export class CrudeAssTecnicaDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild("pesquisa", { static: true }) pesquisa: InputModalPesquisaComponent;
  private representante = {
    chNomeRepresentante: '',
    inCodRepresentante: 0
  };

  private tecnico = {
    chNomePessoa: '',
    IDPapelPessoa: 0
  };

  private cliente = {
    chNomeCliente: '',
    IDClienteVenda: 0,
    inCodCliente: 0
  };
  public meuForm: FormGroup;
  public modelAssTecnicaEL01: ModelAssTecnicaEL01;
  public apiErrorCollection: ApiErrorCollection;
  private operacao: 'inclusao' | 'edicao';
  private consulta: boolean;
  private idCadastro: number;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
    public apiAssTecnicaEL01Service: ApiAssTecnicaEL01Service,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    public apiTipoAssTecEL01Service: ApiTipoAssTecEL01Service,
    public apiOrigemAssTecService: ApiOrigemAssTecService,
    public apiTipoTecnicoService: ApiTipoTecnicoService,
    public apiTecnicoEL01Service: ApiTecnicoEL01Service,
    public apiRepresVendaEL01Service: ApiRepresVendaEL01Service,
    public apiPapelPessoaService: ApiPapelPessoaService,
    public apiClienteEL02Service: ApiClienteEL02Service,
    private _location: Location,
    private router: Router
  ) {
    this.modelAssTecnicaEL01 = new ModelAssTecnicaEL01();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }
  mudancaRepresentante(dado: any) {
    this.apiClienteEL02Service.obter(dado.IDCliente).then(r => {
      this.representante.inCodRepresentante = r.inCodRepresentante;
      this.representante.chNomeRepresentante = r.chNomeRepresentante;
      this.representante["objetoSelecionado"] = {
        IDRepresentante: r.IDRepresentante
      };
      this.modelAssTecnicaEL01["UIData_Representante"] = this.representante;
      this.meuForm.get('UIData_Representante').setValue(this.representante);
    });
  }

  // /**
  //  * Deve ser chamada pelo evento do grid de pesquisa, 
  //  * seja para criar um novo registro ou para exibir 
  //  * para edição ou exclusão
  //  * @param id zero se for um novo cadastro e um valor 
  //  * se for para abrir para edição ou exclusão
  //  */
  // public gridInterfaceTabCadastroFilho_setIdCadastro(id: string): void {
  //   this.idCadastro = +id;
  //   this.getAssTecnicaEL01();
  //   //this.configurarStatusForm();
  // }

  public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent {
    return this.cadastroBarraAcao;
  }

  private inicializarDados() {
    this.criarForm(true);
    this.configurarStatusForm();
    this.getAssTecnicaEL01();
  }

  private criarBreadCrumbs() {
    var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {
      this.meuForm.get('UIData_Cliente').disable();
      this.meuForm.get('IDEstabelec').disable();
      this.meuForm.get('inCodTipoAssTec').disable();
      this.meuForm.get('inCodOrigemAssTec').disable();
      this.meuForm.get('inCodOrigemAssTec').disable();
    }
    this.meuForm.controls['IDAssTecnica'].disable();
  }

  private criarForm(emEdicao: boolean) {
    this.representante.chNomeRepresentante = this.modelAssTecnicaEL01.chNomeRepresentante;
    this.representante.inCodRepresentante = this.modelAssTecnicaEL01.inCodRepresentante;

    var UIData_Representante = (this.representante.inCodRepresentante > 0 ? this.representante : null);
    this.modelAssTecnicaEL01['UIData_Representante'] = UIData_Representante;

    this.cliente.chNomeCliente = this.modelAssTecnicaEL01.chNomeCliente;
    this.cliente.inCodCliente = this.modelAssTecnicaEL01.inCodCliente;
    this.cliente.IDClienteVenda = this.modelAssTecnicaEL01.IDClienteVenda;

    var UIData_Cliente = (this.cliente.IDClienteVenda > 0 ? this.cliente : null);
    this.modelAssTecnicaEL01['UIData_Cliente'] = UIData_Cliente;

    this.tecnico.IDPapelPessoa = this.modelAssTecnicaEL01.IDPapelPessoaTecnico;
    this.tecnico.chNomePessoa = this.modelAssTecnicaEL01.chNomeTecnico;
    var UIData_PapelPessoaTecnico = (this.tecnico.IDPapelPessoa > 0 ? this.tecnico : null);
    this.modelAssTecnicaEL01['UIData_PapelPessoaTecnico'] = UIData_PapelPessoaTecnico;




    if (this.modelAssTecnicaEL01.dtDatAbertura) {
      this.modelAssTecnicaEL01.dtDatAbertura = new Date(this.modelAssTecnicaEL01.dtDatAbertura);
    }

    if (this.modelAssTecnicaEL01.daDatEmisNFEntrada) {
      this.modelAssTecnicaEL01.daDatEmisNFEntrada = new Date(this.modelAssTecnicaEL01.daDatEmisNFEntrada);
    }

    if (this.modelAssTecnicaEL01.daDatVendaFinal) {
      this.modelAssTecnicaEL01.daDatVendaFinal = new Date(this.modelAssTecnicaEL01.daDatVendaFinal);
    }

    if (this.modelAssTecnicaEL01.dtDatEncerram) {
      this.modelAssTecnicaEL01.dtDatEncerram = new Date(this.modelAssTecnicaEL01.dtDatEncerram);
    }

    if (this.modelAssTecnicaEL01.dtDatInclusao) {
      this.modelAssTecnicaEL01.dtDatInclusao = new Date(this.modelAssTecnicaEL01.dtDatInclusao);
    }

    if (this.modelAssTecnicaEL01.dtDatRecebItem) {
      this.modelAssTecnicaEL01.dtDatRecebItem = new Date(this.modelAssTecnicaEL01.dtDatRecebItem);
    }

    if (this.modelAssTecnicaEL01.dtDatUltAlteracao) {
      this.modelAssTecnicaEL01.dtDatUltAlteracao = new Date(this.modelAssTecnicaEL01.dtDatUltAlteracao);
    }

    if (this.modelAssTecnicaEL01.dtDatEncerram) {
      this.modelAssTecnicaEL01.dtDatEncerram = new Date(this.modelAssTecnicaEL01.dtDatEncerram);
    }

    if (this.modelAssTecnicaEL01.dtDatEncerram) {
      this.modelAssTecnicaEL01.dtDatEncerram = new Date(this.modelAssTecnicaEL01.dtDatEncerram);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelAssTecnicaEL01, emEdicao);
      if (this.modelAssTecnicaEL01.inCodSituacaoAssTec) {
        if (this.modelAssTecnicaEL01.inCodSituacaoAssTec != 1) {
          this.cadastroBarraAcao.setModoConsulta();
        }
      }
    }
    else {
      this.meuForm = this.formB.group({
        IDAssTecnica: [this.modelAssTecnicaEL01.IDAssTecnica],
        IDEstabelec: [this.modelAssTecnicaEL01.IDEstabelec, Validators.required],
        inNumAssTecnica: [this.modelAssTecnicaEL01.inNumAssTecnica],
        UIData_Representante: [UIData_Representante, Validators.required],
        UIData_Cliente: [UIData_Cliente, Validators.required],
        UIData_PapelPessoaTecnico: [UIData_PapelPessoaTecnico],
        inCodOrigemAssTec: [this.modelAssTecnicaEL01.inCodOrigemAssTec, Validators.required],
        dtDatAbertura: [this.modelAssTecnicaEL01.dtDatAbertura, Validators.required],
        inCodTipoAssTec: [this.modelAssTecnicaEL01.inCodTipoAssTec, Validators.required],
        chNomContatoCliente: [this.modelAssTecnicaEL01.chNomContatoCliente],
        chNumPedCliente: [this.modelAssTecnicaEL01.chNumPedCliente],
        IDPapelPessoaTecnico: [this.modelAssTecnicaEL01.IDPapelPessoaTecnico],
        inCodTipoTecnico: [this.modelAssTecnicaEL01.inCodTipoTecnico],
        IDTecnico: [this.modelAssTecnicaEL01.IDTecnico],
        chNumAtendExt: [this.modelAssTecnicaEL01.chNumAtendExt],
        chNumNFVendaFinal: [this.modelAssTecnicaEL01.chNumNFVendaFinal],
        daDatVendaFinal: [this.modelAssTecnicaEL01.daDatVendaFinal],
        chCodSerieNFEntrada: [this.modelAssTecnicaEL01.chCodSerieNFEntrada],
        chNumNFEntrada: [this.modelAssTecnicaEL01.chNumNFEntrada],
        daDatEmisNFEntrada: [this.modelAssTecnicaEL01.daDatEmisNFEntrada],
        dtDatRecebItem: [this.modelAssTecnicaEL01.dtDatRecebItem],
        chDesObservacao: [this.modelAssTecnicaEL01.chDesObservacao],
        chDesMotivoCanc: [this.modelAssTecnicaEL01.chDesMotivoCanc],
        dtDatInclusao: [this.modelAssTecnicaEL01.dtDatInclusao],
        chNomeUsuarioInclusao: [this.modelAssTecnicaEL01.chNomeUsuarioInclusao],
        dtDatUltAlteracao: [this.modelAssTecnicaEL01.dtDatUltAlteracao],
        chNomeUsuarioAlteracao: [this.modelAssTecnicaEL01.chNomeUsuarioAlteracao],
        dtDatEncerram: [this.modelAssTecnicaEL01.dtDatEncerram],
        chNomeUsuarioEncerram: [this.modelAssTecnicaEL01.chNomeUsuarioEncerram],
      });
    }
  }

  public getImageSituacao() {

    if (this.modelAssTecnicaEL01 && this.modelAssTecnicaEL01.inCodSituacaoAssTec) {
      return `assets/img/Face${this.modelAssTecnicaEL01.inCodSituacaoAssTec == 1 ? '01' : this.modelAssTecnicaEL01.inCodSituacaoAssTec == 2 ? '02' : this.modelAssTecnicaEL01.inCodSituacaoAssTec == 3 ? "04" : "01"}.png`;
    } else {
      return undefined;
    }
  }

  private getAssTecnicaEL01() {

    var id: number;
    id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.modelAssTecnicaEL01 = new ModelAssTecnicaEL01();
      this.modelAssTecnicaEL01.IDAssTecnica = 0;
      this.modelAssTecnicaEL01.inCodSituacaoAssTec = 1;
      this.modelAssTecnicaEL01.dtDatAbertura = null;
      this.modelAssTecnicaEL01.dtDatEncerram = null;
      this.modelAssTecnicaEL01.dtDatInclusao = null;
      this.modelAssTecnicaEL01.dtDatUltAlteracao = null;
      this.modelAssTecnicaEL01.daDatEmisNFEntrada = null;
      this.modelAssTecnicaEL01.daDatVendaFinal = null;
      this.modelAssTecnicaEL01.dtDatRecebItem = null;

      this.modelAssTecnicaEL01.IDClienteVenda = null;
      this.modelAssTecnicaEL01.IDRepresentante = null;
      this.modelAssTecnicaEL01.IDPapelPessoaTecnico = null;
      this.modelAssTecnicaEL01.IDEstabelec = null;
      this.modelAssTecnicaEL01.inNumAssTecnica = null;
      this.modelAssTecnicaEL01.inCodOrigemAssTec = null;
      this.modelAssTecnicaEL01.inCodTipoAssTec = null;
      this.modelAssTecnicaEL01.chNomContatoCliente = "";
      this.modelAssTecnicaEL01.chNumPedCliente = "";
      this.modelAssTecnicaEL01.inCodTipoTecnico = null;
      this.modelAssTecnicaEL01.chNumAtendExt = "";
      this.modelAssTecnicaEL01.chNumNFVendaFinal = "";
      this.modelAssTecnicaEL01.chCodSerieNFEntrada = "";
      this.modelAssTecnicaEL01.chNumNFEntrada = "";
      this.modelAssTecnicaEL01.chDesObservacao = "";
      this.modelAssTecnicaEL01.chDesMotivoCanc = "";

      this.modelAssTecnicaEL01.IDTecnico = null;

      this.modelAssTecnicaEL01.chNomeUsuarioInclusao = "";
      this.modelAssTecnicaEL01.chNomeUsuarioAlteracao = "";
      this.modelAssTecnicaEL01.chNomeUsuarioEncerram = "";

      this.operacao = 'inclusao';
      this.criarForm(true);

    } else {

      this.apiAssTecnicaEL01Service.obter(id).then(
        dados_API => {

          this.modelAssTecnicaEL01 = dados_API;
          // this.AlteraTecnico(this.modelAssTecnicaEL01.inCodTipoTecnico);
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
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelAssTecnicaEL01);

    if (this.meuForm.value.UIData_Representante) {
      this.modelAssTecnicaEL01.chNomeRepresentante = this.meuForm.value.UIData_Representante.chNomeRepresentante;
      this.modelAssTecnicaEL01.inCodRepresentante = this.meuForm.value.UIData_Representante.inCodRepresentante;
      if (this.meuForm.value.UIData_Representante.objetoSelecionado) {
        this.modelAssTecnicaEL01.IDRepresentante = this.meuForm.value.UIData_Representante.objetoSelecionado.IDRepresentante;
      }
    } else {
      this.modelAssTecnicaEL01.chNomeRepresentante = '';
      this.modelAssTecnicaEL01.IDRepresentante = null;
    }

    if (this.meuForm.value.UIData_Cliente) {
      this.modelAssTecnicaEL01.chNomeCliente = this.meuForm.value.UIData_Cliente.chNomeCliente;
      if (this.meuForm.value.UIData_Cliente.objetoSelecionado) {
        this.modelAssTecnicaEL01.IDClienteVenda = this.meuForm.value.UIData_Cliente.objetoSelecionado.IDClienteVenda;
      }
    } else {
      this.modelAssTecnicaEL01.chNomeCliente = '';
      this.modelAssTecnicaEL01.IDClienteVenda = null;
    }

    if (this.meuForm.value.UIData_PapelPessoaTecnico) {
      if (this.meuForm.value.UIData_PapelPessoaTecnico.objetoSelecionado) {
        this.modelAssTecnicaEL01.IDPapelPessoaTecnico = this.meuForm.value.UIData_PapelPessoaTecnico.objetoSelecionado.IDPapelPessoa;
      }
    } else {
      this.modelAssTecnicaEL01.IDPapelPessoaTecnico = null;
    }
  }

  btnCancelar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.getAssTecnicaEL01();
    this.cadastroBarraAcao.esconderAguarde();
  }
  AlteraTecnico(event) {
    if (event == 1)
      this.apiPapelPessoaService.setInCodTipoPapel([3]);
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
    this.apiAssTecnicaEL01Service.excluir(this.modelAssTecnicaEL01.IDAssTecnica).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiAssTecnicaEL01Service.alterar(this.modelAssTecnicaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecnicaEL01 = sucesso;
        this.criarForm(false);
        this.configurarStatusForm();
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
    this.apiAssTecnicaEL01Service.criar(this.modelAssTecnicaEL01).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelAssTecnicaEL01 = sucesso;
        this.meuForm.get('UIData_Cliente').disable();
        this.meuForm.get('IDEstabelec').disable();
        this.meuForm.get('inCodTipoAssTec').disable();
        this.meuForm.get('inCodOrigemAssTec').disable();
        this.meuForm.get('inCodOrigemAssTec').disable();
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
