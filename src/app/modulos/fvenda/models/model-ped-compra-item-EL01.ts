/**
 * Manutenção de Itens do Pedido de Compra do Cliente disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento de PedCompraItem.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DO ITEM DO PEDIDO DE COMPRA, DO MÓDULO FVENDA, QUE PERMITIRÁ APENAS COMPLEMENTAR OS DADOS DO ITEM E INFORMAR A SITUAÇÃO DE ATENDIMENTO.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";
export class ModelPedCompraItemEL01 extends ApiErrorCollection {
    /**
  Identificador Único da Tabela (Gerado Automaticamente)
   */
    public IDPedCompraItem: number;
    /**
    Identificador Único da Tabela de PedCompra
     */
    public IDPedCompra: number;
    /**
       Identificador do Estabelecimento Interno da Empresa Responsável pelo Pedido de Compra
        */
    public IDEstabelec: number;
    /**
    	
    Código do Estabelecimento
     */
    public chCodEstabelec: string;
    /**
    	
    Número do Pedido de Compra
     */
    public inNumPedCompra: number;
    /**
    Data do Pedido de Compra
     */
    public daDatPedCompra: Date;

    /**
    	
    Código da Situação do Pedido de Compra
     */
    public inCodSituacaoPedComp: number;


    /**
        Descrição da Situação do Pedido de Compra
     */
    public chDesSituacaoPedComp: string;

    /**
    Código EAN do Item Recebido do Cliente
     */
    public chCodEANRec: string;

    /**
    Código do Item Recebido do Cliente
     */
    public chCodItemRec: string;

    /**
        Quantidade Solicitada pelo Cliente
     */
    public deQtdSolic: number;
    /**
          Valor Unitário do Item Solicitado pelo Cliente
       */
    public deValUnitSolic: number;

    /**
     * Valor Total do Item Solicitado pelo Cliente
     */
    public deValTotSolic: number;

    /**
        Identificador Único da Tabela de Item
     */
    public IDItem: number;

    /**
        Código do Item
     */
    public chCodItem: string;

    /**
       Descrição do Item
     */
    public chDesItem: string;

    /**
      Código da Unidade de Medida do Item
     */
    public chCodUMItem: string;

    /**
    Quantidade a ser Atendida do Pedido de Compra
     */
    public deQtdAtend: number;

    /**
          Identificador Único da Tabela de Tabelas de Preço
     */
    public IDTabPreco: number;

    /**
            Código da Tabela de Preços
     */
    public chCodTabPreco: string;
    /**
             	
 Descrição da Tabela de Preços
      */
    public chDesTabPreco: string;

    /**
    Preço do Item na Tabela de Preços
     */
    public dePrecoTabela: number;

    /**
        Valor Unitário Bruto do Item
     */
    public deValUnitBruto: number;

    /**
       Lista de Desconto Cascata que será aplicado no valor unitário bruto para gerar o valor unitário liquido
       Exemplo: 10+5,5+1
      */
    public chDescCascata: string;

    /**    	
  Valor Unitário Liquido do Item
       */
    public deValUnitLiquido: number;

    /**
    	
    Valor Total Líquido do Item
     */
    public deValTotLiquido: number;

    /**    	
    Código da Situação de Atendimento do Item do Pedido de Compra
     */
    public inCodSitAtenPedComp: number;

    /**    	 	
Descrição da Situação de Atendimento do Item do Pedido de Compra
     */
    public chDesSitAtenPedComp: string;

    /**    	 	
 Código do Motivo da Rejeição de Atendimento do Item do Pedido de Compra
      */
    public inCodMotRejPedComp: number;

    /**    	 	
  Descrição do Motivo de Rejeição de Atendimento do Item do Pedido de Compra
       */
    public chDesMotRejPedComp: string;

    /**    	 	
      Descrição do Motivo da Rejeição de Atendimento do Item do Pedido de Compra
       */
    public chDesMotivo: string;

    /**    	 	
       Data/Hora de Inclusão do Registro
        */
    public dtDatInclusao: Date;

    /**    	 	
       Código do Usuário responsável pela inclusão do Registro
         */
    public chCodUsuarioInclusao: string;

    /**    	 	      	
 Nome do Usuário responsável pela inclusão do Registro
         */
    public chNomeUsuarioInclusao: string;

    /**    	 	      	
      Data/Hora da Última Alteração no Registro
         */

    public dtDatUltAlteracao: Date;

    /**    	 	      	
       	
 Código do Usuário responsável pela Última Alteração no Registro
          */
    public chCodUsuarioAlteracao: string;
    /**    	 
   Nome do Usuário responsável pela Última Alteração do Registro
            */
    public chNomeUsuarioAlteracao: string;

    /**    	 
   Data/Hora do Atendimento do Item do Pedido de Compra
            */

    public dtDatAtend: Date;

    /**    	 
Código do Usuário responsável pelo Atendimento do Item do Pedido de Compra
            */

    public chCodUsuarioAtend: string;

  /**    	 
Nome do Usuário responsável pelo Atendimento do Item do Pedido de Compra
            */
    public chNomeUsuarioAtend: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}
