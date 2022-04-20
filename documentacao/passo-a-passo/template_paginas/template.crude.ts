/**
 * TEMPLATE DA PÁGINA DE CRUDE
 * 
 * Veja abaixo o template completo para colocar em uma página nova, tanto do HTML quanto do Typescript.
 * 
 * Substitua o texto `NomePaginaClasse` pelo nome  da sua página e `NomePaginaFiles` pelo nome que os arquivos dessa página terão.
 */
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Location} from '@angular/common';

//Outros
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

//Componentes
import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';

//Modelo de dados
//Faça aqui o import dos modelos de dados que precisar, segue abaixo um exemplo
import { PessoaEL } from '../../../../models/pessoa-el';

//APIs
//Faça aqui o import dos serviços que se comunicam com a API que precisar para esse CRUDE
import { ApiExemploService } from '../../../../api/api-pessoa-el.service';


@Component({
  selector: 'NomePaginaFiles',
  templateUrl: './NomePaginaFiles.html',
  styleUrls: ['./NomePaginaFiles.scss'],
})
export class NomePaginaClasse implements OnInit {

  //Elemento HTML criado para interagir melhor com o CRUDE
  @ViewChild('cadastroBarraAcao') cadastroBarraAcao : CadastroBarraAcaoComponent;

  //Elemento HTML criado para aplicar a tradução do breadcrumb dinâmicamente
  @ViewChild('breadcrumb_traducao') breadcrumb_traducao: ElementRef;

  //Variáveis de controle de edição dessa página
  public apiErrorCollection: ApiErrorCollection;

  //FormGroup dessa página
  public meuForm: FormGroup;

  //*ATENÇÃO!* Altere essa variável pela que for conveniente ao seu CRUDE
  public pessoaEL: PessoaEL;

  /**
   * Construtor
   * 
   * Atenção! troque a declaração "ApiPessoaElService" abaixo no construtor pelo serviço de
   * API que for necessária pelo seu CRUDE
  */
  constructor(
    private route: ActivatedRoute,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiExemploService: ApiExemploService,
    private formB: FormBuilder,
    private _location: Location,
  ){
    //crio uma instância nova do modelo de dados
    //*ATENÇÃO!* Troque essa variável pela que for conveniente ao seu CRUDE
    this.pessoaEL = new PessoaEL();

    //inicializo a classe com os erros a serem exebidos na interface
    this.apiErrorCollection = new ApiErrorCollection();
  }

  /**
   * Passo 5) No evento ngOnInit é importante criar a instância do FormGroup
   * mesmo antes de ter solicitado os dados do formulário a API para que não
   * de erro no carregamento da interface e seus controles, pois cada componente
   * vinculado a um controller irá exigir a instância dele na inicialização
   * da interface.
  */
  ngOnInit() {
    this.inicializarDados();
    this.criarBreadCrumbs();
  }

