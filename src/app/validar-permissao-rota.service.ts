import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
//import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Location } from '@angular/common';
import { RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidarPermissaoRotaModel } from './validar-permissao-rota.model';
import { ModelSegurMenu } from './modulos/segur/models/model-segur-menu';
import { ApiMenuSistemaService } from './modulos/segur/api/api-menu-sistema.service';
import { MenuSistemaModel } from './componentes/menu-sistema/menu-sistema.model';
import { AssetsLocaleService } from './assets-locale/assets-locale.service';
import { ApiAutenticacaoService } from './modulos/segur/api/api-autenticacao.service';
//import { patchComponentDefWithScope } from '@angular/core/src/render3/jit/module';
//import { Path } from '@progress/kendo-drawing';

/**
 * Classe para tratar todas as validações de rotas conforme permissão do usuário
 * Documentação de referência: https://angular.io/api/router/CanActivate
 */
@Injectable({
  providedIn: 'root'
})
export class ValidarPermissaoRotaService implements CanActivate {

  private rotasValidas: Array<ValidarPermissaoRotaModel>;
  private state_ativo: RouterStateSnapshot;

  private menu: Array<MenuSistemaModel>;

  /** atributo da interface CanActivate */
  path: ActivatedRouteSnapshot[];

  /** atributo da interface CanActivate */
  readonly route: ActivatedRouteSnapshot;

  constructor(
    private router: Router,
    private apiMenuSistemaService: ApiMenuSistemaService,
    private location: Location,
    private assetsLocaleService: AssetsLocaleService,
    private apiAutenticacaoService: ApiAutenticacaoService) {
    this.rotasValidas = [];
  }

  /**
   * Metodo da interface CanActivate usado pelo sistema de rotas para validar se a rota será aceita
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.state_ativo = state;

    return new Promise((resolve, reject) => {

      if (state.url == '/login' || state.url == '/' || state.url == '') {
        //essas são rotas que não dependem de validação
        resolve(true);
      } else {
        //TODO: validar se o usuário está logado
        if (this.apiAutenticacaoService.getUsuarioLogado() == null) {
          this.router.navigate(['/login']);
          reject(false);
          return;
        }

        //Carrega os recursos locais de tradução na validação de rota para estarem disponíveis assim que uma página precisar usar
        this.assetsLocaleService.carregarDados().then(
          traducao => {
            //Carrega o menu da API antes de tentar qualquer validação de rota
            this.getMenu().then(
              menu_carregado => {
                var valido: boolean = this.isRotaValida(state.url);
                if (valido == false) {
                  // Se não for uma rota válida redireciono para a tela principal
                  this.router.navigate(['/modulos']);
                  reject(false);
                } else {
                  resolve(valido);
                }
              },
              erro => {
                reject(false);
              }
            );
          },
          erro => {
            reject(false);
          }
        );

      }
    });

  }

  public funcaoValidaProUsuario(funcao: string): boolean {

    var permissao: ValidarPermissaoRotaModel;
    if (this.state_ativo) {
      permissao = this.getRotaValida(this.state_ativo.url);
      if (permissao) {
        permissao.operacoes = permissao.operacoes || "";
        if (permissao.operacoes == "*") {
          return true;
        } else
          if (permissao.operacoes.toLowerCase().indexOf(funcao.toLowerCase()) >= 0) {
            return true;
          }
      }
    }
    return false;
  }

  /**
   * Função para ser usada em ambiente de dev
   * @param state_url
   * @param operacoes
   */
  public addRotaValida_dev(state_url: string, operacoes: string): ValidarPermissaoRotaModel {
    //Só adiciona a rota se for um item de menu da API relativo a um PROGRAMA,
    //que no caso, terá uma rota definida dele;
    if (state_url) {
      var permissao = new ValidarPermissaoRotaModel();
      permissao.state_url = state_url;
      permissao.operacoes = '';
      if (operacoes) {
        permissao.operacoes = operacoes;
      }
      this.rotasValidas.push(permissao);

      return permissao;
    }
  }

