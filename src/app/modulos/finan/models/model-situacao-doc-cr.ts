import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Situações do Documento a Receber disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
*/
export class ModelSituacaoDocCR extends ApiErrorCollection {

  /**
  * Código da Situação do Documento a Receber
  */
  inCodSituacaoDocCR: number;

  /**
  * Descrição da Situação do Documento a Receber
  */
  chDescricao: string;

  /**
  * Quantidade Total de Registros existentes na tabela.
  * Atributo será utilizado para calcular paginação dos Grids na interface
  */
  inRecordCount: number;

}
