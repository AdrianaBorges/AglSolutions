import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TelaPrincipalService {

  /** 
   * Emite notificação a cada mudança de posição da plitter bar
   */
  @Output() notificadorLarguraSplitter: EventEmitter<number> =
    new EventEmitter<number>();

  constructor() {}

  /**
   * Recebe notificação da tela principal da nova localização no eixo X
   * da splitter bar
   * @param tamanho 
   */
  public notificarNovaLarguraSplitter(tamanho: number): void{
    this.notificadorLarguraSplitter.emit(tamanho);
  }

}
