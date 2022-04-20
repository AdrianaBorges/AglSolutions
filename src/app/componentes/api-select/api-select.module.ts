import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ApiSelectComponent } from './api-select.component';
import { ApiSelectMultiColunaComponent } from './api-select-multi-coluna.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropDownsModule
  ],
  declarations: [
    ApiSelectComponent,
    ApiSelectMultiColunaComponent
  ],
  exports: [
    ApiSelectComponent,
    ApiSelectMultiColunaComponent
  ]
})
export class ApiSelectModule { }
