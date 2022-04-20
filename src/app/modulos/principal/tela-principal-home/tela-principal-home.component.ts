import { Component, OnInit, ViewChild } from '@angular/core';

// API SERVICE
import { ApiTipoUsuarioService } from '../../../modulos/segur/api/api-tipo-usuario.service';
import { ModelTipoUsuario } from '../../../modulos/segur/models/model-tipo-usuario';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';

// COMPONENTES
import { ModalPesquisaComponent } from '../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { InterfaceModalCadastro } from '../../../componentes/modal-pesquisa/interface-modal-cadastro';
import { CabecalhoBreadcrumbService } from '../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

@Component({
  selector: 'app-tela-principal-home',
  templateUrl: './tela-principal-home.component.html',
  styleUrls: ['./tela-principal-home.component.scss']
})
export class TelaPrincipalHomeComponent implements OnInit, InterfaceModalCadastro {

  @ViewChild('instanciaModalPesquisaTipoUsuario') instanciaModalPesquisaTipoUsuario: ModalPesquisaComponent;
  public listaTiposUsuario: Array<ModelTipoUsuario>;
  public erros: ApiErrorCollection;

  constructor(
    public tipoUsuarioService: ApiTipoUsuarioService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService) {
    this.erros = new ApiErrorCollection();
  }

  ngOnInit() {
    
    this.tipoUsuarioService.listar(1,30, "").then(
      tipos_usuario => {
        this.listaTiposUsuario = tipos_usuario;
      },
      erro => {
        //console.log('Erro = ', erro);
        this.erros = erro;
      }
    );

    //TODO, Raphael: trazer esse texto da tradução no HTML do i18n
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual('início');
  }

  public criarNovoBreadcrumb(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: 'listagem de usuários',
        url: '/sistema/usuario'
      }
    ]);
  }

  //Função de: InterfaceModalCadastro
  public exibirTelaCadastro(callBack: Function): void{
    alert('Exibiria aqui o modal de cadastro desse componente');
    callBack();
  }

  public exibirModalPesquisaTipoUsuario(){
    this.instanciaModalPesquisaTipoUsuario.exibir();
  }

  public tipoUsuarioAlterado($event){
    console.log('Dados recebidos: ', $event);
  }

  public getColunasGridPesquisa(): Array<GridPesquisaColumn>{
    return this.tipoUsuarioService.getColunasGrid()
  }

}
