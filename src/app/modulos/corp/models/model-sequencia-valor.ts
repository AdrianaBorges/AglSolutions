import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/** 
 *Manutenção de Valores das Sequências disponíveis no sistema.
 */
export class ModelSequenciaValor extends ApiErrorCollection {

    IDSequenciaValor: number;
    chCodSequencia: string;
    inNumLimInferior: number;
    inNumLimSuperior: number;
    inNumUltimo: number;
    inNumIncremento: number;
    dtDatUltNum: Date;
    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}