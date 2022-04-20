import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Carteiras do Contas a Receber disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
*/
export class ModelCarteiraCR extends ApiErrorCollection {

/**
* Código da Carteira do Contas a Receber
*/
inCodCarteiraCR: number;

/**
* Descrição da Carteira do Contas a Receber
*/
chDescricao: string;

/**
* Quantidade Total de Registros existentes na tabela.
* Atributo será utilizado para calcular paginação dos Grids na interface
*/
inRecordCount: number;

}
