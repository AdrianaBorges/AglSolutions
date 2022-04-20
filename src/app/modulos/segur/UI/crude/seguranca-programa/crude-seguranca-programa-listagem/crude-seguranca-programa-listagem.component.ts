import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiSegurancaProgramaService } from '../../../../api/api-seguranca-programa.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ActivatedRoute } from '@angular/router';
import { ModelProgramaNivel } from '../../../../models/model-programa-nivel';
import { ApiProgramaNivelService } from '../../../../api/api-programa-nivel.service';

@Component({
  selector: 'app-crude-seguranca-programa-listagem',
  templateUrl: './crude-seguranca-programa-listagem.component.html',
  styleUrls: ['./crude-seguranca-programa-listagem.component.scss']
})
export class CrudeSegurancaProgramaListagemComponent implements OnInit {

  public gridRotasCadastro: string = '';
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;
  public modelProgramaNivel: ModelProgramaNivel;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSegurancaProgramaService: ApiSegurancaProgramaService,
    public apiProgramaNivelService: ApiProgramaNivelService,
    private route: ActivatedRoute
  ) {
    this.modelProgramaNivel = new ModelProgramaNivel();
  }

  private carregarDadosPai(id: any) {
    this.apiProgramaNivelService.obter(id).then(
      programa => {
        this.modelProgramaNivel = programa;
      }
    );
  }
  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  ngOnInit() {
    this.criarBreadCrumbs();
    var id_programa: string;
    var id_nivel: string;
    id_programa = this.route.snapshot.paramMap.get('id');
    id_nivel = this.route.snapshot.paramMap.get('IDProgramaNivel');
    this.carregarDadosPai(id_nivel);
    this.apiSegurancaProgramaService.setIDProgramaNivel(Number(id_nivel));
    this.gridRotasCadastro = `/modulos/segur/programa/${id_programa}/filho/programa-nivel/${id_nivel}/filho/seguranca-programa`;
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiSegurancaProgramaService.getColunasGrid();
  }


}
