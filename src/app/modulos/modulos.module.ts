import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

//Telerik Kendo.UI
import { WindowModule } from "@progress/kendo-angular-dialog";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { PopupModule } from "@progress/kendo-angular-popup";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import {
  GridModule,
  PDFModule,
  ExcelModule,
} from "@progress/kendo-angular-grid";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { IntlModule } from "@progress/kendo-angular-intl";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { TooltipModule } from "@progress/kendo-angular-tooltip";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DialogModule } from "@progress/kendo-angular-dialog";
import "@progress/kendo-angular-intl/locales/pt/all";

import { TelaPrincipalRoutingModule } from "./modulos-routing.module";

//SERVIÇOS
import { ApiMenuSistemaService } from "../modulos/segur/api/api-menu-sistema.service";

//API: Pessoa
import { ApiPessoaElService } from "../modulos/corp/api/api-pessoa-el.service";
import { ApiEstadoCivilService } from "../modulos/corp/api/api-estado-civil.service";
import { ApiGrauInstrucaoService } from "../modulos/corp/api/api-grau-instrucao.service";
import { ApiProfissaoService } from "../modulos/corp/api/api-profissao.service";
import { ApiRacaCorService } from "./corp/api/api-raca-cor.service";
import { ApiSexoService } from "../modulos/corp/api/api-sexo.service";
import { ApiTipoDocumentoService } from "../modulos/corp/api/api-tipo-documento.service";
import { ApiTipoPessoaService } from "./corp/api/api-tipo-pessoa.service";
import { ApiSituacaoCadService } from "./corp/api/api-situacao-cad.service";
import { ApiSituacaoEnvEmailService } from "./corp/api/api-situacao-env-email.service";
import { ApiTipoDocumentoPessoaEmailService } from "./corp/api/api-tipo-pessoa-email.service";
import { ApiTipoDocumentoPessoaTelefoneService } from "./corp/api/api-tipo-pessoa-telefone.service";
import { ApiTipoDocumentoPessoaEnderecoService } from "./corp/api/api-tipo-pessoa-endereco.service";
import { ApiTipoPessoaContatoService } from "./corp/api/api-tipo-pessoa-contato.service";
import { ApiTipoPapelService } from "./corp/api/api-tipo-papel.service";
import { ApiTipoLogradouroService } from "./corp/api/api-tipo-logradouro.service";

//API: Usuarios
import { ApiTipoUsuarioService } from "../modulos/segur/api/api-tipo-usuario.service";

// API: Financeiro
import { ApiBancoService } from "../modulos/finan/api/api-banco.service";
import { ApiCondPagtoService } from "../modulos/finan/api/api-cond-pagto.service";
import { ApiTipoCobrancaService } from "../modulos/finan/api/api-tipo-cobranca.service";
import { ApiTipoContaBancoService } from "../modulos/finan/api/api-tipo-conta-banco.service";
import { ApiTipoMatriculaCobService } from "../modulos/finan/api/api-tipo-matricula-cob.service";
import { ApiFormaCobrancaEL01Service } from "./finan/api/api-forma-cobranca-el01.service";
import { ApiPortadorService } from "./finan/api/api-portador.service";
import { ApiTipoEspecieCrService } from "./finan/api/api-tipo-especie-cr.service";
import { ApiSituacaoDocCrService } from "./finan/api/api-situacao-doc-cr.service";
import { ApiOrigemCrService } from "./finan/api/api-origem-cr.service";
import { ApiCarteiraCrService } from "./finan/api/api-carteira-cr.service";
import { ApiTipoFaturaCrService } from "../modulos/finan/api/api-tipo-fatura-cr.service";
import { ApiTipoMovtoCrService } from "../modulos/finan/api/api-tipo-movto-cr.service";

// API: Corp
import { ApiParamCorpService } from "../modulos/corp/api/api-param-corp.service";

// API: eSeg
import { ApiGrauParentService } from "../modulos/eseg/api/api-grau-parent.service";
import { ApiSituacaoVendaService } from "../modulos/eseg/api/api-situacao-venda.service";
import { ApiTipoCapitalSegService } from "../modulos/eseg/api/api-tipo-capital-seg.service";
import { ApiTipoCobrancaSegService } from "../modulos/eseg/api/api-tipo-cobranca-seg.service";
import { ApiTipoPerContribService } from "../modulos/eseg/api/api-tipo-per-contrib.service";
import { ApiTipoSeguroService } from "../modulos/eseg/api/api-tipo-seguro.service";
import { ApiTipoTaxaSegService } from "../modulos/eseg/api/api-tipo-taxa-seg.service";


