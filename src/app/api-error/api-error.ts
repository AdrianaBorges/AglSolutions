export class ApiError {
    /**
     * Código do erro
     */
    chCodigoErro: string;

    /**
     * Caminho do erro
     */
    chPath: string;

    /**
     * Quando preenchido indetifica o nome do campo que gerou o erro
     */
    chAtributo: string;

    /**
     * Descrição do erro que deverá ser exibida ao usuário, 
     * como um erro geral ou um erro de um campo específico
     */
    chDescricaoErro: string;
}
