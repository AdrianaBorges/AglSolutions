import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelOper0007 } from '../models/model-oper0007';

@Injectable({
  providedIn: 'root'
})
export class ApiOper0007Service {

  private url: string = 'fvenda/api/oper0007';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public executar(objeto: ModelOper0007): Promise<ModelOper0007> {
    return new Promise<ModelOper0007>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelOper0007>(this.url, objeto, true)
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
