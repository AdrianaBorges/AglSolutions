import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção dos Estabelecimentos disponíveis no sistema.
 */
export class ModelEstabelecimento extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDEstabelec: number;
    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoa: number;
    /**
     * Identificador Único da Tabela PapelPessoa
     * Identifica a qual Pessoa o Estabelecimento esta Relacionado
     */
    IDPapelPessoa: number;
    /**
     * Identificador Único da Tabela Empresa
     */
    IDEmpresa: number;
    /**
     * Código do Estabelecimento
     */
    chCodEstabelec: string;
    /**
     * Nome Abreviado do Estabelecimento
     */
    chNomeAbreviado: string;
    /**
     * Nome do Estabelecimento
     */
    chNome: string;
    /**	
     * Número de Identificação Lógica da Pessoa do Tipo Estabelecimento
     * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
     */
    inCNPJEstabelec: number;
    /**
     * Nome do Estabelecimento
     */
    chNomePessoaEstabelec: string;

    /**
     * Código do Grupo de Estabelecimentos
     */
    inCodGrupoEstab: number;

    /**
         * Descrição do Grupo de Estabelecimento
         */
    chDesGrupoEstab: string;

    /**
     * Número de Identificação Lógica da Pessoa do Tipo Empresa
     * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
     */
    inCNPJEmpresa: number;
    /**
     * Nome da Empresa
     */
    chNomePessoaEmpresa: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}