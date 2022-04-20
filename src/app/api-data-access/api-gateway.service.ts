import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiErrorCollection} from '../api-error/api-error-collection';
import { ApiErrorException } from '../api-error/api-error-exception';
import { ApiErrorExceptionEnum } from '../api-error/api-error-exception-enum';
import { ApiTokenService } from './api-token.service'
import { ConfigEmpresaService} from '../modulos/config/api/config-empresa.service'
//import { Observable } from 'rxjs/Observable';
//import { of } from 'rxjs/observable/of';

@Injectable()
export class ApiGatewayService {

  //private baseUrl: string = 'http://homolog.almseguradora.agileit.inf.br:9101/api/';
  //private baseUrl: string = 'https://mufitness.com.br/api/teste/v1/';

  //constructor(private http: HttpClient) { }
  constructor(
    private router: Router,
    private http: HttpClient,
    private apiTokenService: ApiTokenService,
    private configEmpresaService: ConfigEmpresaService) {}



  private checkErrorAndGoToLogin(oApiErrorCollection: ApiErrorCollection): void {
    if(oApiErrorCollection.getListaErros().length > 0){
      let erro = oApiErrorCollection.getListaErros()[0];
      if(
        (erro.chCodigoErro === '211' || erro.chCodigoErro === '210') &&
        erro.chPath === 'TokenAcesso-DAL-validarTokenAcesso'){
        this.apiTokenService.limparDados();
        this.router.navigate(['/login']);
      }
    }
  }

  private criarHeader(usarToken: boolean) {

    // let headers =  new HttpHeaders()
    // .set('Content-Type', 'application/json; charset=utf-8');
    if(usarToken == true){
      //headers.set('Authorization', this.apiTokenService.getToken());

      return {
        headers: {
          Authorization: this.apiTokenService.getToken()
        }
      }
    }else {
      return {}
    }

    //return headers;
    // return {
    //   headers: headers
    // };

  }

  public get<T>(metodo: string, usarToken: boolean): Promise<T>{
    var url: string;
    var oApiErrorCollection: ApiErrorCollection;

    // if (usarToken){
    //   metodo = this.adicionarTokenComoQueryParameter(metodo);
    // }
    const options = this.criarHeader(usarToken);

    return new Promise<T>((resolve, reject)=>{
      this.configEmpresaService.get().then(
        configEmpresa => {
          url = configEmpresa.serverApiUrl.concat(metodo);

          this.http.get<T>(url, options)
          .subscribe(
            resposta => {

              resolve(resposta);
              // oApiErrorCollection = this.getErroDaResposta(resposta);
              // if (oApiErrorCollection == null){
              //   resolve(resposta);
              // }else{
              //   reject(oApiErrorCollection);
              // }

            },
            error => {

              oApiErrorCollection = this.tratarErro(error);
              this.checkErrorAndGoToLogin(oApiErrorCollection);
              reject(oApiErrorCollection);
            }
          );
        },
        erro => {
          oApiErrorCollection.criarHttpError(400, erro);
          reject(oApiErrorCollection);
        }
      );

    });
  }

  public delete<T>(metodo: string, usarToken: boolean): Promise<T>{
    var url: string;
    var oApiErrorCollection: ApiErrorCollection;

    // if (usarToken){
    //   metodo = this.adicionarTokenComoQueryParameter(metodo);
    // }
    const options = this.criarHeader(usarToken);

    return new Promise<T>((resolve, reject)=>{
      this.configEmpresaService.get().then(
        configEmpresa => {
          url = configEmpresa.serverApiUrl.concat(metodo);

          this.http.delete<T>(url, options)
          .subscribe(
            resposta => {

              resolve(resposta);
              // oApiErrorCollection = this.getErroDaResposta(resposta);
              // if (oApiErrorCollection == null){
              //   resolve(resposta);
              // }else{
              //   reject(oApiErrorCollection);
              // }
            },
            error => {
              oApiErrorCollection = this.tratarErro(error);
              this.checkErrorAndGoToLogin(oApiErrorCollection);
              reject(oApiErrorCollection);
            }
          );
        },
        erro => {
          oApiErrorCollection.criarHttpError(400, erro);
          reject(oApiErrorCollection)
        }
      );
    });
  }

  public post<T>(metodo: string, body: any, usarToken: boolean): Promise<T>{
    var url: string;
    var oApiErrorCollection: ApiErrorCollection;

    // if (usarToken){
    //   metodo = this.adicionarTokenComoQueryParameter(metodo);
    // }

    body = this.parse(body);

    const options = this.criarHeader(usarToken);

    return new Promise<T>((resolve, reject)=>{
      this.configEmpresaService.get().then(
        configEmpresa => {
          url = configEmpresa.serverApiUrl.concat(metodo);

          this.http.post<T>(url, body, options)
          .subscribe(
            resposta => {

              resolve(resposta);
              // oApiErrorCollection = this.getErroDaResposta(resposta);
              // if (oApiErrorCollection == null){
              //   resolve(resposta);
              // }else{
              //   reject(oApiErrorCollection);
              // }

            },
            error => {
              oApiErrorCollection = this.tratarErro(error);
              this.checkErrorAndGoToLogin(oApiErrorCollection);
              reject(oApiErrorCollection);
            }
          );
        },
        erro => {
          oApiErrorCollection.criarHttpError(400, erro);
          reject(oApiErrorCollection)
        }
      );

    });
  }

