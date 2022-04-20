import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ApiProgramaNivelService } from '../../../../api/api-programa-nivel.service';
import { ApiProgramaService } from '../../../../api/api-programa.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ActivatedRoute } from '@angular/router';
import { ModelPrograma } from '../../../../models/model-programa';

@Component({
  selector: 'app-crude-programa-nivel-listagem',
  templateUrl: './crude-programa-nivel-listagem.component.html',
  styleUrls: ['./crude-programa-nivel-listagem.component.scss']
})
export class CrudeProgramaNivelListagemComponent implements OnInit {
  public gridRotasCadastro: string = '';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  public modelPrograma: ModelPrograma;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiProgramaNivelService: ApiProgramaNivelService,
    private route: ActivatedRoute,
    private apiProgramaService: ApiProgramaService
  ) {
    this.modelPrograma = new ModelPrograma();
  }

  ngOnInit() {
    this.carregarDadosPai();
    var id_programa: string;
    id_programa = this.route.snapshot.paramMap.get('id');
    this.gridRotasCadastro = `/modulos/segur/programa/${id_programa}/filho/programa-nivel`;
    this.criarBreadCrumbs();
    this.apiProgramaNivelService.setChCodPrograma(id_programa);
  }

  private carregarDadosPai() {
    var id = this.route.snapshot.paramMap.get('id');
    this.apiProgramaService.obter(id).then(
      programa => {
        this.modelPrograma = programa;
      }
    );
  }

  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiProgramaNivelService.getColunasGrid();
  }


}
