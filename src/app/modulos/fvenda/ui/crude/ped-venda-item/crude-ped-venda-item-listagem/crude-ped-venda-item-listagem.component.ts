import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

//COMPONENTE MODULES
import { AguardeCarregandoComponent } from '../../../../../../componentes/aguarde-carregando/aguarde-carregando.component';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiTokenService } from '../../../../../../api-data-access/api-token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ConfigEmpresaService } from '../../../../../config/api/config-empresa.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ApiSituacaoAtenPedService } from '../../../../api/api-situacao-aten-ped.service';
import { ApiPedVendaItemEL01Service } from '../../../../api/api-ped-venda-item-el01.service';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { ApiPedVendaEL01Service } from '../../../../api/api-ped-venda-el01.service';
import { ModelPedVendaEL01 } from '../../../../models/model-ped-venda-EL01';


@Component({
  selector: 'app-crude-ped-venda-item-listagem',
  templateUrl: './crude-ped-venda-item-listagem.component.html',
  styleUrls: ['./crude-ped-venda-item-listagem.component.scss']
})
export class CrudePedVendaItemListagemComponent implements OnInit {


  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('traducao_msg_btnEncaminharAprovacao_sucesso') traducao_msg_btnEncaminharAprovacao_sucesso: ElementRef;
  @ViewChild('aguardeCarregando', { static: true }) aguardeCarregando: AguardeCarregandoComponent;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;


  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;
  @Input() modelPedVendaEL01: ModelPedVendaEL01;

  public formGroupPesquisa: FormGroup;
  //public modelPedVendaEL01: ModelPedVendaEL01;
  constructor(
    private route: ActivatedRoute,
    public apiPedVendaEL01Service: ApiPedVendaEL01Service,
    public apiPedVendaItemEL01Service: ApiPedVendaItemEL01Service,
    public apiSituacaoAtenPedService: ApiSituacaoAtenPedService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    // private apiTokenService: ApiTokenService,
    public router: Router,
    // private configEmpresaService: ConfigEmpresaService,
    private formB: FormBuilder
  ) {
    //Essa instrução garant que a rotna de call back terá o escopo this dessa classe quando chamada
    this.btn_acao_exibir = this.btn_acao_exibir.bind(this)
  }

  ngOnInit() {
    this.criarForm();
  }

  private criarForm() {
    this.formGroupPesquisa = this.formB.group({
      listaOrigem: []
    });

  }
  
  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiPedVendaItemEL01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {

    if (dados.botao.id == 'Create') {
      return this.modelPedVendaEL01.inCodSituacaoPedVen == 1;
    } else if (dados.botao.id == 'Read') {
      return dados.dataItem.inCodSituacaoPedVen != 1;
    } else if (dados.botao.id == 'Update') {
      return dados.dataItem.inCodSituacaoPedVen == 1;
    } else if (dados.botao.id == 'Delete') {
      return dados.dataItem.inCodSituacaoPedVen == 1;
    } else if (dados.botao.id == 'View') {
      return false;
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }

  }
}



