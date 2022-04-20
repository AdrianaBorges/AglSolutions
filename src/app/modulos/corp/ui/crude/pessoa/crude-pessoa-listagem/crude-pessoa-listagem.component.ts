import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';

//1) Componentes Angular essenciais para uma página
import { FormBuilder, FormGroup } from '@angular/forms';

//2) Serviços do projeto essenciais
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

//3) Outros Componentes do projeto
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaBotaoDetalhes } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa-botao-detalhes';

//import { InputModalPesquisaComponent } from '../../../../../componentes/input-modal-pesquisa/input-modal-pesquisa.component';

//4) APIs
import { ApiPessoaElService } from '../../../../api/api-pessoa-el.service';
import { ApiProfissaoService } from '../../../../api/api-profissao.service';
import { ApiGrauInstrucaoService } from '../../../../../corp/api/api-grau-instrucao.service';
import { ApiSexoService } from '../../../../../corp/api/api-sexo.service';
import { ApiTipoPessoaService } from '../../../../api/api-tipo-pessoa.service';
import { GridRotaCadastro } from '../../../../../../componentes/grid-pesquisa/grid-rota-cadastro';
import { ApiUsuariosEL01Service } from '../../../../../segur/api/api-usuarios-el01.service';

@Component({
  selector: 'app-crude-pessoa-listagem',
  templateUrl: './crude-pessoa-listagem.component.html',
  styleUrls: ['./crude-pessoa-listagem.component.scss']
})
export class CrudePessoaListagemComponent implements OnInit {

  public gridRotasCadastro: GridRotaCadastro[] = [
    {
      nomeCampo: 'inCodTipoPessoa',
      valorCampo: 1,
      rota: '/modulos/corp/pessoa/fisica',
      textoBotaoCriarNovo: 'Física'
    },
    {
      nomeCampo: 'inCodTipoPessoa',
      valorCampo: 2,
      rota: '/modulos/corp/pessoa/juridica',
      textoBotaoCriarNovo: 'Jurídica'
    }
  ];

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;

  public formGroupPesquisa: FormGroup;
  
  constructor(
    public apiService: ApiPessoaElService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public ApiProfissaoService: ApiProfissaoService,
    public apiUsuarioService: ApiUsuariosEL01Service,
    public apiGrauInstrucaoService: ApiGrauInstrucaoService,
    public apiSexoService: ApiSexoService,
    public apiTipoPessoaService: ApiTipoPessoaService,
    private formB: FormBuilder
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }

  public gridPesquisaBotaoDetalhesClick(botao: GridPesquisaBotaoDetalhes){
    console.log(`Clicou no botão de id = ${botao.id}, obj = `, botao.objetoSelecionado);
  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0], //'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Pessoa',
        url: null
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2], //'Listagem',
        url: null
      }
    ]);
  }

  private criarForm(){

    this.formGroupPesquisa = this.formB.group({
      listaTipoPessoa: [[]],
      daDatNascim: [null],
      alteracaoStart: [null],
      alteracaoEnd: [null],
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiService.getColunasGrid()
  }

  valorPesquisaTipoPessoaAlterado(objeto){

  }

  valorPesquisaUsuarioSexoAlterado(objeto){

  }

  valorPesquisaUsuarioGrauInstrucaoAlterado(objeto){

  }

  valorAPiSelectTipoPessoaAlterado(objeto){
    //console.log('Valor alterado: tipo de pessoa = ', objeto);
  }

  executarPesquisa(){
    this.gridFiltro.executarPesquisa();
  }

  exibirCadastroTipoPessoa(callback: Function){
    alert('exibir cadastro tipo pessoa');
    callback();
  }

  exibirCadastroUsuario(callback: Function){
    alert('exibir cadastro usuário');
    callback();
  }

  exibirCadastroGrauInstrucao(callback: Function){
    alert('exibir cadastro de grau de instrução');
    callback();
  }

  exibirCadastroSexo(callback: Function){
    alert('exibir cadastro de sexo');
    callback();
  }

}
