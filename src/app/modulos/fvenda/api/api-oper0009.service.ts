import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelOper0009 } from '../models/model-oper0009';

@Injectable({
  providedIn: 'root'
})
export class ApiOper0009Service {

  private url: string = 'fvenda/api/oper0009';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public executar(objeto: ModelOper0009): Promise<ModelOper0009> {
    return new Promise<ModelOper0009>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelOper0009>(this.url, objeto, true)
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