  public addRotaValida(itemMenu: ModelSegurMenu, arrayPais?: Array<MenuSistemaModel>) {
    var permissaoPai: ValidarPermissaoRotaModel = null;
    //Só adiciona a rota se for um item de menu da API relativo a um PROGRAMA,
    //que no caso, terá uma rota definida dele;
    if (itemMenu.chDesPasta) {
      var permissao = new ValidarPermissaoRotaModel();

      permissao.state_url = '';

      //Procuro por uma permissão já adicionada da rota pai, caso haja uma
      if (arrayPais) {
        if (arrayPais.length > 0) {
          var rotaPai = this.rotasValidas.find((rotaExistente) => rotaExistente.state_url == arrayPais[0].path);
          if (rotaPai) {
            //procuro pela rota pai que seja coincidente com o restante dos itens do arrayPais
            for (let ArrayPais = 1; ArrayPais < arrayPais.length; ArrayPais++) {
              const menuPai = arrayPais[ArrayPais];
              /*
                As rotas filhas só tem o nome do cadastro dela, não leva toda a URL até ela
                Ex.: Rota Real: "modulos/cadastro/cadastroPai/1/filho/cadastroFilho"
                     state_url do filho: "cadastroFilho"
              */
              rotaPai = rotaPai.permissoesRotasFilhas.find(rotaFilha => rotaFilha.state_url == rotaPai.state_url);
            }
          }
        }
      }

      permissao.state_url += itemMenu.chDesPasta;
      permissao.operacoes = '';
      if (itemMenu.lProgramaNivel) {
        if (itemMenu.lProgramaNivel.length > 0) {
          permissao.operacoes = itemMenu.lProgramaNivel[0]['chDesOperacao'];
        }
      }
      permissao.adicionarRotasFilhas(itemMenu);
      if (rotaPai) {
        //Se uma rota pai foi encontrada, então a pertmissão deve ser adicionada como filha dela
        rotaPai.permissoesRotasFilhas.push(permissao);
      } else {
        //Se nenhuma rota pai foi encontrada, então a permissão fica na lista raiz das permissões
        this.rotasValidas.push(permissao);
      }

    }
  }

  private isRotaValida(state_url: string): boolean {

    //TODO: validar se o usuário está logado
    if (this.apiAutenticacaoService.getUsuarioLogado() == null) {
      //this.router.navigate(['/login']);
      return false;
    }

    if (this.getRotaValida(state_url) == null) {
      return false;
    } else {
      return true;
    }
    // var permissao: ValidarPermissaoRotaModel;
    // for(let index = 0; index <= this.rotasValidas.length -1; index ++){
    //   permissao = this.rotasValidas[index];
    //   if(state_url.indexOf(permissao.state_url) >=0) {
    //     return true
    //   };
    // };
    // return false;
  }

  private getRotaValida(state_url: string): ValidarPermissaoRotaModel {
    var permissao: ValidarPermissaoRotaModel;
    for (let index = 0; index <= this.rotasValidas.length - 1; index++) {
      permissao = this.rotasValidas[index];
      if (state_url.indexOf(permissao.state_url) >= 0) {
        //Alguma rota valida deve fazer parte da url atual combinando 100% cada nome de rota
        //ou seja, a rota "*/pessoaendereco" não vale para a rota "*/pessoa/" mesmo
        //que "pessoa" esteja dentro do nome "pessoaendereco"
        let arrayRotasPermissao = permissao.state_url.split('/');
        let arrayRotaAtual = state_url.split('/');
        let indexUltimaRota = arrayRotaAtual.indexOf(arrayRotasPermissao[arrayRotasPermissao.length - 1]);
        if (indexUltimaRota >= 0 && arrayRotaAtual.length - (indexUltimaRota + 1) == 3 && arrayRotaAtual[arrayRotaAtual.length - 1].toLowerCase() == 'excluir') {
          //Tentativa de entrar em uma sub-rota de excluir de um multiplo cadastro
          //exemplo: "/modulos/corp/pessoa/juridica/1/excluir"
          //          nesse exemplo a rota real continua sendo "pessoa", onde "juridica" faz parte da mesma validação
          return permissao;
        } else
          if (indexUltimaRota >= 0 && arrayRotaAtual.length - (indexUltimaRota + 1) > 2) {
            //Nesse caso é uma rota filha sendo acessada
            //então devo validar a rota específica dela
            var permissaoFilha = permissao.encontrarPermissaoRotaFilhaValida(state_url);
            if (permissaoFilha) {
              return permissaoFilha;
            }
          } else
            if (indexUltimaRota >= 0) {
              return permissao;
            }
      };
    };
    return null;
  }

