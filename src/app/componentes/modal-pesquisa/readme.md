# ModalPesquisaComponent

O modal pesquisa foi criado para ser usado no componente [input-modal-pesquisa](../input-modal-pesquisa/readme.md), porém pode ser usado em qualquer lugar que precise exibir um modal com um grid de pesquisa e que retorne um objeto da listagem que o usuário tenha selecionado.

Ele deve ser declarado no HTML de sua página e sua instância deve ser obtida no controller para que ele possa invocar a exibição do modal

Veja abaixo os exemplos de como incluir ele nos arquivos:

* [html (view)](#markdown-header-html-view) 

* [ts (controller)](#markdown-header-ts-controller)

___
## html (view)

```html
  <app-modal-pesquisa 
      #instanciaModalPesquisaTipoUsuario
      titulo='Tipo de usuário' width='600' height='500' 
      pageSize='30'
      [apiService]='tipoUsuarioService'
      nomeMetodoOrdenacao='mudarOrdenacao'
      nomeMetodoApi='listar'
      [colunasGrid]='getColunasGridPesquisa()'
      [interfaceModalCadastro]='this'
      (confirmado)='tipoUsuarioAlterado($event)'
      
      [childComponent]='instanciaOutroComponenteDeSelecao'
      childComponentFieldWhere='nome_tabela.nome_campo'>
  </app-modal-pesquisa>
```

attribute                        | descrição
---------------------------------|------------
instanciaModalPesquisaTipoUsuario|variável criada na view que representa a instância desse componente para poder ser recuparada pelo controller
titulo                           |Título do modal de pesquisa
height                           |Altura em pixels do modal de pesquisa
width                            |Altura em pixels do modal de pesquisa
pageSize                         |Quantidade de registros por página a serem exibidos no grid
[apiService]                     |Instância da API que será usada no grid do modal de pesquisa
nomeMetodoOrdenacao              |Nome do método da API que recebe nos argumentos o nome do filtro e a direção da ordenação como strings a fim de mudar a ordenação do método de listar
nomeMetodoApi                    |Nome do método de listar do serviço de API, ver **obs.: nomeMetodoApi**
[colunasGrid]                    |coleção das colunas que o grid deve exibir ou usar para filtro, ver **obs colunasGrid** 
[interfaceModalCadastro]         |Aqui deve ser passada a própria instância dessa página e ela deve ter um método chamado "exibirTelaCadastro" com a seguinte assinatura "**exibirTelaCadastro(callBack: Function): void{...}**". Quando uma pesquisa é efetuada e nenhum resultado é retornado, se essa instância tiver sido passada o componente irá exibir um botão de cadastrar que quando o usuário clicar irá chaamr a função **exibirTelaCadastro** da sua página.
(confirmado)                     |É um evento disparado pelo componente que retorna o objeto da linha do grid que estava selecionada quando o usuário clicou em confirmar.
------------------------|---------------
childComponent          |Quando esse componente controlar a exibição de dados de outro componente de seleção de dados, passe para esse atributo a instância do outro componente
childComponentFieldWhere|Informe aqui o nome do campo que será usado no filtro do outro componente limitando assim os resultados apresentados pelo outro componente de seleção


* **obs.: nomeMetodoApi**: O método de listar deve ter os argumentos conforme exemplo abaixo:
```typescript
public listar(page: number, pageSize: number, filter: string): Promise<Array<PessoaEL>>{...}
```

* **obs colunasGrid**: o Serviço de API usado aqui deve implementar a classe [interface-get-colunas-grid](../interfaces/interface-get-colunas-grid.ts) que por sua vez deve possuir o método **getColunasGrid(): GridPesquisaColumn[]** exigido pela interface. Se quiser se aprofundar mais veja sobre a [classe grid-pesquisa-column aqui](../camada-logica/KendoUi/Grid/grid-pesquisa-column.ts) e sobre a documentação da classe [grid-pesquisa-column aqui](../camada-logica/KendoUi/Grid/grid-pesquisa-column.md).


___
## ts (controller)

Inclua a CLasse ViewChild e EventEmitter nos seus imports
```typescript
import { 
  Component, OnInit, 
  ViewChild, EventEmitter} from '@angular/core';
```

Importe o componente na sua página
```typescript
// COMPONENTES
import { ModalPesquisaComponent } from '../../../componentes/modal-pesquisa/modal-pesquisa.component';
```

Importe a interface do modal de cadastro
```typescript
import { InterfaceModalCadastro } from '../../../componentes/modal-pesquisa/interface-modal-cadastro';
```

Implemente a herança da [interface do modal cadastro](./interface-modal-cadastro.ts) na sua classe
```typescript
export class MinhaPagina implements OnInit, InterfaceModalCadastro {
    ...
}
```

Declare nas variáveis da sua classe a instância desse componente com o nome que foi dado a ela no html
```typescript
  //INstância do modal de pesquisa criada na view (html)
  @ViewChild('instanciaModalPesquisaTipoUsuario') instanciaModalPesquisaTipoUsuario: ModalPesquisaComponent;
```

Inclua a função exigida pela interface
```typescript
  //Função da InterfaceModalCadastro
  public exibirTelaCadastro(callBack: Function): void{
    //   exibe o modal de cadastro que quiser
    //   quando o modal for fechado após inclusão de um novo registro
    //   chame o método de callBack se quiser para que o modal
    //   recarregue seus dados, agorá com o novo registro para ser exibido
    callBack();
  }
```

Alternativamente ao método de callback da função que exibe o cadastro você pode solicitar que os dados sejam carregados no modal de pesquisa usando a função abaixo
```typescript
  //opcional
  public recarregarDadosModalPesquisa(){
    this.instanciaModalPesquisaTipoUsuario.executarPesquisaNovamente();
  }
```

Crie uma função que na sua View você poderá chamar para exibir o modal
```typescript
  public exibirModalPesquisaTipoUsuario(){
    this.instanciaModalPesquisaTipoUsuario.exibir();
  }
```