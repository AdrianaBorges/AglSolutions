import { TabsRepresentanteComponent } from './ui/crude/representante/tabs-representante/tabs-representante.component';
import { CrudeRepresentanteListagemComponent } from './ui/crude/representante/crude-representante-listagem/crude-representante-listagem.component';
import { CrudeTipoLogradouroListagemComponent } from './ui/crude/tipo-logradouro/crude-tipo-logradouro-listagem/crude-tipo-logradouro-listagem.component';
import { CrudeTipoPessoaEnderecoDetalheComponent } from './ui/crude/tipo-pessoa-endereco/crude-tipo-pessoa-endereco-detalhe/crude-tipo-pessoa-endereco-detalhe.component';
import { CrudeTipoPessoaEnderecoListagemComponent } from './ui/crude/tipo-pessoa-endereco/crude-tipo-pessoa-endereco-listagem/crude-tipo-pessoa-endereco-listagem.component';
import { CrudeSituacaoCadDetalheComponent } from './ui/crude/situacao-cad/crude-situacao-cad-detalhe/crude-situacao-cad-detalhe.component';
import { CrudeSituacaoCadListagemComponent } from './ui/crude/situacao-cad/crude-situacao-cad-listagem/crude-situacao-cad-listagem.component';
import { CrudeSexoListagemComponent } from './ui/crude/sexo/crude-sexo-listagem/crude-sexo-listagem.component';
import { CrudeSexoDetalheComponent } from './ui/crude/sexo/crude-sexo-detalhe/crude-sexo-detalhe.component';
import { CrudeEstadoCivilListagemComponent } from './ui/crude/estado-civil/crude-estado-civil-listagem/crude-estado-civil-listagem.component';
import { CrudeEstadoCivilDetalheComponent } from './ui/crude/estado-civil/crude-estado-civil-detalhe/crude-estado-civil-detalhe.component';
import { CrudeGrauInstListagemComponent } from './ui/crude/grau-inst/crude-grau-inst-listagem/crude-grau-inst-listagem.component';
import { CrudeGrauInstDetalheComponent } from './ui/crude/grau-inst/crude-grau-inst-detalhe/crude-grau-inst-detalhe.component';
import { CrudeRacaCorListagemComponent } from './ui/crude/raca-cor/crude-raca-cor-listagem/crude-raca-cor-listagem.component';
import { CrudeRacaCorDetalheComponent } from './ui/crude/raca-cor/crude-raca-cor-detalhe/crude-raca-cor-detalhe.component';
import { CrudeTipoPessoaListagemComponent } from './ui/crude/tipo-pessoa/crude-tipo-pessoa-listagem/crude-tipo-pessoa-listagem.component';
import { CrudeTipoPessoaDetalheComponent } from './ui/crude/tipo-pessoa/crude-tipo-pessoa-detalhe/crude-tipo-pessoa-detalhe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Controle de rotas
import { ValidarPermissaoRotaService } from '../../validar-permissao-rota.service';

// import { EdicaoPessoaComponent } from '../../modulos/corp/ui/cadastro-pessoa/edicao-pessoa-fisica/edicao-pessoa.component';
// import { EdicaoPessoaJuridicaComponent } from '../../modulos/corp/ui/cadastro-pessoa/edicao-pessoa-juridica/edicao-pessoa-juridica.component';

import { CrudePessoaListagemComponent } from '../../modulos/corp/ui/crude/pessoa/crude-pessoa-listagem/crude-pessoa-listagem.component';
import { CrudePessoaFisicaTabsComponent } from '../../modulos/corp/ui/crude/pessoa/tabs-pessoa-fisica/tabs-pessoa-fisica.component';

