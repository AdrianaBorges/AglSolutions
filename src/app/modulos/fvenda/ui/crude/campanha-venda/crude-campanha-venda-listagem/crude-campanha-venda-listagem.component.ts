import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ApiCampanhaEL01Service } from '../../../../api/api-campanha-el01.service';
import { ApiCampanhaParamEL01Service } from '../../../../api/api-campanha-param-el01.service';
import { ApiCampanhaVendaEL01Service } from '../../../../api/api-campanha-venda-el01.service';
import { ModelCampanhaEL01 } from '../../../../models/model-campanha-EL01';
import { ModelCampanhaParamEL01 } from '../../../../models/model-campanha-param-EL01';
import { ModelCampanhaVendaEL01 } from '../../../../models/model-campanha-venda-EL01';

@Component({
  selector: 'app-crude-campanha-venda-listagem',
  templateUrl: './crude-campanha-venda-listagem.component.html',
  styleUrls: ['./crude-campanha-venda-listagem.component.scss']
})
export class CrudeCampanhaVendaListagemComponent implements OnInit {

  public gridRotasCadastro: string = '';
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  public AbrirModal: boolean = false;
  public TituloModal: string = undefined;
  public TipoModal: string = undefined;
  public dadoModal: string = "";
  public modelCampanhaParamEL01: ModelCampanhaParamEL01 = new ModelCampanhaParamEL01();
  public modelCampanhaVendaEL01: ModelCampanhaVendaEL01;
  public modelCampanhaEL01: ModelCampanhaEL01 = new ModelCampanhaEL01();

  constructor(
    public apiCampanhaParamEL01Service: ApiCampanhaParamEL01Service,
    public apiCampanhaEL01Service: ApiCampanhaEL01Service,
    public apiCampanhaVendaEL01Service: ApiCampanhaVendaEL01Service,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
  }

  async ngOnInit() {
    var id_Campanha: number;
    id_Campanha = +this.route.snapshot.paramMap.get('id');
    var id_CampanhaParam: number;
    id_CampanhaParam = +this.route.snapshot.paramMap.get('IDCampanhaParam');
    this.gridRotasCadastro = `/modulos/fvenda/campanha/${id_Campanha}/filho/campanha-param/${id_CampanhaParam}/filho/campanha-venda`;
    this.apiCampanhaVendaEL01Service.IDCampanhaParam = id_CampanhaParam;
    this.criarBreadCrumbs();
    await this.carregarDadosPai();
  }

  private async carregarDadosPai() {
    var id = +this.route.snapshot.paramMap.get('id');
    this.modelCampanhaEL01 = await this.apiCampanhaEL01Service.obter(id);
    if (this.modelCampanhaEL01.dtDatInicio) {
      this.modelCampanhaEL01.dtDatInicio = new Date(this.modelCampanhaEL01.dtDatInicio);
    }
    if (this.modelCampanhaEL01.dtDatFim) {
      this.modelCampanhaEL01.dtDatFim = new Date(this.modelCampanhaEL01.dtDatFim);
    }
    var id_CampanhaParam: number;
    id_CampanhaParam = +this.route.snapshot.paramMap.get('IDCampanhaParam');

    this.modelCampanhaParamEL01 = await this.apiCampanhaParamEL01Service.obter(id_CampanhaParam);
    if (this.modelCampanhaParamEL01.dtDatVendaIni) {
      this.modelCampanhaParamEL01.dtDatVendaIni = new Date(this.modelCampanhaParamEL01.dtDatVendaIni);
    }
    if (this.modelCampanhaParamEL01.dtDatVendaFim) {
      this.modelCampanhaParamEL01.dtDatVendaFim = new Date(this.modelCampanhaParamEL01.dtDatVendaFim);
    }
  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }
  
  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiCampanhaVendaEL01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    if (dados.botao.id == 'Update' || dados.botao.id == 'Delete') {
      if (dados.dataItem.inCodSituacaoCamp !== 2) {
        return false
      } else if (dados.dataItem.inCodTipoCampanha === 2 && dados.dataItem.lgIntegradoDestino == true) {
        return false
      } else {
        return true;
      }
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }
}
