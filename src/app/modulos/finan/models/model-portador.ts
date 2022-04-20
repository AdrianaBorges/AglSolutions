import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/** Portador  */
export class ModelPortador extends ApiErrorCollection {
    /**
    * Código do Portador
    */
    inCodPortador: number;

    /**
     * Nome Abreviado do Portador
     */
    chNomAbreviado: string;

    /**
     * Nome do Portador
     */
    chNome: string;

    /**
     * Código do Banco relacionado ao Portador
     */
    inCodBanco: number;

    /**
     * Número da Agência em caso do Portador ser um Banco
     */
    chAgencia: string;

    /**
     * Dígito Verificador da Agência
     */
    chDVAgencia: string;

    /**
     * Número da Conta Bancária em caso do Portador ser um Banco
     */
    chConta: string;

    /**
     * Dígito Verificador da Conta Bancária
     */
    chDVConta: string;

    /**
     * Número do Convênio de Cobrança com o Portador
     */
    chConvenioCobranca: string;

    /**
     * Código da Sequência para geração do nosso número em caso de Cobrança 
     */
    chCodSeqNossoNum: string;

    /**
     * Código da Sequência para geração da remessa de cobrança ao portador
     */
    chCodSeqRemCob: string;

    /**
     * Nome da Pasta para geração dos arquivos de remessa de cobrança ao portador
     */
    chNomPastaArqRem: string;

    /**
     * 	Nome do Arquivo de Remessa para o Portador com mascara
     * Campo permite formatar o nome do arquivo utilizando as seguintes TAG que será substituidas pelos respectivos valores:
     * <DD> - DIA no momento da geração do arquivo.
     * <MM> - MÊS no momento da geração do arquivo.
     * <AAAA> - ANO no momento da geração do arquivo.
     * 
     * <Hr> - HORA no momento da geração do arquivo.
     * <Mn> - MINUTO no momento da geração do arquivo.
     * <Sc> - SEGUNDO no momento da geração do arquivo.
     * 
     * <SeqX> - Será substituído pelo próximo número de sequência de Remessa de Cobrança, onde X será o número de dígito da sequencia.
     */
    chNomArqRem: string;

    /**
     * Código de Transmissão do Arquivo de Cobrança no Banco
     */
    chCodTransmissao: string;


    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}