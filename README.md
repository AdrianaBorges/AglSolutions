# AGLSolutions.UI

Este projeto foi gerado originalmente com o [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3. Agora se encontra na versão CLI 11.2.0;

Segue abaixo o resultado do comando `$ ng --version`:

**Angular CLI:** 11.2.0

**Node:** (14.16.1), vide versões na página do [**node**](https://nodejs.org/en/), ou use o [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) para controlar a instalção e/ou atualizar com facilidade as versões do Node.

**OS:** darwin x64 (Mac)

**Angular:** 11.2.0
* ... animations, cli, common, compiler, compiler-cli, core, forms
* ... language-service, localize, platform-browser
* ... platform-browser-dynamic, router

Package                         | Version
--------------------------------|--------------------------
@angular-devkit/architect       |  0.1102.0
@angular-devkit/build-angular   |  0.1102.0
@angular-devkit/core            |  11.2.0
@angular-devkit/schematics      |  11.2.0
@schematics/angular             |  11.2.0
@schematics/update              |  0.1102.0
rxjs                            |  6.6.3
typescript                      |  4.0.7



## Executando o servidor em ambiente de desenvolvimento

Execute `npm start` para permitir que o node execute a aplicação alocando mais memória no processo de build

Alternativamente, Execute `ng serve` no terminal para rodar o servidor. Navegue para `http://localhost:4200/`. O app irá recarregar automaticamente se você alterar algum código fonte. 

Use `ng serve -open` ou `ng serve -o` para automaticamente abrir o navegador após o servidor terminar sua inicialização.


### Tradução

O projeto está usando a técnica de tradução usando o compilador JIT (vide item 2 abaixo), ou seja, automaticamente ao executar o projeto, ele já usa a tradução criada e indicada nos arquivos `src/main.ts` e `src/app/app.module.ts`

Sem o uso da tradução aplicada ao JIT, outra opção seria usar a tradução usando a compilação AOT com o comando abaixo.

Para executar o projeto com a tradução para português use o comando `ng serve --aot --i18n-file=src/locale/messages.pt.xlf --locale=pt`


**Documentos de referências usados para a tradução:**

1. https://www.telerik.com/kendo-angular-ui/components/globalization/localization/messages/#toc-using-the-angular-i18n-framework

2. https://angular.io/guide/i18n#merge


## Índice

01 - [Angular CLI resumo de geração de código automático](documentacao/GeracaoAutomaticaCodigoFonte.md)

02 - [Build e Testes](documentacao/BuildAndTests.md)

03 - [Principais dependências](documentacao/PrincipaisDependencias.md)

04 - [Documentação da API](documentacao/DocumentacaoAPI.md)

05 - [Arquitetura](documentacao/Arquitetura.md)

06 - [Passo a passo de criação de um serviço de API](documentacao/passo-a-passo/criacao-servico.api.md)

07 - [Passo a passo de criação de uma página](documentacao/passo-a-passo/criacao-pagina.md)

08 - [Modelos para criação dos arquivos](documentacao/ModelosArquivos.md)

09 - [Documentação dos componentes](documentacao/Componentes.md)

10 - [Localização / tradução](documentacao/localizacao.md)


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
