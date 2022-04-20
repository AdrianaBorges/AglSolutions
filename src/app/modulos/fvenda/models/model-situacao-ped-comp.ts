 /**
 * Manutenção de Situações do Pedido de Compra do Cliente disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */

  import { ApiErrorCollection } from "../../../api-error/api-error-collection";

  export class ModelSituacaoPedComp extends ApiErrorCollection {

      /**
       * Código da Situação do Pedido de Compra
       */
       inCodSituacaoPedComp: number;

      /**
       * Descrição da Situação do Pedido de Compra
       */
       chDescricao: string;

      /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
       inRecordCount: string;
  }
