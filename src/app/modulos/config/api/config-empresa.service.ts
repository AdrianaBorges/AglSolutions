import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ConfigEmpresa } from '../models/config-empresa';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';

@Injectable()
export class ConfigEmpresaService {

  private config: ConfigEmpresa;

  constructor(
    private http: HttpClient) { }

  public get(): Promise<ConfigEmpresa> {
    // return this.http.get("./file.json")
    //                 .map((res:any) => res.json())
    //                 .catch(erro => console.log(error));

      return new Promise<ConfigEmpresa>((resolve, reject)=>{
        if (this.config == undefined){
          this.http.get<ConfigEmpresa>("./assets/dadosLocais/configEmpresa.json").subscribe(
            configEmpresa => {
              this.config = configEmpresa;
              resolve(configEmpresa);
            },
            erro => {            
              var apiErro: ApiErrorCollection = new ApiErrorCollection();
              apiErro.criarHttpError(404,"arquivo de configuração não encontrado: " + JSON.stringify (erro));
              reject(apiErro);
            }
          )
        }else{        
          resolve(this.config);
        }
      });
    }

}