  private inicializarDados(){

    //Crie a instância do form Group
    this.criarForm(true);

    //Configuro quais controles estarão desabilitados
    this.configurarStatusForm();

    //Carrega os dados da API e popula eles na instância do FormGroup
    this.getDadosAPI();

  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'ModeloDfe',
        url: '/modulos/crop/pessoa'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Edição',
        url: null
      }
    ]);
  }

  private configurarStatusForm(){

    var id = +this.route.snapshot.paramMap.get('id');

    if(id >0){
      //um cadastro pré existente foi solicitado pela rota

      //Aproveite aqui para desabilitar quaisquer campos que na edição não poderão ser modificados
      //Exemplo: this.meuForm.get('CPF').disable();
    }
  }

    /**
     * Essa função cria o formulário pela primeira vez
     * ou se chamada posteriormente ela popula o FormGroup com
     * os dados recebidos pela API.
     */
    private criarForm(emEdicao: boolean){

            //*ATENÇÃO!* 
            //Aproveite aqui para fazer quaisquer formatações de dados recebidos para que sejam compatíveis com a exibição dos mesmos, como por exemplo colcoar zeros na frente do CPF, pois na API o CPF é um número, e o componente dele na interface é um texto que valida todos os 11 caracteres.
            //Vide exemplo abaixo, foi criado uma nova propriedade no modelo de dados para armazenar temporáriamente o CPF formatado:
            //var CPF: string = (this.pessoalEL.inNumIdentificacao > 0 ? (this.pessoalEL.inNumIdentificacao + '').padStart(11, "0") : '');
            //this.pessoalEL['CPF'] = CPF;

            if(this.meuForm){

            //*ATENÇÃO!* 
            //Na função abaixo passe o modelo de dados do seu CRUDE e não "this.pessoaEL".

            /**
             * Já existindo a instância do meuForm então carrego os dados 
             * da entidade lógica nos formControls do meu FormGroup
             * usando a função "setValues" do componente "cadastroBarraAcao".
             */
            this.cadastroBarraAcao.formGroupDatabind.setValues(this.meuForm, this.pessoaEL, emEdicao);
            }else{
            //Cria o formulário a primeira vez
            this.meuForm = this.formB.group({

                //*ATENÇÃO!* 
                //Modifique o exemplo abaixo incluindo os campos do modeulo de dados que serão FormControl nesse CRUDE.
                chNomePessoa: [this.pessoaEL.chNome, Validators.required],
                inCodSexo: [this.pessoaEL.inCodSexo],
                daDatNascim: [this.pessoaEL.daDatNascim, Validators.required],
            });

        }
    }

  /**
   * Essa função resgata os dados da API e popula o FormGroup
   * com os dados recebidos.
   */
  private getDadosAPI(){

    //Exibo o aguarde enquanto carrega os dados da pessoa
    this.cadastroBarraAcao.exibirAguarde();

    /** 
     * Como essa página pode estar sendo acessada para exibir os dados de um cadastro específico
     * ou criando um novo, primeiro é importante recuperar da URL os parâmetros que irão identificar
     * o status de exibição dessa página
     */

    var id: number;
    //Recuperando o id que talvez tenha sido recebido nos parametros da URL
    id = +this.route.snapshot.paramMap.get('id');

    if (id==0){
      //Se o id recebido foi 0 então,
      //configuro os dados de um cadastro novo
      this.pessoaEL = new PessoaEL();
      this.pessoaEL.chNome = '';
      this.pessoaEL.inCodSexo = 0; 
      this.pessoaEL.daDatNascim = null;

      //Evoco a função de criar o form para que popule os dados que inicializei aqui
      this.criarForm(true);

    }else{
      //se um id foi informado então devo resgatar os dados desse cadastro da API

      this.apiExemploService.obter(id).then(
        dados_API =>{
          //Populo a minha variável local com os dados recebidos pela API
          this.pessoaEL = dados_API;
          //Evoco a função de criar o form para que popule os dados recebidos da API
          this.criarForm(false);

          //encerro exibição do aguarde
          this.cadastroBarraAcao.esconderAguarde();
        },
        erro => {
          //Informo para minha variável local sobre os erros recebidos para que sejam exibidos na interface
          this.apiErrorCollection = erro;

          //encerro exibição do aguarde
          this.cadastroBarraAcao.esconderAguarde();
        }
      );
    }

  }

  /**
   * Essa função passa os dados do FromGroup novamente para o modelo de dados
   */
  private coletarDadosForm(){

    //*ATENÇÃO!* 
    //Na função abaixo passe o modelo de dados do seu CRUDE e não "this.pessoaEL".
    this.cadastroBarraAcao.formGroupDatabind.getValues(this.meuForm, this.pessoaEL);

    //*ATENÇÃO!* 
    //Alguns dados de FormControl talvez tenham que ser manipulados antes de serem devolvidos para sua respectiva propriedade do modelo de dados, segue exemplo abaixo
    //this.pessoaEL.inNumIdentificacao = this.meuForm.value.CPF;
    
  }

  //-------------------------------------------------------
  //OPERAÇÕES DE CRUDE
  //início ------------------------------------------------

  //As operações de crude são métodos passados para o componente "cadastroBarraAcao" em seus attributes

  btnCancelar(){

    this.cadastroBarraAcao.exibirAguarde();
    this.getDadosAPI();
    this.cadastroBarraAcao.esconderAguarde();
  }

  btnConfirmar(){
    this.cadastroBarraAcao.exibirAguarde();
    this.coletarDadosForm();

    //*ATENÇÃO!*
    //Mude a comparação abaixo pela variável e atributo adequado ao seu CRUDE
    if(this.pessoaEL.IDPessoa > 0 ){
      this.alterar();
    }else{
      this.incluir();
    }
  }

  btnExcluir(){
    //*ATENÇÃO!*
    //Mude a chamada ao serviço abaixo pela instância adequada ao seu CRUDE
    this.apiExemploService.excluir(this.pessoaEL.IDPessoa).then(
      sucesso => {
        this._location.back();
      },
      erro => {
        this.apiErrorCollection = erro;
      }
    );
  }

  alterar(){
    //*ATENÇÃO!*
    //Mude a chamada ao serviço abaixo e o modelo de dados pelas instâncias adequadas ao seu CRUDE
    this.apiExemploService.alterar(this.pessoaEL).then(
      sucesso => {
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoaEL = sucesso;
        this.criarForm(false);
        this.cadastroBarraAcao.esconderAguarde();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

  incluir(){
    //*ATENÇÃO!*
    //Mude a chamada ao serviço abaixo e o modelo de dados pelas instâncias adequadas ao seu CRUDE
    this.apiExemploService.criar(this.pessoaEL).then(
      sucesso => {
        
        this.apiErrorCollection = new ApiErrorCollection();
        this.pessoaEL = sucesso;
        
        this.criarForm(false);
        
        this.cadastroBarraAcao.esconderAguarde();
      },
      erro => {
        console.error('erro = ', erro);
        this.apiErrorCollection = erro;
        this.cadastroBarraAcao.esconderAguarde();
      }
    );
  }

  //-------------------------------------------------------
  //OPERAÇÕES DE CRUDE
  //fim ---------------------------------------------------

}