import { CrudeSituacaoEnvEmailListagemComponent } from './ui/crude/situacao-env-email/crude-situacao-env-email-listagem/crude-situacao-env-email-listagem.component';
import { CrudeSituacaoEnvEmailDetalheComponent } from './ui/crude/situacao-env-email/crude-situacao-env-email-detalhe/crude-situacao-env-email-detalhe.component';
import { CrudeTipoDocumentoListagemComponent } from './ui/crude/tipo-documento/crude-tipo-documento-listagem/crude-tipo-documento-listagem.component';
import { CrudeTipoDocumentoDetalheComponent } from './ui/crude/tipo-documento/crude-tipo-documento-detalhe/crude-tipo-documento-detalhe.component';
import { CrudeTipoPessoaTelefoneListagemComponent } from './ui/crude/tipo-pessoa-telefone/crude-tipo-pessoa-telefone-listagem/crude-tipo-pessoa-telefone-listagem.component';
import { CrudeTipoPessoaTelefoneDetalheComponent } from './ui/crude/tipo-pessoa-telefone/crude-tipo-pessoa-telefone-detalhe/crude-tipo-pessoa-telefone-detalhe.component';
import { CrudeTipoPessoaEmailListagemComponent } from './ui/crude/tipo-pessoa-email/crude-tipo-pessoa-email-listagem/crude-tipo-pessoa-email-listagem.component';
import { CrudeTipoPessoaEmailDetalheComponent } from './ui/crude/tipo-pessoa-email/crude-tipo-pessoa-email-detalhe/crude-tipo-pessoa-email-detalhe.component';
import { CrudParamCorpDetalheComponent } from './ui/crude/param-corp/crud-param-corp-detalhe/crud-param-corp-detalhe.component';
import { CrudParamCorpListagemComponent } from './ui/crude/param-corp/crud-param-corp-listagem/crud-param-corp-listagem.component';
import { CrudeTipoLogradouroDetalheComponent } from './ui/crude/tipo-logradouro/crude-tipo-logradouro-detalhe/crude-tipo-logradouro-detalhe.component';
import { CrudeTipoPapelListagemComponent } from './ui/crude/tipo-papel/crude-tipo-papel-listagem/crude-tipo-papel-listagem.component';
import { CrudeTipoPapelDetalheComponent } from './ui/crude/tipo-papel/crude-tipo-papel-detalhe/crude-tipo-papel-detalhe.component';
import { CrudeTipoPessoaContatoListagemComponent } from './ui/crude/tipo-pessoa-contato/crude-tipo-pessoa-contato-listagem/crude-tipo-pessoa-contato-listagem.component';
import { CrudeTipoPessoaContatoDetalheComponent } from './ui/crude/tipo-pessoa-contato/crude-tipo-pessoa-contato-detalhe/crude-tipo-pessoa-contato-detalhe.component';
import { CrudeProfissaoListagemComponent } from './ui/crude/profissao/crude-profissao-listagem/crude-profissao-listagem.component';
import { CrudeProfissaoDetalheComponent } from './ui/crude/profissao/crude-profissao-detalhe/crude-profissao-detalhe.component';
import { CrudePaisListagemComponent } from './ui/crude/pais/crude-pais-listagem/crude-pais-listagem.component';
import { CrudePaisDetalheComponent } from './ui/crude/pais/crude-pais-detalhe/crude-pais-detalhe.component';
import { CrudeUfListagemComponent } from './ui/crude/uf/crude-uf-listagem/crude-uf-listagem.component';
import { CrudeUfDetalheComponent } from './ui/crude/uf/crude-uf-detalhe/crude-uf-detalhe.component';
import { CrudeCidadeDetalheComponent } from './ui/crude/cidade/crude-cidade-detalhe/crude-cidade-detalhe.component';
import { CrudeCidadeListagemComponent } from './ui/crude/cidade/crude-cidade-listagem/crude-cidade-listagem.component';
import { CrudeLogradouroListagemComponent } from './ui/crude/logradouro/crude-logradouro-listagem/crude-logradouro-listagem.component';
import { CrudeLogradouroDetalheComponent } from './ui/crude/logradouro/crude-logradouro-detalhe/crude-logradouro-detalhe.component';
import { CrudeSequenciaListagemComponent } from './ui/crude/sequencia/crude-sequencia-listagem/crude-sequencia-listagem.component';
import { TabsSequenciaComponent } from './ui/crude/sequencia/tabs-sequencia/tabs-sequencia.component';
import { CrudeEmpresaListagemComponent } from './ui/crude/empresa/crude-empresa-listagem/crude-empresa-listagem.component';
import { CrudeEmpresaTabsComponent } from './ui/crude/empresa/tabs-empresa/crude-empresa-tabs.component';
import { CrudePessoaJuridicaTabsComponent } from './ui/crude/pessoa/tabs-pessoa-juridica/tabs-pessoa-juridica.component';
import { CrudeGrupoClienteListagemComponent } from './ui/crude/grupo-cliente/crude-grupo-cliente-listagem/crude-grupo-cliente-listagem.component';
import { CrudeGrupoClienteDetalheComponent } from './ui/crude/grupo-cliente/crude-grupo-cliente-detalhe/crude-grupo-cliente-detalhe.component';
import { CrudeCanalVendaDetalheComponent } from './ui/crude/canal-venda/crude-canal-venda-detalhe/crude-canal-venda-detalhe.component';
import { CrudeCanalVendaListagemComponent } from './ui/crude/canal-venda/crude-canal-venda-listagem/crude-canal-venda-listagem.component';
import { CrudeTipoRepresentanteDetalheComponent } from './ui/crude/tipo-representante/crude-tipo-representante-detalhe/crude-tipo-representante-detalhe.component';
import { CrudeTipoRepresentanteListagemComponent } from './ui/crude/tipo-representante/crude-tipo-representante-listagem/crude-tipo-representante-listagem.component';
import { CrudeRegiaoListagemComponent } from './ui/crude/regiao/crude-regiao-listagem/crude-regiao-listagem.component';
import { TabsRegiaoComponent } from './ui/crude/regiao/tabs-regiao/tabs-regiao.component';
import { CrudeClienteListagemComponent } from './ui/crude/cliente/crude-cliente-listagem/crude-cliente-listagem.component';
import { TabsClienteComponent } from './ui/crude/cliente/tabs-cliente/tabs-cliente.component';
import { CrudeGrupoEstabDetalheComponent } from './ui/crude/grupo-estab/crude-grupo-estab-detalhe/crude-grupo-estab-detalhe.component';
import { CrudeGrupoEstabListagemComponent } from './ui/crude/grupo-estab/crude-grupo-estab-listagem/crude-grupo-estab-listagem.component';


