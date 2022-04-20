import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
} from '@angular/forms';

@Component({
  selector: 'app-form-control-alerta-erro-api',
  templateUrl: './form-control-alerta-erro-api.component.html',
  styleUrls: ['./form-control-alerta-erro-api.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlAlertaErroApiComponent),
      multi: true
    }
  ],
})
export class FormControlAlertaErroApiComponent implements OnInit {

  @Input() mensagemErro: string = '';

  constructor() { }

  ngOnInit() {
  }


}
