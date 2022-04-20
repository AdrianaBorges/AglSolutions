import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelUsuario extends ApiErrorCollection {

    /**
     * Código do Usuário (LOGIN)
     */
    chCodUsuario: string;

    /**
     * Identificador Único da Tabela Pessoa
     * Identifica a qual Pessoa o Usuário esta Relacionado
     */
    IDPessoaUsuario: number;

    /**
     * Identificador Único da Tabela PapelPessoa
     * Identifica a qual Pessoa o Usuário esta Relacionado
     */
    IDPapelPessoaUsuario: string;


    /**
     * Nome da Pessoa Relacionada ao Usuário
     */
    chNomePessoaUsuario: string;

    /**
     * Nome do Usuário
     */
    chNomeUsuario: string;

    /**
     * E-Mail de Comunicação com o Usuário
     */
    chEMail: string;

    /**
     * Código do Tipo de Usuário
     */
    inCodTipoUsuario: Number;


    /**
     * Descrição do tipo de exusuário.
     * Exemplo: admin
     */
    chDesTipoUsuario: string;

    /**
     * Identificador Único da Tabela Pessoa
     * Identifica a qual Pessoa o Usuário esta Vinculado
     * para usuários vinculados a pessoas externas a empresa 
     * do sistema, como Clientes, Representantes, Corretores e Agentes de Venda
     */
    IDPessoaVinculada: number;

    /**
     * Identificador Único da Tabela PapelPessoa
     * para usuários vinculados a pessoas externas 
     * a empresa do sistema, como Clientes, 
     * Representantes, Corretores e Agentes de Venda
     */
    IDPapelPessoaVinculada: number;
    
    /**
     * Código do Tipo de Papel da Pessoal que o Usuário esta Vinculado
     */
    inCodTipoPapelVinculada: number;

    /**
     * Descrição do Tipo de Papel da Pessoal que o Usuários esta Vinculado
     */
    chDesTipoPapelVinculada: string;

    /**
     * Nome da Pessoa que o Usuário esta Vinculado
     */
    chNomePessoaVinculada: string;

    /**
     * Senha (Password) de Acesso do Usuário
     */
    chPass: string

    /**
     * Alterar a Senha no 1o Acesso ?
     */
    lgAlteraPass1oAcesso: Boolean;

    /**
     * Código da Situação Cadastral do Usuário
     */
    inCodSituacaoCad: Number;

    /**
     * Descrição da Situação Cadastral do Usuário
     */
    chDesSituacaoCad: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: Number;

    /**
     * Atributo pertencente a estrutura lErros que conterá o nome 
     * do atributo que gerou o erro na API. Em caso de erros gerais, 
     * este atributo ficará vazio.
     */
    chNomeAtributo: string;

}
