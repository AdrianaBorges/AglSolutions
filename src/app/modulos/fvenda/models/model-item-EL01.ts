import { ApiErrorCollection } from "../../../api-error/api-error-collection";

/**
 * Manutenção de Itens de Venda disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento do Item.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DE ITEM DO MÓDULO FVENDA
 */
export class ModelItemEL01 extends ApiErrorCollection {
    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDItem: number;

    /**
     * Código do Item
     */
    chCodItem: string;

    /**
     * Descrição do Item
     */
    chDescricao: string;
    /**
     * Código da Espécie do Item
     */
    inCodEspecieItem: number;

    /**
     *Descrição da Espécie do Item
     */
    chDesEspecieItem: string;

    /**
     * Identificador Único da Tabela Categoria
     */
    IDCategoria: number;

    /**
     * Código da Categoria
     */
    chCodCategoria: string;

    /**
     * Descrição da Categoria
     */
    chDesCategoria: string;

    /**
     * Identificador Único da Tabela Família Comercial
     */
    IDFamCom: number;

    /**
     * Código da Família Comercial
     */
    chCodFamCom: string;

    /**
     * Descrição da Família Comercial
     */
    chDesFamCom: string;

    /**
     * Identificador Único da Tabela Família de Materiais
     */
    IDFamMat: number;

    /**
     * Código da Família Comercial
     */
    chCodFamMat: string;

    /**
     * Descrição da Família Comercial
     */
    chDesFamMat: string;

    /**
     * Identificador Único da Tabela Grupo de Estoque
     */
    IDGrpEst: number;

    /**
     * Código do Grupo de Estoque
     */
    chCodGrpEst: string;

    /**
     * Descrição do Grupo de Estoque
     */
    chDesGrpEst: string;

    /**
     * Código Complementar/Referência do Item
     */
    chCodComplem: string;

    /**
     * Código EAN do Item
     */
    chCodEAN: string;

    /**
     * Código da Unidade de Medida do Item
     */
    chCodUM: string;

    /**
     * Código NCM do Item
     */
    chCodNCM: string;

    /**
     * Percentual de IPI do Item
     */
    dePercIPI: number;

    /**
     * Percentual da Substituição Tributária do Item
     */
    dePercST: number;

    /**
     * Peso Bruto do Item
     */
    dePesoBruto: number;

    /**
     * Peso Líquido do Item
     */
    dePesoLiquido: number;

    /**
     * Largura do Item
     */
    deLargura: number;

    /**
     * Altura do Item
     */
    deAltura: number;

    /**
     * Comprimento do Item
     */
    deComprimento: number;

    /**
     * Quantidade Múltipla para Venda do Item
     */
    deQtdMultipla: number;

    /**
     * Quantidade Mínima para Venda do Item
     */
    deQtdMinima: number;

    /**
     * Quantidade Máxima para Venda do Item
     */

    deQtdMaxima: number;

    /**
     * Identificador se o Item permite desconto na Venda
     */
    lgPermDesconto: boolean;

    /**
     * Percentual de Desconto Máximo na Venda do Item
     */
    deDescMaximo: number;


    /**
     * Situação Cadastral do Item
     */

    inCodSituacaoCad: number;

    /**
     * Descrição da Situação Cadastral do Item
     */
    chDesSituacaoCad: string;

    /**
     * Observação do Item
     */
    chDesObservacao: string;

    /**
     * Identificador se o Item é controlado por Lote/Série
     */
     lgControleLoteSerie: boolean;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}
