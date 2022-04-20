import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { FormGroup } from '@angular/forms';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiSolicCredVendaEL01Service } from '../../../../api/api-solic-cred-venda-el01.service';
import { ApiTokenService } from '../../../../../../api-data-access/api-token.service';
import { Router } from '@angular/router';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ConfigEmpresaService } from '../../../../../config/api/config-empresa.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

@Component({
  selector: 'app-crude-aprova-credito-listagem',
  templateUrl: './crude-aprova-credito-listagem.component.html',
  styleUrls: ['./crude-aprova-credito-listagem.component.scss']
})
export class CrudeAprovaCreditoListagemComponent implements OnInit {

  public gridRotasCadastro = ""

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('traducao_msg_btnAtualizarInfo_sucesso', { static: true }) traducao_msg_btnAtualizarInfo_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnEncaminharAprovacao_sucesso') traducao_msg_btnEncaminharAprovacao_sucesso: ElementRef;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiSolicCredVendaEL01Service: ApiSolicCredVendaEL01Service,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiTokenService: ApiTokenService,
    public router: Router,
    private configEmpresaService: ConfigEmpresaService
  ) {
    let user = this.apiTokenService.getUsuarioLogado();
    this.apiSolicCredVendaEL01Service.setInCodSituacaoSolicCred(2);
    this.apiSolicCredVendaEL01Service.setChCodUsuarioAprov(user.chCodUsuario);
  }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick) {
    this.gridFiltro.exibirAguarde(()=>{
      if (data.botao.id == 'btnAtualizarInfo') {
        this.apiSolicCredVendaEL01Service.atualizarInfo(data.dataItem.IDSolicCredVenda).then(r => {
          this.gridFiltro.executarPesquisa(true);
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(this.traducao_msg_btnAtualizarInfo_sucesso.nativeElement.innerText);
        }).catch(err => {
          // executar um comando de envio de mensagem ao dar erro
          var erro: ApiErrorCollection = err;          
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);          
        });
      } if (data.botao.id == 'btnAprovarSolicitacao') {
        this.router.navigateByUrl(`/modulos/fvenda/aprova-credito/aprova/${data.dataItem.IDSolicCredVenda}`);
      } if (data.botao.id == 'btnRejeitarSolicitacao') {
        this.router.navigateByUrl(`/modulos/fvenda/aprova-credito/rejeita/${data.dataItem.IDSolicCredVenda}`);
      } else if (data.botao.id == 'btnImprimir') {
        this.configEmpresaService.get().then(f => {
          this.gridFiltro.esconderAguarde();
          localStorage.setItem('SessionAGLGlobalToken', this.apiTokenService.getToken());
          localStorage.setItem('SessionAGLGlobalURLAPI', f.serverApiUrl);
          window.open(f.serverApiUrl + `AGLReport/visualizacao/34315fa327e?filter=IDSolicCredVenda~eq~${data.dataItem.IDSolicCredVenda}`, '_blank');
        },
        erro => {
          this.gridFiltro.esconderAguarde();
        });        
      }
    });
  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiSolicCredVendaEL01Service.getColunasAguardandoAprovacaoGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    if (dados.botao.id == 'Read') {
      return false;
    } else if (dados.botao.id == 'Update') {
      return false;
    } else if (dados.botao.id == 'Delete') {
      return false;
    } else if (dados.botao.id == 'View') {
      return false;
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }
}
