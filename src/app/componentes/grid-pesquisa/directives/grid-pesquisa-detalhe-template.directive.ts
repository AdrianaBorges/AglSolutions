import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: '[appGridPesquisaDetalheTemplate]'
})
export class GridPesquisaDetalheTemplateDirective {

  constructor(public templateRef: TemplateRef<unknown>) {}

}
