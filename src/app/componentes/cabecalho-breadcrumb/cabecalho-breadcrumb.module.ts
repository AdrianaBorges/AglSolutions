import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CabecalhoBreadcrumbComponent } from './cabecalho-breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [CabecalhoBreadcrumbComponent],
  declarations: [CabecalhoBreadcrumbComponent]
})
export class CabecalhoBreadcrumbModule { }
