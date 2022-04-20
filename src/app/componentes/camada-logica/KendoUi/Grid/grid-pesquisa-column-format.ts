import { GridPesquisaColumn } from './grid-pesquisa-column';
import { enum_formatoColuna } from './enum-formato-coluna';

export class GridPesquisaColumnFormat extends GridPesquisaColumn{

    private funcaoCallback: Function

    constructor(coluna: string, nomeCampo: string, propriedade: string, formatoColuna: enum_formatoColuna, filterable: boolean, hidden: boolean, width: number = null, funcaoCallback: Function){
        super(coluna, nomeCampo, propriedade, formatoColuna, filterable, hidden, false, width);
        this.funcaoCallback = funcaoCallback;
    }

    public executarFormatacao(objeto: any): string{
        if(this.funcaoCallback){
            return this.funcaoCallback(objeto);
        }else{
            return '';
        }
    }

}