# Exibir colunas formatando os campos
[voltar](readme.md)

É possível definir uma coluna cujo conteúdo será formatado por uma função de callback feita pelo desenvolvedor

Para isso, no método que você retorna a lista dos campos que serão exibidos no grid, você precisará usar a instância da classe ```GridPesquisaColumnFormat``` no lugar da classe padrão ```GridPesquisaColumn``` ao adicionar a coluna agregada no array de campos. Essa nova classe é herdada da classe ```GridPesquisaColumn``` e portanto pode ser adicionada ao mesmo array de retorno;

Obs.: Essa classe nova pode ser usada normalmente em conjunto com a ```GridPesquisaColumn```

Veja exemplo abaixo:

---
### Imports

Imports
```javascript
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
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
        new GridPesquisaColumnFormat(
            localeFile.traducao('chLogradouro'), 
            'Logradouro.chNome',
            'chNomeLogradouroFake',
            enum_formatoColuna.texto, true,
            false, 
            280, 
            this.formatarLogradouro
        )
    );

    return colunas;
}
```

Método de callback delcarado na mesma classe do metodo 'getColunasGrid'
```javascript
public formatarLogradouro(logradouro: any): string{
    return logradouro.chDesTipoLogradouro.trim() + ' ' + logradouro.chNomeLogradouro.trim();
}
```

Ela possui praticamente os mesmos argumentos da classe ```GridPesquisaColumn```, porém não tem a opção de ser exibida nos detalhes e por ultimo recebe uma função como argumento

Argumentos      |   Tipo           |       Descrição
----------------|------------------|-------
coluna          |string            |Nome que será exibido no título da coluna
nomeCampo       |string            |Nome do campo necessário pro filtro na API
propriedade     |string            |Nome da propriedade inventada que irá receber o valor formatado, de preferência não de um nome de uma propriedade do modelo de dados, ela será util para expoertação em EXCEL e PDF dos dados do grid
formatoColuna   |enum_formatoColuna|consulte enumerador de tipos, ele define o tipo de filtro que será exibido pra coluna
filterable      |boolean           |define se poderá ser filtrada ou não
hidden          |boolean           |define se será exibida ou não no grid, mesmo não sendo exibida no grid será exportada pra PDF e EXCEL
width           |number            |largura da coluna no grid
funcaoCallback  |Function          |função que recebe como argumento um objeto do modelo de dados sendo trabalhado, ela será chaamda pelo grid ao popular as linhas dele e ao exportar para EXCEL e PDF

