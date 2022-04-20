/** 
 * Manutenção de Transportadoras de Vendas disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento da Transportadora.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DE TRANSPORTADORA DO MÓDULO FVENDA.
 */

 import { ApiErrorCollection } from "../../../api-error/api-error-collection";

 export class ModelTranspEL01 extends ApiErrorCollection {

    /** 
     * Identificador Único da Tabela (Gerado Automaticamente)
    */
    IDTransp: number;

    /** 
     * Código da Transportadora
    */
    inCodTransp: number;

    /** 
     * Nome Abreviado da Transportadora
    */
    chNomAbreviado: string;

    /** 
     * Nome da Transportadora
    */
    chNome: string;

    /** 
     * Código do Tipo de Pessoa como Transportadora
    */
    inCodTipoPessoa: number;

    /** 
     * Descrição do Tipo de Pessoa
    */
    chDesTipoPessoa: string;

    /** 
     * Código do Tipo de Documento de Identificação da Pessoa como Transportadora
    */
    inCodTipoDocumento: number;

    /** 
     * Descrição do Tipo de Documento
    */
    chDesTipoDocumento: string;

    /** 
     * Documento de Identificação da Pessoa como Transportadora
    */
    inNumIdentificacao: number;

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
    chNomeAbrevPais: string;

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
     * DDD do Telefone
    */
    chDDDTelefone: string;

    /** 
     * Número do Telefone
    */
    chNumTelefone: string;

    /** 
     * Endereço de E-Mail
    */
    chEmail: string;

    /** 
     * Situação Cadastral da Transportadora
    */
    inCodSituacaoCad: number;

    /** 
     * Descrição da Situação Cadastral da Tabela de Preços
    */
    chDesSituacaoCad: string;


    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;

 }