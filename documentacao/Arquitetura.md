# Arquitetura

# Índice geral
* [Tela principal](#markdown-header-tela-principal)
* [Separação em módulos](#markdown-header-separacao-em-modulos)
* [Reactive Forms](#markdown-header-reactive-forms)

___
# Tela principal

O sistema é dividido em 4 áreas, **menu**, **cabeçalho**, **bread-crumbs** e **área de conteúdo**.

Basicamente todo o sistema roda dentro da **área de conteúdo** da tela principal, isso é possível devido ao arquivo de rotas apontar cada sub-rota de cada módulo, e dentro de cada módulo as respectivas páginas.

veja como no arquivo `src\app\modulos\modulos-routing.module.ts` cada módulo é referênciado por sua inicial na rota e como nenhum `outlet` é indicado então todas as páginas sub-roteadas a partir desse ponto serão carregadas no `outlet` padrão que no caso é a própria **área de conteúdo**

Cada página deve ter em seu construtor o serviço que carrega os atalhos do menu de **bread-crumbs**, identificando assim sua posição em relação a primeira página do sistema e permitindo o usuário retornar a um passo anterior em sua navegação pelos atalhos do bread-crumb.

___
# Separação em módulos

O projeto foi criado para ter uma instância dele por cliente, ou seja, uma aplicação nova será disponibilizada em algum servidor para cada cliente, onde em cada uma será configurada as peculiaridades de cada cliente.

Assim como a documentação da API está divida por módulos, assim também está organizado o código fonte desse projeto.

Para cada módulo da API temos um sub-diretório em `src\app\modulos`. Atualmente já temos os seguintes módulos na Arquitetura:

# Índice dos módulos
* 1) **[config](#markdown-header-config)**
* 2) **[corp](#markdown-header-config)**
* 3) **[eseg](#markdown-header-config)**
* 4) **[segur](#markdown-header-config)**

Cada módulo da API no código fonte também possui um `module` que importa todas as suas dependências.

___
## config

[voltar ao índice](#markdown-header-indice-dos-modulos)

Esse módulo é uma excessão, criado para controlar o acesso aos dados de configuração do projeto, uma vez que essas configurações não são definidas por API.

Os dados configuráveis de cliente para cliente são basicamente o nome do cliente e as cores principais de menu e cabeçalho do sistema.

O arquivo `src\assets\dadosLocais\configEmpresa.json` contém os dados configuráveis que deverá ser modificado de cliente para cliente, quando buildado o projeto esse arquivo continua intacto para ser modificado após o build.

___
## corp

[voltar ao índice](#markdown-header-indice-dos-modulos)

Esse é o módulo corporativo, é consumido por todos os outros módulos, principalmente com relação aos cadastros mais básicos do sistema.

___
## eseg

[voltar ao índice](#markdown-header-indice-dos-modulos)

Esse módulo consiste nas operações de seguro, tipo: comercialização, venda, implantação, consultas de seguros individuais, em grupo, etc.

___
## segur

[voltar ao índice](#markdown-header-indice-dos-modulos)

Esse módulo contém principalmente os end-points com relação a segurança, como cadastro de usuários, autenticação de usuários, etc.

___
# Reactive Forms

Todos os compoententes desse projeto estão usando o conceito de Reactive Forms, ou seja, os elementos do formulários são controlados pelo código typescript, onde temos mais domínio sobre o controle de eventos, validações e estados do controles (FormContol).

A única excessão a essa regra é a página de login, que está usando `template-driven forms`.


* Veja mais sobre os [fundamentos de reactive forms](https://angular.io/guide/reactive-forms)

* Saiba mais sobre [FormGroup](https://angular.io/api/forms/FormGroup)