import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TelaPrincipalComponent } from './principal/tela-principal/tela-principal.component';
import { TelaPrincipalHomeComponent } from './principal/tela-principal-home/tela-principal-home.component';

//COMPONENTES
import { CabecalhoSistemaComponent } from '../componentes/cabecalho-sistema/cabecalho-sistema.component';
import { CabecalhoBreadcrumbComponent } from '../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.component';
import { MenuSistemaComponent } from '../componentes/menu-sistema/menu-sistema.component';

//PÁGINAS
//import { ListagemUsuariosComponent } from '../modulos/segur/ui/cadastro-usuario/listagem-usuarios/listagem-usuarios.component';
// import { ListagemPessoaComponent } from '../modulos/corp/ui/cadastro-pessoa/listagem-pessoa/listagem-pessoa.component';
// import { EdicaoPessoaComponent } from '../modulos/corp/ui/cadastro-pessoa/edicao-pessoa-fisica/edicao-pessoa.component';
// import { EdicaoPessoaJuridicaComponent } from '../modulos/corp/ui/cadastro-pessoa/edicao-pessoa-juridica/edicao-pessoa-juridica.component';

//SUB-SISTEMAS
import { CorpModule } from './corp/corp.module';
import { SegurModule } from './segur/segur.module';
import { EsegModule } from './eseg/eseg.module';
import { FinanModule } from './finan/finan.module';
import { IdfeModule } from './idfe/idfe.module';
import { FvendaModule } from './fvenda/fvenda.module';

const telaPrincipalRotas: Routes = [
  {
    path: 'modulos',
    component: TelaPrincipalComponent,
    children: [
      {
        path: '',
        component: TelaPrincipalHomeComponent
      },
      {
        path: '',
        component: MenuSistemaComponent,
        outlet: 'menu'
      },
      {
        path: '',
        component: CabecalhoBreadcrumbComponent,
        outlet: 'breadcrumb'
      },
      {
        path: '',
        component: CabecalhoSistemaComponent,
        outlet: 'cabecalho'
      },
      // {
      //   path: 'segur/usuario',
      //   component: ListagemUsuariosComponent
      // },
      {
        path: 'corp',
        //component: CorpModule
        //loadChildren: () => CorpModule
        loadChildren: () => import('./corp/corp.module').then(m => m.CorpModule)
        //loadChildren: () => import('./corp/corp.module').then(m => m.CorpModule)
      },
      {
        path: 'segur',
        //component: SegurModule
        //loadChildren: () => SegurModule
        loadChildren: () => import('./segur/segur.module').then(m => m.SegurModule)
        //loadChildren: () => import('./segur/segur.module').then(m => m.SegurModule)
      },
      {
        path: 'eseg',
        //component: EsegModule
        //loadChildren: () => EsegModule
        loadChildren: () => import('./eseg/eseg.module').then(m => m.EsegModule)
        //loadChildren: () => import('./eseg/eseg.module').then(m => m.EsegModule)
      },
      {
        path:'finan',
        //component: FinanModule
        //loadChildren: () => FinanModule
        loadChildren: () => import('./finan/finan.module').then(m => m.FinanModule)
        //loadChildren: () => import('./finan/finan.module').then(m => m.FinanModule)
      },
      {
        path:'idfe',
        //component: IdfeModule
        //loadChildren: () => IdfeModule
        loadChildren: () => import('./idfe/idfe.module').then(m => m.IdfeModule)
        //loadChildren: () => import('./idfe/idfe.module').then(m => m.IdfeModule)
      },
      {
        path:'fvenda',
        //component: FvendaModule
        //loadChildren: () => FvendaModule
        loadChildren: () => import('./fvenda/fvenda.module').then(m => m.FvendaModule)
        //loadChildren: () => import('./fvenda/fvenda.module').then(m => m.FvendaModule)
      }
      // {
      //   path: 'corp/pessoa',
      //   component: ListagemPessoaComponent
      // },
      // {
      //   path: 'corp/pessoafisica/:id',
      //   component: EdicaoPessoaComponent
      //   //loadChildren: '/modulos/corp/ui/cadastro-pessoa/cadastro-pessoa-fisica-dados-pessoais/cadastro-pessoa-fisica-dados-pessoais.module#CadastroPessoaFisicaDadosPessoaisModule'
      // },
      // {
      //   path: 'corp/pessoafisica/:id/:operacao',
      //   component: EdicaoPessoaComponent
      // },
      // {
      //   path: 'corp/pessoajuridica/:id',
      //   component: EdicaoPessoaJuridicaComponent
      // },
      // {
      //   path: 'corp/pessoajuridica/:id/:operacao',
      //   component: EdicaoPessoaJuridicaComponent
      // }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(telaPrincipalRotas)
  ],
  exports: [RouterModule]
})
export class TelaPrincipalRoutingModule { }