// API: iDfe
import { ApiFinalidadeNfeService } from "../modulos/idfe/api/api-finalidade-nfe.service";
import { ApiModeloDfeService } from "../modulos/idfe/api/api-modelo-dfe.service";
import { ApiSituacaoCteService } from "../modulos/idfe/api/api-situacao-cte.service";
import { ApiSituacaoNfeService } from "../modulos/idfe/api/api-situacao-nfe.service";
import { ApiStatusConfNfeService } from "../modulos/idfe/api/api-status-conf-nfe.service";
import { ApiStatusDfeEventoService } from "../modulos/idfe/api/api-status-dfe-evento.service";
import { ApiTipoCteService } from "../modulos/idfe/api/api-tipo-cte.service";
import { ApiTipoEmissaoDfeService } from "../modulos/idfe/api/api-tipo-emissao-dfe.service";
import { ApiTipoEventoDfeService } from "../modulos/idfe/api/api-tipo-evento-dfe.service";
import { ApiTipoTomadorCteService } from "../modulos/idfe/api/api-tipo-tomador-cte.service";

//API: Segur
import { ApiTipoMenuOpcaoService } from "../modulos/segur/api/api-tipo-menu-opcao.service";

//COMPONENTES MODULES
import { AguardeCarregandoModule } from "../componentes/aguarde-carregando/aguarde-carregando.module";
import { CadastroBarraAcaoModule } from "../componentes/cadastro-barra-acao/cadastro-barra-acao.module";
import { CadastroTabModule } from "../componentes/cadastro-tab/cadastro-tab.module";
import { ApiSelectModule } from "../componentes/api-select/api-select.module";
import { CabecalhoBreadcrumbModule } from "../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.module";
import { CabecalhoSistemaModule } from "../componentes/cabecalho-sistema/cabecalho-sistema.module";
import { FiltroMultiselectModule } from "../componentes/filtro-multiselect/filtro-multiselect.module";
import { FormControlAlertaErroApiModule } from "../componentes/form-control-alerta-erro-api/form-control-alerta-erro-api.module";
import { GridPesquisaModule } from "../componentes/grid-pesquisa/grid-pesquisa.module";
import { InputModalPesquisaModule } from "../componentes/input-modal-pesquisa/input-modal-pesquisa.module";
import { ModalPesquisaModule } from "../componentes/modal-pesquisa/modal-pesquisa.module";
import { MenuSistemaModule } from "../componentes/menu-sistema/menu-sistema.module";
import { OperacaoBarraAcaoModule } from '../componentes/operacao-barra-acao/operacao-barra-acao.module';

//COMPONENTES: SERVIÇOS
import { CabecalhoBreadcrumbService } from "../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { GridPesquisaPersisteEstadoService } from "../componentes/grid-pesquisa/grid-pesquisa-persiste-estado.service";

//PRINCIPAL
import { TelaPrincipalComponent } from "./principal/tela-principal/tela-principal.component";
import { TelaPrincipalHomeComponent } from "./principal/tela-principal-home/tela-principal-home.component";
import { importType } from "@angular/compiler/src/output/output_ast";
import { ApiPaisService } from "./corp/api/api-pais.service";
import { ApiUfService } from "./corp/api/api-uf.service";
import { ApiCidadeService } from "./corp/api/api-cidade.service";
import { ApiLogradouroService } from "./corp/api/api-logradouro.service";

