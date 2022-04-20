import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

//1) Componentes Angular essenciais para uma página
import { FormBuilder, FormGroup } from "@angular/forms";

// Serviços da API
import { ApiCampanhaEL01Service } from "../../../api/api-campanha-el01.service";
import { ApiOper0006Service } from "../../../api/api-oper0006.service";

//Componentes
import { CabecalhoBreadcrumbService } from "../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service";
import { ApiErrorCollection } from '../../../../../api-error/api-error-collection';

// modelos
import { ModelOper0006 } from "../../../models/model-oper0006";

@Component({
  selector: "app-oper0006",
  templateUrl: "./oper0006.component.html",
  styleUrls: ["./oper0006.component.scss"],
})
export class Oper0006Component implements OnInit {
  public apiSearchObject: ModelOper0006;
  public formGroupPesquisa: FormGroup;

  public apiErrorCollection: ApiErrorCollection;

  @ViewChild("breadcrumb_traducao", { static: true })
  breadcrumb_traducao: ElementRef;

  constructor(
    private formB: FormBuilder,
    public apiCampanhaEL01Service: ApiCampanhaEL01Service,
    public apiOper0006Service: ApiOper0006Service,
    private cabecalhoBreadcrumbService: CabecalhoBreadcrumbService
  ) {
    this.apiSearchObject = new ModelOper0006();

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
      IDCampanha: [this.apiSearchObject.IDCampanha],
    });
  }

  public exibirMensagemDeErros(apiErrorCollection: ApiErrorCollection): void{
    this.apiErrorCollection = apiErrorCollection
  }
}
