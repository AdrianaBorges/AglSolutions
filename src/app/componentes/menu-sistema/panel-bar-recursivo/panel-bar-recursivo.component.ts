import { Component, OnInit, Input } from '@angular/core';
import { PanelBarItemModel } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-panel-bar-recursivo',
  templateUrl: './panel-bar-recursivo.component.html',
  styleUrls: ['./panel-bar-recursivo.component.scss']
})
export class PanelBarRecursivoComponent implements OnInit {

  @Input() menuSistema: any;
  @Input() colorR: number;
  @Input() colorG: number;
  @Input() colorB: number;
  @Input() corFonte: string;

  @Input() profundidade: number;

  constructor() { }

  ngOnInit() {
    if(isNaN(this.profundidade)){this.profundidade = 0;}
    this.profundidade = this.profundidade + 1;
    this.colorR = this.colorR? this.colorR - 5: 255;
    this.colorG = this.colorG? this.colorG - 5: 255;
    this.colorB = this.colorB? this.colorB - 5: 255;
  }

  getBackgroundColor(){
    return "rgb("+ this.colorR +","+ this.colorG +", "+ this.colorB+")";
  }

  getCorFonte(){
    if (this.corFonte == undefined){
      return '#2f6ec2';
    }else{
      return "#"+ this.corFonte;
    }
    
  }

  getIdentacaoMenu(){
    var valor = '0';
    if(this.profundidade > 1){
      valor = '8px';
    }
    return valor;
  }
  getBorderBottom(){
    //console.log('this.profundidade', this.profundidade);
    var valor = '1px';
    if(this.profundidade > 1){
      valor = '0';
    }
    return valor;
  }

}
