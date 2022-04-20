/**
 * Expõe um método do componente que permite incluir filtros vindos de outros componentes
 */
export interface InterfaceFiltroInterdependente {

    filtroAlterado(field: string, operator: string, valor: any): void

}