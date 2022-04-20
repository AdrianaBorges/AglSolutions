import { ModelSegurMenu } from '../../modulos/segur/models/model-segur-menu';
import { ValidarPermissaoRotaService } from '../../validar-permissao-rota.service';

export class MenuSistemaModel {

    /**
     * Id do elemento HTML
     */
    codigo: string;

    /**
     * TExto exibido para o usuário no menu
     */
    titulo: string;

    /**
     * URL de rota do sistema
     */
    path: string;

    /**
     * Apenas menus entregues pela interface com o campo inCodTipoMenuOpcao <= 3
     */
    exibir: boolean;

    /**
     * Itens do Submenu
     */
    children: Array<MenuSistemaModel>;

    constructor(modelSegurMenu: ModelSegurMenu, validarPermissaoRotaService: ValidarPermissaoRotaService, arrayPais?: Array<MenuSistemaModel>){
        if(modelSegurMenu) this.converterParaMim(modelSegurMenu, validarPermissaoRotaService, arrayPais);
    }

    private converterParaMim(modelSegurMenu: ModelSegurMenu, validarPermissaoRotaService: ValidarPermissaoRotaService, arrayPais?: Array<MenuSistemaModel>){
        var meuMenuFilho: MenuSistemaModel;

        this.titulo = modelSegurMenu.chDesMenuOpcao;
        this.codigo = `menu_${modelSegurMenu.IDMenuOpcao}`;
        this.path = modelSegurMenu.chDesPasta;
        this.exibir = false;
        if(modelSegurMenu.inCodTipoMenuOpcao <= 3){
            if(modelSegurMenu.inCodTipoMenuOpcao <= 2 ){
                this.exibir = true;
            }else
            if(modelSegurMenu.chDesPasta)
            if(modelSegurMenu.chDesPasta.indexOf('/') >= 0){
                this.exibir = true;
            }
        }

        if(this.path){
            if(this.path.length > 0)
            validarPermissaoRotaService.addRotaValida(modelSegurMenu, arrayPais);
        }

        //Adiciono esse item do menu para ser passado adiante na herança
        if(arrayPais == null){
            arrayPais = [];
        }
        arrayPais.push(this);

        this.children = null
        if (!this.path){
            if(modelSegurMenu.lMenuFilhos){
                if(modelSegurMenu.lMenuFilhos.length > 0){
                    this.children = modelSegurMenu.lMenuFilhos.map((menuFilho, index, array)=>{
                        return meuMenuFilho = new MenuSistemaModel(menuFilho, validarPermissaoRotaService, arrayPais);
                    });
                }
            }
        }
    }
}
