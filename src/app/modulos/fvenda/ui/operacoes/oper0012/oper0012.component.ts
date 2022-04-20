import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CabecalhoBreadcrumbService } from "../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { ApiErrorCollection } from '../../../../../api-error/api-error-collection';

import { ApiOper0012Service } from '../../../api/api-oper0012.service';
import { ModelOper0012 } from '../../../models/model-oper0012';

@Component({
  selector: 'app-oper0012',
  templateUrl: './oper0012.component.html',
  styleUrls: ['./oper0012.component.scss']
})
export class Oper0012Component implements OnInit {

  public apiSearchObject: ModelOper0012;
  public formGroupPesquisa: FormGroup;
  public apiErrorCollection: ApiErrorCollection;
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    private formB: FormBuilder,
    public router: Router,
    public apiOper0012Service: ApiOper0012Service,
  ) {
    this.apiSearchObject = new ModelOper0012();

    this.apiSearchObject.inTipoExecucao = 0;
    this.apiSearchObject.inTipoSaida = 0;
    this.apiSearchObject.inTipoArqSaida = 2;

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
      inPeriodoAnalise: [this.apiSearchObject.inPeriodoAnalise],
      });
    }

  public exibirMensagemDeErros(apiErrorCollection: ApiErrorCollection): void{
    this.apiErrorCollection = apiErrorCollection
  }
}
