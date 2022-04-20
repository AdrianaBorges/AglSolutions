# GridPesquisaComponent

Esse componente de Grid extende o componente kendo-grid para criar uma integração dele com o serviço de conexão com alguma API, facilitando assim não só a exibição dos dados paginadas de algum end-point, mas também integrando os formControls da página com os filtros do grid de forma a criar automaticamente as condições de filtro a serem passadas para os métodos de listar dos serviços de API. 

Outro diferencial importante é que os filtros mantém persistidas as condições de busca preenchidas pelo usuário, sendo assim, ao navegar para um cadastro existente ou novo ou mesmo outra área do sistema, ao retornar, os filtros continuarão preenchidos.

Abaixo segues os passos necessários para se usar o grid-pesquisa:

## Indice

* **1** [Incluir TAG no HTML](#markdown-header-declarar-no-html)

* **2** [Criar instância do GRID](#markdown-header-criar-instancia-do-grid)

* **3** [Criar formulário de pesquisa](#markdown-header-criar-formulario-de-pesquisa)

* **4** [Incluir botões cadastro filho](#markdown-header-incluir-botoes-cadastro-filho)

* **5** [Validar exibição dos botões de CRUDE e Filhos](#markdown-header-validar-exibicao-dos-botoes-de-crude-e-filhos)

* **6** [Habilitar os botões de ação Inativar, Reativar, Validar e Cancelar](#markdown-header-habilitar-os-botoes-de-acao-inativar-reativar-validar-e-cancelar)

* **7** [Exibir colunas concatenando campos](readme.campos.agregados.md)

* **8** [Exibir colunas formatando os campos](readme.campos.format.md)

___
## Incluir TAG no HTML
[voltar ao indíce](#markdown-header-indice)

Exemplo HTML
```html
<app-grid-pesquisa
    #gridFiltro
    idGrid="pesquisaPessoa"
    [apiService]='apiService'
    nomeMetodoOrdenacao='mudarOrdenacao'
    nomeMetodoApi='listar'
    apiFieldKey='IDPessoa'
    [colunasGrid]='getColunasGridCadastro()'
    pageSize='8'
    [rotaCadastro]='gridRotasCadastro'

    cabecalhoBotaoNomes='btn 00|btn 01|btn03|btn etc'
    (cabecalhoBotaoClick)='cabecalhoBotaoClick($event)'
    textoBotaoCriarNovo='nova pessoa física'
    [formGroupPesquisa]='formGroupPesquisa'
    
    [camposDetalheLinha]='getColunasGridCadastro()'
    gridPesquisaBotaoDetalhesOrientacao='vertical'
    i18n-gridPesquisaBotaoDetalhes="botões grid detalhes|botões de detalhes do grid@@crude-nome-crude.botoes.grid.detalhe"
    gridPesquisaBotaoDetalhes='nome btn1|nome btn2|etc'
    gridPesquisaBotaoDetalhesWidth='100|150|80'
    (gridPesquisaBotaoDetalhesClick)='gridPesquisaBotaoDetalhesClick($event)'
    
    [gridInterfaceTabCadastroFilho]='gridInterfaceTabCadastroFilho'
    [areaFiltro]='areaFiltro'>
</app-grid-pesquisa>
```

* `#gridFiltro`: esse atributo serve para export a instância desse componente para o typescript.

* `idGrid`: o id do grid deve ser único para toda aplicação e serve para manter a persitência dos dados preenchidos nos formControls dos filtros dessa página.

* `[apiService]`: instância do serviço que se comunica com o end-point da API que será usada para listar os dados nesse grid.

* `nomeMetodoOrdenacao`: nome do método da API que recebe nos argumentos o nome do filtro e a direção da ordenação como strings a fim de mudar a ordenação do método de listar

* `nomeMetodoApi`: nome do método do serviço a ser chamado para listar os dados no grid, esse método deve respeitar a assinatura de argumentos que devem ser passado a ela pelo grid, que é: `public listar(page: number, pageSize: number, filter: string): Promise<Array<PessoaEL>>{...}`.

    1 **page** identifica a página atual sendo listada para o usuário das páginas disponíveis

    2 **pageSize** identifica o tamanho de cada página

    3 **filter** identifica os filtros que seráo passados pelo Grid para a API. Eles são preenchidos pelo usuário no formulário de pesquisa que está integrado com o grid.

* `apiFieldKey`: nome da propriedade do objeto do modelo de dados que será usado como chave estrangeira para buscar por um cadastro específico quando chamar a função de exibir para edição ou exclusão de um registro.

* `[colunasGrid]`: coleção das colunas que o grid deve exibir ou usar para filtro, veja mais sobre a [classe grid-pesquisa-column aqui](../camada-logica/KendoUi/Grid/grid-pesquisa-column.ts) e sobre adocumentação da classe [grid-pesquisa-column aqui](../camada-logica/KendoUi/Grid/grid-pesquisa-column.md).

* `pageSize`: define a quantidade de registros que será exibida em cada pagina no grid.

* `rotaCadastroNomeBotoes`: string com nomes dos botões da função "novo" separados pelo caracter pipe (|), dos quais serão exibidos no cabeçalho do grid para exibir a página de inclusão de um novo registro, ele serve para traduzir os nomes dos botões do atributo `[rotaCadastro]`. Para criar a tradução desses botões use o atributo i18n.

* `[rotaCadastro]`: pode ser um String de rota com caminho completo (absoluto) ou um array de objetos que definem a rota conforme o valor de uma determinada propriedade do objeto do modelo de dados sendo listado, veja mais detalhes sobre essa rota na documentação do arquivo [template.lista.html](../../../../documentacao/passo-a-passo/template_paginas/template.lista.html) da classe [template.lista.ts](../../../../documentacao/passo-a-passo/template_paginas/template.lista.ts). Exemplo e uma explicação mais detalhada estão no aquivo **ts** na variável `public gridRotasCadastro: GridRotaCadastro[]`.

* `cabecalhoBotaoNomes` string com nomes dos botões separados pelo caracter pipe (|), dos quais serão exibidos no cabeçalho do grid. Para criar a tradução desses botões use o atributo i18n.

* `(cabecalhoBotaoClick)` evento disparado pelo clique dos botões definidos por `cabecalhoBotaoNomes`, o evento retorna o indice (começando por zero) do botão que foi clicado.

* `textoBotaoCriarNovo`: não é obrigatório, quando não informado o texto padráo usado é "novo"para identificar o botão no toolbar do grid que exibirá a tela de cadastro de um novo registro. **Atenção!** se estiver usando o array de objetos para a propriedade `[rotaCadastro]` então o texto do botão deverá ser informado em cada objeto.

* `[formGroupPesquisa]` Instância do formGroup usada no formulário de pesquisa feito com reative form. Essa instância é que possibilita a integração do que foi preenchido nos filtros com a geração automática de condição de pesquisa que será passada para a API.

* `camposDetalheLinha` coleção das colunas que o grid deve exibir nos detalhes da linha quando expandi-la, veja mais sobre a [classe grid-pesquisa-column aqui](../camada-logica/KendoUi/Grid/grid-pesquisa-column.ts) e sobre adocumentação da classe [grid-pesquisa-column aqui](../camada-logica/KendoUi/Grid/grid-pesquisa-column.md).

* `gridPesquisaBotaoDetalhesOrientacao` Identifica se os botões a serem exibidos na expansão dos detalhes do row deve ficar na 'horizontal' ou 'vertical', sendo esses nomes os próprios valores aceitos.

* `gridPesquisaBotaoDetalhes` String com os nomes dos botões separados pelo caracter pipe (|), o tamnho deles é definido pelo outro atributo gridPesquisaBotaoDetalhesWidth. **Obs.:** Use a tradução i18n-gridPesquisaBotaoDetalhes para definir a tradução para essa propriedade do elemento.

* `gridPesquisaBotaoDetalhesWidth` String com as expessuras em pixels de cada botão, se nenhuma expessura for definida o sistema assumirá por padrão 150px;

* `(gridPesquisaBotaoDetalhesClick)` evento que receberá um objeto do tipo GridPesquisaBotaoDetalhe quando um botão de detalhe for acionado por um usuário, com esse evento basta o recebedor verificar o 'id' do botão recebido no evento para executar a rotina equivalente ao botão clicado. **Atenção!** Não compare o nome, pois ele pode mudar conforme traducão.

* `[gridInterfaceTabCadastroFilho]` Deve ser informado quando o grid está controlando um cadastro filho dentro de uma TAB, o grid ira usar essa referencia para controlar a exibição dos detalhes e passar o id do cadastro selecionado.

* `[areaFiltro]` deve ser usado na mesma condição da propriedade acima `[gridInterfaceTabCadastroFilho]`, porém apenas se a listagem possuir uma área de filtros externa ao grid

___
## Criar instância do GRID
[voltar ao indíce](#markdown-header-indice)

Após ter incluído o TAG do elemento HTML para o grid-pesquisa agora é necessário acessar a instância desse componente em seu código.

Para isso importe a classe `ViewChild` 
```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
```

Em seguida nas variáveis da sua classe faça a declaração abaixo para recuperar a instância delcarada ho HTML
```typescript
@ViewChild('gridFiltro') gridFiltro: GridPesquisaComponent;
```

**Atenção!** é importante que o nome entre parenteses **gridFiltro** da declaraçao do **ViewChild** seja o mesmo nome declarado no html com a tralha na frente `#gridFiltro`. Essa é a forma que o angular tem de declarar uma variável na view e resgata-la no controller.

Com essa variável no seu código agora é possível acesar o método do Grid de efetuar a pesquisa quando você clicar no seu botão de pesquisar no formulário de pesquisa.

Para isso crie na sua classe um método que será chamado pelo botão de pesquisa
```typescript
  executarPesquisa(){
    this.gridFiltro.executarPesquisa();
  }
```

Segue exemplo abaixo do botão de efetuar pesquisa
```html
<div class="form-group col-md-1">
    <button kendoButton 
    class="form-control btn-filtro-acao"
    (click)="executarPesquisa()"
    [primary]="true"><span class="k-icon k-i-search"></span>  pesquisar</button>
</div>
```


___
## Criar formulário de pesquisa
[voltar ao indíce](#markdown-header-indice)

O formulário de pesquisa deve ser feito do tipo Reactive Form, pois será necessário passar a instância do formGroup para o Grid.

Segue abaixo um exemplo HTML de um componente de formulário
```html
<div class="form-group col-md-6">
    <label for="inputTexto">Tipo de pessoa</label>
    <app-filtro-multiselect
    formControlName='listaTipoPessoa'
    
    [apiService]='apiPessoaTipoPessoaService'
    apiNomeMetodoListar='listar'
    apiFieldExibir="chDesTipoPessoa"
    apiFieldKey="inCodTipoPessoa"

    placeholder="ambos"

    pesquisaFieldWhere='inCodTipoPessoa'
    [pesquisaGridFiltro]="gridFiltro"

    ></app-filtro-multiselect>
</div>
```

* `formControlName`: esse atributo é o que realmente importa para vincular o componente ao formControl, ao criar a instância do formGroup o nome do controle deve ser informado nesse atributo.

Importe para seu arquivo .ts as classes de formulário reativo que serão necessárias
```typescript
import { FormBuilder, FormGroup } from '@angular/forms';
```

Veja exemplo de criação do formGroup    
```typescript

  //Delcare nas variáveis da sua classe a instância do FormGroup
  public formGroupPesquisa: FormGroup;

  //declare no construtor a instância do formBuilder
  constructor(
    ...,
    private formB: FormBuilder
  ) { 
      //Crie a instância do FormGroup no construtor
      this.criarForm();
  }

  private criarForm(){
    this.formGroupPesquisa = this.formB.group({
      listaTipoPessoa: [[]],
      daDatNascim: [null],
      alteracaoStart: [null],
      alteracaoEnd: [null],
    });

  }
```


### Veja um exemplo completo nos arquivos abaixo:

* **html** [documentacao/passo-a-passo/template_paginas/template.lista.html](../../../../documentacao/passo-a-passo/template_paginas/template.lista.html)

* **typescript** [documentacao/passo-a-passo/template_paginas/template.lista.ts](../../../../documentacao/passo-a-passo/template_paginas/template.lista.ts)


___
## Incluir botões cadastro filho
[voltar ao indíce](#markdown-header-indice)

É possivel a partir de botões na coluna de edição abrir rotas de cadastros/crud filhos do cadastro atual, para isso basta incluir dentro das TAGS do grid a tag do container de botões e dentro dela quantas TAGs de botões forem necessários.

O botão serve também para responder ao evento ```colunaEditarBotaoClick``` caso ele não tenha uma rota filha informada. **Atenção!** o método que for usado para receber o evento irá receber no seu argumento uma instância do objeto ```GridPesquisaColunaEditarBotaoClick``` da linha onde o botão foi clicado, esse objeto possui todos os atributos da TAG ```<app-grid-pesquisa-botao-acao-linha>``` e o atributo ```dataItem``` que é uma instância do modelo de dados da linha onde o botão foi clicado.

Segue exemplo do HTML abaixo:
```html
<app-grid-pesquisa
(colunaEditarBotaoClick)='colunaEditarBotaoClick($event)'>
    <app-grid-pesquisa-container-botoes-acao-linha>
    <app-grid-pesquisa-botao-acao-linha
      id="btnAcaoExibirNiveis"
      icone='redo'
      rotaFilha_url='programa-nivel'
      rotaFilha_tooltip='exibir lista de níveis do programa'
      i18n-rotaFilha_tooltip="botão para exibir o crude de níveis do programa|btnAcaoExibirNiveis@@crude-programa-listagem.grid.btn.acao.niveis">
    </app-grid-pesquisa-botao-acao-linha>
  </app-grid-pesquisa-container-botoes-acao-linha>
</app-grid-pesquisa>
```

* **OBS.**: a TAG ```<app-grid-pesquisa-botao-acao-linha>``` pode ter quantas ocorrências dela quanto forem necessárias, não existe um limite.

### Atributos da TAG <app-grid-pesquisa-botao-acao-linha>



Atributo         | Obrigatório | Descrição
-----------------|-------------|----------------
id               |não          |Só é necessário caso não use o atributo rotaFilha_url
icone            |não          |Quando não informado o ícone padrão 'myspace' é usado
rotaFilha_url    |não          |Um texto que representa apenas a parte da URL referente a rota filha que será exibida, esse texto será concatenado a rota atual para formar a URL completa da rota filha
rotaFilha_tooltip|sim      |Texto que será exibido como tolltip ao passar o mouse sobre o botão, pois o botão só exibe um ícone.


Segue exemplo do TS abaixo:
```javascript
export class MeuComponente{
  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick){
    if(data.botao.id == 'btnAcaosave'){
      alert('Clicou no botão salvar');
    }if(data.botao.id == 'btnAcaoDownload'){
      alert('Clicou no botão de Download');
    }else{
      alert('Clicou no botão com ícone: ' + data.botao.icone);
    }
    console.log('dados da linha selecionada = ', data.dataItem);
  }
}
```

___
## Validar exibição dos botões de CRUDE e Filhos
[voltar ao indíce](#markdown-header-indice)

A visualização dos botões de CRUDE e dos botões de rota de filhos podem ser controladas para exibição pelo componente da página. 

Sendo que para os botões de CRUDE estarem visiveis, tanto a validação personalizada quanto a permissão do usuário na rota devem ser válidas, se uma delas não for, o botão não será exibido.

Se a função de validação não for passada pro grid os botões serão todos visiveis, sendo que os de CRUDE seguiram com a restrição do usuário conforme a rota.

Atenção! os botões de CRUDE possuem um id do botão com nomes padronizados, são eles:
* dados.botao.id == 'Create'
* dados.botao.id == 'Read'
* dados.botao.id == 'Update'
* dados.botao.id == 'Delete'

### Passo 1: fazer o import da classe GridPesquisaColunaEditarBotaoClick
```typescript
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
```

### Passo 2: criar o método de validação
```typescript
  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean{
    if(dados.botao.id == 'Create'){
      return true;
    }else if(dados.botao.id == 'Reade'){
      return true;
    }else if(dados.botao.id == 'Update'){
      return dados.dataItem.inCodSituacaoSolicCred == 1;
    }else if(dados.botao.id == 'Delete'){
      return dados.dataItem.inCodSituacaoSolicCred == 1;
    }else if(dados.botao.id == 'btnAtualizarInfo'){
      return dados.dataItem.inCodSituacaoSolicCred == 1 || dados.dataItem.inCodSituacaoSolicCred == 2;
    }else if(dados.botao.id == 'btnEncaminharAprovacao'){
      return dados.dataItem.inCodSituacaoSolicCred == 1;
    }else{
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }
```

### Passo 3: passar o método de validação pro grid
```html
<app-grid-pesquisa [btn_acao_exibir]='btn_acao_exibir'>
</app-grid-pesquisa>
```

___
## Habilitar os botões de ação Inativar, Reativar, Validar e Cancelar
[voltar ao indíce](#markdown-header-indice)

Cada um dos botões possue 3 atributos mais o da tradução que devem ser configurados caso seja necessário exibi-lo,

A função em cada um deles que determina se deve ou não ser exibido trabalha em conjunto com as permissões do usuário para o cadastro em si. Exemplo: para exibir o comando de *Inativar* o usuário deve ter na permissão da rota "*" ou "Inativar" na lista de permissões da rota e a função passada no atributo ```[btn_Inativar_exibir]``` retornar true.

Segue abaixo listagem de cada um deles.

### **Inativar**
Atributo                | Descrição
------------------------|---
(btn_Inativar_click)    |Evento de click desse botão
[btn_Inativar_exibir]   |Função que deve ser passada, ela deve receber um argumento do tipo de objeto da linha selecionada e retornar um boolean
btn_Inativar_titulo     |Tolltip que será exibido no mouse over
i18n-btn_Inativar_titulo|Tradução i18n para o tooltip

Exemplo de como aplicar no HTML
```html
<app-grid-pesquisa 
  (btn_Inativar_click)='btn_Inativar_click($event)' 
  [btn_Inativar_exibir]='btn_Inativar_exibir' 
  btn_Inativar_titulo='inativar usuário' 
  i18n-btn_Inativar_titulo="botão de ação: inativar|botão na coluna de ação para inativar um usuário@@crude-usuario-listagem.btn_Inativar_tooltip"
></app-grid-pesquisa>
```

### **Reativar**
Atributo                | Descrição
------------------------|---
(btn_Reativar_click)    |Evento de click desse botão
[btn_Reativar_exibir]   |Função que deve ser passada, ela deve receber um argumento do tipo de objeto da linha selecionada e retornar um boolean
btn_Reativar_titulo     |Tolltip que será exibido no mouse over
i18n-btn_Reativar_titulo|Tradução i18n para o tooltip

### **Validar**
Atributo                | Descrição
------------------------|---
(btn_Validar_click)    |Evento de click desse botão
[btn_Validar_exibir]   |Função que deve ser passada, ela deve receber um argumento do tipo de objeto da linha selecionada e retornar um boolean
btn_Validar_titulo     |Tolltip que será exibido no mouse over
i18n-btn_Validar_titulo|Tradução i18n para o tooltip

### **Cancelar**
Atributo                | Descrição
------------------------|---
(btn_Cancelar_click)    |Evento de click desse botão
[btn_Cancelar_exibir]   |Função que deve ser passada, ela deve receber um argumento do tipo de objeto da linha selecionada e retornar um boolean
btn_Cancelar_titulo     |Tolltip que será exibido no mouse over
i18n-btn_Cancelar_titulo|Tradução i18n para o tooltip