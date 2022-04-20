import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AguardeCarregandoComponent } from './aguarde-carregando.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AguardeCarregandoComponent
  ],
  exports: [
    AguardeCarregandoComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AguardeCarregandoModule { }
