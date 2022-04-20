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

//4) APIs
import { ApiUfService } from '../../../../api/api-uf.service';
import { ApiPaisService } from '../../../../api/api-pais.service';
import { ApiCidadeService } from '../../../../api/api-cidade.service';
import { GridRotaCadastro } from '../../../../../../componentes/grid-pesquisa/grid-rota-cadastro';

@Component({
  selector: 'app-crude-cidade-listagem',
  templateUrl: './crude-cidade-listagem.component.html',
  styleUrls: ['./crude-cidade-listagem.component.scss']
})
export class CrudeCidadeListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  public gridRotasCadastro: string = '/modulos/corp/cidade';

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiUFService: ApiUfService,
    public apiCidadeService: ApiCidadeService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiPaisService: ApiPaisService,
    private formB: FormBuilder
  ) { }


  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
    this.apiPaisService.mudarOrdenacao("chNomeAbreviado", "asc");
    this.apiUFService.mudarOrdenacao("chNome", "asc");
  }
  private criarBreadCrumbs() {
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

  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaPais: [[]],
      listaUF: [[]]
    });

  }
  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }


  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiCidadeService.getColunasGrid()
  }
}
