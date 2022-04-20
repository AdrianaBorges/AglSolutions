/** 
 * Manutenção de Tipos de Pedido de Venda disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento do Tipo de Pedido.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DO TIPO DE PEDIDO DO MÓDULO FVENDA.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";

export class ModelTipoPedidoEL01 extends ApiErrorCollection {


    /**
    * Identificador Único da Tabela (Gerado Automaticamente)
    */
    IDTipoPedido: number

    /**
    * Código do Tipo de Pedido de Venda
    */
    chCodTipoPedido: string;
 
    /**
    * Descrição do Tipo de Pedido de Venda
    */
    chDescricao: string;
 
    /**
    * Indicador se os Pedidos deste Tipo serão considerados como Venda
    */
    lgConsideraVenda: boolean;
 
    /**
    * Situação Cadastral do Tipo de Pedido
    */
    inCodSituacaoCad: number;

    /**
    * Descrição da Situação Cadastral do Tipo de Pedido
    */
    chDesSituacaoCad: string;
 
    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;

}