import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

//Componentes
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';

//Modelo de dados
import { ModelProdSeg } from '../../../../models/model-prod-seg';
import { ModelSeguradora } from '../../../../models/model-seguradora';
import { ApiProdSegService } from '../../../../api/api-prod-seg.service';
import { ApiTipoSeguroService } from '../../../../api/api-tipo-seguro.service';
import { ApiTipoCobrancaSegService } from '../../../../api/api-tipo-cobranca-seg.service';
import { ApiCoberturaSegService } from '../../../../api/api-cobertura-seg.service';
import { ApiSeguradoraService } from '../../../../api/api-seguradora.service';
import { ApiGrupoSeguroService } from '../../../../api/api-grupo-seguro.service';
import { ApiRamoSeguroService } from '../../../../api/api-ramo-seguro.service';
import { ApiTipoPerContribService } from '../../../../api/api-tipo-per-contrib.service';
import { ApiSequeciaService } from '../../../../../corp/api/api-sequecia.service';
import { ApiProdSegAssistService } from '../../../../api/api-prod-seg-assist.service';
import { ApiProdSegValorService } from '../../../../api/api-prod-seg-valor.service';
import { ApiProdSegCoberturaService } from '../../../../api/api-prod-seg-cobertura.service';
import { ApiProdSegCondPagtoService } from '../../../../api/api-prod-seg-cond-pagto.service';
import { ApiProdSegFormaCobService } from '../../../../api/api-prod-seg-forma-cob.service';
import { ApiSelectComponent } from '../../../../../../componentes/api-select/api-select.component';


@Component({
  selector: 'app-crude-prod-seg-detalhe',
  templateUrl: './crude-prod-seg-detalhe.component.html',
  styleUrls: ['./crude-prod-seg-detalhe.component.scss']
})
export class CrudeProdSegDetalheComponent implements OnInit {

  @ViewChild('cadastroBarraAcao', { static: true }) cadastroBarraAcao: CadastroBarraAcaoComponent;
  @ViewChild('selectRamoSeguro', { static: true }) selectRamoSeguro: ApiSelectComponent;
  @ViewChild('selectCoberturaPrincipal', { static: true }) selectCoberturaPrincipal: ApiSelectComponent;

  public dtIniVendas: Date;
  public dtFimVendas: Date;
  //public modoExclusao: boolean;

  public modelProdSeg: ModelProdSeg;
  public modelSeguradora: ModelSeguradora;
  public apiErrorCollection: ApiErrorCollection;


