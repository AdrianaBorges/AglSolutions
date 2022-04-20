# Criação de um CRUDE filho em uma Tab

Veja aqui como criar um **CRUDE filho** contido em uma das abas secundárias de um **CRUDE pai**.

## Indice
[Passo 1: Criar CRUDE](#markdown-header-passo-1-criar-crude)

[Passo 2: Modificar o arquivo HTML de detalhe](#markdown-header-passo-2-modificar-o-arquivo-html-de-detalhe)

[Passo 3: Modificar o arquivo TS de detalhe](#markdown-header-passo-3-modificar-o-arquivo-ts-de-detalhe)

[Passo 4: Modificar o arquivo HTML da listagem](#markdown-header-passo-4-modificar-o-arquivo-html-da-listagem)

[Passo 5: Modificar o arquivo TS da listagem](#markdown-header-passo-5-modificar-o-arquivo-ts-da-listagem)

[Passo 6: Incluir Detalhe e Listagem em uma TAB](#markdown-header-passo-6-Incluir-detalhe-e-listagem-em-uma-tab)

[Passo 7: Incluir na API id do pai](#markdown-header-passo-7-incluir-na-api-id-do-pai)

[Passo 8: Editar o CRUDE Pai para informar seu ID aos seus filhos](#markdown-header-passo-8-editar-o-crude-pai-para-informar-seu-id-aos-seus-filhos)

___
## Passo 1: Criar CRUDE
[voltar ao índice](#markdown-header-indice)

Primeiro crie o CRUDE filho como uma página normal, criado o detalhe e a listagem

___
## Passo 2: Modificar o arquivo HTML de detalhe
[voltar ao índice](#markdown-header-indice)

Abra o arquivo **HTML** e inclua no elemento `<app-cadastro-barra-acao>` a propriedade `isNotVisible='true'`. 

Crie no elemento `app-cadastro-barra-acao` uma instância dele em uma variável chamada "cadastroBarraAcao" para ser recuperada no typescripy
```html
<app-cadastro-barra-acao 
    #cadastroBarraAcao>
</app-cadastro-barra-acao>
```

___
## Passo 3: Modificar o arquivo TS de detalhe
[voltar ao índice](#markdown-header-indice)

Abra o arquivo **Typescript** 

### 3.1 - Recupere a instância da variável "cadastroBarraAcao" criada na interface

* **A)** Inclua a classe ViewChild no import do '@angular/core'
```typescript
import { Component, OnInit, ViewChild, Input } from '@angular/core';
```

* **B)** Faça o import da classe `CadastroBarraAcaoComponent`
```typescript
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
```

* **C)** Crie o acesso a variável `cadastroBarraAcao` criada no HTML
```typescript
@ViewChild('cadastroBarraAcao') cadastroBarraAcao: CadastroBarraAcaoComponent;
```

### 3.2 - Crie a variável `idCadastro`
Essa variável será usada para identificar o cadastro que estará em manipulação, pois no caso de um CRUDE filho o id não pode ser o que está indicado na URL pelo parametro `id`, pois ele identifica na verdade o cadastro pai ao qual ele pertence.
```typescript
    private idCadastro: number;
```

O id do pai para o crude do filho será indicado por cada um dos pais diretamente aos serviços filhos pelo CRUDE do pai, mais abaixo entraremos em mais detalhes sobre isso

### 3.3 - Faça o import da interface **GridInterfaceTabCadastroFilho**
```typescript
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
```   

### 3.4 - Faça a Classe da sua página herdar essa interface
```typescript
export class CrudePessoaDocumentoDetalheComponent implements OnInit, GridInterfaceTabCadastroFilho
```

### 3.5 - Implemente os 2 métodos herdados da interface
```typescript
public gridInterfaceTabCadastroFilho_setIdCadastro(id: number): void{
    this.idCadastro = id;
    this.configurarStatusForm();
    this.getDados();
}

public gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent{
    return this.cadastroBarraAcao;
}
```

### 3.6 - Pegar id do PAI no método getDados ao criar um novo cadastro
Quando estiver criando um cadastro novo o id do seu cadastro será igua a zero, porém deverá ser preenchida na nova instância dele o id da chave estrangeira do seu pai. você pode pegar o id do pai de 2 formas, segue abaixo um exemplo mostrando ambas formas para o caso dos documentos da pessoa:
```typescript
    this.modelPessoaDocumento = new ModelPessoaDocumento();
    //pega da URL o id da pessoa
    this.modelPessoaDocumento.IDPessoa = +this.route.snapshot.paramMap.get('id');
    if(this.modelPessoaDocumento.IDPessoa == 0){
        //ou pega o id do cadastro pai do próprio serviço de CRUDE dessa classe
        this.modelPessoaDocumento.IDPessoa = this.apiPessoaDocumentoService.getIdPessoa()
    }
```

___
## Passo 4: Modificar o arquivo HTML da listagem
[voltar ao índice](#markdown-header-indice)

Inclua no elemento `app-grid-pesquisa` a propriedade `gridInterfaceTabCadastroFilho` que receberá a instância da pagina de detalhe na forma da interface `GridInterfaceTabCadastroFilho`.

```HTML
<app-grid-pesquisa
  #gridFiltro
  ...
  [gridInterfaceTabCadastroFilho]='gridInterfaceTabCadastroFilho'
  >
</app-grid-pesquisa>
```


___
## Passo 5: Modificar o arquivo TS da listagem
[voltar ao índice](#markdown-header-indice)

Solicite como uma propriedade desse elemento a instância da página de detalhe que deve ser ter herado a interface `GridInterfaceTabCadastroFilho`:
```typescript
@Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;
```

___
## Passo 6: Incluir Detalhe e Listagem em uma TAB
[voltar ao índice](#markdown-header-indice)

### 6.1 - HTML do TABs PAI
Abra o arquivo **HTML** de TABs do pai e dentro da TAB faça a declaração das páginas de detalhe e listagem do CRUDE filho.

Veja no exmeplo abaixo a declaração dos elementos de detalhe `app-crude-pessoa-documento-detalhe ` e listagem `app-crude-pessoa-documento-listagem`:
```HTML
<kendo-tabstrip-tab 
  i18n-title="Nome Tab 'Documentos complementares'|Nome da tab 'Documentos complementares' de pesoas físicas@@tabs-pessoa-fisica.tab.DocumentosComplementares"
    title='DOC.COMPLEM.' 
    [selected]="tabSelecionada(1)"
    >
      <ng-template kendoTabContent>
          <h1>
            <div
            i18n-title="Título do conteúdo da Tab|Título do conteúdo da tab 'Documentos complementares' de pesoas físicas@@tabs-pessoa-fisica.tab.titulo.DocumentosComplementares"
            >Documentos complementares
            </div>
          </h1>

          <app-crude-pessoa-documento-detalhe 
            #gridInterfaceTabCadastroFilhoDocumento
          ></app-crude-pessoa-documento-detalhe>
          <app-crude-pessoa-documento-listagem
            [gridInterfaceTabCadastroFilho]='gridInterfaceTabCadastroFilhoDocumento'
          ></app-crude-pessoa-documento-listagem>

      </ng-template>
</kendo-tabstrip-tab>
```
* 1 - Variável `gridInterfaceTabCadastroFilhoDocumento`
Crie uma variável para identificar a instância do compoente de detalhe com um nome que identifique esse CRUDE, tenha a atenção para não criar nomes iguais de variáveis para CRUDEs filhos diferentes, pois todas elas estarão declaradas nesse mesmo documento HTML

* 2 - Propriedade `gridInterfaceTabCadastroFilho` do elemento de listagem
Passe a instância da página de detalhe para a página de listagem
```html
[gridInterfaceTabCadastroFilho]='gridInterfaceTabCadastroFilhoDocumento'
```

* Atenção! Para criar um título basta coloca-lo dentro de um elemento "h1", se tiver mais de uma linha, basta colocar o texto de cada linha dentro de um elemento "div" como filho do "h1". 

* Observação: Para resgatar os dados do CRUDE pai, basta que o componente exponha em uma variável pública a entidade sendo manipulada por ela.


### 6.2 - Typescript do TABs PAI
Não há necessidade de alterar o arquivo **TS** da TAB


___
## Passo 7: Incluir na API id do pai
[voltar ao índice](#markdown-header-indice)

O serviço de API de um CRUDE filho precisa saber o id do pai ao listar os itens que estão cadastrados em nome de algum pai, esse ID deve ser fornecido previamente ao serviço de forma que no momento de listar ele já esteja disponível para uso.

O CRUDE pai sempre que tiver conhecimento de seu próprio id, que seria no caso de uma edição, exclusão ou após salvar um cadastro novo deve informar aos serviços de API filhos o seu id.

### 7.1 - API: id do pai
Declare na API uma variável para representar o id do pai, veja exemplo abaixo:
```typescript
private IDPessoa: number;
```

### 7.2 - API: Metodo de edição do id do pai
Crie um método para editar o id do pai
```typescript
  public setIdPessoa(IDPessoa: number){
    this.IDPessoa = IDPessoa;
  }
```

### 7.2 - API: Listar
No método de listar inclua automaticamente o filtro do pai na condição de filtros da pesquisa, veja exemplo abaixo que lista os documentos de uma pessoa:
```typescript
public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPessoaDocumento>>{

    //ALGUM CÓDIGO AQUI

    //Aplicando filtro de pessoa por padrão
    if (this.IDPessoa > 0){
      if(filter != ''){
        filter += `~and~`;
      }
      filter += `IDPessoa~eq~'${this.IDPessoa}'`;
    }else{
      console.error('O IDPessoa deve ser passado para o grid antes de executar a pesquisa')
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      //url += `&filter=Pessoa.IDPessoa~gte~0`;
      url += `&filter=`;
    }

    //EXECUÇÃO DA PESQUISA RETORNANDO UM PROMISE

```

___
## Passo 8: Editar o CRUDE Pai para informar seu ID aos seus filhos
[voltar ao índice](#markdown-header-indice)


### 8.1: importe as classes de service de APIs filhas
Importe todos os serviços das classes de API e faça suas intâncias no construtor da classe.

Veja exemplo abaixo do Crude de pessoa física:

Import dos serviços de API:
```typescript
import { ApiPessoaDocumentoService } from '../../../../api/api-pessoa-documento.service';
```

Instância dos serviços de API:
```typescript
constructor(
    ...outros serviços...
    private apiPessoaDocumentoService: ApiPessoaDocumentoService,
  ) { 
    //codigo do construtor
  }
```

### 8.2: Informe o id do CRUDE pai a todos os CRUDEs filhos
Nos métodos de carregar os dados do CRUDE pai ou de Incluir um novo cadastro informe aos serviços de CRUDE filhos o id do CRUDE

exemplo ao carregar uma pessoa:
```typescript
private getPessoa(){
    var id: number;

    id = +this.route.snapshot.paramMap.get('id');

    //informo ao serviço dos dados filhos o ID do pai
    this.apiPessoaDocumentoService.setIdPessoa(id);
}
```

exemplo após salvar uma pessoa:
```typescript
  incluir(){
    this.apiPessoaElService.criar(this.pessoalEL).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoalEL = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();

        //informo ao serviço dos dados filhos o ID do pai
        this.apiPessoaDocumentoService.setIdPessoa(this.pessoalEL.IDPessoa);
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }
```


