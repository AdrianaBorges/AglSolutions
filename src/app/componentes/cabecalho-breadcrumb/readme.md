# CabecalhoBreadcrumbComponent


## INTRUDUÇÃO

O cabeçalho é um componente que já foi declarado nesse projeto na página principal em [src/app/modulos/principal/tela-principal/tela-pincipal.component.html](../../principal/tela-principal/tela-pincipal.component.html) e fica em ou **outlet** na rota com o nome de "**breadcrumb**".

As rotas padrões para cada outlet da tela principal estão definidas no arquivo [src/app/modulos/modulos-routing.module.ts](../../modulos-routing.module.ts), que no caso para o outlet de nome "breadcrumb" abre o próprio [cabecalho-breadcrumb.componente.ts](cabecalho-breadcrumb.componente.ts) como a página interna desse outlet.

## Indice

* **1** [Como usar o padrão novo](#markdown-header-como-usar-o-padrao-novo)

* **2** [Como usar o padrão antigo](#markdown-header-como-usar-o-padrao-antigo)

___
## Como usar o padrão novo
[voltar ao indíce](#markdown-header-indice)

No sistema o breadcrumb exibe todos os caminhos que o usuário fez em um array de URLs para que ele possa voltar às páginas anteriores com facilidade.

Para que uma página em exibição se registre como parte desse caminho no breadcrumb é necessário que ela apenas informe que nome deverá ser exibido no breadcrumb para representa-la. O restante da rota anterior a ela é feito automaticamente pelo componente de breadcrumb.

Importante que como o breadcrumb exibe um texto, é que seja usado o i18n para criar a tradução para ele

Veja abaixo o exemplo de como usar em uma página sua no arquivo ".html" e ".ts"

### Aplicação no HTML

Seu arquivo Html deve começar sempre com a estrutura abaixo:
```html
<span #breadcrumb_traducao style='display:none;'
  i18n="breadcrumb|breadcrumb do programa@@crude-programa-nivel-detalhe.breadcrumb">
  Nome a exibir no breadcrum</span>
```
* "Nome a exibir no breadcrum": será o nome exibido no array de breadcrumbs com o link para a URL atual


### Aplicação no TS

Area de import
```typescript
//1) Faça o import do ElementRef e do serviço abaixo
import { ..., ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
```

Artea de declaração de variáveis
```typescript
@ViewChild('breadcrumb_traducao') breadcrumb_traducao: ElementRef;
```

Construtor da classe
```typescript
    constructor(public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService) { }
```

Evento de inicialização da página
```typescript
  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs(){
    /*
    Caso seja uma página de detlahe faça esse passo abaixo, 
    caso seja uma listagem então não pegue o id do cadastro

    PASSO 1
    Use a variável cadastrada na Rota do módulo que represente a chave do registro atual
    */
    var id = this.route.snapshot.paramMap.get('IDProgramaNivel');

    //Pegue a tradução que será exibida no breadcrumb
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;

    //Informe para o serviço de breadcrumb a tradução para rota atual
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao + ' ' + id);
  }
```

___
## Como usar o padrão antigo
[voltar ao indíce](#markdown-header-indice)

Toda a página criada deve ter referência ao serviço desse componente de forma que ela atualize no breadcrumb da página principal o caminho que levou até a página atual, permitindo assim que o usuário se situe onde se encontra navegando no sistema e permita que ele volte para um ponto específico que ele desejar da rota até a página atual.

Veja abaixo o exemplo de como usar em uma página sua no arquivo ".ts"

Area de import
```typescript
//1) Faça o import do serviço
import { CabecalhoBreadcrumbService } from '../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
```

Construtor da classe
```typescript
    constructor(public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService) { }
```

Evento de inicialização da página
```typescript
  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs(){
    /**
     * Cada objeto no Array abaixo será um link na rota formada pelo breadcrumb
     * 
     * objetos cuja propriedade "url" forem "null" serão exibidos na rota porém
     * não serão um link, serão textos meramente informativos
    */
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: 'início',
        url: '/modulos'
      },
      {
        texto: 'pessoa',
        url: null
      },
      {
        texto: 'listagem',
        url: null
      }
    ]);
  }
```