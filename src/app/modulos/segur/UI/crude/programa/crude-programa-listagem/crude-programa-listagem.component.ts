import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiProgramaService } from '../../../../api/api-programa.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';

@Component({
  selector: 'app-crude-programa-listagem',
  templateUrl: './crude-programa-listagem.component.html',
  styleUrls: ['./crude-programa-listagem.component.scss']
})
export class CrudeProgramaListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/segur/programa';
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public apiProgramaService: ApiProgramaService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,

  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs(){
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
    // this.cabecalhoBreadcrumbService.setBreadcrumbs([
    //   {
    //     texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0], //'Início',
    //     url: '/modulos'
    //   },
    //   {
    //     texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Pessoa',
    //     url: null
    //   },
    //   {
    //     texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2], //'Listagem',
    //     url: null
    //   }
    // ]);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiProgramaService.getColunasGrid()
  }

  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick){
    if(data.botao.id == 'btnAcaosave'){
      alert('Clicou no botão salvar');
    }if(data.botao.id == 'btnAcaoDownload'){
      alert('Clicou no botão de Download');
    }else{
      alert('Clicou no botão com ícone: ' + data.botao.icone);
    }
    console.log('dados da linha selecionada = ', data.dataItem);
  }
  
}
