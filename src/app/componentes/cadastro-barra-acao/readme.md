# CadastroBarraAcaoComponent

Esse componente é muito importante para todas as páginas de CRUDE (Create, Read, Update, Delete, Export), pois ele determina o layout da barra de ação, controla o comportamento da exibição dos botões de ação dessa barra assim como também controla a disponibilidade dos formControls do formulário de cadastro.

Pode ser usado tanto para um CRUDE principal quanto para um CRUDE Filho contido em abas secundárias de um CRUDE Pai. Saiba mais como usa-lo como um CRUDE filho em [aqui](../../../../documentacao/passo-a-passo/criacao-tab-crude-filho.md)

Outra função importante que ele disponibiliza é um método que alimenta automaticamente todos os formControls de acordo com o objeto do modelo de dados e vice versa.

## Indice

* **1** [COMO USAR](#markdown-header-como-usar-html)
* **2** [METODOS DE EXIBIÇÃO DO AGUARDE](#markdown-header-metodos-de-exibicao-do-aguarde-html)
* **3** [METODOS DE INTEGRAÇÃO ENTRE OS DADOS E A INTERFACE](#markdown-header-metodos-de-integracao-entre-os-dados-e-a-interface-html)
* **1** [COMO USAR](#markdown-header-como-usar-html)


## COMO USAR?
[voltar ao indíce](#markdown-header-indice)

### HTML

Inclua o element desse componente em sua página
```html
<app-cadastro-barra-acao 
    #cadastroBarraAcao
    [formGroup]='meuForm'
    (confirmar)='btnConfirmar()'
    (cancelar)='btnCancelar()'
    (excluir)='btnExcluir()'
    >
  <form action="" [formGroup]="meuForm" class="k-form">
      aqui entram os componentes de edição do formulário para o CRUDE em questão
  </form>
</app-cadastro-barra-acao>
```


### Typescript

**PASSO 1**

Faça o importe desse componente em sua página
```typescript
    //Componentes
    import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
```

**PASSO 2**

Recupere a instância do elemento declarado no HTML como uma variável da sua classe para ter acesso a seus métodos,
```typescript
    @ViewChild('cadastroBarraAcao') cadastroBarraAcao : CadastroBarraAcaoComponent;
```

___
## METODOS DE EXIBIÇÃO DO AGUARDE

Use as funções para controlar a exibição da mensagem de aguarde para os casos que for feita uma requisição a API
```typescript
    this.cadastroBarraAcao.exibirAguarde();

    this.cadastroBarraAcao.esconderAguarde();
```

___
## METODOS DE INTEGRAÇÃO ENTRE OS DADOS E A INTERFACE


Use o método que alimenta todos os FormControls do FormGroup com os dados da sua entidade lógica.
```typescript
    this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.pessoalEL, emEdicao);
```
* 1 **meuForm** representa o objeto do formGroup do seu formulário
* 2 **pessoalEL** representa a classe com os dados a serem manipulados que foram retornados por alguma API
* 3 **emEdicao** representa uma variável boolean que indica para o compoente se ele deve ou não disponiblizar os formControls para edição pelo usuário.



Use o método que recupera os dados alimentados pelo usuário nos formControls e atualiza o objeto do modelo de dados
```typescript
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.pessoalEL);
```

___
## ATIVAR VIA CÓDIGO O MODO DE VISUALIZAÇÃO
É possível ao carregar os dados do formulário que dependendo do estado do registro seja necessário ativar o formulário apenas em modo de visualização, para isso basta acessar a instância desse componente e chamar o método ```"*setModoConsulta*"```

Idealmente chame esse método após popular os dados no form group

```typescript
private criarForm(){

    /*
    * Código de criação do formulário
    */

    if(/*uma condição qualquer*/){
        this.cadastroBarraAcao.setModoConsulta();
    }

}
```

