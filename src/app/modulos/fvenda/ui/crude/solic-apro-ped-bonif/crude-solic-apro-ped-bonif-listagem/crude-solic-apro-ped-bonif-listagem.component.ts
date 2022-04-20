import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { ModalPesquisaComponent } from '../../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiTokenService } from '../../../../../../api-data-access/api-token.service';
import { Router } from '@angular/router';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ConfigEmpresaService } from '../../../../../config/api/config-empresa.service';
import { ApiErrorCollection } from '../../../../../../api-error/api-error-collection';
import { ApiSolicAprovPVEL01Service } from '../../../../api/api-solic-aprov-pv-el01.service';
import { ApiSituacaoSolAprPvService } from '../../../../api/api-situacao-sol-apr-pv.service';

@Component({
  selector: 'app-crude-solic-apro-ped-bonif-listagem',
  templateUrl: './crude-solic-apro-ped-bonif-listagem.component.html',
  styleUrls: ['./crude-solic-apro-ped-bonif-listagem.component.scss']
})
export class CrudeSolicAproPedBonifListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/solic-apro-ped-bonif';

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  @ViewChild('traducao_msg_btnEncaminharAprovacao_sucesso') traducao_msg_btnEncaminharAprovacao_sucesso: ElementRef;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;

  public formGroupPesquisa: FormGroup;

  constructor(
    public apiSolicAprovPVEL01Service: ApiSolicAprovPVEL01Service,
    public apiSituacaoSolAprPvService: ApiSituacaoSolAprPvService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private apiTokenService: ApiTokenService,
    public router: Router,
    private configEmpresaService: ConfigEmpresaService,
    private formB: FormBuilder
  ) {
    this.apiSolicAprovPVEL01Service.setInCodSituacaoSolAprPV(null);
  }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }

  private criarForm() {
    this.formGroupPesquisa = this.formB.group({
      listaSituacao: [[]]
    });

  }

  public colunaEditarBotaoClick(data: GridPesquisaColunaEditarBotaoClick) {
    this.gridFiltro.exibirAguarde(() => {
      if (data.botao.id == 'btnEncaminharSolic') {
        try {
          data.dataItem.inCodSituacaoSolAprPV = 2;
          this.apiSolicAprovPVEL01Service.alterar(data.dataItem).then(x => {
            this.gridFiltro.executarPesquisa(true);
            this.gridFiltro.esconderAguarde();
            this.gridFiltro.dialogo_exibir(this.traducao_msg_btnEncaminharAprovacao_sucesso.nativeElement.innerText);

          });
        } catch (error) {
          var erro: ApiErrorCollection = error;
          this.gridFiltro.esconderAguarde();
          this.gridFiltro.dialogo_exibir(erro.mensagem_geral);
        }
      } if (data.botao.id == 'chamarInterface') {
        this.router.navigateByUrl(`/modulos/fvenda/solic-apro-ped-bonif/${data.dataItem.IDSolicAprovPV}/filho/solic-apro-ped-bonif-item`);

      }
    });
  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiSolicAprovPVEL01Service.getColunasGridSolicAproPedBonif()
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
      return false;
    } else if (dados.botao.id == "btnEncaminharSolic") {
      return dados.dataItem.inCodSituacaoSolAprPV == 1;

    } else if (dados.botao.id == "chamarInterface") {
      return true;
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }

  }
}
