import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { FormGroup } from '@angular/forms';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiTokenService } from '../../../../../../api-data-access/api-token.service';
import { Router } from '@angular/router';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ConfigEmpresaService } from '../../../../../config/api/config-empresa.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ApiSolicAprovPVEL01Service } from '../../../../api/api-solic-aprov-pv-el01.service';



@Component({
  selector: 'app-crude-aprova-ped-bonif-listagem',
  templateUrl: './crude-aprova-ped-bonif-listagem.component.html',
  styleUrls: ['./crude-aprova-ped-bonif-listagem.component.scss']
})
export class CrudeAprovaPedBonifListagemComponent implements OnInit {

  public gridRotasCadastro = ""

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('traducao_msg_btnAtualizarInfo_sucesso', { static: true }) traducao_msg_btnAtualizarInfo_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnEncaminharAprovacao_sucesso') traducao_msg_btnEncaminharAprovacao_sucesso: ElementRef;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiSolicAprovPVEL01Service: ApiSolicAprovPVEL01Service,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiTokenService: ApiTokenService,
    public router: Router,
    private configEmpresaService: ConfigEmpresaService
  ) {
    this.apiSolicAprovPVEL01Service.setInCodSituacaoSolAprPV(2);
  }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick) {
    this.gridFiltro.exibirAguarde(() => {
      if (data.botao.id == 'btnAprovarSolicitacao') {
        this.router.navigateByUrl(`/modulos/fvenda/aprova-ped-bonif/aprova/${data.dataItem.IDSolicAprovPV}`);
      } if (data.botao.id == 'btnRejeitarSolicitacao') {
        this.router.navigateByUrl(`/modulos/fvenda/aprova-ped-bonif/rejeita/${data.dataItem.IDSolicAprovPV}`);
      }
    });
  }

  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiSolicAprovPVEL01Service.getColunasGrid()
  }

  public getColunasGridCadastroFilho(): Array<GridPesquisaColumn> {    
    return this.apiSolicAprovPVEL01Service.getColunasGridFilho()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {  
    return dados.botao.id === 'btnAprovarSolicitacao' || dados.botao.id === 'btnRejeitarSolicitacao';
  }

  public mapearArrrayDeDetalhesDaLinha(dataItem): Array<any>{
    let dados =  this.apiSolicAprovPVEL01Service.mapListaItensSolicAprovPV(dataItem)
    return dados;
  }
}

