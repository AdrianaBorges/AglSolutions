# MenuSistemaComponent

Esse componente está instânciado diretamente na [rota da tela principal](../../modulos/modulos-routing.module.ts) para ser exibido dentro do **outlet** "menu"

Esse componente se comunica diretamente com um serviço da API que entrega todas as opções de menu que estarão disponíveis para o usuário logado. As rotas recebidas são carregadas por esse componente em suas devidas hierarquias no menu.

Esse componente carrega as rotas listadas pela API conforme o nível de permissão do usuário. Novas telas devem ser cadastradas na API para que ela seja incluída na resposta da API do menu.

Caso um usuário insista em digitar na URL uma rota que ele não tem permissão o sistema automaticamente irá redireciona-lo para a página principal.

Para o desenvolvedor que quiser força a inclusão da sua nova rota como uma rota válida use o método "criarMenuDev" da classe: ["app/validar-permissao-rota.service.ts"](../../validar-permissao-rota.service.ts). Esse menu só será criado em ambiente local, ou seja, se publicado ele não será exibido.