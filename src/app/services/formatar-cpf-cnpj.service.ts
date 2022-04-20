import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatarCpfCnpjService {

  constructor() { }

  /**
   * Formata um texto para os formatos de CPF ou CPNJ
   * @param campoTexto 
   */
  public formatar(campoTexto: string): string{
    if (campoTexto.length <= 11) {
        campoTexto = this.mascaraCpf(campoTexto);
    } else {
        campoTexto = this.mascaraCnpj(campoTexto);
    }
    return campoTexto;
  }

  private mascaraCpf(valor) {
      return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
  }

  private mascaraCnpj(valor) {
      return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
  }
}
