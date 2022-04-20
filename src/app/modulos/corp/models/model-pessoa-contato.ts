import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelPessoaContato extends ApiErrorCollection {
    /**
     * Identificador Único da Tabela de PessoaContato
     * (Gerado Automaticamente)
     */
    IDPessoaContato: number;
    /**
     * 	Identificador Único da Tabela de Pessoa
     */
    IDPessoa: number;

    /**
     * Código do Tipo de Contato da Pessoa
     */
    inCodTipoPessoaContato: number;

    /**
     * Descrição do Tipo de Contato da Pessoa
     */
    chDesTipoPessoaContato: string;

    /**
     * CPF do Contato da Pessoa
     */
    inCPF: string;

    /**
     * Nome do Contato da Pessoa
     */
    chNome: string;

    /**
     * DDD do Telefone do Contato da Pessoa
     */
    chDDDTelefone: string;

    /**
     * Telefone do Contato da Pessoa
     */
    chNumTelefone: string;

    /**
     * Ramal do Telefone do Contato da Pessoa
     */
    chNumRamal: string;

    /**
     * DDD do Celular do Contato da Pessoa
     */
    chDDDCelular: string;

    /**
     * Número do Celular do Contato da Pessoa
     */
    chNumCelular: string;

    /**
     * E-Mail do Contato da Pessoa
     */
    chEMail: string;

    /**
     * Dia do Aniversário do Contato da Pessoa
     */
    inAniverDia: number;

    /**
     * Mês do Aniversário do Contato da Pessoa
     */
    inAniverMes: number;

    /**
     * Cargo do Contato da Pessoa
     */
    chDesCargo: string;
    /**
     * Departamento do Contato da Pessoa
     */
    chDesDepartamento: string;
    /**
     * Observações
     */
    chDesObservacao: string;


    /**
   * Data/Hora de Inclusão do Registro
   */
    dtDatInclusao: Date;
    /**
     * Data/Hora da Última Alteração no Registro
     */
    dtDatUltAlteracao: Date;
    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}