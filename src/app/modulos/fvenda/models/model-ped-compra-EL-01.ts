/**
 * Manutenção de Pedidos de Compra de Clientes disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento do PedCompra.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * O Número do Pedido de Compra (inNumPedComra) será atribuído conforme parametrizado no "FVENDA.PedCompra"
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DO PEDIDO DE COMPRA DO MÓDULO FVENDA, QUE PERMITIRÁ APENAS COMPLEMENTAR OS DADOS DO PEDIDO DE COMPRA E LIBERA-LO PARA SER RETORNADO AO CLIENTE.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";

export class ModelPedCompraEL01 extends ApiErrorCollection {
    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDPedCompra: number;

    /**
     * Identificador do Estabelecimento Interno da Empresa Responsável pelo Pedido de Compra
     */
    IDEstabelec: number;

    /**
     * Código do Estabelecimento
     */
    chCodEstabelec: string;

    /**
     * Nome Abreviado do Estabelecimento
     */
    chNomAbrevEstabelec: string;

    /**
     * Nome do Estabelecimento
     */
    chNomeEstabelec: string;

    /**
     * Número do Pedido de Compra
     */
    inNumPedCompra: number;

    /**
     * Código da Situação do Pedido de Compra
     */
    inCodSituacaoPedComp: number;

    /**
     * Código do Tipo de Documento de Identificação da Pessoa como Transportadora
     */
    inCodTipoDocumento: number;

    /**
     * Descrição da Situação do Pedido de Compra
     */
    chDesSituacaoPedComp: string;

    /**
     * Data do Pedido de Compra
     */
    daDatPedCompra: Date;

    /**
     * Identificador Único da Tabela de Cliente de Venda
     */
    IDClienteVenda: number;

    /**
     * Identificador Único da Tabela de Cliente
     */
    IDCliente: number;

    /**
     * Identificador Único da Tabela PapelPessoa
     * Identifica a qual Pessoa o Cliente esta Relacionado
     */
    IDPapelPessoaCliente: number;

    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoaCliente: number;

    /**
     * Código do Tipo de Pessoa como Cliente
     */
    inCodTipoPessoaCliente: number;

    /**
     * Descrição do Tipo de Pessoa como Cliente
     */
    chDesTipoPessoaCliente: string;

    /**
     * Código do Tipo de Documento de Identificação da Pessoa como Cliente
     */
    inCodTipoDocumentoCliente: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa como Cliente
     */
    chDesTipoDocumentoCliente: string;

    /**
     * Documento de Identificação da Pessoa como Cliente
     */
    inNumIdentifCliente: number;

    /**
     * Nome do Cliente
     */
    chNomeCliente: string;

    /**
     * Código do Cliente
     */
    inCodCliente: number;

    /**
     * Nome Abreviado do Cliente
     */
    chNomAbrevCliente: string;

    /**
     * Nome do Contato no Cliente responsável pela abertura do Pedido de Compra
     */
    chNomContatoCliente: string;

    /**
     * Número do Pedido de Compra do Cliente
     */
    chNumPedCliente: string;

    /**
     * Identificador Único da Tabela de Representante
     */
    IDRepresentante: number;

    /**
     * Identificador Único da Tabela PapelPessoa
     * Identifica o Papel da Pessoa Representante relacionada ao cliente
     */
    IDPapelPessoaRepresentante: number;

    /**
     * Identificador Único da Tabela de Pessoa
     * Identifica a qual Pessoa Representante o Cliente esta Relacionado
     */
    IDPessoaRepresentante: number;

    /**
     * Código do Tipo de Pessoa Representante
     */
    inCodTipoPessoaRepresentante: number;

    /**
     * Descrição do Tipo de Pessoa Representante
     */
    chDesTipoPessoaRepresentante: number;

    /**
     * Código do Tipo de Documento de Identificação da Pessoa Representante
     */
    inCodTipoDocumentoRepresentante: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa Representante
     */
    chDesTipoDocumentoRepresentante: string;

    /**
     * Documento de Identificação da Pessoa Representante
     */
    inNumIdentifRepresentante: number;

    /**
     * Nome do Representante
     */
    chNomeRepresentante: string;

    /**
     * Código do Representante
     */
    inCodRepresentante: number;

    /**
     * Nome Abreviado do Representante
     */
    chNomeAbrevRepresentante: string;

    /**
     * Identificador Único da Tabela de Tabelas de Preço
     */
    IDTabPreco: number;

    /**
     * Código da Tabela de Preços
     */
    chCodTabPreco: string;

    /**
     * Descrição da Tabela de Preços
     */
    chDesTabPreco: string;

    /**
     * Somatório do Valor dos Produtos do Pedido de Compra
     */
    deValProduto: number;

    /**
     * Somatório do Valor Total dos Itens do Pedido de Compra
     */
    deValTotal: number;

    /**
     * Observação do Pedido de Compra
     */
    chDesObservacao: string;

    /**
     * Data/Hora de Inclusão do Registro
     */
    dtDatInclusao: Date;

    /**
     * Código do Usuário responsável pela inclusão do Registro
     */
    chCodUsuarioInclusao: string;

    /**
     * Nome do Usuário responsável pela inclusão do Registro
     */
    chNomeUsuarioInclusao: string;

    /**
     * Data/Hora da Última Alteração no Registro
     */
    dtDatUltAlteracao: Date;

    /**
     * Código do Usuário responsável pela Última Alteração no Registro
     */
    chCodUsuarioAlteracao: string;

    /**
     * Nome do Usuário responsável pela Última Alteração do Registro
     */
    chNomeUsuarioAlteracao: string;

    /**
     * Data/Hora da Liberação do Pedido de Compra para ser retornado ao Cliente
     */
    dtDatLiberacao: Date;

    /**
     * Código do Usuário responsável pela Liberação do Pedido de Compra para ser retornado ao cliente
     */
    chCodUsuarioLibera: string;

    /**
     * Nome do Usuário responsável pela Liberação do Pedido de Compra para ser retornado ao cliente
     */
    chNomeUsuarioLibera: string;

    /**
     * Data/Hora do Retorno do Pedido de Compra ao cliente
     */
    dtDatRetorno: Date;

    /**
     * Código do Motivo da Rejeição de Atendimento do Item do Pedido de Compra
     * Será utilizada apenas no método RejeitarItens
     */

    inCodMotRejPedComp: number;

    /**
     * Descrição do Motivo da Rejeição de Atendimento do Item do Pedido de Compra
     * Será utilizada apenas no método RejeitarItens
     */
    chDesComplMotRejPedComp: string;


    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}