  private popularMenu(): Promise<Array<MenuSistemaModel>> {
    return new Promise((resolve, reject) => {
      if (this.apiAutenticacaoService.getUsuarioLogado() == null) {
        reject();
      } else
        this.apiMenuSistemaService.listar().then(
          listaItensMenu => {

            this.menu = new Array<MenuSistemaModel>();
            this.criarMenuDev();

            var menu_api: Array<MenuSistemaModel>;
            menu_api = listaItensMenu.map((itemMenu, index, array) => {
              return new MenuSistemaModel(itemMenu, this);
            });
            this.menu = this.menu.concat(menu_api);
            resolve(this.menu);
          },
          erro => {
            reject();
            //TODO: criar uma forma de exibir mensagem de erro no carregamento do menu
          }

        );
    });
  }

  public limparMenu(): void {
    this.menu = null;
  }

  public getMenu(): Promise<Array<MenuSistemaModel>> {
    return new Promise((resolve, reject) => {
      if (this.menu) {
        resolve(this.menu);
      } else {
        this.popularMenu().then(
          menu_carregado => {
            resolve(menu_carregado);
          },
          erro => {
            reject();
          }
        );
      };
    });
  }
  /**
   * Função para ser usada pelos desenvolvedores para testarem suas rotas.
   * Só é exibido quando executando em localhost
   */
  private criarMenuDev() {
    if (window.location.origin.indexOf('localhost') < 0) {
      return;
    } else {
      //Adiciono às rotas válidas os itens do menu
      this.addRotaValida_dev('/modulos/idfe/nfe', 'Read, Export');
      this.addRotaValida_dev('/modulos/corp/representante', '*');
      this.addRotaValida_dev('/modulos/corp/cliente', '*');

      this.addRotaValida_dev('/modulos/fvenda/aprova-ped-bonif', '*');
      // this.addRotaValida_dev('/modulos/fvenda/solic-apro-ped-bonif', '*');
      this.addRotaValida_dev('/modulos/fvenda/ped-venda', '*');

      this.addRotaValida_dev('/modulos/finan/tipo-movto-cr', '*');

      var menuPrograma = this.addRotaValida_dev('/modulos/segur/programa', '*');

      var menuSOlic =   this.addRotaValida_dev('/modulos/fvenda/solic-apro-ped-bonif', '*');

      var permissaoRotaFilha = new ValidarPermissaoRotaModel();
      permissaoRotaFilha.operacoes = '*';
      permissaoRotaFilha.state_url = 'solic-apro-ped-bonif-item';
      menuSOlic.permissoesRotasFilhas.push(permissaoRotaFilha);

      var permissaoRotaFilhaPedVenda = new ValidarPermissaoRotaModel();
      permissaoRotaFilhaPedVenda.operacoes = '*';
      permissaoRotaFilhaPedVenda.state_url = 'ped-venda';
      permissaoRotaFilha.permissoesRotasFilhas.push(permissaoRotaFilhaPedVenda);

      // var permissaoRotaNeta = new ValidarPermissaoRotaModel();
      // permissaoRotaNeta.operacoes = '*';
      // permissaoRotaNeta.state_url = 'seguranca-programa';
      // permissaoRotaFilha.permissoesRotasFilhas.push(permissaoRotaNeta);

      //Adiciono itens ao menu
      this.menu.push(
        <MenuSistemaModel>{
          codigo: '',
          path: null,
          exibir: true,
          titulo: 'Dev menu',
          children: [
            { titulo: 'NFe', exibir: true, codigo: '', path: '/modulos/idfe/nfe', children: null },
            { titulo: 'Representante', exibir: true, codigo: '', path: '/modulos/corp/representante', children: null },
            { titulo: 'Cliente', exibir: true, codigo: '', path: '/modulos/corp/cliente', children: null },
            { titulo: 'Solicitação de Aprovação de Pedido de Bonificação', exibir: true, codigo: '', path: '/modulos/fvenda/aprova-ped-bonif', children: null },
            { titulo: 'Manutenção de Solicitação de Aprovação de Pedido de Bonificação', exibir: true, codigo: '', path: '/modulos/fvenda/solic-apro-ped-bonif', children: null },
            { titulo: 'Manutenção de Pedido de Venda', exibir: true, codigo: '', path: '/modulos/fvenda/ped-venda', children: null },
            { titulo: 'Tipo de Movimento do Contas a Receber', exibir: true, codigo: '', path: '/modulos/finan/tipo-movto-cr', children: null },

          ]
        }
      )
    }
  }
}
