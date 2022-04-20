import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { ApiSolicAprovPVItemEL01Service } from '../../../../api/api-solic-aprov-pv-item-el01.service';
import { ApiSolicAprovPVEL01Service } from '../../../../api//api-solic-aprov-pv-el01.service';
import { ModelSolicAprovPVEL01 } from '../../../../models/model-solic-aprov-pv-EL01';


@Component({
  selector: 'app-crude-solic-apro-ped-bonif-item-listagem',
  templateUrl: './crude-solic-apro-ped-bonif-item-listagem.component.html',
  styleUrls: ['./crude-solic-apro-ped-bonif-item-listagem.component.scss']
})
export class CrudeSolicAproPedBonifItemListagemComponent implements OnInit {
  public gridRotasCadastro =  `/modulos/fvenda/solic-apro-ped-bonif/:idPai/filho/solic-apro-ped-bonif-item`
  idPai: number = 0;

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('traducao_msg_btnEncaminharAprovacao_sucesso') traducao_msg_btnEncaminharAprovacao_sucesso: ElementRef;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;


  // @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  public formGroupPesquisa: FormGroup;
  public modelSolicAprovPVEL01: ModelSolicAprovPVEL01 = new ModelSolicAprovPVEL01();

  constructor(
    public apiSolicAprovPVItemEL01Service: ApiSolicAprovPVItemEL01Service,
    public apiSolicAprovPVEL01Service: ApiSolicAprovPVEL01Service,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiTokenService: ApiTokenService,
    public router: Router,
    private configEmpresaService: ConfigEmpresaService,
    private formB: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idPai= +this.route.snapshot.paramMap.get('idPai');
    this.apiSolicAprovPVItemEL01Service.IDSolicAprovPV = this.idPai;
    this.gridRotasCadastro =  `/modulos/fvenda/solic-apro-ped-bonif/${this.idPai}/filho/solic-apro-ped-bonif-item`
    this.carregarDadosPai();

    this.criarForm();
  }

  private carregarDadosPai() {
    this.apiSolicAprovPVEL01Service.obter(this.idPai).then(
      programa => {
        this.modelSolicAprovPVEL01 = programa;       
        
      }
    );
  }

  private criarForm() {
    this.formGroupPesquisa = this.formB.group({
      listaOrigem: [[]]
    });

  }
  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick) {
    this.gridFiltro.exibirAguarde(() => {
     
       if (data.botao.id == 'chamarInterface') {
        this.router.navigateByUrl(`/modulos/fvenda/solic-apro-ped-bonif/${this.idPai}/filho/solic-apro-ped-bonif-item/${data.dataItem.IDSolicAprovPVItem}/filho/ped-venda/${data.dataItem.IDPedVenda}`)
      }
    });
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiSolicAprovPVItemEL01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    if (dados.botao.id == 'Read') {
      return dados.dataItem.inCodSituacaoSolAprPV == 2 || dados.dataItem.inCodSituacaoSolAprPV == 3 || dados.dataItem.inCodSituacaoSolAprPV == 4;
    } else if (dados.botao.id == 'Update') {
      return dados.dataItem.inCodSituacaoSolAprPV == 1;
    } else if (dados.botao.id == 'Delete') {
      return dados.dataItem.inCodSituacaoSolAprPV == 1;
    } else if (dados.botao.id == 'View') {
      return dados.dataItem.inCodSituacaoSolAprPV == 2 || dados.dataItem.inCodSituacaoSolAprPV == 3 || dados.dataItem.inCodSituacaoSolAprPV == 4;
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }
}
