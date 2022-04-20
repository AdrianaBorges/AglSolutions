import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { FiltroMultiselectComponent } from './filtro-multiselect.component';

//Telerik Kendo.UI
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    //Telerik Kendo.UI
    DropDownsModule,
  ],
  declarations: [FiltroMultiselectComponent],
  exports: [FiltroMultiselectComponent]
})
export class FiltroMultiselectModule { }
