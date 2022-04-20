import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelPessoaEndereco extends ApiErrorCollection {
    /**
     * Identificador Único da Tabela de PessoaEndereco
     * (Gerado Automaticamente)
     */
    IDPessoaEndereco: number;
    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoa: number;
    /**
     * Código do Tipo de Endereço da Pessoa
     */
    inCodTipoPessoaEndereco: number;
    /**
     * Descrição do Tipo de Endereço da Pessoa
     */
    chDesTipoPessoaEndereco: string;
    /**
     *	CEP do Endereço 
     */
    chCEP: string;
    /**
     * Identificador Único da Tabela País
     */
    IDPais: number;
    /**
     * Código do Pais
     */

    chCodPais: string;
    /**
     * Nome Abreviado do Pais
     */
    chNomeAbreviadoPais: string;
    /**
     * Nome Completo do Pais
     */
    chNomePais: string;
    /**
     * Identificador Único da Tabela UF
     */
    IDUF: number;
    /**
     * Sigla da Unidade Federativa
     */
    chSiglaUF: string;
    /**
     * Nome da Unidade Federativa
     */
    chNomeUF: string;
    /**
     * Identificador Único da Tabela Cidade
     */
    IDCidade: number;
    /**
     * Nome da Cidade
     */
    chNomeCidade: string;
    /**
     * Tipo de Logradouro do endereço
     */
    inCodTipoLogradouro: number;
    /**
     * Descrição do Tipo de Logradouro do endereço
     */
    chDesTipoLogradouro: string;
    /**
     * Nome do Logradouro do Endereço
     */
    chNomeLogradouro: string;
    /**
     * Número do Logradouro do Endereço
     */
    chNumeroLogradouro: string;
    /**
     * Complemento do Endereço
     */
    chComplemento: string;
    /**
     * Bairro do Endereço
     */
    chBairro: string;
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