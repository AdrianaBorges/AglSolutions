import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdfeRoutingModule } from './idfe-routing.module';

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
import { CrudeFinalidadeNfeDetalheComponent } from './ui/crude/finalidade-Nfe/crude-finalidade-nfe-detalhe/crude-finalidade-nfe-detalhe.component';
import { CrudeFinalidadeNfeListagemComponent } from './ui/crude/finalidade-Nfe/crude-finalidade-nfe-listagem/crude-finalidade-nfe-listagem.component';
import { CrudeModeloDfeListagemComponent } from './ui/crude/modelo-dfe/crude-modelo-dfe-listagem/crude-modelo-dfe-listagem.component';
import { CrudeModeloDfeDetalheComponent } from './ui/crude/modelo-dfe/crude-modelo-dfe-detalhe/crude-modelo-dfe-detalhe.component';
import { CrudeSituacaoCteDetalheComponent } from './ui/crude/situacao-cte/crude-situacao-cte-detalhe/crude-situacao-cte-detalhe.component';
import { CrudeSituacaoCteListagemComponent } from './ui/crude/situacao-cte/crude-situacao-cte-listagem/crude-situacao-cte-listagem.component';
import { CrudeSituacaoNfeListagemComponent } from './ui/crude/situacao-nfe/crude-situacao-nfe-listagem/crude-situacao-nfe-listagem.component';
import { CrudeSituacaoNfeDetalheComponent } from './ui/crude/situacao-nfe/crude-situacao-nfe-detalhe/crude-situacao-nfe-detalhe.component';
import { CrudeStatusConfNfeDetalheComponent } from './ui/crude/status-conf-nfe/crude-status-conf-nfe-detalhe/crude-status-conf-nfe-detalhe.component';
import { CrudeStatusConfNfeListagemComponent } from './ui/crude/status-conf-nfe/crude-status-conf-nfe-listagem/crude-status-conf-nfe-listagem.component';
import { CrudeStatusDfeEventoListagemComponent } from './ui/crude/status-dfe-evento/crude-status-dfe-evento-listagem/crude-status-dfe-evento-listagem.component';
import { CrudeStatusDfeEventoDetalheComponent } from './ui/crude/status-dfe-evento/crude-status-dfe-evento-detalhe/crude-status-dfe-evento-detalhe.component';
import { CrudeTipoCteDetalheComponent } from './ui/crude/tipo-cte/crude-tipo-cte-detalhe/crude-tipo-cte-detalhe.component';
import { CrudeTipoCteListagemComponent } from './ui/crude/tipo-cte/crude-tipo-cte-listagem/crude-tipo-cte-listagem.component';
import { CrudeTipoEmissaoDfeListagemComponent } from './ui/crude/tipo-emissao-dfe/crude-tipo-emissao-dfe-listagem/crude-tipo-emissao-dfe-listagem.component';
import { CrudeTipoEmissaoDfeDetalheComponent } from './ui/crude/tipo-emissao-dfe/crude-tipo-emissao-dfe-detalhe/crude-tipo-emissao-dfe-detalhe.component';
import { CrudeTipoEventoDfeDetalheComponent } from './ui/crude/tipo-evento-dfe/crude-tipo-evento-dfe-detalhe/crude-tipo-evento-dfe-detalhe.component';
import { CrudeTipoEventoDfeListagemComponent } from './ui/crude/tipo-evento-dfe/crude-tipo-evento-dfe-listagem/crude-tipo-evento-dfe-listagem.component';
import { CrudeTipoTomadorCteListagemComponent } from './ui/crude/tipo-tomador-cte/crude-tipo-tomador-cte-listagem/crude-tipo-tomador-cte-listagem.component';
import { CrudeTipoTomadorCteDetalheComponent } from './ui/crude/tipo-tomador-cte/crude-tipo-tomador-cte-detalhe/crude-tipo-tomador-cte-detalhe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CrudeNfeListagemComponent } from './ui/crude/nfe/crude-nfe-listagem/crude-nfe-listagem.component';
import { CrudeNfeDetalheComponent } from './ui/crude/nfe/crude-nfe-detalhe/crude-nfe-detalhe.component';

@NgModule({
  declarations: [
    CrudeFinalidadeNfeDetalheComponent, 
    CrudeFinalidadeNfeListagemComponent, 
    CrudeModeloDfeListagemComponent, 
    CrudeModeloDfeDetalheComponent, 
    CrudeSituacaoCteDetalheComponent, 
    CrudeSituacaoCteListagemComponent, 
    CrudeSituacaoNfeListagemComponent, 
    CrudeSituacaoNfeDetalheComponent, 
    CrudeStatusConfNfeDetalheComponent, 
    CrudeStatusConfNfeListagemComponent, 
    CrudeStatusDfeEventoListagemComponent, 
    CrudeStatusDfeEventoDetalheComponent, 
    CrudeTipoCteDetalheComponent, 
    CrudeTipoCteListagemComponent, 
    CrudeTipoEmissaoDfeListagemComponent, 
    CrudeTipoEmissaoDfeDetalheComponent, 
    CrudeTipoEventoDfeDetalheComponent, 
    CrudeTipoEventoDfeListagemComponent, 
    CrudeTipoTomadorCteListagemComponent, 
    CrudeTipoTomadorCteDetalheComponent, 
    CrudeNfeListagemComponent, 
    CrudeNfeDetalheComponent, 
  ],
  imports: [
    CommonModule,
    IdfeRoutingModule,
    FormsModule, ReactiveFormsModule,

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
  ]
})
export class IdfeModule { }
