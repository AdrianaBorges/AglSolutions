import { Injectable } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subject }    from 'rxjs';

export interface iBreadcrumb {
  texto: string,
  url: string
}

// coloquei o "providedIn: 'root'," para que seja um singleton para a aplicação
@Injectable({
  providedIn: 'root',
})
export class CabecalhoBreadcrumbService {

  private rotasNavegadas: Array<iBreadcrumb> = [];

  // Observable iBreadcrumb source
  private breadcrumbsSource = new Subject<iBreadcrumb[]>();

  public breadcrumbs$ = this.breadcrumbsSource.asObservable();

  constructor(
    private router: Router,
  ) { 
    router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        this.aplicarRota(router.url);
      }
    });
  }

  /**
   * Verifica se a rota atual é: 
   * 1) uma sequencia da anterior;
   * 2) uma substituta da anterior;
   * 3) ou uma anterior
   * com base nisso decide como modificar a lista 
   * de rotas para adicionar a rota atual
   * @param rotaAtual 
   */
  public aplicarRota(rotaAtual: string){

    if(this.rotasNavegadas.length == 0){
      this.rotasNavegadas.push({url: rotaAtual, texto: ''});
    }else{
      var urlUltimaRotaNavegada = this.rotasNavegadas[this.rotasNavegadas.length - 1].url;

      if(urlUltimaRotaNavegada == rotaAtual){
        return;
      }

      urlUltimaRotaNavegada = urlUltimaRotaNavegada.replace('/excluir','');
      var arrayUltimaRotaNavegada = urlUltimaRotaNavegada.split('/');
      
      var arrayRotaAtual = rotaAtual.split('/');

      if(arrayUltimaRotaNavegada.length == arrayRotaAtual.length){
        this.rotasNavegadas.splice(this.rotasNavegadas.length-1,1);
        this.rotasNavegadas.push({url: rotaAtual, texto: ''});
      }else if(arrayUltimaRotaNavegada.length > arrayRotaAtual.length){
        this.rotasNavegadas.splice(this.rotasNavegadas.length-1,1);
        this.aplicarRota(rotaAtual);
      }else {
        //ultima rota navegada é menor que a rota atual
        var ultimaRotaNavegada = this.rotasNavegadas[this.rotasNavegadas.length - 1].url;
        ultimaRotaNavegada = ultimaRotaNavegada.replace('/excluir','');
        if(rotaAtual.indexOf(ultimaRotaNavegada) >= 0){
          this.rotasNavegadas.push({url: rotaAtual, texto: ''});
        }else{
          this.rotasNavegadas.splice(this.rotasNavegadas.length-1,1);
          this.aplicarRota(rotaAtual);
        }
      }
    }
  }

  /**
   * Descontinuado, favor usar o método "setNomeBreadcrumbRotaAtual"
   * @param breadcrumbs 
   * @deprecated
   */
  public setBreadcrumbs(breadcrumbs: iBreadcrumb[]){
    this.breadcrumbsSource.next(breadcrumbs);
  }

  /**
   * Cada página agora deve passar unicamente o nome dela para esse método
   * @param nome 
   * nome da página sendo acessada.
   * * **Atenção!** não esquecer de passar o nome traduzido pelo i18n capturado do HTML
   */
  public setNomeBreadcrumbRotaAtual(nome: string){
    if(this.rotasNavegadas.length > 0){
      if(this.rotasNavegadas[this.rotasNavegadas.length - 1].texto.length == 0){
        this.rotasNavegadas[this.rotasNavegadas.length - 1].texto = nome;
      }
      this.breadcrumbsSource.next(this.rotasNavegadas);
    }
    
  }

  public getRotaAnterior(): string{
    if(this.rotasNavegadas.length >= 2){
      return this.rotasNavegadas[this.rotasNavegadas.length - 2].url;
    }else{
      //return '';
      var modoExclusao = false;
      var indexExcluir = this.router.url.indexOf('excluir');
      if( indexExcluir + "excluir".length == this.router.url.length){
        modoExclusao = true;
      }
      this.setNomeBreadcrumbRotaAtual('')
      var arrayRota = this.router.url.split('/');
      if(modoExclusao){
        arrayRota.splice(arrayRota.length-2,2);
      }else{
        arrayRota.splice(arrayRota.length-1,1);
      }
      var rotaAnterior = arrayRota.join('/');
      return rotaAnterior;
    }
  }

  public voltar(): void{
    var rotaAnterior = this.getRotaAnterior();
    this.router.navigateByUrl(rotaAnterior);
  }

}
