# grid-pesquisa-column

Essa classe é usada para definir as colunas de uma entidade lógica a serem exibidas no componente [grid-pesquisa](../../../grid-pesquisa/readme.md).

Ela deve ser usada nas classes de serviços que se conectam com algum end-point da API. Essas classes devem implementar a interface [interface-get-colunas-grid](../../../interfaces/interface-get-colunas-grid.ts) e por consequência implementar o método **getColunasGrid** conforme exemplo abaixo:

```typescript
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn>{

    var colunas: GridPesquisaColumn[];
    colunas = [];
    
    colunas.push(new GridPesquisaColumn('CPF/CNPJ', 'Pessoa.inNumIdentificacao', 'inNumIdentificacao', enum_formatoColuna.texto, true, false));

    colunas.push(new GridPesquisaColumn('Nome', 'Pessoa.chNomePessoa', 'chNomePessoa', enum_formatoColuna.texto, true, false));

    colunas.push(new GridPesquisaColumn('dt nasc.', 'PessoaFisica.daDatNascim', 'daDatNascim', enum_formatoColuna.data, true, true));

    
    return colunas;
  }
```

Veja que o construtor dessa classe pede 6 argumentos `constructor(coluna: string, nomeCampo: string, propriedade: string, formatoColuna: enum_formatoColuna, filterable: boolean, hidden: boolean)`:

* `coluna`: Nome da coluna no grid a ser exibida

* `nomeCampo` Nome do campo como será usado para a pesquisa na query

* `propriedade` Nome da propriedade na entidade lógica que está sendo listada cujo valor será exibido na coluna

* `formatoColuna` tipo de dado que será exibido no grid para que ele exiba as opções de filtro adequadas no próprio título da coluna, os formatos existentes podem ser consultados [aqui](enum-formato-coluna.ts)

* `filterable` propriedade boolean que identifica se o filtro no título da coluna deve ou não estar disponível

* `hidden` identifica se a coluna deve ou não ser exibida no Grid, pois mesmo não sendo exibida ela será necessária para os filtros que existirem no formulário externo de pesquisa integrado ao grid

