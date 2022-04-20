# AguardeCarregandoComponent

Esse é um componente do tipo HTML element e serve para exibir a mensagem de aguarde enquanto espera algum processamento ser concluído, como por exemplo uma requisição a API.


## Importando no módulo

Importe esse elemento no module (`*.module.ts`) que contém o componente que você deseja usar esse elemento.
```ts
import { AguardeCarregandoModule } from '../../componentes/aguarde-carregando/aguarde-carregando.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    ...

    //COMPONENTES MODULES
    AguardeCarregandoModule,
    ...
  ],
  declarations: [
    ...
  ]
})
export class <nomeModulo> { }

```

## Como usar

No HTML de algum componente inclua o código abaixo
```html
<app-aguarde-carregando #aguardeCarregando></app-aguarde-carregando>
```

Note o attribute `#aguardeCarregando`, essa é uma forma que o angular tem de criar uma instância que será compartilhada com o seu código `.ts`.


### Instânciando o elemento para o Typescript do seu componente

* **passo 1)** No typescript recupere a instância do componente primeiro fazendo o import do `ViewChild` conforme exemplo abaixo.

* **paso 2)** Em seguida após o nome da classe do seu componente use o `@viewChild` para recuperar a instância do componente `AguardeCarregandoComponent`.


```ts
import { ViewChild } from '@angular/core';

export class <nomeDoSeuCompoenente> {

    @ViewChild('aguardeCarregando', { static: true }) aguardeCarregando: AguardeCarregandoComponent;

}

```

Com a instância em posse do seu código, agora você pode fazer a chamada aos métodos do `AguardeCarregandoComponent` como bem entender, vide exemplo abaixo:

```ts
  public exibirAguarde(){
    this.aguardeCarregando.exibir();
  }

  public esconderAguarde(){
    this.aguardeCarregando.esconder();
  }
```