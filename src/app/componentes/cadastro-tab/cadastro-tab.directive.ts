import { Directive, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CadastroBarraAcaoComponent } from '../cadastro-barra-acao/cadastro-barra-acao.component';
import { TabStripComponent, TabStripTabComponent } from '../../../../node_modules/@progress/kendo-angular-layout';
//import { QueryList } from '../../../../node_modules/@angular/core/src/render3';
//import { LayoutModule } from '@progress/kendo-angular-layout';

@Directive({
  selector: '[appCadastroTab]',
  host: {
    '(tabSelect)': 'onTabSelect($event)',
  },
})
export class CadastroTabDirective implements OnInit, AfterViewInit {

  @Input('id') idTab: string; 
  @Input() cadastroBarraAcao: CadastroBarraAcaoComponent;
  @Input('tab') kendo_tabs : TabStripComponent;

  //private kendo_tabs : TabStripComponent;

  private htmlElement: ElementRef;

  constructor(private el: ElementRef) {
    this.htmlElement = el;
  }

  ngOnInit(){
    if(this.idTab == undefined){
      console.error('O atributo id do elemento "kendo-tabstrip" é obrigatório quando usando a diretiva "appCadastroTab"');
    }
    if(this.cadastroBarraAcao == undefined){
      console.error('O atributo "cadastroBarraAcao" do elemento "kendo-tabstrip" é obrigatório quando usando a diretiva "appCadastroTab"')
    }else{
      this.cadastroBarraAcao.estaEmEdicao.subscribe((emEdicao)=>{
        this.habilitarTabs(emEdicao);
      });
    }
  }

  private emEdicao: boolean;
  private habilitarTabs(emEdicao: boolean){
    this.emEdicao = emEdicao;
    
    if(this.kendo_tabs){
      if(this.kendo_tabs.tabs){
    
        this.kendo_tabs.tabs.forEach((tab: TabStripTabComponent, index: number)=>{
          if(index > 0){
            tab.disabled = emEdicao;
          }
        });
      }//compoennte do KendoUI Tabs não instanciado ainda
    }//compoennte do KendoUI Tabs não instanciado ainda
  }

  ngAfterViewInit(){
    if(this.kendo_tabs){
      //após inicialização completa do componente e do DOM tento novamente definir o 
      //status inicial que os TABs devem estar em relação a situação de edição do form.
      //isso foi necessário para o caso de um cadastro novo, e por ser uma alteração do DOM
      //após o ciclo do angular ter sido completado é necessário colocar esse timeout
      //para o Angular não levantar uma exceção.
      setTimeout(() => this.habilitarTabs(this.emEdicao), 0);
    }else{
      console.error('Não foi possível indetificar o componente "kendo-tabstrip" ma diretiva [appCadastroTab]')
    }
  }

  /**
   * Evento disparado pelo kendo-tabstrip quando uma TAB nova é selecionada
   * @param $event 
   */
  onTabSelect($event){
    //console_log('indice tab selecionado = ', $event.index);
  }

}
