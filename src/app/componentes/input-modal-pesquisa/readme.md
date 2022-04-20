# InputModalPesquisaComponent

Esse é um componente a ser usado quando a quantidade de dados cadastrados são muitos para que seja exibido apenas em um elemento de *select* ou *drop-down*.

Ele pode ou não possuir um input de pesquisa rápida (a sua esquerda) onde o usuário pode digitar o texto ou número para efetuar uma pesquisa que retornará como resultado selecionado o primeiro item retornado pelo resultado da pesquisa.

E tambémm possui um botão (a direita) que exibe um modal com um grid e pesquisa no próprio grid para facilitar o usuário encontrar o registro que servirá como chave estrangeira, que será usada para um cadastro ou para uma página de pesquisa de um CRUDE.

# indice

* [Parte 1: Como declarar no HTML](#markdown-header-parte-1-como-declarar-no-html)

* [Parte 2: Como usar no typescript](#markdown-header-parte-2-como-usar-no-typescript)

___
## Parte 1: Como declarar no HTML
[voltar ao índice](#markdown-header-indice)

Veja abaixo um exemplo **HTML**
```html
<label class="k-form-field">
    <span>
    Profissão (pesquisa por texto)
    <app-form-control-alerta-erro-api
        [mensagemErro]="apiErrorCollection.campos['inCodProfissao']"
    ></app-form-control-alerta-erro-api>
    </span>
    <app-input-modal-pesquisa
    tipo='edicao'
    formControlName='UIData_CodProfissao'
    placeholder="selecione"
    modalTitulo='Profissão'
    modalHeight="520"
    modalWidth="800"

    [pageInstance]='this'
    pageNomeMetodoCadastrar='exibirCadastroGrauInstrucao'

    [apiService]='apiProfissaoService'
    nomeMetodoOrdenacao='mudarOrdenacao'
    apiNomeMetodoListar='listar'
    apiFieldExibir="chDescricao"
    apiFieldKey="inCodProfissao"
    pesquisaFieldWhere='chDescricao'
    pesquisaOperator='contains'
    [pageSize]="'6'"


    pesquisaRapida="true"
    pesquisaRapidaMaxlength='20'
    pesquisaRapidaPlaceholder='pesquisa por nome'
    pesquisaRapidaApiNomeMetodo='listar'
    pesquisaRapidaWidth='120px'

    [childComponent]='instanciaOutroComponenteDeSelecao'
    childComponentFieldWhere='nome_tabela.nome_campo'

    ></app-input-modal-pesquisa>
</label>
```

Relação dos atributos desse componente

Atributo                   |Aplicação      | Descrição
---------------------------|---------------|-----------
tipo                       |pesquisa/ediçao|pode conter 'edicao' ou 'pesquisa', o conteúdo define o ícone que será exibido no componente, respectivamente um lápis ou uma lupa
formControlName            |pesquisa/ediçao|nome usado na criação do FromGroup para esse FormControl, ver **obs.: formControlName**
placeholder                |pesquisa/ediçao|texto que será exibido no componente quando nada estiver selecionado
modalTitulo                |pesquisa/ediçao|Título do modal de pesquisa
modalHeight                |pesquisa/ediçao|Altura em pixels do modal de pesquisa
modalWidth                 |pesquisa/ediçao|Altura em pixels do modal de pesquisa
---------------------------|---------------|-----------
pageInstance               |pesquisa/ediçao|Instância da página, usada para dar acesso ao método que irá exibir um modal para incluir novos dados quando a pesquisa não retornar dados.
pageNomeMetodoCadastrar    |pesquisa/ediçao|Nome do método que exibe o cadastro, deve ter a mesma assinatura do método da [InterfaceModalCadastro](../modal-pesquisa/interface-modal-cadastro.ts)
---------------------------|---------------|-----------
[apiService]               |pesquisa/ediçao|Instância da API que será usada no grid do modal de pesquisa
nomeMetodoOrdenacao        |pesquisa/ediçao|Nome do método da API que recebe nos argumentos o nome do filtro e a direção da ordenação como strings a fim de mudar a ordenação do método de listar
apiNomeMetodoListar        |pesquisa/ediçao|Nome do método de listar do serviço de API, ver **obs.: apiNomeMetodoListar**
apiFieldExibir             |pesquisa/ediçao|Nome da propriedade dos objetos retornados pela api, que também é o nome da propriedade do FormControl para exibição na área de texto.
apiFieldKey                |pesquisa/ediçao|Nome da propriedade dos objetos retornados pela api, que também é o da propriedade do FormControl para pesquisa rápida.
pesquisaFieldWhere         |pesquisa/ediçao|Nome do campo na query de pesquisa que será usado para a condição de pesquisa
pesquisaOperator           |pesquisa/ediçao|Todos os operadores suportados pelo [FilterDescriptor](https://    www.telerik.com/kendo-angular-ui/components/dataquery/api/FilterDescriptor/) do componente **Data Query / API**  do telerik kendo-angular-ui.
[pageSize]                 |pesquisa/ediçao|Quantidade de registros por página a serem exibidos no grid
---------------------------|---------------|-----------
pesquisaRapida             |pesquisa/ediçao|Coloque o conteúdo como "true" se desejar exibir a pesquisa rápida e "false" se não desejar exibi-la
pesquisaRapidaTipo         |pesquisa/ediçao|pode ter o valor de 'text' ou 'number', por padrão se não for informado o valor é 'text';
pesquisaRapidaMaxlength    |pesquisa/ediçao|Tamanho do texto que pode ser informado na pesquisa rápida
pesquisaRapidaPlaceholder  |pesquisa/ediçao|Texto que será exibido quando nada tiver sido informado na pesquisa rápida
pesquisaRapidaApiNomeMetodo|pesquisa/ediçao|Nome do método no serviço da API que deve ser usado para consultar a api, se o nome for igual ao nome da propriedade "apiNomeMetodoListar" então a assinatura do metodo deverá ter os mesmo argumentos, porém se o nome for diferente, o metodo deve ter a seguinte assinatura descrita em **obs.: pesquisaRapidaApiNomeMetodo**
pesquisaRapidaWidth        |pesquisa/edição|Não é obrigatório, quando não informado o tamanho é determinado com um calculo baseado no PesquisaRapidaMaxLength, e quando informado será usado o texto para aplicar no style do input, exemplo '20px'
------------------------|---------------|-----------
childComponent          |pesquisa       |Quando esse componente controlar a exibição de dados de outro componente de seleção de dados, passe para esse atributo a instância do outro componente
childComponentFieldWhere|pesquisa       |Informe aqui o nome do campo que será usado no filtro do outro componente limitando assim os resultados apresentados pelo outro componente de seleção
------------------------|---------------|-----------
[pesquisaGridFiltro]    |pesquisa       |Instância do grid da tela de pesquisa
------------------------|---------------|-----------
[colunasGrid]           |pesquisa       |não é obrigatório, se não informado o componente assumirá que o serviço da api possui um método com o nome "getColunasGrid()". Essa é uma propriedade que recebe uma coleção das colunas que o grid deve exibir ou usar para filtro, veja mais sobre a [classe grid-pesquisa-column aqui](../camada-logica/KendoUi/Grid/grid-pesquisa-column.ts) e sobre adocumentação da classe [grid-pesquisa-column aqui](../camada-logica/KendoUi/Grid/grid-pesquisa-column.md).

* **obs.: formControlName**: Quando instânciado para um CRUDE, se a chave estrangeira não tiver valor preenchido então o conteúdo dessa variável no fromControl deve ser null para caso o campo seja obrigatório seja possível identificar que esse componente não foi preenchido.

* **obs.: apiNomeMetodoListar**: O método de listar deve ter os argumentos conforme exemplo abaixo:
```typescript
public listar(page: number, pageSize: number, filter: string): Promise<Array<PessoaEL>>{...}
```
Atenção! Veja que esse método retorna uma lista de um objeto.

* **obs.: pesquisaRapidaApiNomeMetodo**: Assinatura do método de pesquisa rápida quando ele não tem o mesmo nome do método da propriedade `apiNomeMetodoListar` 
```typescript
public pesquisaPorId(id: number): Promise<PessoaProfissao>{...}
```
Atenção! Veja que esse método deve retornar apenas um objeto, e não uma lista.


___
## Parte 2: Como usar no typescript
[voltar ao índice](#markdown-header-indice)


Para que esse componente seja vinculado a pesquisa de um grid ou a uma entidade lógica é necessário usar um FormControl em uma instância de FormGroup que será passada para o attribute `formControlName` do elemento html desse componente.



### Codificando o FormControl para página de pesquisa

Importe para seu arquivo .ts as classes de formulário reativo que serão necessárias
```typescript
import { FormBuilder, FormGroup } from '@angular/forms';
```

Veja exemplo de criação do formGroup    
```typescript

  //    Delcare nas variáveis da sua classe a instância do FormGroup
  public formGroupPesquisa: FormGroup;

  //    declare no construtor a instância do formBuilder
  constructor(
    ...,
    private formB: FormBuilder
  ) { 
      //    Crie a instância do FormGroup no construtor
      this.criarForm();
  }

  private criarForm(){

    this.meuInputModalProfissao = new {
        chDescricao: 
    }

    //    delcare na coleção do formGroup o formControl com o nome que 
    //    você deu no attribue "formControlName" do elemento html 
    //    desse componente
    this.formGroupPesquisa = this.formB.group({
      UIData_CodProfissao: [null,
    });

  }
```

### Codificando o FormControl 

Importe para seu arquivo .ts as classes de formulário reativo que serão necessárias
```typescript
import { FormBuilder, FormGroup } from '@angular/forms';
```

Veja exemplo de criação do formGroup    
```typescript

  //    Classe do modelo de dados desse CRUDE
  public meuModeloDados: Exemplo;

  //    Delcare nas variáveis da sua classe a instância do FormGroup
  public formGroupPesquisa: FormGroup;

  //    declare no construtor a instância do formBuilder
  constructor(
    ...,
    private formB: FormBuilder
  ) { 
      //    Crie a instância do objeto que será manipulada, 
      //    mesmo antes de trazer ela da API caso seja o 
      //    caso de uma edição ou exclusão
      this.meuModeloDados = new Exemplo();

      //    Crie a instância do FormGroup no construtor
      this.criarForm();
  }

  private criarForm(){

    //    Se houver uma chave estrangeira, então crio um objeto 
    //    com o par de dados da chave e do texto que ela 
    //    representa para passar para o componente exibir.
    //    Atenção! É importante caso não haja uma chave primária 
    //    definida que seja passado null para que caso o campo 
    //    seja obrigatório o formGroup reconheça que esse formControl
    //    está sem dados preenchidos
    var UIData_CodProfissao = null;
    if(this.meuModeloDados.inCodProfissao > 0){
        UIData_CodProfissao = {
            chDescricao: this.meuInputModalProfissao.chDesProfissao,
            inCodProfissao: this.meuInputModalProfissao.inCodProfissao;
        }
    }

    //    É importante criar uma propriedade do mesmo nome do 
    //    formControl na sua entidade lógica para não dar erro 
    //    nos métodos "setValues" e "getValues" da classe 
    //    FormGroupDataBind (em camada-logica/Forms) que é 
    //    exposta pelo componente cadastroBarraAcao usado sempre 
    //    em um CRUDE
    this.pessoalEL['UIData_CodProfissao'] = UIData_CodProfissao;

    if(this.meuForm){
      this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.pessoalEL, emEdicao);
    }else{
        //    delcare na coleção do formGroup o formControl com o 
        //    nome que você deu no attribue "formControlName" do 
        //    elemento html desse componente
        this.formGroupPesquisa = this.formB.group({
            UIData_CodProfissao: [UIData_CodProfissao],
        });
    }
  }

  //    Crie uma função que irá resgatar os dados dos FormGroups e 
  //    devolvelos a instância do modelo de dados
  private coletarDadosForm(){

    //    Essa função é boa para os campos cujo valor é editado de forma direta
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.pessoalEL);

    //    O método acima não serve para resgatar da propriedade de 
    //    par de dados as informações de chave para a respectiva 
    //    propriedade onde essa chave estrangeira deve ser informada
    //    Resgate os dados do objeto que você inventou direto do 
    //    formControl 'UIData_CodProfissao'
    if(this.formGroupPesquisa.value.UIData_CodProfissao){
      //    Entra aqui se o usuário escolheu alguma informação e 
      //    por isso a propriedade 'UIData_CodProfissao' não está null
      this.meuModeloDados.chDesProfissao = this.formGroupPesquisa.value.UIData_CodProfissao.chDesProfissao;
      this.meuModeloDados.inCodProfissao = this.formGroupPesquisa.value.UIData_CodProfissao.inCodProfissao;

      //Atenção! se outra informação for necessário ser pega da estrutura de dados do objeto selecionado no grid, então use a propriedade "objetoSelecionado" desse formControl
      if(this.formGroupPesquisa.value.UIData_CodProfissao.objetoSelecionado){
        this.meuModeloDados.IDChaveEstrangeira = this.formGroupPesquisa.value.UIData_CodProfissao.objetoSelecionado.ID;
      }
    }else{
      //    Entra aqui se o usuário não escolheu uma opção ou limpou 
      //    a opção que já estava escolhida.
      this.meuModeloDados.chDesProfissao = '';
      this.meuModeloDados.inCodProfissao = null;
    }
    
  }
```

