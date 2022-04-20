import { ApiErrorCollection } from "../../../api-error/api-error-collection";

/**
 * Manutenção de Categorias do Item disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */
export class ModelCategoria extends ApiErrorCollection {
    /**
     * Identificador Único da Tabela(Gerado Automaticamente)
     */
    IDCategoria: number;

    /**
     * Código da Categoria
     */
    chCodCategoria: string;

    /**
     * Descrição da Categoria
     */
    chDescricao: string;

    /**
     * Identificador da Categoria Superiora
     */
    IDCategoriaPai: number;


    /**
     * Código da Categoria Superiora
     */
    chCodCategoriaPai: string;
    
    /**
     * Descrição da Categoria Superiora
     */
    chDesCategoriaPai: string;
    
    /**
     *  Número do Nível da Categoria na Hierarquia
     */
    inNumNivel: number;
    
    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}