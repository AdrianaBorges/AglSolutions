import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { TelaPrincipalService } from './tela-principal.service';

@Component({
  templateUrl: "./tela-principal.component.html",
  styleUrls: ["./tela-principal.component.scss"],
})
export class TelaPrincipalComponent implements AfterViewInit {
  @ViewChild("telaPrincipal", { static: true }) telaPrincipal: ElementRef;
  @ViewChild("areaConteudo", { static: true }) areaConteudo: ElementRef;

  private leftSplitSizePadrao: string;
  private lastPosition: string;
  public leftSplitSize: string;
  public alturaConteudo: string = "100%";

  constructor(
    private telaPrincipalService: TelaPrincipalService
  ) {
    this.leftSplitSizePadrao = '250px'
    this.lastPosition = this.leftSplitSizePadrao;
    this.leftSplitSize = this.leftSplitSizePadrao;
  }

  onResize(evento: any) {
    this.calcularAlturaConteudo();
  }

  ngAfterViewInit() {
    this.calcularAlturaConteudo();
    this.telaPrincipalService.notificarNovaLarguraSplitter(parseInt(this.leftSplitSizePadrao.replace('px', ''), 10));
  }

  private calcularAlturaConteudo() {
    var alturaTela = this.telaPrincipal.nativeElement.offsetHeight;
    setTimeout(() => {
      this.alturaConteudo = alturaTela - 30 + "px";
    }, 10);
  }

  public contrairLeftSplit() {
    this.leftSplitSize = "0px";
  }

  public expandirLeftSplit() {
    this.leftSplitSize = this.leftSplitSizePadrao;
  }

  public spliterRedimencionado(e: any) {
    let posicao = this.lastPosition;
    
    if (typeof e == "string") {
      this.lastPosition = e;
      posicao = this.lastPosition;
    } else {
      if (e === true) {
        posicao = "0";
      }
    }

    /**
     * Informar a alteraçao de tamanho esse serviço disparará um 
     * evento de change para quem fizer o subscribe dele, 
     * permitindo assim que outros componentes monitorem a mudança 
     * de tamanho do split pannel
     */
    this.notificarNovaPosicaoSplitter(parseInt(posicao.replace('px', ''),10));
  }

  private notificarNovaPosicaoSplitter(posicao: number): void{
    this.telaPrincipalService.notificarNovaLarguraSplitter(posicao);
  }
}
