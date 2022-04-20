# Modelos de arquivos 

Atenção! esse documento não está completo, para criar api e página consulte o passo a passo no readme.md principal do projeto, e para componentes, diretivas e serviços crie-os conforme necessidade seguindo o padrão do que já está criado dentro dos seus respectivos módulos ou dentro de componentes conforme a necessidade.

Esse documento serve como orientação para crição dos arquivos desse projeto.

## Índice

* 1 - [Nova API](passo-a-passo/criacao-servico.api.md)
* 2 - [Nova página](passo-a-passo/criacao-pagina.md)
* 3 - [Novo componente](#markdown-header-novo-componente)
* 4 - [Nova diretiva](#markdown-header-novo-diretiva)
* 5 - [Novo serviço](#markdown-header-novo-serviço)


___
# Novo componente
[voltar ao índice](#markdown-header-indice)

Crie sempre do diretório "src/app/componentes/{{nome do compoente}}"

use o comando do angular CLI para criar, vide exemplo:

```terminal
ng generate component componentes/{{nome do compoente}}
```

___
# Nova diretiva
[voltar ao índice](#markdown-header-indice)

Se a diretiva for para controlar um componente crie ela dentro do diretório de componentes do componente que ela controla, caso seja uma diretiva sem associação com um componente desse projeto então crie um novo diretório chamado "**diretivas**" dentro de "src/app"

Para criar uma diretiva use o comando do angular CLI conforme exemplo abaixo:
```terminal
ng generate directive componentes/{{nome do compoente}}
```

___
# Novo serviço
[voltar ao índice](#markdown-header-indice)

Normalmente os serviços desse projeto são para acessar uma API porém se precisar de um serviço para outra finalidade como por exemplo troca de dados que sejam comuns entre páginas e/ou componentes, ou acessar recursos como bases SqLite, ou Local storage ou mesmo dados locais em JSON crie o arquivo de serviço onde for mais adequado ao tipo de serviço.

Por exemplo, os dados da empresa que são dinamicos em cada instalação são carregados de um arquivo local do diretório "assets" usando o serviço **ConfigEmpresaService** que se encontra em [src/app/config/api/config-empresa.service.ts](../src/app/modulos/config/api/config-empresa.service.ts) pois ela provem dados assim como uma API, porém esses dados não vem da API, então para seguir o padrão para consumo de dados foi criado um módulo especial para esse serviço que foi o "src/app/modulos/config".