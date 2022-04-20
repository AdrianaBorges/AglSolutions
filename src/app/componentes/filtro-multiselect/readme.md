# FiltroMultiselectComponent

Esse é um elemento que extende as funcionalidades do elemento `kendo-multiselect`, permitindo que ele integre diretamente com um serviço de API.

A principal finalidade desse componente é ser usado para filtrar dados, permitindo que mais de uma opção do mesmo cadastro seja selecionada e informando para a a lista de filtros a concatenação de todas as opções selecionadas pelo usuário de forma automática.

Segue abaixo exemplo de como usa-lo
```html
<div class="form-row">
    <div class="form-group col-md-6">
        <label for="inputTexto">Tipo de pessoa</label>
        <app-filtro-multiselect
        formControlName='listaTipoPessoa'
        
        [apiService]='apiPessoaTipoPessoaService'
        apiNomeMetodoListar='listar'
        apiFieldExibir="chDesTipoPessoa"
        apiFieldKey="inCodTipoPessoa"

        pesquisaFieldWhere='inCodTipoPessoa'
        [pesquisaGridFiltro]="gridFiltro"

        [childComponent]='instanciaOutroComponenteDeSelecao'
        childComponentFieldWhere='nome_tabela.nome_campo'

        ></app-filtro-multiselect>
    </div>
</div>
```

Dos atributos do componente usados acima podemos separa-los em 2 tipos

* **1** [Atributos de conexão com a API](#markdown-header-atributos-de-conexao-com-a-api)

* **2** [Atributos de integração com o grid de pesquisa](#markdown-header-atributos-de-integracao-com-o-grid-de-pesquisa)



___
## Atributos de conexão com a API

### Atributo: apiService

* Instância da classe de conexão com a API

### Atributo: apiNomeMetodoListar

* Nome do método de listar da classe de conexão com a API indicada pela instância no atributo `apiService`.

### Atributo: apiFieldExibir

* Nome do atributo do modelo de dados retornado pela API que deverá ser exibido ao usuário

### Atributo: apiFieldKey

* Nome do atributo do modelo de dados retornado pela API que deverá ser usado na query de pesquisa



___
## Atributos de integração com o grid de pesquisa

### Atributo: pesquisaFieldWhere 

* Nome do campo que será usado na condição de where da clausula de pesquisa

### Atributo: pesquisaOperator (não é obrigatório)

* Tipo de operador que deve ser usado ao formar a query para pesquisa, não é obrigatório, pois o padrão é o operador **in** que foi escolhido por questões de melhor desempenho do SQL-Server.

### Atributo: pesquisaGridFiltro

* Nesse atributo deve ser passada a instância do componente [grid-pesquisa](../grid-pesquisa/readme.md)

### Atributo: childComponent

* Quando esse componente controlar a exibição de dados de outro componente de seleção de dados, passe para esse atributo a instância do outro componente

### Atributo: childComponentFieldWhere

* Informe aqui o nome do campo que será usado no filtro do outro componente limitando assim os resultados apresentados pelo outro componente de seleção

