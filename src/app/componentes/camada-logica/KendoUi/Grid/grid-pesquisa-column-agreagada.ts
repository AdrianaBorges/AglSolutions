import { GridPesquisaColumn } from './grid-pesquisa-column';
import { enum_formatoColuna } from './enum-formato-coluna';

export class GridPesquisaColumnAgregada extends GridPesquisaColumn{

    constructor(coluna: string, width: number, ...args){
        let propriedade = args.reduce((valorAnterior, valorCorrente, index, array)=>{
            valorAnterior = valorAnterior || '';
            return valorAnterior + '/' + valorCorrente;
        });
        super(coluna,'', propriedade, enum_formatoColuna.texto, false, false, false, width);
        this.formatoColuna = 'agregada'
    }

}