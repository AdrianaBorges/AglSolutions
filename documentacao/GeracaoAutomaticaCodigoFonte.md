# Angular CLI para geração automática de código

Esse projeto foi gerado com a seguinte versões abaixo:

* @angular/cli: 1.7.4
* @angular-devkit/build-optimizer: 0.3.2
* @angular-devkit/core: 0.3.2
* @angular-devkit/schematics: 0.3.2
* @ngtools/json-schema: 1.2.0
* @ngtools/webpack: 1.10.2
* @schematics/angular: 0.3.2
* @schematics/package-update: 0.3.2
* typescript: 2.5.3
* webpack: 3.11.0


**OBS.:** Se você já está habituado com o angular CLI, pode pular essa documentação.

O [Angular CLI](https://cli.angular.io/) é essencial na criação de novos codigo fonte para o projeto, seja para fazer uma nova página, um componente, uma diretiva, etc.

Ele facilita a geração de um conjunto de arquivos e ainda relaciona eles ao módulo mais próximo hierarquicamente na arvore de diretórios.

Ele é usado inclusive para rodar o projeto no ambiente de desenvolvimento, bastando executar o comando abaixo no terminal

```terminal
ng serve -o
```

o argumento "-o" é opcional e serve para indicar que quando o angular terminar o build e a incialização de servidor ele deve abrir o navegador na página do app.

fora esse comando, o que mais será usado é o comando **generate**, veja abaixo mais detalhes de como usa-lo.


# Geração automática de código

Execute no terminal `ng generate component component-name` para gerar um novo component. 


Outros tipo de geração de arquivo fonte são: `ng generate directive|pipe|service|class|guard|interface|enum|module`.


Example: `ng generate module app-routing --flat --module=app`
`
    --flat cria o arquivo em src/app ao invés de criar um diretório para si mesmo.

    --module=app indica o CLI para registrar ele na lista de imports do AppModule.

    --routing ao criar um módulo também cria o arquivo de rotas do módulo já importado no arquivo do módulo novo.
`

# Criando Modulos para lazy load

* 1 - Criando um modulo para um componente

    Após ter criado o componente, no terminal se posicione no diretório pai do componten e digite


```terminal
$ ng generate module <nome-do-diretorio>

//exemplo:
$ ng generate module meu-date-picker
```

* 2 - Criando um modulo para uma página

    Após ter criado o compoente de página, no terminal se posicione do diretório pai do componente e digite:

```terminal
$ ng generate module <nome-do-diretorio> --routing

//exemplo:
$ ng generate module cadastro-pessoa-fisica --routing
```