  public meuForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiProdSegService: ApiProdSegService,
    public apiTipoSeguroService: ApiTipoSeguroService,
    public apiTipoCobrancaSegService: ApiTipoCobrancaSegService,
    public apiCoberturaSegService: ApiCoberturaSegService,
    public apiSeguradoraService: ApiSeguradoraService,
    public apiGrupoSeguroService: ApiGrupoSeguroService,
    public apiRamoSeguroService: ApiRamoSeguroService,
    public apiTipoPerContribService: ApiTipoPerContribService,
    public apiSequenciaService: ApiSequeciaService,
    private formB: FormBuilder,
    private _location: Location,
    private apiProdSegAssistService: ApiProdSegAssistService,
    private apiProdSegValorService: ApiProdSegValorService,
    private apiProdSegCoberturaService: ApiProdSegCoberturaService,
    private apiProdSegCondPagtoService: ApiProdSegCondPagtoService,
    private apiProdSegFormaCobService: ApiProdSegFormaCobService,
  ) {
    this.modelProdSeg = new ModelProdSeg();
    this.modelSeguradora = new ModelSeguradora();
    this.apiErrorCollection = new ApiErrorCollection();
  }

  PopularRamo(dado) {
    this.apiRamoSeguroService.setInCodGrupoSeguro(dado);
    this.selectRamoSeguro.filtroAlterado("RamoSeguro.inCodGrupoSeguro", 'eq', dado);

    if (this.meuForm.get('inCodGrupoSeguro').value != dado) {
      this.meuForm.get('IDRamoSeguro').setValue(null);
    }

  }

  PopularCoberturaPrincipal(dado) {

    this.apiCoberturaSegService.setIDSeguradora(dado);
    this.selectCoberturaPrincipal.filtroAlterado("CoberturaSeg.IDSeguradora", 'eq', dado);

    if (this.meuForm.get('IDSeguradora').value != dado) {
      this.meuForm.get('IDCoberturaSeg').setValue(null);
    }

  }
  ngOnInit() {
    this.inicializarDadosTab_DadosProdSegis();
    //Promise.resolve(null).then(() => this.inicializarDadosTab_DadosProdSegis());
  }

  public ngAfterViewInit() {
    //Promise.resolve(null).then(() => this.kendoTabStripInstance.selectTab(0));
  }

  /**
   * Retorna o id do cadastro sendo acessado
   * Implementação do método da interface CadastroBarraAcaoPai
   */
  public cadastroBarraAcaoPai_getIdCadastro(): number {
    if (this.modelProdSeg) {
      return this.modelProdSeg.IDProdSeg;
    } else {
      return 0;
    }
  }

  private inicializarDadosTab_DadosProdSegis() {
    //Crio a instância dos formControls sem dados para não dar erro na interface
    this.criarForm(true);

    //Configuro quais controles estarão desabilitados
    this.configurarStatusForm();

    //Carrego os dados de ProdSeg
    this.getProdSeg();
  }

  private configurarStatusForm() {

    var id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');
    // if(this.modoExclusao){
    //   this.meuForm.disable();
    // }else if(id >0){
    //   this.meuForm.get('CPF').disable();
    // }
    this.meuForm.controls['IDProdSeg'].disable();
    if (id > 0) {
      this.meuForm.get('IDSeguradora').disable();
      this.meuForm.get('inCodGrupoSeguro').disable();
      this.meuForm.get('IDRamoSeguro').disable();
      this.meuForm.get('inCodTipoSeguro').disable();
      this.meuForm.get('inCodTipoCobrancaSeg').disable();
      this.meuForm.get('chCodProdSeg').disable();
    }

  }

  private criarForm(emEdicao: boolean) {
    //emEdicao = emEdicao || false;

    if (this.modelProdSeg.daDatIniVenda) {
      this.modelProdSeg.daDatIniVenda = new Date(this.modelProdSeg.daDatIniVenda);
    }

    if (this.modelProdSeg.daDatFimVenda) {
      this.modelProdSeg.daDatFimVenda = new Date(this.modelProdSeg.daDatFimVenda);
    }

    if (this.meuForm) {
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.modelProdSeg, emEdicao);
    } else {
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Dados essenciais
        IDProdSeg: [this.modelProdSeg.IDProdSeg],
        IDSeguradora: [this.modelProdSeg.IDSeguradora, Validators.required],
        inCodGrupoSeguro: [this.modelProdSeg.inCodGrupoSeguro, Validators.required],
        IDRamoSeguro: [this.modelProdSeg.IDRamoSeguro, Validators.required],
        inCodTipoSeguro: [this.modelProdSeg.inCodTipoSeguro, Validators.required],
        inCodTipoCobrancaSeg: [this.modelProdSeg.inCodTipoCobrancaSeg, Validators.required],
        chCodProdSeg: [this.modelProdSeg.chCodProdSeg, Validators.required],
        chCodProdExt: [this.modelProdSeg.chCodProdExt],
        chDescricao: [this.modelProdSeg.chDescricao, Validators.required],
        inCodTipoPerContrib: [this.modelProdSeg.inCodTipoPerContrib, Validators.required],
        IDCoberturaSeg: [this.modelProdSeg.IDCoberturaSeg, Validators.required],
        chCodSeqPropSeg: [this.modelProdSeg.chCodCoberturaSeg],
        inPrefNumPropSeg: [this.modelProdSeg.inPrefNumPropSeg],
        inNumDigSeqPropSeg: [this.modelProdSeg.inNumDigSeqPropSeg],
        chNumSusep: [this.modelProdSeg.chNumSusep, Validators.required],
        inNumIdadeMin: [this.modelProdSeg.inNumIdadeMin],
        inNumIdadeMax: [this.modelProdSeg.inNumIdadeMax, Validators.required],
        daDatIniVenda: [this.modelProdSeg.daDatIniVenda, Validators.required],
        daDatFimVenda: [this.modelProdSeg.daDatFimVenda, Validators.required],
        chDesDetalhe: [this.modelProdSeg.chDesDetalhe]
      });
    }

  }
  //private sofreuAlteracao: boolean;

  private coletarDadosForm() {

    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.modelProdSeg);
  }

  private getProdSeg() {
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id == 0) {
      //configuro os dados de uma ProdSeg física nova
      this.modelProdSeg = new ModelProdSeg();
      this.modelProdSeg.IDProdSeg = null;
      this.modelProdSeg.daDatFimVenda = null;
      this.modelProdSeg.daDatFimVenda = null;
      this.modelProdSeg.IDProdSeg = null;
      this.modelProdSeg.IDSeguradora = null;
      this.modelProdSeg.inCodGrupoSeguro = null;
      this.modelProdSeg.IDRamoSeguro = null;
      this.modelProdSeg.inCodTipoSeguro = null;
      this.modelProdSeg.inCodTipoCobrancaSeg = null;
      this.modelProdSeg.chCodProdSeg = null;
      this.modelProdSeg.chCodProdExt = null;
      this.modelProdSeg.chDescricao = null;
      this.modelProdSeg.inCodTipoPerContrib = null;
      this.modelProdSeg.IDCoberturaSeg = null;
      this.modelProdSeg.chCodCoberturaSeg = null;
      this.modelProdSeg.inPrefNumPropSeg = null;
      this.modelProdSeg.inNumDigSeqPropSeg = null;
      this.modelProdSeg.chNumSusep = null;
      this.modelProdSeg.inNumIdadeMin = null;
      this.modelProdSeg.inNumIdadeMax = null;
      this.modelProdSeg.daDatIniVenda = null;
      this.modelProdSeg.daDatFimVenda = null;
      this.modelProdSeg.chDesDetalhe = null;
      this.criarForm(true);

    } else {
      this.cadastroBarraAcao.exibirAguarde();
      //informo ao serviço dos dados filhos o ID do pai


      //carrego os dados da ProdSeg física do id recebido 
      this.apiProdSegService.obter(id).then(
        ProdSeg => {
          this.modelProdSeg = ProdSeg;
          this.PopularRamo(this.modelProdSeg.inCodGrupoSeguro);
          this.PopularCoberturaPrincipal(this.modelProdSeg.IDSeguradora);
          this.apiSeguradoraService.obter(this.modelProdSeg.IDSeguradora).then(
            r => {
              this.modelSeguradora = r;
            });

          this.apiProdSegAssistService.setProdSeg(this.modelProdSeg);
          this.apiProdSegCoberturaService.setProdSeg(this.modelProdSeg);
          this.apiProdSegCondPagtoService.setProdSeg(this.modelProdSeg);
          this.apiProdSegFormaCobService.setProdSeg(this.modelProdSeg);
          this.apiProdSegValorService.setProdSeg(this.modelProdSeg);
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
    this.getProdSeg();
  }

  btnConfirmar() {
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();
    if (this.modelProdSeg.IDProdSeg > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  btnExcluir() {
    this.apiProdSegService.excluir(this.modelProdSeg.IDProdSeg).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar() {
    this.apiProdSegService.alterar(this.modelProdSeg).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSeg = sucesso;
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
    this.apiProdSegService.criar(this.modelProdSeg).then(
      sucesso => {
        //this.meuForm.reset();
        this.apiErrorCollection = new ApiErrorCollection();
        this.modelProdSeg = sucesso;
        //this.meuForm.controls['inNumIdentificacao'].disable();
        this.criarForm(false);
        this.meuForm.get('IDSeguradora').disable();
        this.meuForm.get('inCodGrupoSeguro').disable();
        this.meuForm.get('IDRamoSeguro').disable();
        this.meuForm.get('inCodTipoSeguro').disable();
        this.meuForm.get('inCodTipoCobrancaSeg').disable();
        this.meuForm.get('chCodProdSeg').disable();

        //this.exibirDadosForm();
        // this.meuForm.reset();
        // this.meuForm.markAsUntouched();
        // this.resetarForm();
        this.cadastroBarraAcao.esconderAguarde();
        this.apiSeguradoraService.obter(this.modelProdSeg.IDSeguradora).then(
          r => {
            this.modelSeguradora = r;
          });
        //informo ao serviço dos dados filhos o ID do pai
        this.apiProdSegAssistService.setProdSeg(this.modelProdSeg);
        this.apiProdSegCoberturaService.setProdSeg(this.modelProdSeg);
        this.apiProdSegCondPagtoService.setProdSeg(this.modelProdSeg);
        this.apiProdSegFormaCobService.setProdSeg(this.modelProdSeg);
        this.apiProdSegValorService.setProdSeg(this.modelProdSeg);

      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }



}
