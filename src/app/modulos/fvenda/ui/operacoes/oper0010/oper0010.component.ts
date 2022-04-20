import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CabecalhoBreadcrumbService } from "../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { ApiErrorCollection } from '../../../../../api-error/api-error-collection';

import { ApiEstabelecimentoService } from '../../../../corp/api/api-estabelecimento.service';

import { ModelOper0010 } from '../../../models/model-oper0010';
import { ApiOper0010Service } from '../../../api/api-oper0010.service';
import { ApiSituacaoPedCompService } from '../../../api/api-situacao-ped-comp.service';

@Component({
  selector: 'app-oper0010',
  templateUrl: './oper0010.component.html',
  styleUrls: ['./oper0010.component.scss']
})
export class Oper0010Component implements OnInit {

  public apiSearchObject: ModelOper0010;
  public formGroupPesquisa: FormGroup;
  public apiErrorCollection: ApiErrorCollection;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  //Array dos modelos de arquivo de saída
  public modeloArquivo = [];

  constructor(
    public apiEstabelecimentoService: ApiEstabelecimentoService,
    public apiSituacaoPedCompService: ApiSituacaoPedCompService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiOper0010Service: ApiOper0010Service,
    private formB: FormBuilder,
    public router: Router,
  ) {
    this.apiSearchObject = new ModelOper0010();

    // inTipoArqSaida
    this.apiSearchObject.inTipoExecucao = 0;
    this.apiSearchObject.inTipoSaida = 0;
    this.apiSearchObject.inTipoArqSaida = 1;

    this.apiErrorCollection = new ApiErrorCollection();

  }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
    this.modelo();
  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }
  

  private criarForm() {
    this.formGroupPesquisa = this.formB.group({
      chLstCodEstabelec: [[]],
      daDatPedCompraIni: [this.apiSearchObject.daDatPedCompraIni],
      daDatPedCompraFim: [this.apiSearchObject.daDatPedCompraFim],
      inNumPedCompraIni: [this.apiSearchObject.inNumPedCompraIni],
      inNumPedCompraFim: [this.apiSearchObject.inNumPedCompraFim],
      chNumPedClienteIni: [this.apiSearchObject.chNumPedClienteIni],
      chNumPedClienteFim: [this.apiSearchObject.chNumPedClienteFim],
      inCodClienteIni: [this.apiSearchObject.inCodClienteIni],
      inCodClienteFim: [this.apiSearchObject.inCodClienteFim],
      inCodRepresIni: [this.apiSearchObject.inCodRepresIni],
      inCodRepresFim: [this.apiSearchObject.inCodRepresFim],
      chLstCodSituacaoPedComp: [[]],
      inOpcaoModelo: [this.apiSearchObject.inOpcaoModelo],
    });
  }

  public exibirMensagemDeErros(apiErrorCollection: ApiErrorCollection): void {
    this.apiErrorCollection = apiErrorCollection
  }

  // Código para gerar a lista dos modelos de saída
  private modelo(){
    this.modeloArquivo.push({
      texto: "MODELO 01",
      id: 0,
    });
    this.modeloArquivo.push({
      texto: "MERCOS",
      id: 1,
    });
  }

}
