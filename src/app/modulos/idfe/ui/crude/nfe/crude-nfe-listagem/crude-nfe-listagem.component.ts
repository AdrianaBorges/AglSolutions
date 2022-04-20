import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//Componentes Angular essenciais para uma página
import { FormBuilder, FormGroup } from '@angular/forms';

//Serviços do projeto essenciais
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

//Outros Componentes do projeto
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaBotaoDetalhes } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa-botao-detalhes';

//APIs
import { ApiNfeService } from '../../../../api/api-nfe.service';
import { ApiSituacaoNfeService } from '../../../../api/api-situacao-nfe.service';
import { ApiStatusConfNfeService } from '../../../../api/api-status-conf-nfe.service';
import { GridRotaCadastro } from '../../../../../../componentes/grid-pesquisa/grid-rota-cadastro';

@Component({
  selector: 'app-crude-nfe-listagem',
  templateUrl: './crude-nfe-listagem.component.html',
  styleUrls: ['./crude-nfe-listagem.component.scss']
})
export class CrudeNfeListagemComponent implements OnInit {

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  public formGroupPesquisa: FormGroup;

  //public gridRotasCadastro: string = '/modulos/idfe/nfe';
  public gridRotasCadastro: GridRotaCadastro[];

  /**
   * Mensagens de erro da função de baixar o XML Sefaz
   */
  public errosXmlSefaz: string = null;
  public openedModalXmlSefaz: boolean = false;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiNfeService: ApiNfeService,
    public apiSituacaoNfeService: ApiSituacaoNfeService,
    public ApiStatusConfNfeService: ApiStatusConfNfeService,
    private formB: FormBuilder) {}

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }

  public gridPesquisaBotaoDetalhesClick(botao: GridPesquisaBotaoDetalhes){
    console.log(`Clicou no botão de id = ${botao.id}, obj = `, botao.objetoSelecionado);
  }

  public cabecalhoBotaoClick(index: number){
    console.log(`CLiecou no botão do cabeçalho do grid indice [${index}]`);
    this.openedModalXmlSefaz = true;
  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'NFe',
        url: null
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  private criarForm(){

    this.formGroupPesquisa = this.formB.group({
      filtroChaveNFe: [''],
      situacaoNfe: [[]],
      statusConfNfe: [[]],
      filtroNomeEmitente: [''],
    });

  }

  executarPesquisa(){
    this.gridFiltro.executarPesquisa();
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiNfeService.getColunasGrid();
  }

  public fecharModalXmlSefaz(data: any){
    console.log('Fechou modal XML Sefaz');
    this.openedModalXmlSefaz = false;
  }

  public baixar_XML_Sefaz(){
    console.log('CLicou para baixar o XML Sefaz');
  }

}
