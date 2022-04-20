import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GridRotaCadastro } from '../../../../../../componentes/grid-pesquisa/grid-rota-cadastro';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiSolicCredVendaEL01Service } from '../../../../api/api-solic-cred-venda-el01.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiSituacaoCadService } from '../../../../../corp/api/api-situacao-cad.service';
import { GridPesquisaBotaoDetalhes } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa-botao-detalhes';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { Router } from '@angular/router';
import { ApiSituacaoSolicCredService } from '../../../../api/api-situacao-solic-cred.service';
import { ConfigEmpresaService } from '../../../../../config/api/config-empresa.service';
import { ApiTokenService } from '../../../../../../api-data-access/api-token.service';
import { ValidarPermissaoRotaService } from '../../../../../../validar-permissao-rota.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';

@Component({
  selector: 'app-crude-solicita-credito-listagem',
  templateUrl: './crude-solicita-credito-listagem.component.html',
  styleUrls: ['./crude-solicita-credito-listagem.component.scss']
})
export class CrudeSolicitaCreditoListagemComponent implements OnInit {
  
  public gridRotasCadastro: GridRotaCadastro[] = [
    {
      nomeCampo: 'lgClienteNovo',
      valorCampo: true,
      rota: '/modulos/fvenda/solicita-credito/novo',
      textoBotaoCriarNovo: 'Novo'
    },
    {
      nomeCampo: 'lgClienteNovo',
      valorCampo: false,
      rota: '/modulos/fvenda/solicita-credito/reajuste',
      textoBotaoCriarNovo: 'Reajuste'
    }
  ];

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('traducao_msg_btnAtualizarInfo_sucesso', { static: true }) traducao_msg_btnAtualizarInfo_sucesso: ElementRef;
  @ViewChild('traducao_msg_btnEncaminharAprovacao_sucesso', { static: true }) traducao_msg_btnEncaminharAprovacao_sucesso: ElementRef;  

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiSolicCredVendaEL01Service: ApiSolicCredVendaEL01Service,
    public apiSituacaoSolicCredService: ApiSituacaoSolicCredService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    public router: Router,
    private configEmpresaService: ConfigEmpresaService,
    private apiTokenService: ApiTokenService,
    private validarPermissaoRotaService: ValidarPermissaoRotaService,
  ) {
    this.apiSolicCredVendaEL01Service.setInCodSituacaoSolicCred(undefined);
    this.apiSolicCredVendaEL01Service.setChCodUsuarioAprov(undefined);
  }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
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
      } if (data.botao.id == 'btnConsultarSolicitacao') {
        if (data.dataItem.lgClienteNovo == true) {
          this.router.navigateByUrl(`/modulos/fvenda/solicita-credito/novo/${data.dataItem.IDSolicCredVenda}`, {
            state: { consulta: true }
          });
        } else {
          this.router.navigateByUrl(`/modulos/fvenda/solicita-credito/reajuste/${data.dataItem.IDSolicCredVenda}`, {
            state: { consulta: true }
          });
        }
      } else if (data.botao.id == 'btnEncaminharAprovacao') {
        this.apiSolicCredVendaEL01Service.solicitarAprova(data.dataItem.IDSolicCredVenda).then(r => {
          this.gridFiltro.executarPesquisa(true);
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(this.traducao_msg_btnEncaminharAprovacao_sucesso.nativeElement.innerText);
        }).catch(err => {
          // executar um comando de envio de mensagem ao dar erro
          var erro: ApiErrorCollection = err;
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);          
        });
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

  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaSituacaoCadastral: [[]],
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiSolicCredVendaEL01Service.getColunasGrid()
  }

  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }

  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    if (dados.botao.id == 'Update') {
      return dados.dataItem.inCodSituacaoSolicCred == 1 || dados.dataItem.inCodSituacaoSolicCred == 2;
    } else if (dados.botao.id == 'Delete') {
      return dados.dataItem.inCodSituacaoSolicCred == 1 || dados.dataItem.inCodSituacaoSolicCred == 2;
    } else if (dados.botao.id == 'btnAtualizarInfo') {
      if (this.validarPermissaoRotaService.funcaoValidaProUsuario('AtualizarInfo') == false) return false;
      return dados.dataItem.inCodSituacaoSolicCred == 1 || dados.dataItem.inCodSituacaoSolicCred == 2;
    } else if (dados.botao.id == 'btnEncaminharAprovacao') {
      if (this.validarPermissaoRotaService.funcaoValidaProUsuario('SolicitarAprova') == false) return false;
      return dados.dataItem.inCodSituacaoSolicCred == 1;
    } else if (dados.botao.id == 'btnImprimir') {
      if (this.validarPermissaoRotaService.funcaoValidaProUsuario('Imprimir') == false) return false;
      return true;
    }else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }
}
