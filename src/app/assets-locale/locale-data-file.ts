import { LocaleData } from './locale-data';

export class LocaleDataFile{

    constructor(){}

    /**
     * Nome do arquivo, precedido do nome dos diretórios separado por ponto
     */
    public fileName: string;

    public locales: Array<LocaleData>;

    public traducao(id: string): string{

        var localeData: LocaleData;

        this.locales = this.locales || [];

        if(this.locales.length > 0){
            localeData = this.locales.find((locale, index, array)=>{
                if(locale.id == id){
                return true;
                }
            });
            if(localeData){
                return localeData.target;
            }
        }

        return '';
    }

}