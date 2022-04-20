import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfigEmpresa } from '../../modulos/config/models/config-empresa';
import { ConfigEmpresaService } from '../../modulos/config/api/config-empresa.service';
import { ApiErrorCollection } from '../../api-error/api-error-collection';
import { Autenticacao } from '../../modulos/segur/models/autenticacao';
import { ApiAutenticacaoService } from '../../modulos/segur/api/api-autenticacao.service';
import { PopupModule } from '@progress/kendo-angular-popup';
//import { AlterarSenhaComponent } from './../../modulos/segur/ui/alterar-senha/alterar-senha.component';
import { UsuAlterarSenhaComponent } from './../usu-alterar-senha/usu-alterar-senha.component';
import { Router } from '@angular/router';

//import { DomSanitizer  } from '@angular/platform-browser';
//serve para poder exibir uma imagem proveniente de uma URL externa sem 
//que seja bloqueada pelo navegador infromando que é de uma fonte confiável

@Component({
  selector: 'app-cabecalho-sistema',
  templateUrl: './cabecalho-sistema.component.html',
  styleUrls: ['./cabecalho-sistema.component.scss']
})
export class CabecalhoSistemaComponent implements OnInit {

  @ViewChild('anchor', { static: true }) anchor: ElementRef;
  public configEmpresa: ConfigEmpresa;
  public erros: ApiErrorCollection;
  public usuario: Autenticacao;
  public estiloUsuarioMenu: string;
  public exibirDadosUsuario: boolean;
  public exibindoTrocarSenha: boolean;

  public senhaNova: string;
  public senhaConfirmada: string;
  @ViewChild('modalAlterarSenha', { static: true }) modalAlterarSenha: UsuAlterarSenhaComponent;

  constructor(
    private configEmpresaService: ConfigEmpresaService,
    private apiAutenticacaoService: ApiAutenticacaoService,
    private popupModule: PopupModule,
    private router: Router
    //private sanitizer: DomSanitizer 
    //,private apiErrorCollection: ApiErrorCollection
  ) { 
    this.configEmpresa = new ConfigEmpresa;
    this.exibirDadosUsuario = false;
    this.exibindoTrocarSenha = false;
    this.estiloUsuarioMenu= '';
    //this.erros = new ApiErrorCollection();
  }

  ngOnInit() {
    this.configEmpresaService.get().then(
      config => {
        this.configEmpresa = config;
        this.estiloUsuarioMenu = config.corCabecalhoUsuario;
      },
      error => {
        this.erros = error
      }
    );

    this.usuario = this.apiAutenticacaoService.getUsuarioLogado();
    if(this.usuario == null){
      this.usuario = new Autenticacao;
      this.router.navigate(['/login']);
    }
  }

  getEstiloUsuarioMenu (){
    //return this.sanitizer.bypassSecurityTrustStyle(this.estiloUsuarioMenu);
    return this.estiloUsuarioMenu;
  }

  onToggleDadosUsuario(){
    this.exibirDadosUsuario = !this.exibirDadosUsuario;
    
  }

  senhaAlterada(){
    //console.log('Senha alterada');
  }

  exibirModalTrocarSenha(){
    //console.log('exibir modal');
    // this.exibindoTrocarSenha = true;
    this.exibirDadosUsuario = false;
    this.modalAlterarSenha.exibir();
  }

  sair(){
    this.apiAutenticacaoService.limparAutenticacao();
    this.router.navigate(['/login']);
  }

  // public closeModalTrocarSenha() {
  //   this.exibindoTrocarSenha = false;
  // }

}
