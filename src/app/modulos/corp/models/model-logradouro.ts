import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção de Logradouros disponíveis no sistema.
 */
export class ModelLogradouro extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDLogradouro: number;
    /**
     * Identificador Único da Tabela Cidade
     * Identifica a qual Cidade o Logradouro esta vinculado
     */
    IDCidade: number;
    /**
     * Código do Tipo de Logradouro
     */
    inCodTipoLogradouro: number;
    /**
     * Nome do Logradouro
     */
    /**
     * Caso exista algum atributo, cujo nome, seja igual a parte do nome
     * de outro atributo, e ambos os atributos sejam exibidos no Grid,
     * com possibilidade de Filtro, precisamos criar um atributo novo (Fake),
     * com um nome mais completo (Único), para garantir que a busca pela string
     * do nome, não encontre o valor como parte do nome do outro atributo.
     * Exemplo: Atributo da API chNome e chNomeCidade
     *          Atributo Fake, chNomeLogradouro = chNome
     */
    chNome: string;
    chNomeLogradouro: string;
    /**
     * Complemento do Nome do Logradouro
     */
    chComplemento: string;
    /**
     * Nome Abreviado do Logradouro
     */
    chNomeAbreviado: string;
    /**
     * Nome do Bairro
     */
    chBairro: string;
    /**
     * CEP do Logradouro (em caso de específico)
     */
    chCEP: string;
    /**
     * Identificador Único da Tabela Pais
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
     * Descrição do Tipo de Logradouro
     */
    chDesTipoLogradouro: string;
    /**
     * Nome da Cidade do Logradouro
     */
    chNomeCidade: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}