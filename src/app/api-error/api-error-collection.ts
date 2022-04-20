import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from './api-error';
import { ApiErrorException } from './api-error-exception'

export class ApiErrorCollection {

    httpErrorResponse: HttpErrorResponse;

    /**
     * Erros que não são específicos de um campo
     * são concatenados nessa mensagem, separando 
     * as mensagens por vírgula
     */
    public mensagem_geral: string;

    /**
     * Erros que não são específicos de um campo
     * são concatenados nessa mensagem em formato 
     * HTML quebrando cada erro em uma linha nova.
     */
     public mensagem_geral_html: string;

    /**
     * Cada nome de atributo que tiver um erro retornado 
     * vira um atributo nesse objeto onde o conteúdo é um 
     * texto contactenado de todos os erros retornados 
     * para o mesmo campo.
     */
    public campos = {};

    /**
     * Listagem de erros
     */
    private lErros: ApiError[] = new Array();

    /**
     * Retorna uma cópia de lista de erros
     */
    public getListaErros(): ApiError[]{
        return this.lErros.map((erro)=> erro);
    }

    /**
     * 
     * @param ex JSON de erro retornado pela requisição HTTP fora do padrão da API
     */
    public addHttpError(erro: HttpErrorResponse): void{
        var oErro: ApiError = new ApiError();
        oErro.chAtributo = '';
        oErro.chCodigoErro = '';
        oErro.chDescricaoErro = erro.message;
        oErro.chPath = '';

        if(oErro.chDescricaoErro =='Http failure response for (unknown url): 0 Unknown Error'){
            oErro.chDescricaoErro = 'Internet ou Servidor off-line, tente novamente mais tarde';
        }

        this.httpErrorResponse = erro;

        this.lErros.push(oErro);

        this.formataErrosParaUI();
    }

    public criarHttpError(status: number, statusText: string): void{
        this.httpErrorResponse = new HttpErrorResponse({status: status, statusText: statusText})
        if(this.mensagem_geral==undefined){
            //só coloco o statusText na mensagem de erro
            //se ela já não foi preenchida com os erros retornados pela api
            //pelo método de cast
            this.mensagem_geral = statusText;
        };
    }

    /**
     * Cria a instância da classe de erros populando com os dados retornados, se eles
     * forem compatíveis. 
     * 
     * Caso não seja compatível retorna uma exception do tipo "tipo incorreto";
     * Caso a lista de erros venha vazia, retorna uma exception do tipo: 
     * @param json_api_erro objeto de erro retornado pela resposta da API, pode ser um HttpResponseMessage ou uma classe de dados da API com a coleção error;
     */
    static cast(json_api_erro: any): ApiErrorCollection{
        let oAbstractApiError: ApiErrorCollection;
        var oErro: ApiError;

        //"error": É um array padrão do HttpResponseMessage que contém 
        //os erros retornados pela requisição Http que não teve sucesso
        if(json_api_erro.error instanceof Array){
            if(json_api_erro.length == 0 ){
                throw new ApiErrorException(1, "sem erro");
            }else{

                oAbstractApiError = new ApiErrorCollection();

                json_api_erro.error.forEach(element => {
                    oErro = new ApiError();
                    oErro.chAtributo = element.chAtributo;
                    oErro.chCodigoErro = element.chCodigoErro;
                    oErro.chDescricaoErro = element.chDescricaoErro;
                    oErro.chPath = element.chPath;
                    oAbstractApiError.lErros.push(oErro);
                });

                oAbstractApiError.formataErrosParaUI();

                return oAbstractApiError;
            }
        }else{
            throw new ApiErrorException(2, "tipo incorreto");
        }
    }

    /** 
    * Formata os erros em uma estrutura que será mais fácil de ser consumida pela UI 
    */
    private formataErrosParaUI(): void{
        this.mensagem_geral = '';
        this.mensagem_geral_html = '';
        this.campos = [];
        this.lErros.forEach(erro => {
            if (erro.chAtributo){
                //Adiciono a descrição do erro para o campo específico
                if (this.campos[erro.chAtributo] == undefined){
                    this.campos[erro.chAtributo] = '';
                }else{
                    this.campos[erro.chAtributo] += ', ';
                }
                this.campos[erro.chAtributo] += erro.chDescricaoErro;

                //Adiciono e mensagem de erro do cmapo também para a mensagem geral
                if(this.mensagem_geral.length > 0){
                    this.mensagem_geral += ', ';
                    this.mensagem_geral_html += ';</br>';
                }
                this.mensagem_geral += erro.chDescricaoErro;
                this.mensagem_geral_html += erro.chDescricaoErro;

            }else{
                //Adiciono mensagems de erro não associadas diretamente a um capo
                if(this.mensagem_geral.length > 0){
                    this.mensagem_geral += ', ';
                    this.mensagem_geral_html += ';</br>';
                }
                this.mensagem_geral += erro.chDescricaoErro;
                this.mensagem_geral_html += erro.chDescricaoErro;
            }

        });
    }

}