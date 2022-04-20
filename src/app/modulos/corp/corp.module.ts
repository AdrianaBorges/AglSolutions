import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CorpRoutingModule } from './corp-routing.module';

//Telerik Kendo.UI
import { WindowModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import '@progress/kendo-angular-intl/locales/pt/all';

//COMPONENTES MODULES
import { AguardeCarregandoModule } from '../../componentes/aguarde-carregando/aguarde-carregando.module';
import { CadastroBarraAcaoModule } from '../../componentes/cadastro-barra-acao/cadastro-barra-acao.module';
import { CadastroTabModule } from '../../componentes/cadastro-tab/cadastro-tab.module';
import { ApiSelectModule } from '../../componentes/api-select/api-select.module';
import { CabecalhoBreadcrumbModule } from '../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.module'
import { CabecalhoSistemaModule } from '../../componentes/cabecalho-sistema/cabecalho-sistema.module';
import { FiltroMultiselectModule } from '../../componentes/filtro-multiselect/filtro-multiselect.module';
import { FormControlAlertaErroApiModule } from '../../componentes/form-control-alerta-erro-api/form-control-alerta-erro-api.module';
import { GridPesquisaModule } from '../../componentes/grid-pesquisa/grid-pesquisa.module';
import { InputModalPesquisaModule } from '../../componentes/input-modal-pesquisa/input-modal-pesquisa.module';
import { ModalPesquisaModule } from '../../componentes/modal-pesquisa/modal-pesquisa.module';
import { MenuSistemaModule } from '../../componentes/menu-sistema/menu-sistema.module';

//Cadastros
import { CrudePessoaListagemComponent } from '../../modulos/corp/ui/crude/pessoa/crude-pessoa-listagem/crude-pessoa-listagem.component';
import { CrudePessoaFisicaTabsComponent } from '../../modulos/corp/ui/crude/pessoa/tabs-pessoa-fisica/tabs-pessoa-fisica.component';
import { CrudePessoaFisicaComponent } from '../../modulos/corp/ui/crude/pessoa/crude-pessoa-fisica/crude-pessoa-fisica.component';
import { CrudeEstadoCivilListagemComponent } from './ui/crude/estado-civil/crude-estado-civil-listagem/crude-estado-civil-listagem.component';
import { CrudeEstadoCivilDetalheComponent } from './ui/crude/estado-civil/crude-estado-civil-detalhe/crude-estado-civil-detalhe.component';
import { CrudeGrauInstDetalheComponent } from './ui/crude/grau-inst/crude-grau-inst-detalhe/crude-grau-inst-detalhe.component';
import { CrudeGrauInstListagemComponent } from './ui/crude/grau-inst/crude-grau-inst-listagem/crude-grau-inst-listagem.component';
import { CrudeRacaCorListagemComponent } from './ui/crude/raca-cor/crude-raca-cor-listagem/crude-raca-cor-listagem.component';
import { CrudeRacaCorDetalheComponent } from './ui/crude/raca-cor/crude-raca-cor-detalhe/crude-raca-cor-detalhe.component';
import { CrudeSexoDetalheComponent } from './ui/crude/sexo/crude-sexo-detalhe/crude-sexo-detalhe.component';
import { CrudeSexoListagemComponent } from './ui/crude/sexo/crude-sexo-listagem/crude-sexo-listagem.component';
import { CrudeTipoPessoaListagemComponent } from './ui/crude/tipo-pessoa/crude-tipo-pessoa-listagem/crude-tipo-pessoa-listagem.component';
import { CrudeTipoPessoaDetalheComponent } from './ui/crude/tipo-pessoa/crude-tipo-pessoa-detalhe/crude-tipo-pessoa-detalhe.component';
import { CrudeSituacaoCadDetalheComponent } from './ui/crude/situacao-cad/crude-situacao-cad-detalhe/crude-situacao-cad-detalhe.component';
import { CrudeSituacaoCadListagemComponent } from './ui/crude/situacao-cad/crude-situacao-cad-listagem/crude-situacao-cad-listagem.component';
import { CrudeSituacaoEnvEmailListagemComponent } from './ui/crude/situacao-env-email/crude-situacao-env-email-listagem/crude-situacao-env-email-listagem.component';
import { CrudeSituacaoEnvEmailDetalheComponent } from './ui/crude/situacao-env-email/crude-situacao-env-email-detalhe/crude-situacao-env-email-detalhe.component';
import { CrudeTipoDocumentoDetalheComponent } from './ui/crude/tipo-documento/crude-tipo-documento-detalhe/crude-tipo-documento-detalhe.component';
import { CrudeTipoDocumentoListagemComponent } from './ui/crude/tipo-documento/crude-tipo-documento-listagem/crude-tipo-documento-listagem.component';
import { CrudeTipoPessoaEnderecoListagemComponent } from './ui/crude/tipo-pessoa-endereco/crude-tipo-pessoa-endereco-listagem/crude-tipo-pessoa-endereco-listagem.component';
import { CrudeTipoPessoaEnderecoDetalheComponent } from './ui/crude/tipo-pessoa-endereco/crude-tipo-pessoa-endereco-detalhe/crude-tipo-pessoa-endereco-detalhe.component';
import { CrudeTipoPessoaEmailDetalheComponent } from './ui/crude/tipo-pessoa-email/crude-tipo-pessoa-email-detalhe/crude-tipo-pessoa-email-detalhe.component';
import { CrudeTipoPessoaEmailListagemComponent } from './ui/crude/tipo-pessoa-email/crude-tipo-pessoa-email-listagem/crude-tipo-pessoa-email-listagem.component';
import { CrudeTipoPessoaTelefoneListagemComponent } from './ui/crude/tipo-pessoa-telefone/crude-tipo-pessoa-telefone-listagem/crude-tipo-pessoa-telefone-listagem.component';
import { CrudeTipoPessoaTelefoneDetalheComponent } from './ui/crude/tipo-pessoa-telefone/crude-tipo-pessoa-telefone-detalhe/crude-tipo-pessoa-telefone-detalhe.component';
import { CrudParamCorpDetalheComponent } from './ui/crude/param-corp/crud-param-corp-detalhe/crud-param-corp-detalhe.component';
import { CrudParamCorpListagemComponent } from './ui/crude/param-corp/crud-param-corp-listagem/crud-param-corp-listagem.component';
import { CrudeTipoLogradouroDetalheComponent } from './ui/crude/tipo-logradouro/crude-tipo-logradouro-detalhe/crude-tipo-logradouro-detalhe.component';
import { CrudeTipoLogradouroListagemComponent } from './ui/crude/tipo-logradouro/crude-tipo-logradouro-listagem/crude-tipo-logradouro-listagem.component';
import { CrudeTipoPapelListagemComponent } from './ui/crude/tipo-papel/crude-tipo-papel-listagem/crude-tipo-papel-listagem.component';
import { CrudeTipoPapelDetalheComponent } from './ui/crude/tipo-papel/crude-tipo-papel-detalhe/crude-tipo-papel-detalhe.component';
import { CrudeTipoPessoaContatoDetalheComponent } from './ui/crude/tipo-pessoa-contato/crude-tipo-pessoa-contato-detalhe/crude-tipo-pessoa-contato-detalhe.component';
import { CrudePessoaDocumentoDetalheComponent } from './ui/crude/pessoa-documento/crude-pessoa-documento-detalhe/crude-pessoa-documento-detalhe.component';
import { CrudePessoaDocumentoListagemComponent } from './ui/crude/pessoa-documento/crude-pessoa-documento-listagem/crude-pessoa-documento-listagem.component';

//INstâncias de Serviços que devem ser únicas para o Módulo
import { CrudeTipoPessoaContatoListagemComponent } from './ui/crude/tipo-pessoa-contato/crude-tipo-pessoa-contato-listagem/crude-tipo-pessoa-contato-listagem.component';
import { CrudeProfissaoListagemComponent } from './ui/crude/profissao/crude-profissao-listagem/crude-profissao-listagem.component';
import { CrudeProfissaoDetalheComponent } from './ui/crude/profissao/crude-profissao-detalhe/crude-profissao-detalhe.component';
import { CrudePaisDetalheComponent } from './ui/crude/pais/crude-pais-detalhe/crude-pais-detalhe.component';
import { CrudePaisListagemComponent } from './ui/crude/pais/crude-pais-listagem/crude-pais-listagem.component';
import { CrudeUfListagemComponent } from './ui/crude/uf/crude-uf-listagem/crude-uf-listagem.component';
import { CrudeUfDetalheComponent } from './ui/crude/uf/crude-uf-detalhe/crude-uf-detalhe.component';
import { CrudeCidadeDetalheComponent } from './ui/crude/cidade/crude-cidade-detalhe/crude-cidade-detalhe.component';
import { CrudeCidadeListagemComponent } from './ui/crude/cidade/crude-cidade-listagem/crude-cidade-listagem.component';
import { CrudeLogradouroListagemComponent } from './ui/crude/logradouro/crude-logradouro-listagem/crude-logradouro-listagem.component';
import { CrudeLogradouroDetalheComponent } from './ui/crude/logradouro/crude-logradouro-detalhe/crude-logradouro-detalhe.component';
import { CrudeSequenciaListagemComponent } from './ui/crude/sequencia/crude-sequencia-listagem/crude-sequencia-listagem.component';
import { CrudeSequenciaDetalheComponent } from './ui/crude/sequencia/crude-sequencia-detalhe/crude-sequencia-detalhe.component';
import { TabsSequenciaComponent } from './ui/crude/sequencia/tabs-sequencia/tabs-sequencia.component';
import { CrudeSequenciaValorDetalheComponent } from './ui/crude/sequencia-valor/crude-sequencia-valor-detalhe/crude-sequencia-valor-detalhe.component';
import { CrudeSequenciaValorListagemComponent } from './ui/crude/sequencia-valor/crude-sequencia-valor-listagem/crude-sequencia-valor-listagem.component';
import { CrudeEmpresaListagemComponent } from './ui/crude/empresa/crude-empresa-listagem/crude-empresa-listagem.component';
import { CrudeEmpresaDetalheComponent } from './ui/crude/empresa/crude-empresa-detalhe/crude-empresa-detalhe.component';
import { CrudeEmpresaTabsComponent } from './ui/crude/empresa/tabs-empresa/crude-empresa-tabs.component';
import { CrudeEstabelecimentoListagemComponent } from './ui/crude/estabelecimento/crude-estabelecimento-listagem/crude-estabelecimento-listagem.component';
import { CrudeEstabelecimentoDetalheComponent } from './ui/crude/estabelecimento/crude-estabelecimento-detalhe/crude-estabelecimento-detalhe.component';
import { CrudePessoaTelefoneListagemComponent } from './ui/crude/pessoa-telefone/crude-pessoa-telefone-listagem/crude-pessoa-telefone-listagem.component';
import { CrudePessoaTelefoneDetalheComponent } from './ui/crude/pessoa-telefone/crude-pessoa-telefone-detalhe/crude-pessoa-telefone-detalhe.component';
import { CrudePessoaEmailDetalheComponent } from './ui/crude/pessoa-email/crude-pessoa-email-detalhe/crude-pessoa-email-detalhe.component';
import { CrudePessoaEmailListagemComponent } from './ui/crude/pessoa-email/crude-pessoa-email-listagem/crude-pessoa-email-listagem.component';
import { CrudePessoaEnderecoListagemComponent } from './ui/crude/pessoa-endereco/crude-pessoa-endereco-listagem/crude-pessoa-endereco-listagem.component';
import { CrudePessoaEnderecoDetalheComponent } from './ui/crude/pessoa-endereco/crude-pessoa-endereco-detalhe/crude-pessoa-endereco-detalhe.component';
import { CrudePessoaContaBancoDetalheComponent } from './ui/crude/pessoa-conta-banco/crude-pessoa-conta-banco-detalhe/crude-pessoa-conta-banco-detalhe.component';
import { CrudePessoaContaBancoListagemComponent } from './ui/crude/pessoa-conta-banco/crude-pessoa-conta-banco-listagem/crude-pessoa-conta-banco-listagem.component';
import { CrudePessoaContatoListagemComponent } from './ui/crude/pessoa-contato/crude-pessoa-contato-listagem/crude-pessoa-contato-listagem.component';
import { CrudePessoaContatoDetalheComponent } from './ui/crude/pessoa-contato/crude-pessoa-contato-detalhe/crude-pessoa-contato-detalhe.component';
import { CrudePessoaJuridicaTabsComponent } from './ui/crude/pessoa/tabs-pessoa-juridica/tabs-pessoa-juridica.component';
import { CrudePessoaJuridicaComponent } from './ui/crude/pessoa/crude-pessoa-juridica/crude-pessoa-juridica.component';
import { CrudeGrupoClienteListagemComponent } from './ui/crude/grupo-cliente/crude-grupo-cliente-listagem/crude-grupo-cliente-listagem.component';
import { CrudeGrupoClienteDetalheComponent } from './ui/crude/grupo-cliente/crude-grupo-cliente-detalhe/crude-grupo-cliente-detalhe.component';
import { CrudeCanalVendaDetalheComponent } from './ui/crude/canal-venda/crude-canal-venda-detalhe/crude-canal-venda-detalhe.component';
import { CrudeCanalVendaListagemComponent } from './ui/crude/canal-venda/crude-canal-venda-listagem/crude-canal-venda-listagem.component';
import { CrudeTipoRepresentanteListagemComponent } from './ui/crude/tipo-representante/crude-tipo-representante-listagem/crude-tipo-representante-listagem.component';
import { CrudeTipoRepresentanteDetalheComponent } from './ui/crude/tipo-representante/crude-tipo-representante-detalhe/crude-tipo-representante-detalhe.component';
import { CrudeMicrorregiaoListagemComponent } from './ui/crude/microrregiao/crude-microrregiao-listagem/crude-microrregiao-listagem.component';
import { CrudeMicrorregiaoDetalheComponent } from './ui/crude/microrregiao/crude-microrregiao-detalhe/crude-microrregiao-detalhe.component';
import { CrudeRegiaoDetalheComponent } from './ui/crude/regiao/crude-regiao-detalhe/crude-regiao-detalhe.component';
import { CrudeRegiaoListagemComponent } from './ui/crude/regiao/crude-regiao-listagem/crude-regiao-listagem.component';
import { TabsRegiaoComponent } from './ui/crude/regiao/tabs-regiao/tabs-regiao.component';
import { CrudeRepresentanteListagemComponent } from './ui/crude/representante/crude-representante-listagem/crude-representante-listagem.component';
import { CrudeRepresentanteDetalheComponent } from './ui/crude/representante/crude-representante-detalhe/crude-representante-detalhe.component';
import { TabsRepresentanteComponent } from './ui/crude/representante/tabs-representante/tabs-representante.component';
import { CrudeClienteDetalheComponent } from './ui/crude/cliente/crude-cliente-detalhe/crude-cliente-detalhe.component';
import { TabsClienteComponent } from './ui/crude/cliente/tabs-cliente/tabs-cliente.component';
import { CrudeClienteListagemComponent } from './ui/crude/cliente/crude-cliente-listagem/crude-cliente-listagem.component';
import { CrudeGrupoEstabListagemComponent } from './ui/crude/grupo-estab/crude-grupo-estab-listagem/crude-grupo-estab-listagem.component';
import { CrudeGrupoEstabDetalheComponent } from './ui/crude/grupo-estab/crude-grupo-estab-detalhe/crude-grupo-estab-detalhe.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    CorpRoutingModule,

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
  ],
  declarations: [
    CrudePessoaListagemComponent,
    CrudePessoaFisicaTabsComponent,
    CrudePessoaFisicaComponent,
    CrudePessoaJuridicaComponent,
    CrudeEstadoCivilListagemComponent,
    CrudeEstadoCivilDetalheComponent,
    CrudeGrauInstDetalheComponent,
    CrudeGrauInstListagemComponent,
    CrudeRacaCorListagemComponent,
    CrudeRacaCorDetalheComponent,
    CrudeSexoDetalheComponent,
    CrudeSexoListagemComponent,
    CrudeTipoPessoaListagemComponent,
    CrudeTipoPessoaDetalheComponent,
    CrudeSituacaoCadDetalheComponent,
    CrudeSituacaoCadListagemComponent,
    CrudeSituacaoEnvEmailListagemComponent,
    CrudeSituacaoEnvEmailDetalheComponent,
    CrudeTipoDocumentoDetalheComponent,
    CrudeTipoDocumentoListagemComponent,
    CrudeTipoPessoaEnderecoListagemComponent,
    CrudeTipoPessoaEnderecoDetalheComponent,
    CrudeTipoPessoaEmailDetalheComponent,
    CrudeTipoPessoaEmailListagemComponent,
    CrudeTipoPessoaTelefoneListagemComponent,
    CrudeTipoPessoaTelefoneDetalheComponent,
    CrudParamCorpDetalheComponent,
    CrudParamCorpListagemComponent,
    CrudePessoaDocumentoDetalheComponent,
    CrudePessoaDocumentoListagemComponent,
    CrudeTipoLogradouroDetalheComponent,
    CrudeTipoLogradouroListagemComponent,
    CrudeTipoPapelListagemComponent,
    CrudeTipoPapelDetalheComponent,
    CrudeTipoPessoaContatoDetalheComponent,
    CrudeTipoPessoaContatoListagemComponent,
    CrudeProfissaoListagemComponent,
    CrudeProfissaoDetalheComponent,
    CrudePaisDetalheComponent,
    CrudePaisListagemComponent,
    CrudeUfListagemComponent,
    CrudeUfDetalheComponent,
    CrudeCidadeDetalheComponent,
    CrudeCidadeListagemComponent,
    CrudeLogradouroListagemComponent,
    CrudeLogradouroDetalheComponent,
    CrudeSequenciaListagemComponent,
    CrudeSequenciaDetalheComponent,
    TabsSequenciaComponent,
    CrudeSequenciaValorDetalheComponent,
    CrudeSequenciaValorListagemComponent,
    CrudeEmpresaListagemComponent,
    CrudeEmpresaDetalheComponent,
    CrudeEmpresaTabsComponent,
    CrudeEstabelecimentoListagemComponent,
    CrudeEstabelecimentoDetalheComponent,
    CrudePessoaTelefoneListagemComponent,
    CrudePessoaTelefoneDetalheComponent,
    CrudePessoaEmailDetalheComponent,
    CrudePessoaEmailListagemComponent,
    CrudePessoaEnderecoListagemComponent,
    CrudePessoaEnderecoDetalheComponent,
    CrudePessoaContaBancoDetalheComponent,
    CrudePessoaContaBancoListagemComponent,
    CrudePessoaContatoListagemComponent,
    CrudePessoaContatoDetalheComponent,
    CrudePessoaJuridicaTabsComponent,
    CrudeGrupoClienteListagemComponent,
    CrudeGrupoClienteDetalheComponent,
    CrudeCanalVendaDetalheComponent,
    CrudeCanalVendaListagemComponent,
    CrudeTipoRepresentanteListagemComponent,
    CrudeTipoRepresentanteDetalheComponent,

    CrudeMicrorregiaoListagemComponent,
    CrudeMicrorregiaoDetalheComponent,
    CrudeRegiaoDetalheComponent,
    CrudeRegiaoListagemComponent,
    TabsRegiaoComponent,
    CrudeRepresentanteListagemComponent,
    CrudeRepresentanteDetalheComponent,
    TabsRepresentanteComponent,
    CrudeClienteDetalheComponent,
    CrudeClienteListagemComponent,
    TabsClienteComponent,
    CrudeGrupoEstabListagemComponent,
    CrudeGrupoEstabDetalheComponent,

  ],
  exports: [
    CrudePessoaContaBancoDetalheComponent,
    CrudePessoaContaBancoListagemComponent,
    CrudePessoaDocumentoDetalheComponent,
    CrudePessoaDocumentoListagemComponent,
    CrudePessoaEmailDetalheComponent,
    CrudePessoaEmailListagemComponent,
    CrudePessoaEnderecoDetalheComponent,
    CrudePessoaEnderecoListagemComponent,
    CrudePessoaTelefoneDetalheComponent,
    CrudePessoaTelefoneListagemComponent,
    CrudePessoaContatoDetalheComponent,
    CrudePessoaContatoListagemComponent
  ]
})
export class CorpModule { }
