export class ModelSegurMenu {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDMenuOpcao: number;


    /**
     * Identificador da Opção de Menu de Nível Superior
     */
    IDMenuOpcaoPai: number;

    /**
     * Nível da Opção na Hierarquia de Menu
     */
    inNivel: number;

    /**
     * Sequência da Opção do Menu dentro do Nível
     */
    inSeqMenuOpcao: number;

    /**
     * Descrição da Opção de Menu
     */
    chDesMenuOpcao: string;

    /**
     * Código do Tipo de Opção de Menu
     */
    inCodTipoMenuOpcao: number;

    /**
     * Descrição do Tipo de Opção de Menu
     */
    chDesTipoMenuOpcao: string;

    /**
     * Caminho Relativo e nome da Imagem da Opção do Menu
     */
    chDesImagem: string;

    /**
     * 1º parâmetro a ser passado na chamada do programa
     */
    chDesParam1: string;

    /**
     * 2º parâmetro a ser passado na chamada do programa
     */
    chDesParam2: string;

    /**
     * 3º parâmetro a ser passado na chamada do programa
     */
    chDesParam3: string;

    /**
     * Código do Programa da Opção de Menu
     */
    chCodPrograma: string;

    /**
     * Descrição do Programa associado a Opção de Menu
     */
    chDesTitPrograma: string;

    /**
     * Caminho(pasta) relativo do programa
     */
    chDesPasta: string;

    lProgramaNivel: any;

    lMenuFilhos: Array<ModelSegurMenu>;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number

}
