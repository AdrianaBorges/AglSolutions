import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelOper0006 } from '../models/model-oper0006';

@Injectable({
  providedIn: 'root'
})
export class ApiOper0006Service {

  private url: string = 'fvenda/api/oper0006';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public executar(objeto: ModelOper0006): Promise<ModelOper0006> {
    return new Promise<ModelOper0006>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelOper0006>(this.url, objeto, true)
          .then(
            objeto_retornado => {
              resolve(objeto_retornado);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }
}
