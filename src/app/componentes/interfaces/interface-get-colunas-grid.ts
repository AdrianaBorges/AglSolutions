import { GridPesquisaColumn } from '../camada-logica/KendoUi/Grid/grid-pesquisa-column';

/**
 * Identifica o método do serviço da API que deve ser usado
 * para retornar a coleção de colunas do grid
 */
export interface InterfaceColunasGrid {

    getColunasGrid(): GridPesquisaColumn[]

}