import { ApiSequeciaValorService } from "./corp/api/api-sequecia-valor.service";
import { ApiSequeciaService } from "./corp/api/api-sequecia.service";
import { ApiEmpresaService } from "./corp/api/api-empresa.service";
import { ApiEstabelecimentoService } from "./corp/api/api-estabelecimento.service";
import { ApiPessoaEnderecoService } from "./corp/api/api-pessoa-endereco.service";
import { ApiPessoaContaBancoService } from "./corp/api/api-pessoa-conta-banco.service";
import { ApiPessoaContatoService } from "./corp/api/api-pessoa-contato.service";
import { ApiPessoaEmailService } from "./corp/api/api-pessoa-email.service";
import { ApiPessoaDocumentoService } from "./corp/api/api-pessoa-documento.service";
import { ApiPessoaTelefoneService } from "./corp/api/api-pessoa-telefone.service";
import { ApiGrupoSeguroService } from "./eseg/api/api-grupo-seguro.service";
import { ApiRamoSeguroService } from "./eseg/api/api-ramo-seguro.service";
import { ApiSeguradoService } from "./eseg/api/api-segurado.service";
import { ApiSeguradoraService } from "./eseg/api/api-seguradora.service";
import { ApiEstipulanteService } from "./eseg/api/api-estipulante.service";
import { ApiPagadorService } from "./eseg/api/api-pagador.service";
import { ApiAssistSegService } from "./eseg/api/api-assist-seg.service";
import { ApiCoberturaSegService } from "./eseg/api/api-cobertura-seg.service";
import { ApiGrupoUsuarioService } from "./segur/api/api-grupo-usuario.service";
import { ApiUsuariosEL01Service } from "./segur/api/api-usuarios-el01.service";
import { ApiSegurancaProgramaService } from "./segur/api/api-seguranca-programa.service";
import { ApiProgramaNivelService } from "./segur/api/api-programa-nivel.service";
import { ApiProgramaService } from "./segur/api/api-programa.service";
import { ApiPapelPessoaService } from "./corp/api/api-papel-pessoa.service";
import { ApiUsuariosDoGrupoService } from "./segur/api/api-usuarios-do-grupo.service";
import { ApiGruposDoUsuarioService } from "./segur/api/api-grupos-do-usuario.service";
import { ApiProdSegService } from "./eseg/api/api-prod-seg.service";
import { ApiProdSegAssistService } from "./eseg/api/api-prod-seg-assist.service";
import { ApiProdSegCoberturaService } from "./eseg/api/api-prod-seg-cobertura.service";
import { ApiProdSegCondPagtoService } from "./eseg/api/api-prod-seg-cond-pagto.service";
import { ApiProdSegFormaCobService } from "./eseg/api/api-prod-seg-forma-cob.service";
import { ApiProdSegValorService } from "./eseg/api/api-prod-seg-valor.service";
import { ApiSorteioSegService } from "./eseg/api/api-sorteio-seg.service";
import { ApiCtoCorSegEL01Service } from "./eseg/api/api-cto-cor-seg-el01.service";
import { ApiGrupoClienteService } from "./corp/api/api-grupo-cliente.service";
import { ApiCanalVendaService } from "./corp/api/api-canal-venda.service";
import { ApiTipoRepresentanteService } from "./corp/api/api-tipo-representante.service";
import { ApiRegiaoService } from "./corp/api/api-regiao.service";
import { ApiMicrorregiaoService } from "./corp/api/api-microrregiao.service";
import { ApiCondPagtoVendaService } from "./fvenda/api/api-cond-pagto-venda.service";
import { ApiMotivoRejeitaService } from "./fvenda/api/api-motivo-rejeita.service";
import { ApiSituacaoAssTecService } from "./fvenda/api/api-situacao-ass-tec.service";
import { ApiOrigemAssTecService } from "./fvenda/api/api-origem-ass-tec.service";
import { ApiTipoTecnicoService } from "./fvenda/api/api-tipo-tecnico.service";

