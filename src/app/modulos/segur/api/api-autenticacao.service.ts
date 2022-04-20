import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { Autenticacao } from '../../segur/models/autenticacao';
import { ApiTokenService } from '../../../api-data-access/api-token.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';


@Injectable()
export class ApiAutenticacaoService {

  private usuarioLogado: Autenticacao;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private apiTokenService: ApiTokenService) { }

  public getUsuarioLogado(): Autenticacao{
    if (this.usuarioLogado == undefined){
      this.usuarioLogado = this.apiTokenService.getUsuarioLogado();
      if (this.usuarioLogado == undefined){
        return null;
        // this.usuarioLogado = new Autenticacao();
        // this.usuarioLogado.chNomeUsuario = 'nome do usuário';
        // this.usuarioLogado.chEMail = 'email@usuario.com';
        // this.usuarioLogado.chDesTipoUsuario = 'admin';
      }
    }
    return this.usuarioLogado;
  }

  public trocarSenha(senhaAntiga: string, senhaNova: string, senhaNova2: string): Promise<boolean>{
  
    let url = `segur/api/Autenticacao/AlterarSenha`;

    let objeto = { 
      chPass   : senhaAntiga,
      chPassNew: senhaNova
    };

    return new Promise<boolean>(
      (resolve, reject)=>{
        //resolve(true);
        // var apiErro: ApiErrorCollection;
        // apiErro = new ApiErrorCollection();
        // apiErro.criarHttpError(400,"deu ruim");
        // reject(apiErro);
        this.apiGatewayService.put<boolean>(url, objeto, true)
        .then(
          alterou => {
            resolve(alterou);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );

  }

  public autenticar(usuario: string, senha: string): Promise<Autenticacao>{

    let url = `segur/api/Autenticacao/Autenticar`;

    let objeto = { 
      chCodUsuario : usuario,
      chPass       : senha
    };

    return new Promise<Autenticacao>(
      (resolve, reject)=>{

        this.apiGatewayService.post<Autenticacao>(url, objeto, false)
        .then(
          usuario => {
            this.usuarioLogado = usuario;
            //console.log('usuario = ', usuario);
            //console.log('usuario.chIDToken = ', usuario.chIDToken);
            if(usuario.chIDToken != undefined){
              //console.log('usuario.chIDToken = ', usuario.chIDToken);
              this.apiTokenService.setToken(usuario.chIDToken);
              this.apiTokenService.setUsuarioLogado(usuario);
            }
            resolve(usuario);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
    
  }

  public validarToken(token: string): Promise<Autenticacao>{

    let url = `segur/api/Autenticacao/validarToken/${token}`;


    return new Promise<Autenticacao>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Autenticacao>(url, false)
        .then(
          usuario => {
            this.usuarioLogado = usuario;
            //console.log('usuario = ', usuario);
            //console.log('usuario.chIDToken = ', usuario.chIDToken);
            if(usuario.chIDToken != undefined){
              //console.log('usuario.chIDToken = ', usuario.chIDToken);
              this.apiTokenService.setToken(usuario.chIDToken);
              this.apiTokenService.setUsuarioLogado(usuario);
            }
            resolve(usuario);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
    
  }

  public limparAutenticacao(){
    this.usuarioLogado = null;
    this.apiTokenService.limparDados();
  }

  public reiniciarSenha(email: string): Promise<boolean>{

    let url = `segur/api/Autenticacao/ReiniciarSenha`;

    let objeto = { 
      chEMail : email
    };

    return new Promise<boolean>(
      (resolve, reject)=>{

        this.apiGatewayService.put<boolean>(url, objeto, false)
        .then(
          resposta => {
            resolve(resposta);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
    
  }

}
