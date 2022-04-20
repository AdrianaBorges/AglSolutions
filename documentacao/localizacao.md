# Localização e Globaloização do sistema

Nesse projeto usamos o sistema de localização nativo do Angular e suportado pelo Angular CLI, para saber mais detalhes veja a documentação de referência usada por esse projeto no link abaixo:

(https://angular.io/guide/i18n)[https://angular.io/guide/i18n]

## Pontos importantes

- [Como marcar um elemento HTML para traduçao](#markdown-header-como-marcar-um-elemento-html-para-traducao)

- [Traduzir um texto sem ter que criar um elemento](#markdown-header-traduzir-um-texto-sem-ter-que-criar-um-elemento)

- [Traduzindo atribudos](#markdown-header-traduzindo-atribudos)

- [Lidando com plural e expressões do tipo ICU](#markdown-header-lidando-com-plural-e-expressoes-do-tipo-icu)

- [Adicionando novas traduções](#markdown-header-adicionando-novas-traducoes)

- [Tradução para usar no Typescript](#markdown-header-traducao-para-usar-no-typescript)

___
# Como marcar um elemento HTML para traduçao
[voltar ao índice](#markdown-header-pontos-importantes)

inclusa no elemento o texto i18n="<meaning>|<description>@@<id>", onde:

**<meaning>** define o contexto onde a tradução se aplica no sistema

**<description>** da uma explicação do significado que o texto a ser traduzido deve comunicar

**<id>** um texto que define uma identidade única para uma tradução, quando informado deve ter sempre "@@" na frente do texto do id. Isso torna a manutenção do arquivo de tradução mais fácil a medida que o sistema vai evoluindo e alguns textos precisam ser reescritos. **Atenção!** Essas chaves devem ser únicas para todo o sistema. use como lei de formação do id o seguinte `id_<nome do aquivo>_<significado>` separando as palavras com sublinhado, exemplo: `id_crude_pessoa_fisica_label_nome`.


Exemplo:
```html
<h1 i18n="site header|An introduction header for this sample@@introductionHeader">Hello i18n!</h1>
```

Atenção, se mais de um elemento tiver o mesmo `meaning`, ele irá ser definido apenas uma vez no arquivo de tradução e a tradução será repetida para todos os elementos do arquivo, pois cada tradução aponta unicamente para um único arquivo.

___
# Traduzir um texto sem ter que criar um elemento
[voltar ao índice](#markdown-header-pontos-importantes)

Comumente pode-se usar o elemento `<span>`para definir um texto, porém se você não quiser marcar o elemento com um tag use então o elemento `<ng-container>` que ele será removido após o build ao traduzir o texto.

Exemplo
```html
<ng-container i18n>Eu não gero um elemento html como resultado do build</ng-container>
```

___
# Traduzindo atribudos
[voltar ao índice](#markdown-header-pontos-importantes)

Basta colocar dentro do elemento HTML a marcação `i18n-x="<meaning>|<description>@@<id>"`, onde "**x**" é substituído pelo nome do atributo.

exemplo:
```html
<img [src]="logo" i18n-title title="Angular logo" />
```
ou
```html
<img [src]="logo" i18n-title="titulo do logo|identifica o nome da empresa@@logoNomeEmpresa" title="Angular logo" />
```

para entender o que significam "meaning", "description" e "id" veja o tópico [Como marcar um elemento HTML para traduçao](#markdown-header-como-marcar-um-elemento-html-para-traducao)

___
# Lidando com plural e expressões do tipo ICU
[voltar ao índice](#markdown-header-pontos-importantes)

Expressões do tipo ICU podem ser do tipo **plural** ou **select**, veja nesse link abaixo como usa-las:
[https://angular.io/guide/i18n#pluralization](https://angular.io/guide/i18n#pluralization)

Essa expressões servem para criar alternativas de tradução que conforme o valor de uma variável um texto diferente deve ser usado como tradução, ou para aplicar a tradução conforme a regra gramatical de plural da linguagem escolhida.


___
# Adicionando novas traduções
[voltar ao índice](#markdown-header-pontos-importantes)

O projeto já está em português por padrão, com excessão dos componentes da Teleric, que por padrão são em inglês, então, o build padrão está configurado para usar o arquivo de tradução para português.

Para novos componentes importados que precisem de tradução esse arquivo [/src/locale/messages.pt.xlf](/src/locale/messages.pt.xlf) precisará fazer um merge com um novo arquivo de tradução gerado pelo CLI para pegar as novas traduções.

Entretando, para buildar o sistema para outra lingua, terá que ter um arquivo específico para cada uma, com a identificação no nome da lingua que ele representa. A identificação deve seguir os nomes conforme o padrão suportado pelo CLI do angular, consulte as referências de nome suportadas nesse documento do angular [aqui](https://angular.io/guide/i18n#setting-up-the-locale-of-your-app) ou no git do angular [aqui](https://github.com/angular/angular/tree/master/packages/common/locales).

Quando seu aplicativo, página ou documento estiver pronta, você poderá criar o arquivo de linguagem executando o comando abaixo na raiz do seu projeto usando o terminal. Com isso o CLI irá extrair todas as marcações que você fez com o atributo i18n-x e coloca-las em um arquivo chamado "messages.xlf" que fica no diretório "src/locale".

**Cuidado!!!** ao executar o comando de criação do arquivo, ele sobrescreve o arquivo que já existe, perdendo assim tudo que já possa ter sido feito em termos de tradução, então recomendo criar um arquivo com outro nome e copiar manualmente para o arquivo da linguagem desejada o que for novidade.


```terminal
ng xi18n  --outputPath="locale" --outFile "messages.temp.xlf" --i18nLocale "pt" --i18nFormat="xlf"
```

Para identificar o que tem de novidade no arquivo gerado e copiar para o arquivo real basta no VIsual Studio Code selecionar ambos arquivos, clicar com o botão direito do mouse, e escolher a opção "comparar selcionados", assim ficará muito evidente o que tem de novo e deverá ser copiado para o arquivo "messages.pt.xlf". Depois desse processo não esqueça de apagar o arquivo temporário "messages.temp.xlf".


Caso queria gerar em outra lingua, como Francês por exemplo, use o comando abaixo especificando o nome do arquivo:
```terminal
ng xi18n  --outputPath="locale" --outFile "messages.fr.xlf" --i18nLocale "fr" --i18nFormat="xlf"
```

Outros argumentos do comando de criação do arquivo de tradução podem ser consultados [aqui](https://angular.io/cli/xi18n)

Cada tradução deve ser incluída no arquivo gerado usanto o elemento xml "target"para cada elemento "source". onde Target define a tradução.
```xml
    ...
    <source>Nome</source>
    <target>Name</target>
    ...
```
Se alguma tradução estiver faltando o comando "build" ou "serve" que indique um arquivo de tradução, então o processo irá falhar e no terminal serão escritos as traduções que faltam.

Após criar um novo arquivo de tradução para uma nova lingua, será necessário incluir as configurções dele no arquivo "angular.json", segue exemplo abaixo: 

```typescript
"build": {
  ...
  "configurations": {
    ...
    "fr": {
      "aot": true,
      "outputPath": "dist/my-project-fr/",
      "i18nFile": "src/locale/messages.fr.xlf",
      "i18nFormat": "xlf",
      "i18nLocale": "fr",
      ...
    }
  }
},
"serve": {
  ...
  "configurations": {
    ...
    "fr": {
      "browserTarget": "*project-name*:build:fr"
    }
  }
}
```

Para testar se sua tradução está funcionando, execute o comando abaixo passando a linguagem desejada que você configurou no arquivo "angular.json".
```terminal
ng serve --configuration=fr
```

___
# Tradução para usar no Typescript
[voltar ao índice](#markdown-header-pontos-importantes)

Como o Angular CLI só suporta tradução para os templates (HTML) desenvolvemos para esse projeto um serviço de tradução para o que tiver que ser traduzido no Typescript, como por exemplo o nome dos campos a serem exibidos nos grid que estão definidos em cada classe de serviço de API.

## Passo 1: Crie a tradução

Abra o arquivo JSON [src/assets/locale/messages.json](../src/assets/locale/messages.json) que possui uma lista de objetos, onde cada objeto nessa lista representa um arquivo.

Crie um novo objeto do tipo [LocaleDataFile](../src/app/assets-locale/locale-data-file.ts) nessa lista para o arquivo que você criou, segue exemplo abaixo:

```JSON
[
    {
        "fileName": "modulos.corp.api.api-pessoa-el.service.ts",
        "locales": [
            {
                "id": "Nome",
                "source": "Nome",
                "target": "Nome"
            },...
        ]
    }
]
```

* **fileName**: No nome do arquivo coloque toda a estrutura de diretórios ao qual ele se encontra, que isso servirá como um namespace, permitindo que mesmo alguns aquivos que possam a vir a ter o mesmo nome tenham uma identidade própria.

* **locales**: É uma lista de objetos do tipo [LocaleData](../src/app/assets-locale/locale-data.ts), veja a definição nesse link sobre o que cada campo representa


## Passo 2: Aplique a tradução

Importe para seu arquivo TS o serviço de tradução:
```Typescript
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
```

Crie a instância do serviço no contrutor
```Typescript
  constructor(
    private assetsLocaleService: AssetsLocaleService
  ) { }
```

Use o serviço para pegar a tradução de algum texto 
```Typescript
    //Primeiro peça ao serviço de tradução o objeto de tradução do seu arquivo
    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-pessoa-el.service.ts');

    //Consulte do objeto de tradução o id que você precisa traduzir
    var texto_traduzido = localeFile.traducao('id_exemplo');
```

Onde **id_exemplo** é o valor do campo *"id"* do objeto do tipo [LocaleData](../src/app/assets-locale/locale-data.ts), e o que é retornado é valor do campo *"target"* desse objeto indexado pelo 'id_exemplo'. É interessante dar ao campo *"id"* o mesmo nome do que será traduzido, assim para quem está lendo seu arquivo sabe o que esperar como conteúdo, só lembre que esse campo deve ter um valor único para seu arquivo.

Um exemplo em uso disso está no arquivo [api-pessoa-el-service.ts](../src/app/modulos/corp/api/api-pessoa-el.service.ts) onde é feita a tradução no método ```getColunasGrid``` dos nomes dos campos que serão exibidos no grid para os usuários