 /**
 * Manutenção de Situações de Atendimento do Item do Pedido de Compra disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */

  import { ApiErrorCollection } from "../../../api-error/api-error-collection";

  export class ModelSitAtenPedComp extends ApiErrorCollection {

      /**
       * Código da Situação de Atendimento do Item do Pedido de Compra
       */
       inCodSitAtenPedComp: number;

      /**
       * Descrição da Situação de Atendimento do Item do Pedido de Compra
       */
       chDescricao: string;

      /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
       inRecordCount: string;
  }
