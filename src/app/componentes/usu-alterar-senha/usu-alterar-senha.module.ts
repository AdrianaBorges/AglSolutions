import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

//Telerik Kendo.UI
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
//import { DialogModule } from '@progress/kendo-angular-dialog';


import { UsuAlterarSenhaComponent } from './usu-alterar-senha.component';

@NgModule({
  imports: [
    CommonModule,

    //Telerik Kendo.UI
    //BrowserModule,
    //BrowserAnimationsModule,
    WindowModule,
    ButtonsModule,
    //DialogModule,
    FormsModule,
  ],
  declarations: [UsuAlterarSenhaComponent],
  exports: [UsuAlterarSenhaComponent]
})
export class UsuAlterarSenhaModule { }
