import { Component, OnInit } from '@angular/core';
import { ConfigEmpresa } from '../../modulos/config/models/config-empresa';
import { ConfigEmpresaService } from '../../modulos/config/api/config-empresa.service';
import { ApiErrorCollection } from '../../api-error/api-error-collection';
import { PanelBarItemModel } from '@progress/kendo-angular-layout';
import { ApiMenuSistemaService } from '../../modulos/segur/api/api-menu-sistema.service';
//import { PanelBarRecursivoComponent } from './panel-bar-recursivo/panel-bar-recursivo.component';
import { MenuSistemaModel } from './menu-sistema.model';
import { ValidarPermissaoRotaService } from '../../validar-permissao-rota.service';
import { ModelSegurMenu } from '../../modulos/segur/models/model-segur-menu';
import { AssetsLocaleService } from '../../assets-locale/assets-locale.service';
//import { ModelSegurMenu } from '../../modulos/segur/models/model-segur-menu';

@Component({
  selector: 'app-menu-sistema',
  templateUrl: './menu-sistema.component.html',
  styleUrls: ['./menu-sistema.component.scss']
})
export class MenuSistemaComponent implements OnInit {

  public configEmpresa: ConfigEmpresa;
  public erros: ApiErrorCollection;
  public itensMenu: Array<PanelBarItemModel>;
  public menu: Array<MenuSistemaModel>;

  constructor(
    private configEmpresaService: ConfigEmpresaService,
    private apiMenuSistemaService: ApiMenuSistemaService,
    private validarPermissaoRotaService: ValidarPermissaoRotaService,
    private assetsLocaleService: AssetsLocaleService
    //,private apiErrorCollection: ApiErrorCollection
  ) { 
    this.configEmpresa = new ConfigEmpresa;
    //this.erros = new ApiErrorCollection();
  }

  ngOnInit() {
    this.configEmpresaService.get().then(
      config => {
        this.configEmpresa = config;
      },
      error => {
        this.erros = error
      }
    );

    this.popularMenu();
    //this.criarMenuFake();
    
  }

  popularMenu(){
    this.assetsLocaleService.carregarDados().then(
      resolve_data => {
        this.validarPermissaoRotaService.getMenu().then(
          menu => {
            this.menu = menu;
          },
          erro =>{
            this.menu = new Array<MenuSistemaModel>();
          }
        )
      }
    );
  }
  
  criarMenuFake(){
    this.menu = [
      <MenuSistemaModel>{
        codigo: '',
        path: null,
        titulo: 'Módulos',
        children: [
          {
            codigo: '',
            path: null,
            titulo: 'Segurança',
            children: [
              {
                codigo: '',
                titulo: 'Login',
                path: '/login',
                children: null
              }
            ]
          }
        ]
      },
      <MenuSistemaModel>{
        codigo: '',
        path: null,
        titulo: 'CORP',
        children: [
          { titulo: 'pessoa', codigo: '', path: '/modulos/corp/pessoa', children: null},
          { titulo: 'usuario', codigo: '', path: '/modulos/segur/usuario', children: null},
          { titulo: 'genero', codigo: '', path: '/modulos/corp/sexo', children: null},
          { titulo: 'estado civil', codigo: '', path: '/modulos/corp/estadocivil', children: null},
          { titulo: 'grau de instrução', codigo: '', path: '/modulos/corp/grauinstrucao', children: null},
          { titulo: 'raça e cor', codigo: '', path: '/modulos/corp/racacor', children: null},
          { titulo: 'Situação cadastro', codigo: '', path: '/modulos/corp/situacaocad', children: null}
        ]
      },
      <MenuSistemaModel>{
        codigo: '',
        path: null,
        titulo: 'Extras',
        children: [
          { 
            codigo: '', path: null,
            titulo: 'opção 1' ,
            children: [
              { titulo: 'opção 1', codigo: '', path: null, children: []},
              { titulo: 'opção 2', codigo: '', path: null, children: []},
              { titulo: 'opção 3', codigo: '', path: null, children: []},
              { titulo: 'opção 4', codigo: '', path: null, children: []}
            ]
          },
          { titulo: 'opção 2', codigo: '', path: null, children: []},
          { titulo: 'opção 3', codigo: '', path: null, children: []},
          { titulo: 'opção 4', codigo: '', path: null, children: []}
        ]
      }
    ];
  }

}
