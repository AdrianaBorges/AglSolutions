# ApiSelectComponent

Esse é um componente do tipo HTML element e funciona como um drop-down, porém com a vantagem de integrar diretamente com a API para listar as opções.

**Atenção!** Como esse componente não possui infinity-scroll nem paginação, então é recomendado usa-lo apenas quando a quantidade de opções é pequena, como por exemplo os tipos de cadastro da API.

## Suporte a databind

Esse componente usa o databind do angular para vincular os dados manipulados nele para atualizar um modelo de dados ou um filtro.

QUando usar esse componente você deverá importar no seu `*.module` a classe **FormModule**

```ts
import { NgModule } from '@angular/core';
//importe o FormModule para ter suporte ao databind desse elemento
import { FormsModule } from '@angular/forms';

...

@NgModule({
  imports: [
    CommonModule,
    FormsModule /*inclua na lista de imports a classe FormModule*/
  ],
  declarations: [...],
  exports: [...]
})
export class <seuModulo> { }
```

## Importando no módulo

Importe esse elemento no module (`*.module.ts`) que contém o componente que você deseja usar esse elemento.
```ts
import { ApiSelectModule } from '../../componentes/api-select/api-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    ...

    //COMPONENTES MODULES
    ApiSelectModule,
    ...
  ],
  declarations: [
    ...
  ]
})
export class <nomeModulo> { }

```

## Atributos desse elemento

Nome                |   descrição do conteúdo    |  aplicação  | obrigatório
--------------------|----------------------------|-------------|-------------
placeholder         |informe um texto para ser exibido como placeholder do drop-down quando não hover conteúdo seelecionado | cadastro e filtro | sim
formControlName     |nome do formControl usado para fazer o bind da seleção do conteúdo com o modelo de dados | cadastro | sim
[apiService]        |instância da API que possui o método a ser usado para listar o conteúdo que deverá ser carregado nas opções| cadastro e filtro | sim
apiNomeMetodoListar |nome do método assincrono da API que retorne uma Promise que serve para recuperar os dados do servidor que irão alimentar as opções do drop-down | cadastro e filtro | sim
apiFieldExibir      |nome da propriedade do JSON retornada pela API que será usada como o texto exibido da opção no drop-down| cadastro e filtro | sim
apiFieldKey         |nome da propriedade do JSON retornada pela API que será usada como o valor a ser consultado e atualizado no modelo de dados| cadastro e filtro | sim
(valorAlterado)     |função que será invocada após a alteração da informação, como argumento ela receberá no $event o objeto que foi selecionado | cadastro e filtro | não
pesquisaFieldWhere  |nome da propriedade que será usada na condição de filtro do método de listar da API usada para o grid de resultados da pesquisa | filtro | sim
pesquisaOperator    |operador da condição de filtro, vide todas as opções de operadores [aqui](../../../../documentacao/kendoui/operadores-logicos.md)| filtro | sim
[pesquisaGridFiltro]|instância do componente `GridPesquisaComponent`, servirá para que esse elemento se comunique automaticamente com o grid de pesquisa para alimentar o filtro do grid| filtro | sim
--------------------|----------------------------|---|---
childComponent      |Quando esse componente controlar a exibição de dados de outro componente de seleção de dados, passe para esse atributo a instância do outro componente|filtro | não     
childComponentFieldWhere|Informe aqui o nome do campo que será usado no filtro do outro componente limitando assim os resultados apresentados pelo outro componente de seleção|filtro | não


___
## Como usar em um cadastro

No HTML de algum componente inclua o código abaixo
```html
<app-api-select
    placeholder='selecione'
    formControlName='inCodSexo'
    [apiService]='apiPessoaSexoService'
    apiNomeMetodoListar='listar'
    apiFieldExibir="chDescricao"
    apiFieldKey="inCodSexo"
    (valorAlterado)='generoAlterado($event)'
></app-api-select>
```

### Instânciando o elemento para o Typescript do seu componente

* **passo 1)** Importe **FormBuilder, FormGroup** nas dependênicas do seu componente.

    Imports do seu componente
```ts
import { FormBuilder, FormGroup } from '@angular/forms';
```

* **paso 2)** No typescript inclua na criação do FormGroup o FormControl desse filtro.

    Conteúdo do seu componente
```ts
    public formGroupPesquisa: FormGroup;

    constructor(private formB: FormBuilder) { }

    ngOnInit() {
        this.criarForm();
    }

    private criarForm(){
        this.formGroupPesquisa = this.formB.group({
            outroFormControl: [null],
            ...
            inCodSexo: [this.meuModeloDeDados.inCodSexo],
        });
    }
```

veja que o nome do formControl `inCodSexo` passado na propriedade **formControlName** para o elemento HTML `<app-api-select>` deve ser o mesmo usado no formGroup, e o seu conteúdo deve ser a propriedade do modelo de dados que será usada para o data-bind .


O formControl é necessário para que o componente possa acessar e manipular os valores do filtro


**Atenção!** Veja [aqui](../../../../documentacao/form/form-cadastro.md) um exemplo completo de como usar formGroup em um cadastro.


___
## Como usar como um filtro

No HTML de algum componente inclua o código abaixo
```html
<app-api-select
    placeholder="ambos"
    formControlName='apiSelectTipoPessoa'
    [apiService]='apiPessoaTipoPessoaService'
    apiNomeMetodoListar='listar'
    apiFieldExibir="chDesTipoPessoa"
    apiFieldKey="inCodTipoPessoa"

    pesquisaFieldWhere='inCodTipoPessoa'
    pesquisaOperator='eq'
    [pesquisaGridFiltro]="gridFiltro"

    [childComponent]='instanciaOutroComponenteDeSelecao'
    childComponentFieldWhere='nome_tabela.nome_campo'

    (valorAlterado)='valorAPiSelectTipoPessoaAlterado($event)'

></app-api-select>
```

### Instânciando o elemento para o Typescript do seu componente

* **passo 1)** Importe **FormBuilder, FormGroup** nas dependênicas do seu componente.

    Imports do seu componente
```ts
import { FormBuilder, FormGroup } from '@angular/forms';
```

* **paso 2)** No typescript inclua na criação do FormGroup o FormControl desse filtro.

    Conteúdo do seu componente
```ts
    public formGroupPesquisa: FormGroup;

    constructor(private formB: FormBuilder) { }

    ngOnInit() {
        this.criarForm();
    }

    private criarForm(){
        this.formGroupPesquisa = this.formB.group({
            outroFormControl: [null],
            ...
            inCodSexo: [this.meuModeloDeDados.inCodSexo],
        });
    }
```

veja que o nome do formControl `inCodSexo` passado na propriedade **formControlName** para o elemento HTML `<app-api-select>` deve ser o mesmo usado no formGroup, e o seu conteúdo deve ser a propriedade do modelo de dados que será usada para o data-bind .


O formControl é necessário para que o componente possa acessar e manipular os valores do filtro


___
## Defindo campos para serem exibidos na listagem do combobox

Para exibir mais de um campo na listagem exibida pela combobox, basta criar um elemento do tipo "kendo-combobox-column" para cada campo, informando as 3 propriedades conforme exemplo abaixo

```html
<app-api-select>
    <kendo-combobox-column
        field="chDescricao"
        title="Descrição"
        width="60"
    >
    </kendo-combobox-column>
    <kendo-combobox-column
        field="inCodSexo"
        title="id"
        width="40"
    >
    </kendo-combobox-column>
</app-api-select>
```