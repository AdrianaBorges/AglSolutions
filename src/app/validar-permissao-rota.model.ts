import { ModelSegurMenu } from './modulos/segur/models/model-segur-menu';

export class ValidarPermissaoRotaModel{
 
    /**
     * caminho da rota que deve ser validado
     */
    state_url: string;

    /**
     * contém os nomes das operaçoes de um determinada interface como CREATE, READ, UPDATE, DELETE
     * ou mesmo "*" para quando o usuário tem acesso completo
     */
    operacoes: string;

    permissoesRotasFilhas: Array<ValidarPermissaoRotaModel> = [];

    /**
     * Se houver, retorna a permissão definida para uma rota filha 
     * equivalente a rota atualmente ativa na navegação
     * @param state_url 
     * É a URL retornada da rota atualamente ativa
     */
    public encontrarPermissaoRotaFilhaValida(state_url: string): ValidarPermissaoRotaModel|null{
        for (let indexRotaFilha = 0; indexRotaFilha < this.permissoesRotasFilhas.length; indexRotaFilha++) {
            const rotaFilha = this.permissoesRotasFilhas[indexRotaFilha];
            const arrayRotas = state_url.split('/');
            const indexRota = arrayRotas.indexOf(rotaFilha.state_url);
            /**
             * verifico se após o indice encontrado existem mais de 2 rotas, 
             * pois cada rota tem pra si 2 sub-rotas (:id/:operacao)
             */
            if(indexRota > 0 && (arrayRotas.length - (indexRota + 1)) > 2){
                //a rotal atual se refere a um nível mais profundo de herança
                const rotaNeta = rotaFilha.encontrarPermissaoRotaFilhaValida(state_url);
                if(rotaNeta){
                    return rotaNeta;
                }
            }else if( indexRota > 0){
                //Esse é o nível esperado de herança de rotas, então devolvo a permissão associada a essa rota
                return rotaFilha;
            }
        }
        return null;
    }

    public adicionarRotasFilhas(modelSegurMenu: ModelSegurMenu): void{
        var menuFilho: ValidarPermissaoRotaModel;
        modelSegurMenu.lMenuFilhos.forEach(menu => {
            menuFilho = new ValidarPermissaoRotaModel();
            menuFilho.state_url = menu.chDesPasta;
            
            if(menu.lProgramaNivel)
            if(menu.lProgramaNivel.length > 0)
            if(menu.lProgramaNivel[0]['chDesOperacao'])
            menuFilho.operacoes = menu.lProgramaNivel[0]['chDesOperacao'];

            this.permissoesRotasFilhas.push(menuFilho);

            menuFilho.adicionarRotasFilhas(menu);
        });
    }
    
}