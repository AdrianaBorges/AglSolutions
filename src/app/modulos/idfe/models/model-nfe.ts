import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { NumberSymbol } from '@angular/common';
//Modelos de Documentos Fiscais Eletrônicos (DFe) 
export class ModelNfe extends ApiErrorCollection {
    
    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     * 
     * * obrigatório
     * * NFe.IDNFe
     */
    IDNFe: number;

    /**
     * Chave da NFe
     * 
     * * obrigatório
     * * nvarchar(50)
     * * NFe.chChaveNFe
     */
    chChaveNFe: string

    /**
     * Identificador Único da Tabela EmpresaDFe
     * Identifica a qual Empresa a NFe esta Relacionada
     * 
     * * obrigatório
     * * Bigint
     * * NFe.IDEmpresaDFe
     */
    IDEmpresaDFe: number;

    /**
     * Identificador Único da Tabela Estabelec
     * Identifica a qual Estabelecimento a Empresa, para Integração com DFE, esta Relacionada
     * 
     * * obrigatório
     * * Bigint
     * * EmpresaDFe.IDEstabelec
     */
    IDEstabelec: number;

    /**
     * Código do Estabelecimento
     * 
     * * não é obrigatório
     * * nvarchar(10)
     * * Estabelec.chCodEstabelec
     */
    chCodEstabelec: string;

    /**
     * Nome Abreviado do Estabelecimento
     * 
     * * não é obrigatório
     * * nvarchar(25)
     * * Estabelec.chNomeAbreviado
     */
    chNomeAbreviadoEstabelec: string;

    /**
     * Número de Identificação Lógica da Pessoa
     * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
     * 
     * * não é obrigatório
     * * Bigint
     * * PessoaEstabelec.inNumIdentificacao
     */
    inCNPJEstabelec: number;

    /**
     * Nome do Estabelecimento
     * 
     * * não é obrigatório
     * * nvarchar(100)
     * * Estabelec.chNome
     */
    chNomeEstabelec: string;

    /**
     * Série da NFe
     * 
     * * obrigatório
     * * int
     * * NFe.inNumSerie
     */
    inNumSerie: number;

    /**
     * Número da NFe
     * 
     * * obrigatório
     * * int
     * * NFe.inNumDocto
     */
    inNumDocto: number;

    /**
     * Data e Hora de Emissão da NFe
     * 
     * * obrigatório
     * * Datetime
     * * NFe.dtDatEmissao
     */
    dtDatEmissao: Date;

    /**
     * Valor Total da NFe
     * 
     * * obrigatório
     * * Decimal(13,2)
     * * NFe.deValTotal
     */
    deValTotal: number;

    /**
     * Digest Value da NFe Processada Utilizado para conferir a integridade da NFe Original
     * 
     * * obrigatório
     * * nvarchar(50)
     * * NFe.chDigVal
     */
    chDigVal: string;

    /**
     * Data/Hora do Recebimento da NFe
     * 
     * * obrigatório
     * * Datetime
     * * NFe.dtDatReceb
     */
    dtDatReceb: Date;

    /**
     * Número do Protocolo na NFe
     * 
     * * obrigatório
     * * Bigint
     * * NFe.inNumProtocolo
     */
    inNumProtocolo: number;

    /**
     * Número Sequencial Único do Documento de Resumo da NFe para Empresa
     * 
     * * não é obrigatório
     * * Bigint
     * * NFe.inNSUResNFe
     */
    inNSUResNFe: number;

    /**
     * Código do Modelo do DFe
     * 
     * * obrigatório
     * * int
     * * NFe.inCodModeloDFe
     */
    inCodModeloDFe: number;

    /**
     * 	Descrição do Modelo de DFe
     * 
     * * obrigatório
     * * nvarchar(50)
     * * ModeloDFe.chDescricao
     */
    chDesModeloDFe: string;

    /**
     * Código da Finalidade da NFe
     * 
     * * obrigatório
     * * int
     * * NFe.inCodFinalidadeNFe
     */
    inCodFinalidadeNFe: number;

    /**
     * Descrição da Finalidade da NFe
     * 
     * * obrigatório
     * * nvarchar(50)
     * * FinalidadeNFe.chDescricao
     */
    chDesFinalidadeNFe: string;

    /**
     * Código do Tipo de Emissão do DFe
     * 
     * * obrigatório
     * * int
     * * NFe.inCodTipoEmissaoDFe
     */
    inCodTipoEmissaoDFe: number;

    /**
     * Descrição do Tipo de Emissão de DFe
     * 
     * * obrigatório
     * * nvarchar(50)
     * * TipoEmissaoDFe.chDescricao
     */
    chDesTipoEmissaoDFe: string;

    /**
     * Código da Situação da NFe
     * 
     * * obrigatório
     * * int
     * * NFe.inCodSituacaoNFe
     */
    inCodSituacaoNFe: number;

    /**
     * Descrição da Situação da NFe
     * 
     * * obrigatório
     * * nvarchar(50)
     * * SituacaoNFe.chDescricao
     */
    chDesSituacaoNFe: string;

    /**
     * Código do Status de Confirmação do Destinatário da NFe
     * 
     * * obrigatório
     * * int
     * * NFe.inCodStatusConfNFe
     */
    inCodStatusConfNFe: number;

    /**
     * Descrição do Status de Confirmação da NFe
     * 
     * * obrigatório
     * * nvarchar(50)
     * * StatusConfNFe.chDescricao
     */
    chDesStatusConfNFe: string;

    /**
     * Número de Identificação (CNPJ/CPF) do Emitente da NFe
     * 
     * * obrigatório
     * * Bigint
     * * NFe.inNumIdentifEmit
     */
    inNumIdentifEmit: number;

    /**
     * Nome do Emitente da NFe
     * 
     * * obrigatório
     * * nvarchar(60)
     * * NFe.chNomeEmit
     */
    chNomeEmit: string;

    /**
     * Número da Inscrição Estadual do Emitente da NFe
     * 
     * * obrigatório
     * * Bigint
     * * NFe.inNumInscEstEmit
     */
    inNumInscEstEmit: number;

    /**
     * Data/Hora de Inclusão do Registro
     * 
     * * não é obrigatório
     * * Datetime
     * * NFe.dtDatInclusao
     */
    dtDatInclusao: Date;

    /**
     * Data/Hora da Última Alteração no Registro
     * 
     * * não é obrigatório
     * * Datetime
     * * NFe.dtDatUltAlteracao
     */
    dtDatUltAlteracao: Date;

    /**
     * Data da Última Validação da NFe
     * Marcação para identificar que a NFe já foi carregado para o sistema de ERP para integração
     * 
     * * não é obrigatório
     * * Datetime
     * * NFe.dtDatUltValidacao
     */
    dtDatUltValidacao: Date;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}