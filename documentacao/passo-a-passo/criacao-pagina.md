# Criação de uma nova página

Esse documento irá orienta-lo para criação de uma nova página no sistema.

**Importante** você já ter lido a documentação de [Arquitetura](../Arquitetura.md) antes desse documento para melhor compreender as instruções dele.

O angular não possui um tipo de arquivo específico para página, na verdade o próprio `component` serve tanto para criação de elementos customisados que possuem interface gráfica, assim como para uma página inteira. A diferença entre um elemento customisado e uma página é que a página é exibida na interface em página inteira ou dentro de um **outlet(*)** através de uma rota, e um elemento customisado é adicionado a uma página assim como qualquer elemento HTML, tipo `<input></input>`.

**(*)** A função de um [outlet](https://angular.io/guide/router#router-outlet) é semelhante a de um iFrame, ele irá ocupar um determinado espaço em uma página principal, como um menu, ou um cabeçalho ou uma área de conteúdo, e novas rotas podem ser abertas dentro de outlets específicos. Veja como exemplo as rotas que possuem outlet nesse projeto no arquivo [modulos-routing.module.ts](../../src/app/modulos/modulos-routing.module.ts).


## Indice
1 - [Gerando os arquivos da página](#markdown-header-gerando-os-arquivo-da-pagina)

2 - [Importando os componentes do projeto](#markdown-header-importando-os-componentes-do-projeto)

3 - [Importanto as APIs necessárias](#markdown-header-importando-as-apis-necessarias)

4 - [Criando o FormGroup dos seus componentes de CRUDE](criando-o-FormGroup-dos-seus-componentes-de-crude)

5 - [Importando a página no seu respectivo módulo](#markdown-header-importando-a-pagina-no-seu-respectivo-modulo)

6 - [Habilitando a página na rota do módulo](#markdown-header-habilitando-a-pagina-na-rota-do-modulo)

7 - [Template completo de um CRUDE da página em typescript](#markdown-header-template-completo-de-um-crude-da-pagina-em-typescript)


___
## Gerando os arquivos da página
[voltar ao índice](#markdown-header-indice)

Cada página do projeto é criada dentro do módulo ao qual ela faz parte, a divisão de módulos desse projeto segue exatamente a divisão de módulos da API, então se você for criar uma página para manipular dados de pessoa, assim como na documentação você irá criar essa página dentro do módulo **corp**. 

Seguindo o exemplo acima, para criar a página de pessoa você usaria o comando abaixo:
```terminal
ng generate component modulos/corp/ui/[nome]
```

Após esse comando o Angular CLI terá criado um diretório com o nome que você escolheu em **[nome]**, com 4 arquivos dentro (html, scss, spec.ts e ts) e já terá feito o `import` do seu componente para o módulo principal do **corp** que é o arquivo [corp.module.ts](../../src/app/modulos/corp/corp.module.ts).

Repare que não foi necessário colocar no caminho do diretório `src/app`, pois o Angular CLI já entende que tudo da aplicação deve ser gerado dentro do diretório `src/app`.

Para qualquer outra página em qualquer outro módulo basta seguir de exemplo esse mesmo comando, mudando apenas o nome do módulo conforme apropriado.

___
## Importando os componentes do projeto
[voltar ao índice](#markdown-header-indice)

A página **html** gerada pelo Angular CLI deve ser substituída pelos elementos HTMLs que forem necessários para camada de apresentação, então para cada componente desse projeto que você vier a usar não esqueça de fazer o import dele antes. Seja o compoenente do Kendo UI ou do diretório de componentes desse projeto.

Por enquanto, como o projeto não está fazendo uso do Lazy-load, não será necessário criar um módulo para cada página, sendo assim, o arquivo `*.module` de cada módulo do sistema já possui os imports de todos os componentes necesários, porém se você precisar acessar métodos da instância de algum componente, então será necessário importar no arquivo `*.ts` da sua página o componente escolhido.

### Imports essenciais

Abra o arquivo `*.ts` da pagina que você está criando e no início dela onde ja tem o `import { Component, OnInit } from '@angular/core';` adicione novas linhas abaixo dela para cada componente que desejar, vide exemplo abaixo:

```ts
import { Component, OnInit } from '@angular/core';
//1) Componentes Angular essenciais para uma página
import { FormBuilder, FormGroup } from '@angular/forms';

//2) Serviços do projeto essenciais
import { CabecalhoBreadcrumbService } from '../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

//3) Outros Componentes do projeto
//...
```
* **1)** As classes FormBuilder e FormGroup são essenciais para fazer o bind dos componentes de interface com o modelo de dados, seja para uma tela de pesquisa ou um CRUDE. caso seja necessário, relembre sobre Reative Forms no documento de [Arquitetura](../Arquitetura.md)

A sequência de como usar essas classes está a seguir nesse documento no item "[Criando o FormGroup dos seus componentes de CRUDE](criando-o-FormGroup-dos-seus-componentes-de-crude)"


* **2)** A classe [CabecalhoBreadcrumbService](../../src/app/componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service.ts) é um serviço que dará a página o controle de alterar no `outlet` do breadcrumb da página a sequência de rotas da página principal até a sua página. saiba mais como usa-la [aqui no readme.md](../../src/app/componentes/cabecalho-breadcrumb/readme.md) dela.

* **3)** Outros componentes
Veja quais outros componentes serão úteis na listagem de componentes desse projeto ou do Kendo UI em [documentacao/Componentes.md](../Componentes.md).

___
## Importanto as APIs necessárias
[voltar ao índice](#markdown-header-indice)
Para que serve um CRUDE se não for para ter acesso a dados remotos? então sua página precisará importar no mínimo uma das APIs para interagir com os dados provenientes do servidor.

Para isso basta importar a API na área de import do arquivo `*.ts` e depois criar uma instância dela no construtor da sua classe. Veja exemplo abaixo:

```typescript
//Outros imports

//4) APIs
import { ApiNomeApi } from '../../../api/api-nome-api.service';


@Component({
  selector: 'app-minha-pagina',
  templateUrl: './minha-pagina.component.html',
  styleUrls: ['./minha-pagina.component.scss']
})
export class MinhaPaginaComponent implements OnInit {

    constructor(public apiNomeApi: ApiNomeApi) { }

}
```

* **ApiNomeApi** representa uma API que provavelmente está do sub-diretório `api` do módulo da sua página, mas nada impede você poder carregar uma API de outro módulo.

* **apiNomeApi** começando com letra minúscula representa uma instância da classe ApiNomeApi, que assim como todo e qualquer código do tipo `*.service` deve ser declarado no construtor do seu componente de forma a te-lo disponível em seu código. 

**Atenção!** Fora o uso para API os arquivos do tipo `*.service` são usados para troca e manutenção de alguma informação entre diferentes componentes, como é o caso do bread-crumb.service.ts, nesse caso importe ele apenas no módulo principal do projeto do qual todas as páginas de todos os módulos possam compartilhar o mesmo dado, pois se ele for delcarado em cada módulo, cada módulo terá uma instância própria e os dados do serviço só serão compartilhados para as páginas do mesmo módulo.

___
## Criando o FormGroup dos seus componentes de CRUDE
[voltar ao índice](#markdown-header-indice)

Veja abaixo o exemplo nos códigos da sua página (arquivos .html e .ts).

Arquivo .html
```html
<app-cadastro-barra-acao 
    #cadastroBarraAcao
    [formGroup]='meuForm'
    [modoExclusao]="modoExclusao"
    (confirmar)='btnConfirmar()'
    (cancelar)='btnCancelar()'
    (excluir)='btnExcluir()'
    >

    <form action="" [formGroup]="meuForm" class="k-form">

      <!-- Aqui são exibidas as mensagens de erro retornadas pela API -->
      <div class="invalido" *ngIf='apiErrorCollection.mensagem_geral != null'>
        {{apiErrorCollection.mensagem_geral}}
      </div>

      Aqui entram os compoentes como imputs, etc. que serão associados cada um a seu respectivo FormControl

      <!-- Exemplo -->
      <label class="k-form-field">
          <span>
            Nome 
            <span class="k-required">*</span>
            <app-form-control-alerta-erro-api
              [mensagemErro]="apiErrorCollection.campos['chNome']"
            ></app-form-control-alerta-erro-api>
          </span>
        <input kendoTextBox formControlName="chNome" required />
      </label>
    </form>

</app-cadastro-barra-acao>
```

Arquivo .ts
```typescript

//Componentes
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';

@Component({
  selector: 'app-minha-pagina',
  templateUrl: './app-minha-pagina.html',
  styleUrls: ['./app-minha-pagina.scss'],
})
export class MinhaPagina implements OnInit {

  /**
   * Passo 1) Resgate a instância do elemento CadastroBarraAcaoComponent declarado no HTML 
   * Esse componente foi criado para esse projeto e serve para incluir os componentes visuais de barra de ação com os botões de cancelar, salvar e voltar.
   * Serve também para facilitar o controle e manipulação dos dados entre o seu modelo de dados resgatado da API e o FormGroup.
   */
  @ViewChild('cadastroBarraAcao') cadastroBarraAcao : CadastroBarraAcaoComponent;

  //Declaro variáveis necessárias para o controle de edição dessa página
  private modoExclusao: boolean;
  public apiErrorCollection: ApiErrorCollection;

  //Passo 2) Declare a variável do tipo FormGroup
  public meuForm: FormGroup;

  //Passo 3) Declare a variável do modelo de dados retornado pela API (não esqueça de fazer o importe dessa classe)
  public dadosAPI: DadosAPI;

  /**
   * Passo 4) 
   * Construtor com todas incializações necessárias para sua página, como por exemplo 
   * o serviço de breadcrumbs e a API para o CRUDE e Principalmente a variável do FormBuilder
  */
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiExemploService: ApiExemploService,
    private formB: FormBuilder,
  ){
    //crio uma instância nova do modelo de dados
    this.dadosAPI = new DadosAPI();

    //inicializo a classe com os erros a serem exebidos na interface
    this.apiErrorCollection = new ApiErrorCollection();
  }

  /**
   * Passo 5) No evento ngOnInit é importante criar a instância do FormGroup
   * mesmo antes de ter solicitado os dados do formulário a API para que não
   * de erro no carregamento da interface e seus controles, pois cada componente
   * vinculado a um controller irá exigir a instância dele na inicialização
   * da interface.
  */
  ngOnInit() {
    this.inicializarDados();
  }

  private inicializarDados(){

    //Crie a instância do form Group
    this.criarForm(true);

    //Carrega os dados da API e popula eles na instância do FormGroup
    this.getDadosAPI();

  }

  /**
   * Essa função cria o formulário pela primeira vez
   * ou se chamada posteriormente ela popula o FormGroup com
   * os dados recebidos pela API.
   */
  private criarForm(emEdicao: boolean){

    if(this.meuForm){
      /**
       * Já existindo a instância do meuForm então carrego os dados 
       * da entidade lógica nos formControls do meu FormGroup
       * usando a função "setValues" do componente "cadastroBarraAcao".
       */
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.dadosAPI, emEdicao);
    }else{
      //Cria o formulário a primeira vez
      this.meuForm = this.formB.group({

        //Crio um FormControl para cada atributo que será manipulado nessa interface
        chNomePessoa: [this.dadosAPI.chNome, Validators.required],
        inCodSexo: [this.dadosAPI.inCodSexo],
        daDatNascim: [this.dadosAPI.daDatNascim, Validators.required],
      });

  }

  /**
   * Essa função resgata os dados da API e popula o FormGroup
   * com os dados recebidos.
   */
  private getDadosAPI(){

    /** 
     * Como essa página pode estar sendo acessada para exibir os dados de um cadastro específico
     * ou criando um novo, primeiro é importante recuperar da URL os parâmetros que irão identificar
     * o status de exibição dessa página
     */

    var id: number;
    //Recuperando o id que talvez tenha sido recebido nos parametros da URL
    id = +this.route.snapshot.paramMap.get('id');

    //Recuperando o tipo de operação, que talvez tenha sido passado nos paramtros da URL
    this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

    if (id==0){
      //Se o id recebido foi 0 então,
      //configuro os dados de um cadastro novo
      this.dadosAPI = new DadosAPI();
      this.dadosAPI.chNome = '';
      this.dadosAPI.inCodSexo = 0; 
      this.dadosAPI.daDatNascim = null;

      //Evoco a função de criar o form para que popule os dados que inicializei aqui
      this.criarForm(true);

    }else{
      //se um id foi informado então devo resgatar os dados desse cadastro da API

      this.apiExemploService.obter(id).then(
        dados_API =>{
          //Populo a minha variável local com os dados recebidos pela API
          this.dadosAPI = dados_API;
          //Evoco a função de criar o form para que popule os dados recebidos da API
          this.criarForm(false);
        },
        erro => {
          //Informo para minha variável local sobre os erros recebidos para que sejam exibidos na interface
          this.apiErrorCollection = erro;
        }
      );
    }

  }

}
```


___
## Importando a página no seu respectivo módulo
[voltar ao índice](#markdown-header-indice)

Como ainda não estamos lidando com lazy load, cada modulo da API possui apenas um módulo no nosso sistema. Sendo assim, todas as páginas de um determinado modulo devem estar referenciadas em seu respectivo arquivo ".ts".

Por padrão cada modulo desse sistema se encontra separado em um diretório com o seu próprio nome dentro do diretório "src/app/modulos".

Por exemplo, o módulo "corp" fica no subdiretório "src/app/modulos/corp" e o arquivo desse módulo leva seu nome e mais `.module.ts` que nesse caso é o arquivo `corp.module.ts`.

Nesse arquivo do módulo você deve importar sua página e fazer as referências a ela conforme exemplo abaixo:

```typescript

//outros imports

//Cadastros
import { MinhaPagina } from '../../modulos/corp/ui/minhaPagina/minhaPagina.component';

@NgModule({
  imports: [
    ...
  ],
  declarations: [
    MinhaPagina,
  ]
})
export class CorpModule { }

```

**Importante!** Fora importar a classe da sua página é necessário colocar ela na array de `declarations` que fica no `@NgModule`.


___
## Habilitando a página na rota do módulo
[voltar ao índice](#markdown-header-indice)

Juntamente ao arquivo de módulo do tópico anterior você encontrará o arquivo de rotas, que seguindo o padrão de nomenclatura é o nome do modulo mais `-routing.module.ts`.

Por exemplo, para o módulo corp o arquivo de rotas se chama `corp-routing.module.ts`.

Veja no exemplo abaixo como incluir sua página nas rotas do sistema:

```typescript

//outros imports

import { MinhaPaginaListar } from '../../modulos/corp/ui/MinhaPaginaListar/MinhaPaginaListar.component';
import { MinhaPaginaEdicao } from '../../modulos/corp/ui/MinhaPaginaEdicao/MinhaPaginaEdicao.component';

const routes: Routes = [
  {
    path: 'MinhaPagina',
    component: MinhaPaginaListar
  },
  {
    path: 'MinhaPagina/:id',
    component: MinhaPaginaEdicao
  },
  {
    path: 'MinhaPagina/:id/:operacao',
    component: MinhaPaginaEdicao
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpRoutingModule { }
```

No exemplo acima criei 3 rotas, a primeira aponta para a pagina que irá listar os dados de um determinado cadastro e a segunda e terceira será a página para visualização, criação e edição de um novo registro.

Veja que os parametros da URL são definidos na rota começando pelo caracter `:` (dois pontos), e o parâmetro `:operacao` é usado apenas para identificar quando o cadastro será exibido apenas para que o usuário confirme a exclusão, porém dando acesso ao usuário a todos os dados (sem edição) para que ele tenha certeza do registro que ele está excluindo.

quando um cadastro tiver que ser exibido em modo de confirmação de exclusão basta escrever como valor do parâmetro `:operacao` o conteúdo `/excluir`, assim pela própria rota fica claro para o usuário que ele está ou irá navegar para uma página de confirmação para exclusão de registro.

Veja abaixo os comentários identificados com `ATENÇÃO!` e siga as instruções deles

___
## Template completo de um CRUDE da página em typescript
[voltar ao índice](#markdown-header-indice)

Veja abaixo o template completo para colocar em uma página nova, tanto do HTML quanto do Typescript.

Substitua o texto `NomePaginaClasse` pelo nome  da sua página e `NomePaginaFiles` pelo nome que os arquivos dessa página terão.

* 1 - [template CRUD HTML](template_paginas/template.crude.html)

* 2 - [template CRUD TS](template_paginas/template.crude.ts)

* 3 - [template Lista HTML](template_paginas/template.lista.html)

* 4 - [template Lista TS](template_paginas/template.lista.ts)
