import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CabecalhoBreadcrumbService } from "../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { GridPesquisaComponent } from "../../../../../componentes/grid-pesquisa/grid-pesquisa.component";
import { ApiErrorCollection } from '../../../../../api-error/api-error-collection';

import { ApiSituacaoAssTecService } from "../../../api/api-situacao-ass-tec.service";
import { ApiTipoAssTecEL01Service } from "../../../api/api-tipo-ass-tec-el01.service";
import { ApiTecnicoEL01Service } from '../../../api/api-tecnico-el01.service';
import { ModelOper0008 } from '../../../models/model-oper0008';
import { ApiOper0008Service } from '../../../api/api-oper0008.service';


@Component({
  selector: 'app-oper0008',
  templateUrl: './oper0008.component.html',
  styleUrls: ['./oper0008.component.scss']
})
export class Oper0008Component implements OnInit {

  public apiSearchObject: ModelOper0008;
  public formGroupPesquisa: FormGroup;
  public apiErrorCollection: ApiErrorCollection;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public apiSituacaoAssTecService: ApiSituacaoAssTecService,
    public apiTipoAssTecEL01Service: ApiTipoAssTecEL01Service,
    public apiTecnicoEL01Service: ApiTecnicoEL01Service,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    public router: Router,
    public apiOper0008Service: ApiOper0008Service,
  ) {
    this.apiSearchObject = new ModelOper0008();

    // inTipoArqSaida
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

        inNumAssTecnicaIni: [this.apiSearchObject.inNumAssTecnicaIni],
        inNumAssTecnicaFim: [this.apiSearchObject.inNumAssTecnicaFim],
        dtDatAberturaIni: [this.apiSearchObject.dtDatAberturaIni],
        dtDatAberturaFim: [this.apiSearchObject.dtDatAberturaFim],
        dtDatRecebItemIni: [this.apiSearchObject.dtDatRecebItemIni],
        dtDatRecebItemFim: [this.apiSearchObject.dtDatRecebItemFim],
        chLstTipoAssTec: [[]],
        chLstSituacaoAssTec: [[]],
        chLstIDTecnico: [[]],
      });
    }

  public exibirMensagemDeErros(apiErrorCollection: ApiErrorCollection): void{
    this.apiErrorCollection = apiErrorCollection
  }
}
