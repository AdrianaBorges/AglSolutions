export class ModelPrograma {

    /**
     * Código Único do Programa
     */
    chCodPrograma: string;


    /**
     * Descrição do Programa
     */
    chDesTitPrograma: string;

    /**
     * 	Descrição detalhada do programa
     */
    chDesObservacao: string;

    /**
     * 	Descrição detalhada do programa
     */
    chDesPasta: string;


    /**
     * Identifica Programa Disponível no menu
     */
    lgDisponivelMenu: boolean;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number

}