  public put<T>(metodo: string, body: any, usarToken: boolean): Promise<T>{
    var url: string;
    var oApiErrorCollection: ApiErrorCollection;

    // if (usarToken){
    //   metodo = this.adicionarTokenComoQueryParameter(metodo);
    // }

    body = this.parse(body);

    const options = this.criarHeader(usarToken);

    return new Promise<T>((resolve, reject)=>{

      this.configEmpresaService.get().then(
        configEmpresa => {
          url = configEmpresa.serverApiUrl.concat(metodo);

          this.http.put<T>(url, body, options)
          .subscribe(
            resposta => {

              resolve(resposta);
              // oApiErrorCollection = this.getErroDaResposta(resposta);
              // if (oApiErrorCollection == null){
              //   resolve(resposta);
              // }else{
              //   reject(oApiErrorCollection);
              // }

            },
            error => {
              oApiErrorCollection = this.tratarErro(error);
              this.checkErrorAndGoToLogin(oApiErrorCollection);
              reject(oApiErrorCollection);
            }
          );
        },
        erro => {
          oApiErrorCollection.criarHttpError(400, erro);
          reject(oApiErrorCollection)
        }
      );
    });
  }

  /**
   * Verifica se o objeto retornado pela API possui o atributo
   * do erro preeenchido
   *
   * @param resposta Body de retorno da API quando o status = 200 Ok
   */
  private getErroDaResposta(resposta: any): ApiErrorCollection{
    var oApiErrorCollection: ApiErrorCollection;

    try{
      if(resposta['lErros'] != undefined){
        if(resposta['lErros'] instanceof Array){
          if(resposta['lErros'].length > 0){
            oApiErrorCollection = ApiErrorCollection.cast({
              error: resposta['lErros']
            });
          }
        }
      }
      //Se o cast foi bem sucedido é pq o objeto voltou com o atributo
      //de erro nele
      oApiErrorCollection.criarHttpError(400,'Bad Request');
      return oApiErrorCollection;
    }catch(ex){
      //Se não foi possível converter o objeto na classe de erros da API
      //então o objeto não trouxe o atributo de erro nele
      return null;
    }
  }

  /**
   * Trata o erro retornado pela requisição Http e retorna o erro
   * no formado definido pela API da AGLSolution
   *
   * @param erro erro retornado pela requisição HTTP
   */
  private tratarErro(erro: HttpErrorResponse): ApiErrorCollection{
    var oApiErrorCollection: ApiErrorCollection;

    try{
      oApiErrorCollection = ApiErrorCollection.cast(erro);
      oApiErrorCollection.httpErrorResponse = erro;
      return oApiErrorCollection;
    }catch(ex){
      var oAPIException: ApiErrorException = ex;
      if(oAPIException.tipoErro == ApiErrorExceptionEnum.tipo_incorreto){

        oApiErrorCollection = new ApiErrorCollection();
        oApiErrorCollection.addHttpError(erro);

        return oApiErrorCollection;
      }
    }
  }

  /**
   * A API no momento está solicitando o token nos parâmetros da query.
   * Algumas já foral alteradas para solicitar no Header "Authorization",
   * então por via das dúvidas estou incluindo ela no query parameter.
   *
   * AVISO! Quando todas as APIs forem convertidas para solicitar o token no Header
   * então esse método pode simplesmente ser excluído.
   * @param metodo
   */
  private adicionarTokenComoQueryParameter(metodo: string): string{
    var sToken: string = this.apiTokenService.getToken();
    if( metodo.indexOf('?')>=0){
      metodo = metodo.concat(`?rtoken=${sToken}`);
      return metodo;
    }
    return metodo.concat(`&rtoken=${sToken}`);
  }

  /**
   * Transforma propriedades com valor do tipo Date em string
   * novamente sem usar o formato ISO pois ao serializar a data
   * para JSON o parse usa toISOString, o que acaba alterando a
   * hora
   * @param json
   */
  private parse(json) {
    if(json){
      Object.keys(json).map(key => {
        if(json[key]){
          if(json[key] instanceof Date){
            json[key] = `${json[key].getFullYear()}-${("00" + (json[key].getMonth() + 1)).slice(-2)}-${("00"+json[key].getDate()).slice(-2)}T${json[key].toLocaleTimeString('pt-BR')}`;
          }
        }
      });
    }
    return json;
  }

}
