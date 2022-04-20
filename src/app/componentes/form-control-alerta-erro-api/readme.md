# FormControlAlertaErroApiComponent

Esse componente é para ser usado nos controles de formulários em página de CRUDE, e é encarregado de exibir a mensagem de erro individual de um determinado campo que venha a ser retornada pela API.

Segue abaixo um exemplo: 
```html
<label class="k-form-field">
    <span>
    CPF
    <span class="k-required">*</span>
    <app-form-control-alerta-erro-api
    [mensagemErro]="apiErrorCollection.campos['inNumIdentificacao']"
    ></app-form-control-alerta-erro-api>
    </span>
    <kendo-maskedtextbox 
    
    id="inputMaskCPF"
    mask="000.000.000-00" 
    formControlName="CPF"
    [class.maskedCPF]="true"
    style="width:150px">
    </kendo-maskedtextbox>
</label>
```

Note em `[mensagemErro]="apiErrorCollection.campos['inNumIdentificacao']"` que o atributo mensagemErro recebe o conteúdo da variável `apiErrorCollection` que é uma instância da classe de erro que expõe os erros retornados pela API.

O objeto `apiErrorCollection` possui uma propriedade chamada `campos` que é um objeto cuja cada propriedade é um dos campos do formulário (do tipo string). Quando uma dessa propriedades está preenchida é porque a API retornou um erro referente ao campo específico.

___
## Como usar

Veja abaixo no exemplo em typescript com se importa, declara e instância esse variável

Importando a classe de erros:
```typescript
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
```

Declare uma instância dela na classe do sua página CRUDE:
```typescript
    public apiErrorCollection: ApiErrorCollection;
```

Faça a instância inicial dela no construtor da sua classe:
```typescript
   constructor(...){
    //inicializo a classe com os erros a serem exebidos na interface
    this.apiErrorCollection = new ApiErrorCollection();
  }
```

Faça o tratamento de erro da API passando ele para nossa variável de erro:
```typescript
    this.apiExemploService.obter(id).then(
    dados_API =>{
        ...
    },
    erro => {
        //Informo para minha variável local sobre os erros recebidos para que sejam exibidos na interface
        this.apiErrorCollection = erro;
        ...
    }
    );
```
___
## Um exemplo completo você pode ver aqui:
* [Crude html](../../../../documentacao/passo-a-passo/template_paginas/template.crude.html)

* [Crude ts](../../../../documentacao/passo-a-passo/template_paginas/template.crude.ts)

