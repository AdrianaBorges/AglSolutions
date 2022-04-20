import { Component, OnInit } from '@angular/core';
import { ConfigEmpresa } from '../modulos/config/models/config-empresa';
import { ConfigEmpresaService } from '../modulos/config/api/config-empresa.service';
import { ApiErrorCollection } from '../api-error/api-error-collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.scss']
})
export class PaginaNaoEncontradaComponent implements OnInit {

  public erros: ApiErrorCollection;
  public configEmpresa: ConfigEmpresa;

  constructor(
    private route: Router,
    private configEmpresaService: ConfigEmpresaService
  ) { 
    this.configEmpresa = new ConfigEmpresa;
  }

  ngOnInit() {
    this.configEmpresaService.get().then(
      config => {
        //console.log('config = ', config);
        this.configEmpresa = config;
      },
      error => {
        this.erros = error
      }
    );
  }

  goToLogin (){
    this.route.navigate(['/login']);
  }

}
