import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelOper0012 } from '../models/model-oper0012';

@Injectable({
  providedIn: 'root'
})
export class ApiOper0012Service {

  private url: string = 'fvenda/api/oper0012';
  orderByColumnName: string;
  sortType: string;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public executar(objeto: ModelOper0012): Promise<ModelOper0012> {
    return new Promise<ModelOper0012>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelOper0012>(this.url, objeto, true)
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
