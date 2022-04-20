/**
 * Manutenção de Situações da Solicitação de Aprovação de Pedido Venda disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */

 import { ApiErrorCollection } from "../../../api-error/api-error-collection";

 export class ModelSituacaoSolAprPV extends ApiErrorCollection {

     /**
      * Código da Situação da Solicitação de Aprovação de Pedido de Venda
      */
      inCodSituacaoSolAprPV: number;

     /**
      * Descrição da Situação da Solicitação de Aprovação de Pedido de Venda
      */
      chDescricao: string;

     /**
      * Quantidade Total de Registros existentes na tabela.
      * Atributo será utilizado para calcular paginação dos Grids na interface
      */
      inRecordCount: string;
 }
