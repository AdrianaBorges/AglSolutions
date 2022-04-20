import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiTokenService } from '../../../../api-data-access/api-token.service';
import { ApiAutenticacaoService } from '../../api/api-autenticacao.service';
import { Autenticacao } from '../../models/autenticacao';
import { ApiErrorCollection } from '../../../../api-error/api-error-collection';
import { ConfigEmpresaService } from '../../../config/api/config-empresa.service';
import { ConfigEmpresa } from '../../../config/models/config-empresa';
import { ValidarPermissaoRotaService } from '../../../../validar-permissao-rota.service';
import { AssetsLocaleService } from '../../../../assets-locale/assets-locale.service';
import { AguardeCarregandoComponent } from '../../../../componentes/aguarde-carregando/aguarde-carregando.component';

interface DadosFormularioLogin {
  chCodUsuario: string;
  chPass: string;
}

@Component({
  selector: 'app-autenticacao-usuario',
  templateUrl: './autenticacao-usuario.component.html',
  styleUrls: ['./autenticacao-usuario.component.scss']
})
export class AutenticacaoUsuarioComponent implements OnInit {

  public corFundoLogo: string;
  public urlLogo: string;
  public usuario: DadosFormularioLogin;
  public autenticacao: Autenticacao = new Autenticacao();
  public erros: ApiErrorCollection;
  public configEmpresa: ConfigEmpresa;
  public instanciaModalEsqueciSenha: any = {};
  @ViewChild('aguardeCarregando', { static: true }) aguardeCarregando: AguardeCarregandoComponent;
  @ViewChild('elem_password', { static: true }) elem_password: ElementRef;
  @ViewChild('elem_login', { static: true }) elem_login: ElementRef;

  constructor(
    private apiAutenticacaoService: ApiAutenticacaoService,
    private apiTokenService: ApiTokenService,
    private configEmpresaService: ConfigEmpresaService,
    private router: Router,
    private validarPermissaoRotaService: ValidarPermissaoRotaService,
    private assetsLocaleService: AssetsLocaleService,
    public sanitizer: DomSanitizer){
    //inicializo a classe de erro para a interface não dar erro de undefined
    this.configEmpresa = new ConfigEmpresa;
    this.erros = new ApiErrorCollection();

    this.usuario = {
      chCodUsuario: '',
      chPass: ''
    }
    //this.corFundoLogo = "rgb(236, 238, 134)";
    //var base46IMg: string = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==";
    //this.urlLogo = 'https://angular.io/assets/images/logos/angular/shield-large.svg';
    //this.autenticarUsuarioMU();
  }

  public getElem_password(): string{
    return this.elem_password.nativeElement.innerText;
  }
  public getElem_login(): string{
    return this.elem_login.nativeElement.innerText;
  }

  ngOnInit() {
    this.configEmpresaService.get().then(
      config => {
        this.configEmpresa = config;
        this.autenticarToken();
      },
      error => {
        this.erros = error
      }
    );
  }

  private autenticarToken(){
    let token = this.apiTokenService.getToken();

    if(token){
      this.exibirAguarde();
      this.apiAutenticacaoService.validarToken(token).then(
        success => {
          this.esconderAguarde();
          this.router.navigate(['/modulos']);
        },
        error =>{
          this.esconderAguarde();
        }
      )
    }
  }


  public acessar(){

    this.exibirAguarde();

    this.apiAutenticacaoService.autenticar(this.usuario.chCodUsuario,this.usuario.chPass).then(
      dados_autenticacao => {
        this.autenticacao = dados_autenticacao;
        this.erros = new ApiErrorCollection();
        this.validarPermissaoRotaService.limparMenu();
        this.validarPermissaoRotaService.getMenu().then(
          resolve_data => {
            this.assetsLocaleService.carregarDados().then(
              resolve_data=> {
                this.router.navigate(['/modulos']);
              },
              reject_data =>{
                this.router.navigate(['/login']);
              }
            );
          },
          reject_data =>{
            this.router.navigate(['/login']);
          }
        );


      },
      erro => {
        this.esconderAguarde();
        this.erros = erro;
      }
    )
  }

  public esqueci_a_senha(){
    this.instanciaModalEsqueciSenha.modal.exibir();
  }

  public  getNomeUsuario(): string{
    return this.autenticacao.chNomeUsuario;
  }

  public senhaAlterada(): void{
    //console.log("Entendi, a senha foi alterada, agora vou redirecionar para o sistema");
  }

  public exibirAguarde(){
    this.aguardeCarregando.exibir();
  }

  public esconderAguarde(){
    this.aguardeCarregando.esconder();
  }

}
