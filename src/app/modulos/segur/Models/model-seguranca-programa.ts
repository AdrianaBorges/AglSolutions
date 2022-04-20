export class ModelSegurancaPrograma {

    /**
         * Identificador Único da Tabela (Gerado Automaticamente)
         */
    IDSegurancaPrograma: number;

    /**
     * Identificador Único da Tabela ProgramaNivel
     * Identifica o Nível do Programa que receberá permissão
     */
    IDProgramaNivel: number;
    /**
     * Código do Programa
     */
    chCodPrograma: string;



    /**
     * 	Nível Único do Programa
     */
    inCodNivel: number;

    /**
       * 	Descrição do Programa
       */
    chDesTitPrograma: string;

    /**
     * Descrição do Nível do Programa
     */
    chDesProgramaNivel: string;
    /**
       * Lista de Operações Disponíveis no Nível do Programa, separadas por virgula " , ".
       */
    chDesOperacao: string;

    /**
     * Código do Grupo de Usuários que terá acesso ao nível de programa
     */
    chCodGrupoUsuario: string;

    /**
    * Descrição do Grupo de Usuários
    */
   chDesGrupoUsuario: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number

}
