import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';

//Api
import { ApiErrorCollection } from '../../../../api-error/api-error-collection'


//import { EmailValidator } from '@angular/forms';
import { ConfigEmpresaService } from '../../../config/api/config-empresa.service';
import { ConfigEmpresa } from '../../../config/models/config-empresa'
import { ApiAutenticacaoService } from '../../api/api-autenticacao.service';


//Componentes
import { AguardeCarregandoComponent } from '../../../../componentes/aguarde-carregando/aguarde-carregando.component';
import { CaixaDialogoComponent } from '../../../../componentes/caixa-dialogo/caixa-dialogo.component';


@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent implements OnInit {

  @ViewChild('elem_placeholder', { static: true }) elem_placeholder: ElementRef;
  @ViewChild('msgSucesso', { static: true }) msgSucesso: ElementRef;
  @ViewChild('aguardeCarregando', { static: true }) aguardeCarregando: AguardeCarregandoComponent;
  @ViewChild('caixaDialogo', { static: true }) caixaDialogo: CaixaDialogoComponent;
  
  public user: any = {
    email: ''
  };
  public erros: ApiErrorCollection;
  public configEmpresa: ConfigEmpresa;

  constructor(
    private route: Router,
    private configEmpresaService: ConfigEmpresaService,
    public sanitizer: DomSanitizer,
    public apiAutenticacaoService: ApiAutenticacaoService) { 

    this.erros = new ApiErrorCollection();
    this.configEmpresa = new ConfigEmpresa;
  }

  ngOnInit() {
    this.configEmpresaService.get().then(
      config => {
        this.configEmpresa = config;
      },
      error => {
        this.erros = error
      }
    );
  }

  public getPlaceholder_login(): string{
    return this.elem_placeholder.nativeElement.innerText;
  }

  public confirmar():void{
    this.exibirAguarde();
    this.apiAutenticacaoService.reiniciarSenha(this.user.email).then(
      sucesso => {
        this.esconderAguarde();
        this.caixaDialogo.dialogo_exibir(this.msgSucesso.nativeElement.innerText);
      },
      erro => {
        this.esconderAguarde();
        this.erros = erro;
        console.log(erro);
        this.caixaDialogo.alerta_exibir(erro.mensagem_geral, true);
      }
    );
  }

  public voltar(): void{
    this.route.navigate(['/login']);
  }

  public exibirAguarde(){
    this.aguardeCarregando.exibir();
  }

  public esconderAguarde(){
    this.aguardeCarregando.esconder();
  }


}
