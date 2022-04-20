 /**
 * Manutenção de Motivos de Rejeição do Pedido de Compra disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */

  import { ApiErrorCollection } from "../../../api-error/api-error-collection";

  export class ModelMotRejPedComp extends ApiErrorCollection {

      /**
       * Código do Motivo de Rejeição do Pedido de Compra
       */
       inCodMotRejPedComp: number;

      /**
       * Descrição do Motivo de Rejeição
       */
       chDescricao: string;

      /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
       inRecordCount: string;
  }
