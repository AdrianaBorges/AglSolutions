import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { StringFilterCellComponent } from '@progress/kendo-angular-grid';

export class ModelPessoaEL extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDPessoa: number;

    /**
     * Código do Tipo de Pessoa
     */
    inCodTipoPessoa: number; 

    /**
     * Código do Tipo de Documento de Identificação da Pessoa
     */
    inCodTipoDocumento: number;

    /**
     * Documento de Identificação da Pessoa (no banco é numérico, mas na UI deve aceitar zeros a esquerda)
     */
    inNumIdentificacao: number;

    /**
     * Nome da Pessoa
     */
    chNomePessoa: string;

    /**
     * Identificador Único da Tabela PessoaFisica
     */
    IDPessoaFisica: number;

    /**
     * Data de Nascimento
     */
    daDatNascim: Date;

    /**
     * Nome da Mãe
     */
    chNomeMae: string;

    /**
     * Nome do Pai
     */
    chNomePai: string;

    /**
     * Código do Estado Civil
     */
    inCodEstadoCivil: number;

    /**
     * Código do Sexo
     */
    inCodSexo: number;

    /**
     * Código da Profissão da Pessoa
     */
    inCodProfissao: number;

    /**
     * Código da Raça ou Cor da Pessoa
     */
    inCodRacaCor: number;

    /**
     * Código do Grau de Instrução da Pessoa
     */
    inCodGrauInst?: number;

    /**
     * Descrição da Nacionalidade da Pessoa
     */
    chDesNacionalidade: string;

    /**
     * Valor da Renda Mensal da Pessoa
     */
    deValorRendaMensal: number;

    /**
     * Indicador de Pessoa Exposta Politicamente
     */
    lgIndPEP: boolean;

    /**
     * Identificador Único da Tabela PessoaJuridica
     */
    IDPessoaJuridica: number;

    /**
     * Nome Fantasia
     */
    chNomeFantasia: string;

    /**
     * chIM
     */
    chIM: string;

    /**
     * Inscrição Estadual
     */
    chIE: string;

    /**
     * Descrição do Tipo de Pessoa
     */
    chDesTipoPessoa: string;

    /**
     * Descrição do Tipo de Documento
     */
    chDesTipoDocumento: string;

    /**
     * Descrição do Estado Civil
     */
    chDesEstadoCivil: string;

    /**
     * Descrição do Sexo
     */
    chDesSexo: string;

    /**
     * Descrição da Profissão
     */
    chDesProfissao: string;

    /**
     * Descrição da Raça ou Cor da Pessoa
     */
    chDesRacaCor: string;

    /**
     * Descrição do Grau de Instrução da Pessoa
     */
    chDesGrauInst: string;

    /**
     * Data/Hora de Inclusão do Registro de Pessoa
     */
    dtDatInclusao: Date;

    /**
     * Data/Hora da Última Alteração em qualquer registro envolvido nesta Entidade Lógica
     * Será retornado a maior data de última alteração de todos os registros
     */
    dtDatUltAlteracao: Date;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}