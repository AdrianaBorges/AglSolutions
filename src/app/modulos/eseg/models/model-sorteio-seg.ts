import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Sorteios de Seguro
 */


export class ModelSorteioSeg extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDSorteioSeg: number;

    /**
     * Identificador Único da Tabela Seguradora
     * Identifica a qual Seguradora a Assistência esta vinculada
     */
    IDSeguradora: number;

    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoaSeguradora: number;

    /**
     *Identificador Único da Tabela PapelPessoa
     Identifica a qual Pessoa a Seguradora esta relacionada
     */
    IDPapelPessoaSeguradora: number;

    /**
     * Número de Identificação Lógica da Pessoa
     * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
     */
    inCNPJSeguradora: number;

    /**
     * Nome da Pessoa
     */
    chNomeSeguradora: string;

    /**
     * Código do Sorteio
     */
    chCodSorteioSeg: string;

    /**
     * Descrição do Sorteio
     */
    chDescricao: string;


    /**
     * Descrição do Sorteio para ser exibida nas impressões de documentos
     */
    chDesExterna: string;

    /**
     * Descrição Detalhada do Sorteio
     */
    chDesDetalhe: string;

    /**
     * Valor do Sorteio
     */
    deValSorteio: number;

    /**
     * Número do Título de Capitalização do Sorteio
     */
    chNumTitCap: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}