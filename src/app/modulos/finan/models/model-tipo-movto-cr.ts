import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Tipos de Movimentos do Contas a Receber disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */

export class ModelTipoMovtoCR extends ApiErrorCollection {

    /**
     * Código do Tipo de Movimento do Contas a Receber
     */
     inCodTipoMovtoCR: number;

    /**
     * Descrição do Tipo de Movimento do Contas a Receber
     */
     chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
     inRecordCount: number;

    /**
     * Estrutura de Atributos que retornará a lista de erros da API
     */
     IErros: number;

     /**
     * Atributo pertencente a estrutura lErros que conterá o código do Erro
     */
      chCodigoErro: string;

     /**
     * Atributo pertencente a estrutura lErros que conterá a descrição do Erro
     */
      chDescricaoErro: string;

    /**
     * Atributo pertencente a estrutura lErros que conterá o empilhamento de objetos onde o erro ocorre
     */
     chPath: string;

    /**
     * Atributo pertencente a estrutura lErros que conterá o nome do atributo que gerou o erro na API.
     * Em caso de erros gerais, este atributo ficará vazio.
     */
     chNomeAtributo: string;

}
