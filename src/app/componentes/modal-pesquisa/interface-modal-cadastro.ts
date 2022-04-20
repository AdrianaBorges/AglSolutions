/**
 * Essa interface permite que o modal de pesquisa 
 * exiba um botão de adicionar quando a pesquisa
 * não retornar resultado algum.
 * Esse botão irá chamar o método dessa interface 
 * para exibir o cadastro, e o callBack será
 * usado pelo modal para atualizar a tela com o novo cadastro
 */
export interface InterfaceModalCadastro {

     exibirTelaCadastro(callBack: Function): void

}