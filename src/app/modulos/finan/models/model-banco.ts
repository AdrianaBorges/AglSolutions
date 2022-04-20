import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Instituições Bancárias disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
*/
export class ModelBanco extends ApiErrorCollection {
    /**
    * Código do Banco
    */
    inCodBanco: number;

    /**
    * Nome do Banco
    */
    chNome: string;

    /**
    * Caminho da Classe do Sistema para especialização da Cobrança PIX
    */
    chClasseCobrancaPix: string;

    /**
    * Caminho da Classe do Sistema para especialização da geração dos dados de impressão de boleto
    */
    chClasseBoleto: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}
