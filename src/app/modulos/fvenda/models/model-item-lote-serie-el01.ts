/**
Manutenção de Lote e Série de Item disponíveis no sistema.
Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */
export class ModelItemLoteSerieEl01 {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDItemLoteSerie: number;

    /**
     * Identificador Único da Tabela de Item
     */
    IDItem: number;

    /**
     * Código do Item
     */
    chCodItem: string;

    /**
     * Descrição do Item
     */
    chDesItem: string;

    /**
     * Identificador Único da Tabela Fornecedor
     */
    chCodModelo: string;

    /**
     * Número de Série do Item
     */
    chNumSerie: string;

    /**
     * Número do Lote do Item
     */
    chNumLote: string;

    /**
     * Concatenação do valor dos campos Mod: chCodModelo + Serie: chNumSerie + Lote: chNumLote
     */
    chDesLoteSerie: string;

    /**
     * Data de Fabricação do Lote ou Série do Item
     */
    daDatFabricacao: Date;

    /**
     * Data de Validade do Lote ou Série do Item
     */
    daDatValidade: Date;

    /**
     * Quantidade de Entrada de Itens do Lote ou Série
     */
    deQtdEntrada: number;

    /**
     * Saldo Inicial do Lote para as análises das Assistências Técnicas
     */
    deQtdSaldoIniAssTec: number;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}
