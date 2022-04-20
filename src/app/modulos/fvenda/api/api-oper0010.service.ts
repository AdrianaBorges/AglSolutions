import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelOper0010 } from '../models/model-oper0010';

@Injectable({
  providedIn: 'root'
})
export class ApiOper0010Service {

  private url: string = 'fvenda/api/oper0010';
  orderByColumnName: string;
  sortType: string;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public executar(objeto: ModelOper0010): Promise<ModelOper0010> {
    return new Promise<ModelOper0010>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelOper0010>(this.url, objeto, true)
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
