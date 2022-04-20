# Build

Para buildar os arquivos do projeto execute `ng build`. Os artefatos criados ficarão armazenados no diretório `dist/`. Use o flag `--prod` para buildar para produção.

O comando abaixo usa a propriedade **configuration** do [angular.json](../angular.json)

Build para produção especificando a tradução
```
ng build --configuration=production,pt
```

Build para dev especificando a tradução
```
ng serve --configuration=,pt
```

Referencia do [i18n](https://v7.angular.io/guide/i18n) pra angular 7

A diferença de buildar para dev ou produção é que para produção os arquivos são minimizados, uglificados e transpilados para javascript. O que torna o código gerado compatível com mais navegadores e mais performático.

Se a publicação de produção for hospedada em um subdiretório do IIS ela deve conter na index a referencia a esse subdiretório, e no comando do build você já pode informa-lo, veja abaixo como:
```terminal
ng build --base-href "/sistema/cliente01/" --prod
```


# Executando testes unitários

Testes desse tipo executam funções separadamente dos arquivos `.ts` de forma unitária, então é importante que as dependências da função possam ser passadas como argumentos dela.

Acione o comando `ng test` para executar o teste unitário via [Karma](https://karma-runner.github.io).


# Running end-to-end tests

Testes desse tipo executam o sistema como se tivesse sendo operado por um usuário no navegador e envolve interação com o DOM e validação do DOM inclusive.

Neste tipo de testes quase sempre é necessário criar o Mock de algum serviço como `http` ou de acessos ao local storage, etc.

Acione o comando `ng e2e` para executar os testes end-to-end via [Protractor](http://www.protractortest.org/).