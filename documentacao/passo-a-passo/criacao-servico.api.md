# Criação de um novo serviço de integração com a API

Todo acesso aos end-points das APIs é feito por um serviço em angular. 

Cada serviço representa um modelo de dados, assim como é feito nas rotas da API e em sua documentação.

Se você não leu sobre a [arquitetura](../arquitetura.md) de como está a estrutura desse projeto, leia antes de continuar.

Cada módulo da API aqui é representada em um módulo também, e para cada módulo exsitem os sub-diretórios **api**, **models** e **ui**. Logo cada serviço que você criar aqui deve ficar dentro do sub-diretório **api** do seu módulo, assim como está na documentação da API.

Veja por exemplo o conjunto de end-points da entidade lógica de pessoa fica na [documentação da API](http://www.agileit.inf.br/AGLSolutionsDOCs) no módulo corp, e aqui no sistema fica no sub-diretório [modulos/corp/api/api-pessoa-el.service.ts](../../src/app/modulos/corp/api/api-pessoa-el.service.ts). Nessa classe de serviço existem todos os métodos necessários para interagir com a API sobre esse modelo de dados.

Todo serviço de comunicação com a API entrega para o nosso sistema um tipo de objeto específico da entidade lógica que ele está manipulando, então antes mesmo de criar o serviço você deve criar dentro do sub-diretório **models** a classe de dados que será manipulada por ele, que seguindo o exemplo acima, a entidade lógica desses dados fica em [modulos/corp/models/pessoa-e.ts](../../src/app/modulos/corp/models/pessoa-el.ts).


## Passo a passo

1 - [Crie a entidade lógica da API](#markdown-header-crie-a-entidade-logica-da-api)

2 - [Crie o serviço de comunicação com a API](#markdown-header-crie-o-servico-de-comunicacao-com-a-api)


___
## Crie a entidade lógica da API

[voltar ao indíce do passo a passo](#markdown-header-passo-a-passo)


No subdiretório **models** do módulo que a entidade lógica pertence crie uma classe contendo todos os atributos da entidade lógica.

**Nomeie a classe** o mais próximo possível ao nome da entidade lógica conforme a documentação da API, porém em alguns casos é interessante que para os serviços que sejam uma composição dos dados de outra entidade lógica (dados relacionados que só existem mediante a existência dos dados do pai) sejam criados com um nome que leve o nome dos dados do pai, como por exemplo a entidade lógica que representa a relação de pessoa com estado civil foi nomeada nesse projeto como [pessoa-estado-civil.ts](../../src/app/modulos/corp/models/pessoa-estado-civil.ts).

**Importe a classe de erros** em toda classe de entidade lógica, conforme exemplo abaixo:
```typescript
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
```

**Faça sua classe herdar de ApiErrorCollection** conforme exemplo abaixo, essa classe é importante pois toda resposta da API retorna como parte dos dados da entidade lógica uma estrutura de dados de erro, que a sua API irá traduzir para outra estrutura de dados espeecíficamente otimizada para esse projeto e seus componentes.
```typescript
export class MinhaEntidadeLogica extends ApiErrorCollection {
    //um monte de propriedades (variáveis)
}
```


___
## Crie o serviço de comunicação com a API

[voltar ao indíce do passo a passo](#markdown-header-passo-a-passo)

**Crie a classe de serviço** executuando o comando CLI do angular abaixo

```terminal
ng generate service modulos/{{nome modulo}}/api/{{nome entidade logica}}
```

* {{**nome modulo**}} deve ser um dos módulos da api nesse projeto, exemplo: "corp", "eseg", "segur"

* {{**nome entidade logica**}} é o nome do arquivo separado por hífen, exemplo "pessoa-estado-civil"

Esse comando irá criar 2 arquivo, um do próprio serviço ".ts" e outro arquivo de teste ".spec.ts" desse serviço.


**Faça os imports abaixo** no arquivo do seu serviço:

```typescript
//Imports padrões a todos os serviços
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';

//Import da entidade lógica gerenciada por esse serviço
import { MinhaEntidadeLogica } from '../models/minha-entidade-logica';
```

* **MinhaEntidadeLogica** deve ser substituida pela classe da entidade lógica gerenciada pelo seu serviço

Abaixo segue o que fazer com cada um dos imports:

* [ApiGatewayService](#markdown-header-apigatewayservice)

* [InterfaceColunasGrid](#markdown-header-interfacecolunasgrid)

* [GridPesquisaColumn](#markdown-header-gridpesquisacolumn)

* [enum_formatoColuna](#markdown-header-enum_formatocoluna)



Veja um exmeplo completo de uma API na classe de serviço [src/app/modulos/corp/api/api-pessoa-el.service.ts](../../src/app/modulos/corp/api/api-pessoa-el.service.ts)


___
## ApiGatewayService

Esse serviço expõe os métodos de http para seu serviço consumir, e já tratam as mensagens de erro retornadas pela API traduzindo-as para a estrutura de dados desse projeto.


**No Construtor** da classe crie uma instância da classe ApiGatewayService
```typescript
constructor(
    private apiGatewayService: ApiGatewayService
  ) { }
```

**CRUDE**: para cada método do CRUDE (Create, Read, Update e Delete) use a proprieade **apiGatewayService** para acessar a api conforme exemplo abaixo, para consumir os metodos "post", "get", "put" e "delete" da classe [ApiGatewayService](../../src/app/api-data-access/api-gateway.service.ts)

```typescript
  public alterar(objeto: PessoaEL): Promise<PessoaEL>{
    return new Promise<PessoaEL>(
      (resolve, reject)=>{

        this.apiGatewayService.put<PessoaEL>(this.url, objeto, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }
```

___
## InterfaceColunasGrid

Essa interface deve ser implementada em toda classe de serviço de API desse projeto, pois ela força que sua classe tenha que ter o método que é consumido pelos grids de pesquisa, veja exemplo abaixo:

```typescript
export class ApiPessoaElService implements InterfaceColunasGrid {

    //codigos da classe ...

    //implements InterfaceColunasGrid
    public getColunasGrid(): Array<GridPesquisaColumn>{
        var colunas: GridPesquisaColumn[];
        colunas = [];
        
        //mapeie cada coluna que venha a se tornar um filtro ou ser exibida em um grid de pesquisa
        colunas.push(new GridPesquisaColumn('CPF/CNPJ', 'Pessoa.inNumIdentificacao', 'inNumIdentificacao', enum_formatoColuna.texto, true, false));

        return colunas;
    }

}
```

A classe desse interface se encontra em [src/app/componentes/interfaces/interface-get-colunas-grid.ts](../../src/app/componentes/interfaces/interface-get-colunas-grid.ts)

___
## GridPesquisaColumn

A classe **GridPesquisaColumn** se encontra em [src/app/componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column.ts](../../src/app/componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column.ts) e sua documentação em [src/app/componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column.md](../../src/app/componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column.md)

Ela serve para definir a estrutura de colunas dos grids de pesquisa e sua associação com as propriedades da entidade lógica do seu serviço, leia a [documentação](../../src/app/componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column.md) dela para saber mais.


___
## enum_formatoColuna

Essa classe define um conjunto de enumeradores a serem usados no método push das colunas para o grid, ela se encontra em [src/app/componentes/camada-logica/KendoUi/Grid/enum-formato-coluna.ts](../../src/app/componentes/camada-logica/KendoUi/Grid/enum-formato-coluna.ts)

Cada um desses tipos definem que tipo de formatação do valor deve ser apresentada na coluna, por exemplo o tipo **dataHora** será incluído na coluna com a formatação `'{0:dd/MM/yyyy HH:mm:ss}'`. Veja a classe em [src/app/componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column.ts](../../src/app/componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column.ts) e sua respectiva [documentação](../../src/app/componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column.md) para mais detalhes


