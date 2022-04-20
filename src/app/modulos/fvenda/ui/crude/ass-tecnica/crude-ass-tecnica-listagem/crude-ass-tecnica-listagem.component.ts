import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
// import { ValidarPermissaoRotaService } from '../../../../../../validar-permissao-rota.service';
import { ApiEstabelecimentoService } from '../../../../../corp/api/api-estabelecimento.service';
import { ApiAssTecnicaEL01Service } from '../../../../api/api-ass-tecnica-el01.service';
import { ApiOrigemAssTecService } from '../../../../api/api-origem-ass-tec.service';
import { ApiSituacaoAssTecService } from '../../../../api/api-situacao-ass-tec.service';
import { ApiTipoAssTecEL01Service } from '../../../../api/api-tipo-ass-tec-el01.service';
import { ModelAssTecnicaEL01 } from '../../../../models/model-ass-tecnica-EL01';

@Component({
  selector: 'app-crude-ass-tecnica-listagem',
  templateUrl: './crude-ass-tecnica-listagem.component.html',
  styleUrls: ['./crude-ass-tecnica-listagem.component.scss']
})
export class CrudeAssTecnicaListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/ass-tecnica';
  leftModal: number;
  topModal: number;
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('traducao_msg_btnCancelar_sucesso', { static: true }) traducao_msg_btnCancelar_sucesso: ElementRef;

  public AbrirMotivoCancelamento: boolean = false;
  public modelAssTecnicaEl01: ModelAssTecnicaEL01;

  // //Filtros de pesquisa
  // @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;

  public formPesquisaAssTecnica: FormGroup;

  constructor(
    public apiAssTecnicaEL01Service: ApiAssTecnicaEL01Service,
    public apiSituacaoAssTecService: ApiSituacaoAssTecService,
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    public apiOrigemAssTecService: ApiOrigemAssTecService,
    public apiTipoAssTecEL01Service: ApiTipoAssTecEL01Service,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    public router: Router,
    // private validarPermissaoRotaService: ValidarPermissaoRotaService,
  ) {

  }

  ngOnInit() {
    this.leftModal = (window.screen.width / 2) - 500;
    this.topModal = (window.screen.height - 500) / 2;
    this.criarBreadCrumbs();
    this.criarForm();
  }
  DesistirCancelar() {
    this.AbrirMotivoCancelamento = false;
    this.gridFiltro.esconderAguarde();
  }
  public cancelarAssTecnica() {
    this.gridFiltro.exibirAguarde();
    this.apiAssTecnicaEL01Service.cancelar(this.modelAssTecnicaEl01).then(r => {
      this.AbrirMotivoCancelamento = false;
      this.gridFiltro.executarPesquisa(true);
      this.gridFiltro.esconderAguarde();
      this.gridFiltro.dialogo_exibir(this.traducao_msg_btnCancelar_sucesso.nativeElement.innerText);
    }).catch(err => {
      // executar um comando de envio de mensagem ao dar erro
      var erro: ApiErrorCollection = err;
      this.AbrirMotivoCancelamento = false;
      this.gridFiltro.esconderAguarde();
      let msg = erro.mensagem_geral.split(",").join("<br/>");
      this.gridFiltro.dialogo_exibir(msg);
    });
  }

  
  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick) {

    if (data.botao.id == 'btnCancelar') {
      this.AbrirMotivoCancelamento = true;
      this.modelAssTecnicaEl01 = data.dataItem;
    } else if (data.botao.id == 'btnManutencaoItensAssTecnica') {
      this.router.navigateByUrl(`/modulos/fvenda/ass-tecnica/${data.dataItem.IDAssTecnica}/filho/ass-tec-item`);
    }

  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  private criarForm() {

    if (this.formPesquisaAssTecnica == undefined) {
      this.formPesquisaAssTecnica = this.formB.group({
        listaSituacaoAssTecnica: [null],
        listaTipoAssTecEL01: [null],
        listaEstabelecimento: [null],
        listaOrigemAssTec: [null],
      });

    }


  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiAssTecnicaEL01Service.getColunasGrid()
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
    } else if (dados.botao.id == 'btnConsultar') {
      // if (this.validarPermissaoRotaService.funcaoValidaProUsuario('Imprimir') == false) return false;
      return dados.dataItem.inCodSituacaoAssTec != 1;
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }


}
