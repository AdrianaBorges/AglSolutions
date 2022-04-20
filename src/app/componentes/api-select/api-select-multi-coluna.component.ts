import { Component, TemplateRef, 
  ContentChildren, QueryList 
} from '@angular/core';
//Kendo
import { ComboBoxColumnComponent } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'app-api-select-multi-columa',
  template: '',
  styles: ['']
})
export class ApiSelectMultiColunaComponent {

  // public itemTemplate: TemplateRef<any>;

  // constructor(private templateRef: TemplateRef<any>) {
  //   this.itemTemplate = this.templateRef;
  // }

  @ContentChildren(ComboBoxColumnComponent) listaColunas: QueryList<ComboBoxColumnComponent>;

  constructor() { 
    this.listaColunas = new QueryList();
  }

  ngOnInit() {
  }

}