import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Tipo de Espécie do Contas a Receber disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
*/
export class ModelTipoEspecieCR extends ApiErrorCollection {

  /**
  * Código do Tipo de Espécie do Contas a Receber
  */
  inCodTipoEspecieCR: number;

  /**
  * Descrição do Tipo de Espécie do Contas a Receber
  */
  chDescricao: string;

  /**
  * Quantidade Total de Registros existentes na tabela.
  * Atributo será utilizado para calcular paginação dos Grids na interface
  */
  inRecordCount: number;

}
