import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ApiAssTecItemEL01Service } from '../../../../api/api-ass-tec-item-el01.service';
import { ApiAssTecnicaEL01Service } from '../../../../api/api-ass-tecnica-el01.service';

import { ModelAssTecItemEL01 } from '../../../../models/model-ass-tec-item-EL01';
import { ModelAssTecnicaEL01 } from '../../../../models/model-ass-tecnica-EL01';

@Component({
  selector: 'app-crude-ass-tec-item-listagem',
  templateUrl: './crude-ass-tec-item-listagem.component.html',
  styleUrls: ['./crude-ass-tec-item-listagem.component.scss']
})
export class CrudeAssTecItemListagemComponent implements OnInit {

  public gridRotasCadastro: string = '';
  leftModal: number;
  topModal: number;
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('traducao_msg_btnCancelar_sucesso', { static: true }) traducao_msg_btnCancelar_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnAtender_sucesso', { static: true }) traducao_msg_btnAtender_sucesso: ElementRef;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  public AbrirModal: boolean = false;
  public TituloModal: string = undefined;
  public TipoModal: string = undefined;
  public dadoModal: string = "";
  public modelItem: ModelAssTecItemEL01;
  public modelAssTecnicaEL01: ModelAssTecnicaEL01 = new ModelAssTecnicaEL01();


  constructor(
    public apiAssTecItemEL01Service: ApiAssTecItemEL01Service,
    public apiAssTecnicaEL01Service: ApiAssTecnicaEL01Service,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.leftModal = (window.screen.width / 2) - 500;
    this.topModal = (window.screen.height - 500) / 2;
    this.carregarDadosPai();
    var id_AssistenciaTecnica: number;
    id_AssistenciaTecnica = +this.route.snapshot.paramMap.get('id');
    this.gridRotasCadastro = `/modulos/fvenda/ass-tecnica/${id_AssistenciaTecnica}/filho/ass-tec-item`;
    this.criarBreadCrumbs();
    this.apiAssTecItemEL01Service.IDAssTecnica = id_AssistenciaTecnica;
  }


  private carregarDadosPai() {
    var id = +this.route.snapshot.paramMap.get('id');
    this.apiAssTecnicaEL01Service.obter(id).then(
      programa => {
        this.modelAssTecnicaEL01 = programa;
        if (this.modelAssTecnicaEL01.dtDatAbertura) {
          this.modelAssTecnicaEL01.dtDatAbertura = new Date(this.modelAssTecnicaEL01.dtDatAbertura);
        }
      }
    );
  }
  DesistirModal() {
    this.AbrirModal = false;
    this.gridFiltro.esconderAguarde();
  }
  public EfetivarModal() {

    this.gridFiltro.exibirAguarde();
    if (this.TipoModal == "CANCELAR") {
      this.modelItem.chDesMotivoCanc = this.dadoModal;
      this.apiAssTecItemEL01Service.cancelar(this.modelItem).then(r => {
        this.AbrirModal = false;
        this.gridFiltro.executarPesquisa(true);
        this.gridFiltro.esconderAguarde();
        this.dadoModal = undefined;
        this.gridFiltro.dialogo_exibir(this.traducao_msg_btnCancelar_sucesso.nativeElement.innerText);
      }).catch(err => {
        // executar um comando de envio de mensagem ao dar erro
        this.dadoModal = undefined;
        var erro: ApiErrorCollection = err;
        this.AbrirModal = false;
        this.gridFiltro.esconderAguarde();
        let msg = erro.mensagem_geral.split(",").join("<br/>");
        this.gridFiltro.dialogo_exibir(msg);
      });
    } else if (this.TipoModal == "ATENDER") {
      this.modelItem.chDesSolucao = this.dadoModal;
      this.apiAssTecItemEL01Service.atender(this.modelItem).then(r => {
        this.AbrirModal = false;
        this.gridFiltro.executarPesquisa(true);
        this.gridFiltro.esconderAguarde();
        this.dadoModal = undefined;
        this.gridFiltro.dialogo_exibir(this.traducao_msg_btnAtender_sucesso.nativeElement.innerText);
      }).catch(err => {
        // executar um comando de envio de mensagem ao dar erro
        this.dadoModal = undefined;
        var erro: ApiErrorCollection = err;
        this.AbrirModal = false;        
        this.gridFiltro.esconderAguarde();
        let msg = erro.mensagem_geral.split(",").join("<br/>");
        this.gridFiltro.dialogo_exibir(msg);
      });

    }


  }

  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick) {
    if (data.botao.id == 'btnCancelar') {
      this.AbrirModal = true;
      this.TipoModal = "CANCELAR"
      this.TituloModal = "Motivo Cancelamento";
      this.modelItem = data.dataItem;
    } else
      if (data.botao.id == 'btnAtender') {
        this.AbrirModal = true;
        this.TipoModal = "ATENDER"
        this.TituloModal = "Solução de Atendimento";
        this.modelItem = data.dataItem;
      } else if (data.botao.id == 'btnConsultar') {
        this.router.navigateByUrl(`/modulos/fvenda/ass-tecnica/${data.dataItem.IDAssTecnica}`);
      } else if (data.botao.id == 'btnManutencaoItensAssTecnica') {
        this.router.navigateByUrl(`/modulos/fvenda/ass-tecnica/${data.dataItem.IDAssTecnica}/filho/ass-tec-item`);
      }

  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiAssTecItemEL01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    if (dados.botao.id == 'Update') {
      return dados.dataItem.inCodSituacaoAssTec == 1;
    } else if (dados.botao.id == 'Delete') {
      return dados.dataItem.inCodSituacaoAssTec == 1;
    } else if (dados.botao.id == 'btnCancelar') {
      // if (this.validarPermissaoRotaService.funcaoValidaProUsuario('Cancelar') == false) return false;
      return dados.dataItem.inCodSituacaoAssTec == 1;
    } else if (dados.botao.id == 'btnAtender') {
      // if (this.validarPermissaoRotaService.funcaoValidaProUsuario('Cancelar') == false) return false;
      return dados.dataItem.inCodSituacaoAssTec == 1;
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }


}

