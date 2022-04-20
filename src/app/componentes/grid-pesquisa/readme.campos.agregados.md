# Exibir colunas concatenando campos
[voltar](readme.md)

É possível definir uma coluna para ser uma agregação de campos do modelo de dados retornado pela API para que seja exibido no grid.

Para isso, no método que você retorna a lista dos campos que serão exibidos no grid, você precisará usar a instância da classe ```GridPesquisaColumnAgregada``` no lugar da classe padrão ```GridPesquisaColumn``` ao adicionar a coluna agreagada no array de campos. Essa nova classe é herdada da classe ```GridPesquisaColumn``` e portanto pode ser adicionada ao mesmo array de retorno;

Obs.: Essa classe nova pode ser usada normalmente em conjunto com a ```GridPesquisaColumn```

Veja exemplo abaixo:

---
### Imports

Imports
```javascript
import { GridPesquisaColumnAgregada } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-agreagada';
```

---
### Delaração dos método

Método de retorno dos dados da coluna
```javascript
public getColunasGrid(): Array<GridPesquisaColumn>{
    var colunas: GridPesquisaColumn[];
    colunas = [];

    //Definido uma coluna do tipo agregada para ser exibida no grid
    colunas.push(
        new GridPesquisaColumnAgregada(
            localeFile.traducao('chLogradouro'), 
            280, 
            'chDesTipoLogradouro', 
            ' ', 
            'chNomeLogradouro'
        )
    );

    return colunas;
}
```
Argumentos      |       Explicação
----------------|------------------
coluna          | Nome da coluna que será exibido
width           | Largura em pixels que a coluna irá assumir no grid (apenas número)
3° em diante    | do 3° argumento em diante, são todos string, não tem limite a quantidade a ser passada, porém deve se passar sempre primeiro o nome da propriedade do modelo de dados em questão, depois vai intercambiando com um texto para concatenar com o próximo campo e o nome de outro cmapo na sequência e assim por diante.

Exemplo do 3° argumento em diante
```js
'nome_campo_1', '/', 'nome_campo_2', ':', 'nome_campo_3', etc...
```
veja que primeiro vem o nome do campo e na sequência sempre um texto para concatena-los, mesmo que seja uma string vazia.

