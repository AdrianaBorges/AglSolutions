import { enum_formatoColuna} from './enum-formato-coluna';
//Servicos
import { AssetsLocaleService } from '../../../../assets-locale/assets-locale.service';

export class GridPesquisaColumn {
    public nomeColuna: string;
    public nomePropriedade: string;
    
    //** Define o tipo de coluna a ser usado no filtro */
    public tipoColuna: 'text' | 'numeric' | 'boolean' | 'date';

    public formatoColuna?: string;

    public nomeCampo: string;

    public filterable: boolean;

    public hidden: boolean;

    public width: number | null;

    public enumFormatoColuna: enum_formatoColuna;

    /**
     * Informa que deve ser exibida como detalhe da linha no grid de pesquisa
     */
    public detalheGrid: boolean;

    private assetsLocaleService: AssetsLocaleService;

    /**
     * Caso queira substituir o formato basta pegar a instância e trocar 
     * o conteúdo da propriedade "formatoColuna" passando o formato desejado:
     * Outros formatos podem ser consultados nessas URLs: 
     * * https://github.com/telerik/kendo-intl/blob/develop/docs/index.md
     * * https://github.com/telerik/kendo-intl/blob/develop/docs/num-formatting/index.md
     * * https://github.com/telerik/kendo-intl/blob/develop/docs/num-formatting/api.md#formatnumber
     * @param coluna 
     * @param nomeCampo 
     * @param propriedade 
     * @param formatoColuna 
     * @param filterable 
     * @param hidden 
     * @param detalheGrid 
     * @param width 
     */
    constructor(coluna: string, nomeCampo: string, propriedade: string, formatoColuna: enum_formatoColuna, filterable: boolean, hidden: boolean, detalheGrid: boolean = false, width: number = null){
        this.nomeColuna = coluna;
        this.nomePropriedade = propriedade;
        this.nomeCampo = nomeCampo;
        this.filterable = filterable;
        this.hidden = hidden;
        this.detalheGrid = detalheGrid;
        this.width = width;
        this.enumFormatoColuna = formatoColuna;

        this.assetsLocaleService = new AssetsLocaleService(null);
        let traducao = this.assetsLocaleService.getLocaleFile('formatacao.data');

        if(formatoColuna == enum_formatoColuna.dataHora){
            //this.formatoColuna = '{0:dd/MM/yyyy HH:mm:ss}';
            this.formatoColuna = `{0:${traducao.traducao('DateTime')}}`;
            this.tipoColuna = 'date';
        }else if(formatoColuna == enum_formatoColuna.data){
            //this.formatoColuna = '{0:dd/MM/yyyy}';
            this.formatoColuna = `{0:${traducao.traducao('Date')}}`;
            this.tipoColuna = 'date';
        }else if(formatoColuna == enum_formatoColuna.moeda){
            this.formatoColuna = '{0:c}';
            this.tipoColuna = 'numeric';
        }else if(formatoColuna == enum_formatoColuna.numero){
            this.formatoColuna = '{0:n}';
            this.tipoColuna = 'numeric';
        }else if(formatoColuna == enum_formatoColuna.decimal_1){
            this.formatoColuna = '{0:n1}';
            this.tipoColuna = 'numeric';
        }else if(formatoColuna == enum_formatoColuna.decimal_2){
            this.formatoColuna = '{0:n2}';
            this.tipoColuna = 'numeric';
        }else if(formatoColuna == enum_formatoColuna.decimal_3){
            this.formatoColuna = '{0:n3}';
            this.tipoColuna = 'numeric';
        }else if(formatoColuna == enum_formatoColuna.decimal_4){
            this.formatoColuna = '{0:n4}';
            this.tipoColuna = 'numeric';
        }else if(formatoColuna == enum_formatoColuna.numero_sem_formato){
            this.formatoColuna = '#';
            this.tipoColuna = 'numeric';
        }else if(formatoColuna == enum_formatoColuna.texto){
            this.formatoColuna = '';
            this.tipoColuna = 'text';
        }else if(formatoColuna == enum_formatoColuna.booleano){
            this.formatoColuna = '';
            this.tipoColuna = 'boolean';
        }else if(formatoColuna == enum_formatoColuna.cpf){
            this.formatoColuna = "00000000000";
            this.tipoColuna = 'numeric';
        }else if(formatoColuna == enum_formatoColuna.cnpj){
            this.formatoColuna = '00000000000000';
            this.tipoColuna = 'numeric';
        }

    }
}
