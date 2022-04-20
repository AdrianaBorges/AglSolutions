import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CabecalhoBreadcrumbService } from "../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { GridPesquisaComponent } from "../../../../../componentes/grid-pesquisa/grid-pesquisa.component";
import { ApiErrorCollection } from '../../../../../api-error/api-error-collection';

import { ApiSituacaoAssTecService } from "../../../api/api-situacao-ass-tec.service";
import { ApiTipoAssTecEL01Service } from "../../../api/api-tipo-ass-tec-el01.service";
import { ModelOper0009 } from '../../../models/model-oper0009';
import { ApiOper0009Service } from '../../../api/api-oper0009.service';
import { ApiSolucAssTecService } from '../../../api/api-soluc-ass-tec.service';
import { ApiTecnicoEL01Service } from '../../../api/api-tecnico-el01.service';

@Component({
  selector: 'app-oper0009',
  templateUrl: './oper0009.component.html',
  styleUrls: ['./oper0009.component.scss']
})
export class Oper0009Component implements OnInit {

  public apiSearchObject: ModelOper0009;
  public formGroupPesquisa: FormGroup;
  public apiErrorCollection: ApiErrorCollection;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public apiSituacaoAssTecService: ApiSituacaoAssTecService,
    public apiTipoAssTecEL01Service: ApiTipoAssTecEL01Service,
    public apiTecnicoEL01Service: ApiTecnicoEL01Service,
    public apiSolucAssTecService: ApiSolucAssTecService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    public router: Router,
    public apiOper0009Service: ApiOper0009Service,
  ) {
    this.apiSearchObject = new ModelOper0009();

    this.apiSearchObject.inTipoExecucao = 0;
    this.apiSearchObject.inTipoSaida = 0;
    this.apiSearchObject.inTipoArqSaida = 1;

    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  private criarForm() {
    this.formGroupPesquisa = this.formB.group({
        //listaSituacaoAssTecnica: [null],
        //listaTipoAssTecEL01: [null],
        //listaTecnicoEL01: [null],
        //listaSolucAssTec: [null],

        dtDatAberturaIni: [this.apiSearchObject.dtDatAberturaIni],
        dtDatAberturaFim: [this.apiSearchObject.dtDatAberturaFim],
        dtDatRecebItemIni: [this.apiSearchObject.dtDatRecebItemIni],
        dtDatRecebItemFim: [this.apiSearchObject.dtDatRecebItemFim],
        chLstTipoAssTec: [[]],
        chLstSituacaoAssTec: [[]],
        chLstIDTecnico: [[]],
        chLstSolucAssTec: [[]],
      });
    }

  public exibirMensagemDeErros(apiErrorCollection: ApiErrorCollection): void{
    this.apiErrorCollection = apiErrorCollection
  }
}
