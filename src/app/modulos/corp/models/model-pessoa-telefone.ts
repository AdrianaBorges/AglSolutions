import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelPessoaTelefone extends ApiErrorCollection {
    /**
     * 	Identificador Único da Tabela de PessoaTelefone
     * (Gerado Automaticamente)
     */
    IDPessoaTelefone: number;
    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoa: number;
    /**
     * Código do Tipo de Telefone da Pessoa
     */
    inCodTipoPessoaTelefone: number;
    /**
     * Descrição do Tipo de Telefone da Pessoa
     */
    chDesTipoPessoaTelefone: string;
    /**
     * DDI do Telefone
     */
    chDDI: string;
    /**
     * DDD do Telefone
     */
    chDDD: string;
    /**
     * Número do Telefone
     */
    chNumero: string;
    /**
     * Data/Hora de Inclusão do Registro
     */
    dtDatInclusao: Date;
    /**
     * Data/Hora da Última Alteração no Registro
     */
    dtDatUltAlteracao: Date;

    /**
 * Quantidade Total de Registros existentes na tabela.
 * Atributo será utilizado para calcular paginação dos Grids na interface
 */
    inRecordCount: number;
}