import { ApiSituacaoSolicCredService } from "./fvenda/api/api-situacao-solic-cred.service";
import { ApiRepresVendaEL01Service } from "./fvenda/api/api-repres-venda-el01.service";
import { ApiClienteEL02Service } from "./fvenda/api/api-cliente-el02.service";
import { ApiSolicCredVendaEL01Service } from "./fvenda/api/api-solic-cred-venda-el01.service";
import { ApiClienteEl01Service } from "./corp/api/api-cliente-el01.service";
import { ApiRepresentanteEl01Service } from "./corp/api/api-representante-el01.service";
import { FormatarCpfCnpjService } from "../services/formatar-cpf-cnpj.service";
import { RedirectAcessoComponent } from "./principal/redirect-acesso/redirect-acesso.component";
import { ApiTipoDefeitoService } from "./fvenda/api/api-tipo-defeito.service";
import { ApiDefeitoEL01Service } from "./fvenda/api/api-defeito-el01.service";
import { ApiTipoAssTecEL01Service } from "./fvenda/api/api-tipo-ass-tec-el01.service";
import { ApiFamComService } from "./fvenda/api/api-fam-com.service";
import { ApiFamMatService } from "./fvenda/api/api-fam-mat.service";
import { ApiGrpEstService } from "./fvenda/api/api-grp-est.service";
import { ApiSolucAssTecService } from "./fvenda/api/api-soluc-ass-tec.service";
import { ApiEspecieItemService } from "./fvenda/api/api-especie-item.service";
import { ApiCategoriaService } from "./fvenda/api/api-categoria.service";
import { ApiItemEL01Service } from "./fvenda/api/api-item-el01.service";
import { ApiItemLoteSerieEl01Service } from "./fvenda/api/api-item-lote-serie-el01.service";
import { ApiAssTecnicaEL01Service } from "./fvenda/api/api-ass-tecnica-el01.service";
import { ApiAssTecItemEL01Service } from "./fvenda/api/api-ass-tec-item-el01.service";
import { ApiAssTecItemDefAlegService } from "./fvenda/api/api-ass-tec-item-def-aleg.service";
import { ApiAssTecItemDefConstService } from "./fvenda/api/api-ass-tec-item-def-const.service";
import { ApiAssTecItemServService } from "./fvenda/api/api-ass-tec-item-serv.service";
import { ApiAssTecItemSubsService } from "./fvenda/api/api-ass-tec-item-subs.service";
import { ApiTecnicoEL01Service } from "./fvenda/api/api-tecnico-el01.service";
import { ApiGrupoEstabService } from "./corp/api/api-grupo-estab.service";
import { ApiSituacaoCampService } from "./fvenda/api/api-situacao-camp.service";
import { ApiTipoCampanhaService } from "./fvenda/api/api-tipo-campanha.service";
import { ApiTipoIntegraCampService } from "./fvenda/api/api-tipo-integra-camp.service";
import { ApiCampanhaEL01Service } from "./fvenda/api/api-campanha-el01.service";
import { ApiCampanhaParamEL01Service } from "./fvenda/api/api-campanha-param-el01.service";
import { ApiCampanhaVendaEL01Service } from "./fvenda/api/api-campanha-venda-el01.service";
import { ApiSituacaoPedVenService } from "./fvenda/api/api-situacao-ped-ven.service";
import { ApiOrigemPedVenService } from "./fvenda/api/api-origem-ped-ven.service";
import { ApiSituacaoAtenPedService } from "./fvenda/api/api-situacao-aten-ped.service";
import { ApiTipoFreteService } from "./fvenda/api/api-tipo-frete.service";
import { ApiTabPrecoEL01Service } from "./fvenda/api/api-tab-preco-el01.service";
import { ApiTabPrecoItemEL01Service } from "./fvenda/api/api-tab-preco-item-el01.service";
import { ApiTabPrecoRegraEL01Service } from "./fvenda/api/api-tab-preco-regra-el01.service";
import { ApiTipoPedidoEl01Service } from "./fvenda/api/api-tipo-pedido-el01.service";
import { ApiTranspEl01Service } from "./fvenda/api/api-transp-el01.service";
import { ApiMotRejSolAprPvService } from "./fvenda/api/api-mot-rej-sol-apr-pv.service";
import { ApiSituacaoSolAprPvService } from "./fvenda/api/api-situacao-sol-apr-pv.service";
import { ApiSituacaoPedCompService } from "./fvenda/api/api-situacao-ped-comp.service";
import { ApiSitAtenPedCompService } from "./fvenda/api/api-sit-aten-ped-comp.service";
import { ApiMotRejPedCompService } from "./fvenda/api/api-mot-rej-ped-comp.service";
import { ApiPedCompraEL01Service } from "./fvenda/api/api-ped-compra-el01.service";
import { ApiPedCompraItemEL01Service } from "./fvenda/api/api-ped-compra-item-el01.service";
import { ApiSolicAprovPVEL01Service } from "./fvenda/api/api-solic-aprov-pv-el01.service";
import { ApiPedVendaEL01Service } from "./fvenda/api/api-ped-venda-el01.service";
import { ApiPedVendaItemEL01Service } from "./fvenda/api/api-ped-venda-item-el01.service";
import { ApiSolicAprovPVItemEL01Service } from "./fvenda/api/api-solic-aprov-pv-item-el01.service";


