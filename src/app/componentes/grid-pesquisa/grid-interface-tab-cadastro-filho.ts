import { CadastroBarraAcaoComponent } from '../cadastro-barra-acao/cadastro-barra-acao.component';

export interface GridInterfaceTabCadastroFilho {
    gridInterfaceTabCadastroFilho_setIdCadastro(id: string): void;

    gridInterfaceTabCadastroFilho_getCadastroBarraAcao(): CadastroBarraAcaoComponent;
}