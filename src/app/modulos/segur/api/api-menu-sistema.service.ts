/**
 * 19/02/2019
 * Documentação da API:
 * http://hmlstf.agileit.inf.br/AGLSolutionsDOCs/Seguranca/API_Segur_Menu_v02.0001.01.html
 */
import { Injectable } from '@angular/core';
import { PanelBarItemModel } from '@progress/kendo-angular-layout';

import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ModelSegurMenu } from '../models/model-segur-menu';

@Injectable()
export class ApiMenuSistemaService {

  private url: string = 'segur/api/menu';
  
  private menuSistema: Array<PanelBarItemModel>;

  constructor(
    private apiGatewayService: ApiGatewayService
    ) { }

  public getMenu(): Promise<Array<PanelBarItemModel>> {

    return new Promise<Array<PanelBarItemModel>>((resolve, reject) => {
      if (this.menuSistema != undefined){
        resolve(this.menuSistema);
      }else{
        //TODO:
        //Acessar de fato a API para pegar a resposta e transformar no componente necessário
        
        this.criarMenuFake();

        resolve(this.menuSistema);

      }
    });

  }

  private criarMenuFake(){
    this.menuSistema = [
      <PanelBarItemModel>{
        title: 'Segurança',
        imageUrl: '',
        children: [
          <PanelBarItemModel>{
            id: '/login',
            title: 'Usuários',
            imageUrl: ''
          },
          <PanelBarItemModel>{
            title: 'Perfís de usuários',
            imageUrl: '',
          }
        ]
      },
      <PanelBarItemModel>{
        title: 'Gestão',
        imageUrl: '',
        children: [
          <PanelBarItemModel>{
            title: 'Bancos',
            imageUrl: '',
            children: [
              <PanelBarItemModel>{
                title: 'contas internas',
                imageUrl: '',
              },
              <PanelBarItemModel>{
                title: 'contas externas',
                imageUrl: '',
              }
            ]
          },
          <PanelBarItemModel>{
            title: 'Contratos',
            imageUrl: '',
          }
        ]
      }
    ];
  }

  public listar(): Promise<Array<ModelSegurMenu>>{

    let url: string = `${this.url}`;

    return new Promise<Array<ModelSegurMenu>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelSegurMenu>>(url, true)
        .then(
          (listaMenus) => {
            resolve(listaMenus);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
    
  }

  private factoryMenu_PanelBarItemModel(): Promise<Array<PanelBarItemModel>>{

    var listaMenuMapeado: Array<PanelBarItemModel> = [];

    return new Promise<Array<PanelBarItemModel>>(
      (resolve, reject)=>{
        this.listar().then(
          listaMenu => {

            listaMenu.forEach(menu => {
              var menuMapeado: PanelBarItemModel;
              menuMapeado = this.mapeamentoRecursivoEmArvore(menu);
              listaMenuMapeado.push(menuMapeado);
            });

            resolve(listaMenuMapeado);

          }, erro =>{
            reject(listaMenuMapeado);
          }
        );
      }
    );

  }

  private mapeamentoRecursivoEmArvore(menu: ModelSegurMenu): PanelBarItemModel{
    var MenuMapeado: PanelBarItemModel = {
      title: menu.chDesTitPrograma,
      id: menu.IDMenuOpcao + '',
      icon: '',
      iconClass: '',
      imageUrl: '',
      disabled: false,
      expanded: false,
      focused:false,
      selected: false,
      children: [],
      content: ''
    };

    menu.lMenuFilhos.forEach(menuFilho => {
      var menuFilhoMapeado: PanelBarItemModel;
      menuFilhoMapeado = this.mapeamentoRecursivoEmArvore(menuFilho);
      MenuMapeado.children.push(menuFilhoMapeado);
    });

    return MenuMapeado;
  }

}
