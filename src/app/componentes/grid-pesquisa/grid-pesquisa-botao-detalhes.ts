/**
 * Deve ser usado passado para o grid em uma lista.
 * O Grid irá exibilo e responder no evento de botaoDetalhesClique
 * o id do botão e o objeto da linha da qual ele pertence
 */
export class GridPesquisaBotaoDetalhes{

    public constructor(id: number, nome: string, width: number){
        this.id = id;
        this.nome = nome;
        this.width = width;
    }

    public id: number;
    public nome: string;
    public width: number;

    /**
     * Objeto que será retornado juntamente com o botão no clique dele
     */
    public objetoSelecionado: any;
}