//Cadastros: usuarios
//import { ListagemUsuariosComponent } from '../modulos/segur/ui/cadastro-usuario/listagem-usuarios/listagem-usuarios.component';

//Cadastros
//import { ListagemPessoaComponent } from '../modulos/corp/ui/cadastro-pessoa/listagem-pessoa/listagem-pessoa.component';
// import { EdicaoPessoaComponent } from '../modulos/corp/ui/cadastro-pessoa/edicao-pessoa-fisica/edicao-pessoa.component';
// import { CadastroPessoaFisicaDadosPessoaisComponent } from '../modulos/corp/ui/cadastro-pessoa/cadastro-pessoa-fisica-dados-pessoais/cadastro-pessoa-fisica-dados-pessoais.component';
// import { EdicaoPessoaJuridicaComponent } from '../modulos/corp/ui/cadastro-pessoa/edicao-pessoa-juridica/edicao-pessoa-juridica.component';

@NgModule({
  imports: [
    CommonModule,
    TelaPrincipalRoutingModule,

    //Telerik Kendo.UI
    LayoutModule,
    WindowModule,
    PopupModule,
    ButtonsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    InputsModule,
    IntlModule,
    DateInputsModule,
    TooltipModule,
    DropDownsModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,

    //COMPONENTES MODULES
    AguardeCarregandoModule,
    CadastroBarraAcaoModule,
    CadastroTabModule,
    ApiSelectModule,
    CabecalhoBreadcrumbModule,
    CabecalhoSistemaModule,
    FiltroMultiselectModule,
    GridPesquisaModule,
    InputModalPesquisaModule,
    ModalPesquisaModule,
    MenuSistemaModule,
    FormControlAlertaErroApiModule,
    OperacaoBarraAcaoModule,
  ],
  declarations: [
    //PAGINAS
    TelaPrincipalComponent,
    TelaPrincipalHomeComponent,
    RedirectAcessoComponent,
    //ListagemUsuariosComponent,
    //ListagemPessoaComponent,
    // EdicaoPessoaComponent,
    // CadastroPessoaFisicaDadosPessoaisComponent,
    // EdicaoPessoaJuridicaComponent,
  ],
  exports: [ApiSelectModule, CabecalhoBreadcrumbModule],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" },

    //SERVIÇOS DO APP
    CabecalhoBreadcrumbService,
    GridPesquisaPersisteEstadoService,
    ApiMenuSistemaService,

    //APIs Usuários
    ApiTipoUsuarioService,

    //APIs Pessoas
    ApiPessoaElService,
    ApiEstadoCivilService,
    ApiGrauInstrucaoService,
    ApiProfissaoService,
    ApiRacaCorService,
    ApiSexoService,
    ApiTipoPessoaService,
    ApiSituacaoCadService,
    ApiSituacaoEnvEmailService,
    ApiTipoDocumentoService,
    ApiTipoDocumentoPessoaEnderecoService,
    ApiTipoDocumentoPessoaTelefoneService,
    ApiTipoDocumentoPessoaEmailService,
    ApiTipoLogradouroService,
    ApiTipoPapelService,
    ApiTipoPessoaContatoService,

    // API's Financeiro
    ApiBancoService,
    ApiCondPagtoService,
    ApiTipoCobrancaService,
    ApiTipoContaBancoService,
    ApiTipoMatriculaCobService,

    //API's Corp
    ApiParamCorpService,

    //apis segur
    ApiTipoMenuOpcaoService,

    // API's eSeg
    ApiTipoCapitalSegService,
    ApiTipoCobrancaSegService,
    ApiGrauParentService,
    ApiTipoTaxaSegService,
    ApiTipoSeguroService,
    ApiSituacaoVendaService,
    ApiTipoPerContribService,

    // API's idfe
    ApiFinalidadeNfeService,
    ApiModeloDfeService,
    ApiSituacaoCteService,
    ApiSituacaoNfeService,
    ApiStatusConfNfeService,
    ApiStatusDfeEventoService,
    ApiTipoCteService,
    ApiTipoEmissaoDfeService,
    ApiTipoEventoDfeService,
    ApiTipoTomadorCteService,

    //
    ApiPaisService,
    ApiUfService,
    ApiCidadeService,
    ApiLogradouroService,
    ApiSequeciaValorService,
    ApiSequeciaService,
    ApiEmpresaService,
    ApiEstabelecimentoService,
    ApiPessoaEnderecoService,
    ApiPessoaContaBancoService,
    ApiPessoaContatoService,
    ApiPessoaEmailService,
    ApiPessoaDocumentoService,
    ApiPessoaTelefoneService,

    ApiGrupoSeguroService,
    ApiRamoSeguroService,
    ApiSeguradoService,
    ApiSeguradoraService,
    ApiEstipulanteService,
    ApiPagadorService,
    ApiAssistSegService,
    ApiCoberturaSegService,

    ApiFormaCobrancaEL01Service,
    ApiPortadorService,
    ApiGrupoUsuarioService,
    ApiUsuariosEL01Service,
    ApiUsuariosDoGrupoService,
    ApiGruposDoUsuarioService,
    ApiSegurancaProgramaService,
    ApiProgramaNivelService,
    ApiProgramaService,
    ApiPapelPessoaService,
    ApiProdSegService,
    ApiProdSegAssistService,
    ApiProdSegCoberturaService,
    ApiProdSegCondPagtoService,
    ApiProdSegFormaCobService,
    ApiProdSegValorService,
    ApiSorteioSegService,
    ApiCtoCorSegEL01Service,
    ApiGrupoClienteService,
    ApiCanalVendaService,
    ApiTipoRepresentanteService,
    ApiRegiaoService,
    ApiMicrorregiaoService,
    ApiCondPagtoVendaService,
    ApiMotivoRejeitaService,
    ApiSituacaoAssTecService,
    ApiOrigemAssTecService,
    ApiTipoTecnicoService,

    ApiSituacaoSolicCredService,
    ApiRepresVendaEL01Service,
    ApiClienteEL02Service,
    ApiSolicCredVendaEL01Service,
    ApiRepresentanteEl01Service,
    ApiClienteEl01Service,
    FormatarCpfCnpjService,

    ApiTipoDefeitoService,
    ApiDefeitoEL01Service,
    ApiTipoAssTecEL01Service,
    ApiFamComService,
    ApiFamMatService,
    ApiGrpEstService,
    ApiSolucAssTecService,
    ApiEspecieItemService,
    ApiCategoriaService,
    ApiItemEL01Service,

    ApiItemLoteSerieEl01Service,
    ApiAssTecnicaEL01Service,
    ApiAssTecItemEL01Service,
    ApiAssTecItemDefAlegService,
    ApiAssTecItemDefConstService,
    ApiAssTecItemServService,
    ApiAssTecItemSubsService,

    ApiTecnicoEL01Service,

    ApiGrupoEstabService,
    ApiSituacaoCampService,
    ApiTipoCampanhaService,
    ApiTipoIntegraCampService,
    ApiCampanhaEL01Service,
    ApiCampanhaParamEL01Service,
    ApiCampanhaVendaEL01Service,

    ApiSituacaoPedVenService,
    ApiOrigemPedVenService,
    ApiSituacaoAtenPedService,
    ApiTipoFreteService,

    ApiTabPrecoEL01Service,
    ApiTabPrecoItemEL01Service,
    ApiTabPrecoRegraEL01Service,

    ApiTipoPedidoEl01Service,
    ApiTranspEl01Service,
    ApiMotRejSolAprPvService,
    ApiSituacaoSolAprPvService,

    ApiSituacaoPedCompService,
    ApiSitAtenPedCompService,
    ApiMotRejPedCompService,

    ApiPedCompraEL01Service,
    ApiPedCompraItemEL01Service,
    ApiSolicAprovPVEL01Service,
    ApiPedVendaEL01Service,
    ApiPedVendaItemEL01Service,
    ApiSolicAprovPVItemEL01Service,
    ApiTipoEspecieCrService,
    ApiSituacaoDocCrService,
    ApiOrigemCrService,
    ApiCarteiraCrService,
    ApiTipoFaturaCrService,
    ApiTipoMovtoCrService

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModulosModule { }
