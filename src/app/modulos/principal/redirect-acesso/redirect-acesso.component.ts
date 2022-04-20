import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiErrorCollection } from '../../../api-error/api-error-collection'
import { ApiAutenticacaoService } from '../../segur/api/api-autenticacao.service';
import { Autenticacao } from '../../segur/models/autenticacao';

import { ConfigEmpresaService } from '../../config/api/config-empresa.service';
import { ConfigEmpresa } from '../../config/models/config-empresa';

@Component({
  selector: 'app-redirect-acesso',
  templateUrl: './redirect-acesso.component.html',
  styleUrls: ['./redirect-acesso.component.scss']
})
export class RedirectAcessoComponent implements OnInit, AfterContentInit {

  public id_erro: number = 0;
  public erros: ApiErrorCollection = new ApiErrorCollection();
  public configEmpresa: ConfigEmpresa = new ConfigEmpresa();

  constructor(
    private route: ActivatedRoute,
    private apiAutenticacaoService: ApiAutenticacaoService,
    private router: Router,
    private configEmpresaService: ConfigEmpresaService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    
  }

  ngAfterContentInit() {
    this.id_erro = 0;
    this.lerConfiguracoes().then(
      config => {
        this.autenticar().then(
          usuario => {
            this.redirecionar();
          }
        );
      }
    );
    
  }

  private lerConfiguracoes(): Promise<ConfigEmpresa>{
    return new Promise((resolve, reject)=>{
      this.configEmpresaService.get().then(
        config => {
          this.configEmpresa = config;
          resolve(config);
        },
        error => {
          this.erros = error
          reject(error);
        }
      );
    });
    
  }

  private autenticar(): Promise<Autenticacao>{
    return new Promise((resolve, reject)=>{
      var token = this.route.snapshot.paramMap.get('token');
      
      if(!token){
        this.id_erro = 1;
        reject();
      }else if(token.length == 0){
        this.id_erro = 1;
        reject();
      }else{
        this.apiAutenticacaoService.validarToken(token).then(
          usuario => {
            resolve(usuario);
          },
          erros => {
            this.erros = erros;
            this.id_erro = 2;
            reject(erros)
          }
        );
      }
    })
  }

  private redirecionar(): void{
    var url_redirect = this.route.snapshot.paramMap.get('url_redirect');

    if(!url_redirect){
      this.router.navigate(['']);//tela principal
    }else if(url_redirect.length == 0){
      this.router.navigate(['']);//tela principal
    }else{
      url_redirect = decodeURIComponent(url_redirect);

      this.router.navigate([url_redirect]);//navega pra url informada
    }
    
  }

}
