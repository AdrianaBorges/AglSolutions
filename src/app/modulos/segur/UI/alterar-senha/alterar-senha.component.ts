import { Component, OnInit, Input, Output, EventEmitter,
         ElementRef, ViewChild, AfterContentChecked} from '@angular/core';
import { ApiAutenticacaoService } from '../../api/api-autenticacao.service'
//import { ApiErrorException } from '../../../../api-error/api-error-exception';
import { ApiErrorCollection } from '../../../../api-error/api-error-collection';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {
  @ViewChild('pimeiroInput') pimeiroInput: ElementRef;

  @Input() instancia: any;
  @Output() senhaAlterada: EventEmitter<boolean> = new EventEmitter<boolean>();
  public opened: boolean;

  /**
   * Variável de controle para dar foco no primeiro input do form 
   * */
  private focoDefinido: boolean;

  public dados: {
    senhaAntiga: string;
    senhaNova: string;
    senhaNova2: string;
  };

  public erros: ApiErrorCollection;

  constructor(private apiAutenticacaoService: ApiAutenticacaoService) {
    //this.limparDados();
    //console.log('dados = ', this.dados);
  }

  ngOnInit() {

    if(this.instancia){
      this.instancia['modal'] = this;
    };
  }

  //ngAfterViewInit() {}

  ngAfterContentChecked(){
    if(this.pimeiroInput){
      if (this.focoDefinido == false){
        this.focoDefinido = true;  
        this.pimeiroInput.nativeElement.focus();
      }
    }
  }

  private limparDados(){
    
    this.erros = new ApiErrorCollection();

    this.focoDefinido = false;

    this.dados =  {
      senhaAntiga: '',
      senhaNova: '',
      senhaNova2: ''
    };
  }

  public voltar(){
    this.opened = false;
    this.focoDefinido = false;
  }

  public exibir(){
    //reseto os erros que tiverem ficado de uma tentativa anterior
    this.limparDados();
    this.opened = true;
  }

  public alterarSenha(){

    //console.log('this.dados = ', this.dados);
    this.apiAutenticacaoService.trocarSenha(this.dados.senhaAntiga, this.dados.senhaNova, this.dados.senhaNova2).then(
      sucesso => {
        //senha alterada com sucesso

        //fecho o modal
        this.opened = false;

        //emito o evento de que a senha foi alterada
        this.senhaAlterada.emit(true);
      },
      erro => {
        console.log('API negou alteração de senha', erro);
        this.erros = erro;
      }
    );
    
  }

  public onClose($event): void {
    this.opened = false;
    //this.log('Window was closed');
  }

}
