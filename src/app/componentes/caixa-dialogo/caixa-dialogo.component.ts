import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface CaixaDialogo{
  aberto: boolean,
  titulo: string,
  mensagem: string
}

@Component({
  selector: 'app-caixa-dialogo',
  templateUrl: './caixa-dialogo.component.html',
  styleUrls: ['./caixa-dialogo.component.scss']
})
export class CaixaDialogoComponent implements OnInit {

  @Output() btnOk: EventEmitter<void> = new EventEmitter<void>();

  public dialogo: CaixaDialogo = {
    aberto: false,
    titulo: '',
    mensagem: ''
  };

  public exibindoErro: boolean;

  constructor() {
    this.exibindoErro = false
   }

  ngOnInit() {
  }

  /**
   * Exibe uma caixa de diálogo que só fecha quando o usuário clicar para fechar.
   * * Não é obrigatório o título
   * @param msg 
   */
  public dialogo_exibir(msg: string, titulo?: string, exibindoErro?: boolean){
    setTimeout(() => {
      if(exibindoErro == null) {
        this.exibindoErro = false;
      }else{
        this.exibindoErro = exibindoErro;
      }
  
      this.dialogo.titulo = titulo || '';
      this.dialogo.mensagem = msg;
      this.dialogo.aberto = true;
    }, 1);
  }

  public confirmar(){
    this.dialogo_fechar();
    this.btnOk.emit();
  }

  public dialogo_fechar(){
    this.dialogo.titulo = '';
    this.dialogo.mensagem = '';
    this.dialogo.aberto = false;
  }

  /**
   * Exibe uma mensagem por até 3 segundos que fecha sozinha caso o usuário não o faça
   * @param msg 
   */
  public alerta_exibir(msg: string, exibindoErro?: boolean){
    setTimeout(() => {
      if(exibindoErro == null) {
        this.exibindoErro = false;
      }else{
        this.exibindoErro = exibindoErro;
      }
  
      this.dialogo.titulo = '';
      this.dialogo.mensagem = msg;
      this.dialogo.aberto = true;
      setTimeout(() => {
        this.dialogo.aberto = false;
      }, 3000);
    }, 1);
  }

}
