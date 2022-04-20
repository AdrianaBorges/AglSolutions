import { 
  Component, OnInit, AfterViewInit, AfterContentInit,
  Input, Output, EventEmitter, ViewChild, OnDestroy,
  ContentChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//COMPONENTE MODULES
import { AguardeCarregandoComponent } from '../aguarde-carregando/aguarde-carregando.component';

//CONTAINER DE BOTÕES
import { CadastroBarraAcaoBotaoComponent } from './templates/cadastro-barra-acao-botao/cadastro-barra-acao-botao.component';
import { CadastroBarraAcaoContainerBotoesComponent } from './templates/cadastro-barra-acao-container-botoes/cadastro-barra-acao-container-botoes.component';

import { Location } from '@angular/common';
//import { Subscribable } from '../../../../node_modules/rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";
import { FormGroupDataBind } from '../camada-logica/Forms/FormGroupDatabind';
import { ValidarPermissaoRotaService } from '../../validar-permissao-rota.service';
import { GridPesquisaComponent } from '../grid-pesquisa/grid-pesquisa.component';

import { CabecalhoBreadcrumbService } from '../cabecalho-breadcrumb/cabecalho-breadcrumb.service';

@Component({
  selector: 'app-cadastro-barra-acao',
  templateUrl: './cadastro-barra-acao.component.html',
  styleUrls: ['./cadastro-barra-acao.component.scss']
})
export class CadastroBarraAcaoComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  @ViewChild('aguardeCarregando', { static: true }) aguardeCarregando: AguardeCarregandoComponent;
  @Input() nomeParametroIdRota: string;
  @Input() formGroup: FormGroup;
  @Input() apiFieldKey: string;
  @Output() confirmar: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelar: EventEmitter<any> = new EventEmitter<any>();
  @Output() excluir:  EventEmitter<any> = new EventEmitter<any>();
  @Output() estaEmEdicao:  EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() botaoAcaoClick: EventEmitter<CadastroBarraAcaoBotaoComponent> = new EventEmitter<CadastroBarraAcaoBotaoComponent>();

  @ContentChild(CadastroBarraAcaoContainerBotoesComponent, { static: true }) containerBotoesAcaoComponent: CadastroBarraAcaoContainerBotoesComponent;

  //atributos usados quando pertence a uma TAB
  /**
   * Atributo que deve ser informado quando é um cadastro filho usado dentro de uma TAB
   */
  private gridPesquisaComponent: GridPesquisaComponent;
  /**
   * Id do cadastro selecionado pelo gridPesquisa quando esse 
   * componente é usado para um cadastro filho dentro de uma TAB 
   */
  private idCadastro: string;
  /**
   * Controla se deve ou não estar sendo exibido quando 
   * usado para listar os dados de um cadastro filho dentro de uma TAB 
   */
  @Input() isNotVisible: boolean;

  public modoExclusao: boolean;
  public openedDialog: boolean = false;
  public formGroupDatabind: FormGroupDataBind;

  private subscription: ISubscription;
  private formStatus: string;
  public emEdicao: boolean;

  public habilitado_pro_usuario: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private validarPermissaoRotaService: ValidarPermissaoRotaService,
    private cabecalhoBreadcrumbService: CabecalhoBreadcrumbService) {
    this.formGroupDatabind = new FormGroupDataBind();

    this.nomeParametroIdRota = this.nomeParametroIdRota||'id';

    /**
     * O padrão deve ser false, para que esse atributo 
     * não seja necessário nos cadastros principais
     */
    if(this.isNotVisible == undefined){
      this.isNotVisible = false;
    }

    //Observa sempre que o componente formularioRecarregado popula os dados do formulário
    this.formGroupDatabind.formularioRecarregado.subscribe((cadastroNovo)=>{
      this.emEdicao = cadastroNovo;
      this.estaEmEdicao.emit(this.emEdicao);
    });
   }

  ngOnInit(){
    if(this.isNotVisible == true){
      //Se não estiver visível não deve fazer coisa alguma
      return;
    }else{
      //Só entra aqui no caso de ser um cadastro principal, ou um cadastro pai
      //cadastros filhos não fazem coisa alguma na inicialização
      this.modoExclusao = (this.route.snapshot.paramMap.get('operacao') == 'excluir');

      if(this.modoExclusao){
        this.formGroup.disable();
      }
      
      this.validarPermissoes_CRUDE();
    }
  }
  ngAfterViewInit() {
    if(this.habilitado_pro_usuario==false){
      this.emEdicao = false;
      return;
    }

    this.emEdicao = true;

    this.subscription = this.formGroup.statusChanges.subscribe((status)=>{
      this.formStatus = status;
      //console.log(`subscribe status = ${status}, pristine = ${this.formGroup.pristine}, dirty = ${this.formGroup.dirty}, touched = ${this.formGroup.touched}`);

      if(this.formGroup.pristine){
        //não está editando
        this.emEdicao = false;
      }else{
        //editando
        this.emEdicao = true;
      }

      this.estaEmEdicao.emit(this.emEdicao);

    });
  }

  ngAfterContentInit(){
    if(!this.containerBotoesAcaoComponent){
      this.containerBotoesAcaoComponent = new CadastroBarraAcaoContainerBotoesComponent();
    }
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  /**
   * Ao informar o id do cadastro a ser exibido também tornará esse componente visível
   * @param id identificação do cadastro que deve ser exibido para editar, quando o valor é 
   * zero abre o cadastro para inclusão
   */
  public setIdCadastro(id: string, grid: GridPesquisaComponent){
    this.modoExclusao = false;
    this.gridPesquisaComponent = grid;
    this.idCadastro = id;
    this.isNotVisible = false;
    this.formGroup.enable();
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
    this.validarPermissoes_CRUDE();
  }

  /**
   * para cadastros filhos é necessário que o grid 
   * consiga informar que ele deve se portar como 
   * um cadastro em exclusão
   */
  public setModoExclusao(id: string, grid: GridPesquisaComponent){
    this.modoExclusao = true;
    this.gridPesquisaComponent = grid;
    this.idCadastro = id;
    this.isNotVisible = false;

    this.formGroup.disable();
    
    this.validarPermissoes_CRUDE();
  }

  /**
   * Coloca o cadastro em modo de consulta, impedindo a edição dos dados do formulário
   * e apresentando apenas o botão e voltar
   */
  public setModoConsulta(){
    this.modoExclusao = true;

    if(this.formGroup){
      this.formGroup.disable();
    }
    
    this.habilitado_pro_usuario = false;
  }

  /**
   * Valida as permissões retornadas pelo API do menu para saber se o usuário
   * pode excluir, alterar e/ou editar o cadastro.
   */
  private validarPermissoes_CRUDE():boolean{
    //var id = +this.route.snapshot.paramMap.get('id');
    var id: string;

    if(this.idCadastro != '0' && this.idCadastro != undefined){
      //id provido pelo componente do grid-pesquisa
      id = this.idCadastro;
    }else{
      //id de um cadastro Principal, identificado pelo Url Parameter
      id = this.route.snapshot.paramMap.get(this.nomeParametroIdRota); 
    }
    

    if(this.modoExclusao){
      this.habilitado_pro_usuario = this.validarPermissaoRotaService.funcaoValidaProUsuario('Delete');
      return this.habilitado_pro_usuario;
    }
    if(id == '0'){
      if(this.validarPermissaoRotaService.funcaoValidaProUsuario('Create')==true){
        this.habilitado_pro_usuario = true;
        return this.habilitado_pro_usuario;
      }else{
        this.formGroup.disable();
      }
    }else if(id != '0'){
      if(this.validarPermissaoRotaService.funcaoValidaProUsuario('Update')==true){
        this.habilitado_pro_usuario = true;
        return this.habilitado_pro_usuario;
      }else{
        this.formGroup.disable();
      }
    } else{
      if(this.validarPermissaoRotaService.funcaoValidaProUsuario('Create')==true){
        this.habilitado_pro_usuario = true;
        return this.habilitado_pro_usuario;
      }else if(this.validarPermissaoRotaService.funcaoValidaProUsuario('Update')==true){
        this.habilitado_pro_usuario = true;
        return this.habilitado_pro_usuario;
      }else{
        this.formGroup.disable();
      }
    }
    
    this.habilitado_pro_usuario = false;
  }

  btnVoltar(){
    if(this.gridPesquisaComponent == null){
      var rotaAnterior = this.cabecalhoBreadcrumbService.getRotaAnterior();
      this.router.navigateByUrl(rotaAnterior);
      
      //this._location.back();
    }else{
      //existindo o gridPesquisa, após clicar em voltar deve tornar esse componente invisível
      this.formGroup.enable();
      this.isNotVisible = true;
      this.gridPesquisaComponent.exibir();
    }
  }

  protected btnCancelar(){
    this.emEdicao = false;
    this.cancelar.emit();
    this.estaEmEdicao.emit(this.emEdicao);
  }

  protected btnConfirmar(){
    this.emEdicao = false;
    this.confirmar.emit();
    this.estaEmEdicao.emit(this.emEdicao);
  }

  protected btnExcluir(){
    this.openedDialog = true;
  }

  public exibirAguarde(callback?: Function){
    this.aguardeCarregando.exibir();
    if(callback){
      setTimeout(()=>{
        callback();
      },1);
    }
  }

  public esconderAguarde(){
    this.aguardeCarregando.esconder();
  }

  public closeDialogExcluir(status) {
    if(status  == 'yes'){
      this.excluir.emit();
    }
    this.openedDialog = false;
  }

  /**
   * Quando usado em uma tab filha, esconde o cadastro e volta a exibir a listagem do cadastro
   */
  public esconder(){
    if(this.gridPesquisaComponent){
      this.formGroup.enable();
      this.isNotVisible = true;
      this.gridPesquisaComponent.exibir();
    }
  }

  public openDialog() {
    this.openedDialog = true;
  }

  public btnAcao_click(botao: CadastroBarraAcaoBotaoComponent): void{
    var naoUsarRota = false;
    if(this.botaoAcaoClick){
      if(!botao.rotaFilha_url){
        this.botaoAcaoClick.emit(botao);
        naoUsarRota = true;
      }
    }
    if(naoUsarRota == false){
      var id = '0';//this.route.snapshot.paramMap.get(this.nomeParametroIdRota); 
      var rotaAtual = this.router.url;
      var rotaExclusao = '';
      if(rotaAtual.indexOf('/excluir') >= 0) rotaExclusao = '/excluir';
      rotaAtual = rotaAtual.replace('/excluir','');
      if(id == '0' && this.apiFieldKey){
        if(this.formGroup.controls[this.apiFieldKey]){
          id = this.formGroup.controls[this.apiFieldKey].value + '';
          var arrayRota = rotaAtual.split('/');
          arrayRota.splice(arrayRota.length -1,1);
          rotaAtual = arrayRota.join('/') + '/' + id + rotaExclusao;
          this.cabecalhoBreadcrumbService.aplicarRota(rotaAtual);
          this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(id);
        }
      }
      if(id == '0'){
        /**
         * Pego pela rota como uma alternativa apenas, 
         * pois em caso de um cadastro novo a rota está com valor zero
         * e caso o dev indique o nome do atributo na rota errada, ainda assim 
         * o sistema pode pegar o valor certo pela chave primária
         */
        id = this.route.snapshot.paramMap.get(this.nomeParametroIdRota); 
      }
      
      if(id != '0' && id != undefined){
        rotaAtual = rotaAtual.replace('/excluir','');
        this.router.navigateByUrl(`${rotaAtual}/filho/${botao.rotaFilha_url}`);
      }
    }
    
  }

}
