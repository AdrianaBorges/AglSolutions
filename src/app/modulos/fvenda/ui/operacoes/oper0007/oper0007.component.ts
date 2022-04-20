import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

//1) Componentes Angular essenciais para uma página
import { FormBuilder, FormGroup } from "@angular/forms";

// Serviços da API
import { ApiOper0007Service } from '../../../api/api-oper0007.service';

//Componentes
import { CabecalhoBreadcrumbService } from "../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { ApiErrorCollection } from '../../../../../api-error/api-error-collection';

// modelos
import { ModelOper0007 } from '../../../models/model-oper0007';

@Component({
  selector: 'app-oper0007',
  templateUrl: './oper0007.component.html',
  styleUrls: ['./oper0007.component.scss']
})
export class Oper0007Component implements OnInit {

  public apiSearchObject: ModelOper0007;
  public formGroupPesquisa: FormGroup;

  public apiErrorCollection: ApiErrorCollection;

  @ViewChild("breadcrumb_traducao", { static: true })
  breadcrumb_traducao: ElementRef;

  constructor(
    private formB: FormBuilder,
    public apiOper0007Service: ApiOper0007Service,
    private cabecalhoBreadcrumbService: CabecalhoBreadcrumbService
  ) {
    this.apiSearchObject = new ModelOper0007();

    // inTipoArqSaida
    this.apiSearchObject.inTipoExecucao = 0;
    this.apiSearchObject.inTipoSaida = 0;
    this.apiSearchObject.inTipoArqSaida = 1;

    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit(): void {
    this.criarForm();
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  private criarForm() {
    this.formGroupPesquisa = this.formB.group({
      inNumAssTecnicaIni: [this.apiSearchObject.inNumAssTecnicaIni],
      inNumAssTecnicaFim: [this.apiSearchObject.inNumAssTecnicaFim],
      dtDatAberturaIni: [this.apiSearchObject.dtDatAberturaIni],
      dtDatAberturaFim: [this.apiSearchObject.dtDatAberturaFim],
      inCodClienteIni: [this.apiSearchObject.inCodClienteIni],
      inCodClienteFim: [this.apiSearchObject.inCodClienteFim],
      chCodItemIni: [this.apiSearchObject.chCodItemIni],
      chCodItemFim: [this.apiSearchObject.chCodItemFim],
    });
  }


  public exibirMensagemDeErros(apiErrorCollection: ApiErrorCollection): void{
    this.apiErrorCollection = apiErrorCollection
  }

}
