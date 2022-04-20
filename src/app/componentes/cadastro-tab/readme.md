## CadastroTabDirective

A diretiva `cadastro-tab` identificada pelo atributo `appCadastroTab` deve ser usada no elemento `kendo-tabstrip`.

Essa diretiva é integrada ao componente [cadastro-barra-acao](../cadastro-barra-acao/readme.md) e com isso ela consegue saber o status de edição do formulário e habilitar ou não as Tabs seguintes de forma automática.

Para usa-la, basta no HTML passar todos os atributos necessários, veja exemplo abaixo:

```html
<kendo-tabstrip 
    #kendoTab
    appCadastroTab
    id='idTabCadPessoaFisica'
    [tab]='kendoTab'
    [cadastroBarraAcao]='cadPF.cadastroBarraAcao'
    (tabSelect)="onTabSelect($event)" >
  <kendo-tabstrip-tab [ngClass]='app-tab-content' [title]="'Dados pessoais'" [selected]="tabSelecionada(0)">
      
      <!-- ATENÇÃO! Veja na explicação abaixo desse exemplo o motivo de não poder ter a página de CRUDE como conteúdo nessa primeira TAB -->

      <!-- <ng-template kendoTabContent>
          <app-cadastro-pessoa-fisica-dados-pessoais #cadPF></app-cadastro-pessoa-fisica-dados-pessoais>
      </ng-template> -->

  </kendo-tabstrip-tab>
  <!-- [disabled]="cadastroEmEdicao" -->
  <kendo-tabstrip-tab 
    [title]="'Contatos'" 
    [selected]="tabSelecionada(1)"
    >
      <ng-template kendoTabContent>
          <h3>Contatos</h3>
      </ng-template>
  </kendo-tabstrip-tab>
</kendo-tabstrip>

<app-crude-pessoa-juridica-dados-principais
        #cadPF
        [style.visibility]="tabSelecionada(0)? 'visible' : 'hidden'"
></app-crude-pessoa-juridica-dados-principais>
```

Veja que no elemento **kendo-tabstrip** existem os seguintes atributos que são necessários serem informados

### **1**: appCadastroTab

* Esse atributo identifica a diretiva

### **2**: id

* Apenas um id que identifica a unicidade desse elemento na página, porém é obrigatório

### **3**: cadastroBarraAcao

* Instância do componente [cadastro-barra-acao](../cadastro-barra-acao/readme.md) que nesse exemplo é uma propriedade da página `app-crude-pessoa-juridica-dados-principais`, porém nada impede de que ela estivesse declarada diretamente nesse documento, a separação foi só por questão de organização e granulalidade do código.

* **Atenção!** Veja que a página principal do CRUDE não ficou dentro da tab `kendo-tabstrip-tab` de título "*Dados pessoais*", isso é necessário, pois o componente do `kendo-tabstrip` elimina do DOM o conteúdo da TAB que não está sendo visualizado, e isso é um problema, pois a instância do componente `cadastroBarraAcao` que se encontra no CRUDE deve estar sempre disponível e instânciada para essa diretiva do `cadastro-tab`. 