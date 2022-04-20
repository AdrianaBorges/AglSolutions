import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class Autenticacao extends ApiErrorCollection {
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
     * Identifica a qual Papel Pessoa o Usuário esta Relacionado
     */
    IDPapelPessoaUsuario: number;

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
    inCodTipoUsuario: number;

    /**
     * Descrição do Tipo de Usuário
     */
    chDesTipoUsuario: string;

    /**
     * Identificador Único da Tabela Pessoa para usuários vinculados a
     * pessoas externas a empresa do sistema, como Clientes, Representantes,
     * Corretores e Agentes de Venda.
     */
    IDPessoaVinculada: number;

    /**
     * Identificador Único da Tabela PapelPessoa para usuários vinculados a
     * pessoas externas a empresa do sistema, como Clientes, Representantes,
     * Corretores e Agentes de Venda
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
     * Alterar a Senha no 1o Acesso ?
     */
    lgAlteraPass1oAcesso: number;

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDTokenAcesso: number;

    /**
     * Token de Acesso a sessão do Sistema
     */
    chIDToken: string;

    /**
     * Data/Hora do primeiro acesso com o Token
     */
    dtDataHoraAcesso: Date;

    /**
     * Data/Hora de Expiração do Token
     */
    dtDataHoraExpira: Date;

    /**
     * Data/Hora do Último Acesso utilizando o Token
     */
    dtDataHoraUltimoAcesso: Date;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}
