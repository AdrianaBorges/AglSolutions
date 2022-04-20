import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Origens do Contas a Receber disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
*/
export class ModelOrigemCR extends ApiErrorCollection {

/**
* Código da Origem do Contas a Receber
*/
inCodOrigemCR: number;

/**
* Descrição da Origem do Contas a Receber
*/
chDescricao: string;

/**
* Quantidade Total de Registros existentes na tabela.
* Atributo será utilizado para calcular paginação dos Grids na interface
*/
inRecordCount: number;

}
