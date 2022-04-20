export class ModelProgramaNivel {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDProgramaNivel: number;


    /**
     * Código do Programa
     */
    chCodPrograma: string;

    /**
     * 	Descrição do Programa
     */
    chDesTitPrograma: string;

    /**
     * 	Nível Único do Programa
     */
    inCodNivel: number;


    /**
     * Descrição do Nível do Programa
     */
    chDesProgramaNivel: string;

    /**
     * Comando ou Link a ser executado na chamada do programa
     */
    chDesComandoExecuta: string;

    /**
    * Observação do Nível do Programa
    */
    chDesObservacao: string;

    /**
    * Lista de Operações Disponíveis no Nível do Programa, separadas por virgula " , ".
    */
    chDesOperacao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number

}