const routes: Routes = [
  {
    path: 'pessoa',
    component: CrudePessoaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
    //Lazy-load (ainda não funcionou, então apaguei o module e a rota do module)
    //loadChildren: './app/Modulos/corp/ui/cadastro-pessoa/listagem-pessoa/listagem-pessoa.module#ListagemPessoaModule'
  },
  {
    path: 'pessoa/fisica/:id',
    component: CrudePessoaFisicaTabsComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pessoa/fisica/:id/:operacao',
    component: CrudePessoaFisicaTabsComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pessoa/juridica/:id',
    component: CrudePessoaJuridicaTabsComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pessoa/juridica/:id/:operacao',
    component: CrudePessoaJuridicaTabsComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'sexo',
    component: CrudeSexoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'sexo/:id',
    component: CrudeSexoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'sexo/:id/:operacao',
    component: CrudeSexoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'estado-civil',
    component: CrudeEstadoCivilListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'estado-civil/:id',
    component: CrudeEstadoCivilDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'estado-civil/:id/:operacao',
    component: CrudeEstadoCivilDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grau-inst',
    component: CrudeGrauInstListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grau-inst/:id',
    component: CrudeGrauInstDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grau-inst/:id/:operacao',
    component: CrudeGrauInstDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'raca-cor',
    component: CrudeRacaCorListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'raca-cor/:id',
    component: CrudeRacaCorDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'raca-cor/:id/:operacao',
    component: CrudeRacaCorDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa',
    component: CrudeTipoPessoaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa/:id',
    component: CrudeTipoPessoaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa/:id/:operacao',
    component: CrudeTipoPessoaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-cad',
    component: CrudeSituacaoCadListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-cad/:id',
    component: CrudeSituacaoCadDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-cad/:id/:operacao',
    component: CrudeSituacaoCadDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-env-email',
    component: CrudeSituacaoEnvEmailListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-env-email/:id',
    component: CrudeSituacaoEnvEmailDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-env-email/:id/:operacao',
    component: CrudeSituacaoEnvEmailDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-documento',
    component: CrudeTipoDocumentoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-documento/:id',
    component: CrudeTipoDocumentoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-documento/:id/:operacao',
    component: CrudeTipoDocumentoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-endereco',
    component: CrudeTipoPessoaEnderecoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-endereco/:id',
    component: CrudeTipoPessoaEnderecoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-endereco/:id/:operacao',
    component: CrudeTipoPessoaEnderecoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-telefone',
    component: CrudeTipoPessoaTelefoneListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-telefone/:id',
    component: CrudeTipoPessoaTelefoneDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-telefone/:id/:operacao',
    component: CrudeTipoPessoaTelefoneDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-email',
    component: CrudeTipoPessoaEmailListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-email/:id',
    component: CrudeTipoPessoaEmailDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-email/:id/:operacao',
    component: CrudeTipoPessoaEmailDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'param-corp',
    component: CrudParamCorpListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'param-corp/:id',
    component: CrudParamCorpDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'param-corp/:id/:operacao',
    component: CrudParamCorpDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-logradouro',
    component: CrudeTipoLogradouroListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-logradouro/:id',
    component: CrudeTipoLogradouroDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-logradouro/:id/:operacao',
    component: CrudeTipoLogradouroDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-papel',
    component: CrudeTipoPapelListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-papel/:id',
    component: CrudeTipoPapelDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-papel/:id/:operacao',
    component: CrudeTipoPapelDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-contato',
    component: CrudeTipoPessoaContatoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-contato/:id',
    component: CrudeTipoPessoaContatoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pessoa-contato/:id/:operacao',
    component: CrudeTipoPessoaContatoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'profissao',
    component: CrudeProfissaoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'profissao/:id',
    component: CrudeProfissaoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'profissao/:id/:operacao',
    component: CrudeProfissaoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pais',
    component: CrudePaisListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pais/:id',
    component: CrudePaisDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pais/:id/:operacao',
    component: CrudePaisDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'uf',
    component: CrudeUfListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'uf/:id',
    component: CrudeUfDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'uf/:id/:operacao',
    component: CrudeUfDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cidade',
    component: CrudeCidadeListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cidade/:id',
    component: CrudeCidadeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cidade/:id/:operacao',
    component: CrudeCidadeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'logradouro',
    component: CrudeLogradouroListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'logradouro/:id',
    component: CrudeLogradouroDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'logradouro/:id/:operacao',
    component: CrudeLogradouroDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'sequencia',
    component: CrudeSequenciaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'sequencia/:id',
    component: TabsSequenciaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'sequencia/:id/:operacao',
    component: TabsSequenciaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'empresa',
    component: CrudeEmpresaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'empresa/:id',
    component: CrudeEmpresaTabsComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'empresa/:id/:operacao',
    component: CrudeEmpresaTabsComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grupo-cliente',
    component: CrudeGrupoClienteListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grupo-cliente/:id',
    component: CrudeGrupoClienteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grupo-cliente/:id/:operacao',
    component: CrudeGrupoClienteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'canal-venda',
    component: CrudeCanalVendaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'canal-venda/:id',
    component: CrudeCanalVendaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'canal-venda/:id/:operacao',
    component: CrudeCanalVendaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-representante',
    component: CrudeTipoRepresentanteListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-representante/:id',
    component: CrudeTipoRepresentanteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-representante/:id/:operacao',
    component: CrudeTipoRepresentanteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'regiao',
    component: CrudeRegiaoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'regiao/:id',
    component: TabsRegiaoComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'regiao/:id/:operacao',
    component: TabsRegiaoComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'representante',
    component: CrudeRepresentanteListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'representante/:id',
    component: TabsRepresentanteComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'representante/:id/:operacao',
    component: TabsRepresentanteComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cliente',
    component: CrudeClienteListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cliente/:id',
    component: TabsClienteComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cliente/:id/:operacao',
    component: TabsClienteComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grupo-estab',
    component: CrudeGrupoEstabListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grupo-estab/:id',
    component: CrudeGrupoEstabDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grupo-estab/:id/:operacao',
    component: CrudeGrupoEstabDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpRoutingModule { }
