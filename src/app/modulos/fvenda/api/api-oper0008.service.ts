import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelOper0008 } from '../models/model-oper0008';

@Injectable({
  providedIn: 'root'
})
export class ApiOper0008Service {

  private url: string = 'fvenda/api/oper0008';
  orderByColumnName: string;
  sortType: string;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public executar(objeto: ModelOper0008): Promise<ModelOper0008> {
    return new Promise<ModelOper0008>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelOper0008>(this.url, objeto, true)
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
