import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiErrorCollection } from '../api-error/api-error-collection';
import { LocaleDataFile } from './locale-data-file';
import { LocaleData } from './locale-data';

@Injectable({
  providedIn: 'root'
})
export class AssetsLocaleService {

  private static localeData: Array<LocaleDataFile>;

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param localePath String separando o caminho do locale pelo caracter ".", exemplo: "corp.api.pessoa-fisica"
   * @param localeId 
   */
  public getLocaleFile(fileName: string): LocaleDataFile{
    if(AssetsLocaleService.localeData){
      var localeDataFile: LocaleDataFile
      var localeData: LocaleData;

      localeDataFile = AssetsLocaleService.localeData.find((localeDF, index, array)=>{
        if(localeDF.fileName == fileName){
          return true;
        }
      });

      if(localeDataFile){
        var objLocaleDataFile = new LocaleDataFile();
        objLocaleDataFile.fileName =localeDataFile.fileName;
        objLocaleDataFile.locales =localeDataFile.locales;
        return objLocaleDataFile;
      }else{
        localeDataFile = new LocaleDataFile();
        return localeDataFile;
      }

      


    }else{
      localeDataFile = new LocaleDataFile();
      return localeDataFile;
    }
  }

  public carregarDados(): Promise<Array<LocaleDataFile>> {
    // return this.http.get("./file.json")
    //                 .map((res:any) => res.json())
    //                 .catch(erro => console.log(error));

      return new Promise<Array<LocaleDataFile>>((resolve, reject)=>{
        if (AssetsLocaleService.localeData == undefined){
          this.http.get<Array<LocaleDataFile>>("./assets/locale/messages.json").subscribe(
            arrayLocaleDataFile => {
              AssetsLocaleService.localeData = arrayLocaleDataFile;
              resolve(arrayLocaleDataFile);
            },
            erro => {            
              var apiErro: ApiErrorCollection = new ApiErrorCollection();
              apiErro.criarHttpError(404,"arquivo de tradução não encontrado: " + JSON.stringify (erro));
              reject(apiErro);
            }
          )
        }else{        
          resolve(AssetsLocaleService.localeData);
        }
      });
    }
}
