import { Component } from '@angular/core';
import { ConfigEmpresaService } from './modulos/config/api/config-empresa.service'
import { ConfigEmpresa } from './modulos/config/models/config-empresa'
import { AssetsLocaleService } from './assets-locale/assets-locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'app';

  constructor(
    private configEmpresaService: ConfigEmpresaService,
    private assetsLocaleService: AssetsLocaleService){
    //called first time before the ngOnInit()
  }

  ngOnInit(){
      //faço essa chamada para garantir que os dados de locale estarão carregados
      //this.assetsLocaleService.carregarDados().then();
      //called after the constructor and called  after the first ngOnChanges() 
      //var config: ConfiEmpresa;
      this.configEmpresaService.get().then(
        config => {
          //só faço isso para garantir que estará já carregado o JSON em memória
        },
        error =>{
          //erro
          console.error('Não foi possível carregar os dados do cliente', error);
        }
      );
  }


}
