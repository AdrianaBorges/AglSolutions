import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção das Empresas disponíveis no sistema.
 */
export class ModelEmpresa extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDEmpresa: number;
    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoa: number;
    /**
     * Identificador Único da Tabela PapelPessoa
     * Identifica a qual Pessoa a Empresa esta Relacionada
     */
    IDPapelPessoa: number;
    /**
     * Código da Empresa
     */
    chCodEmpresa: string;
    /**
     * Número de Identificação Lógica da Pessoa
     * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
     */
    inCNPJEmpresa: number;
    /**
     * Nome da Pessoa
     */
    chNomeEmpresa: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}