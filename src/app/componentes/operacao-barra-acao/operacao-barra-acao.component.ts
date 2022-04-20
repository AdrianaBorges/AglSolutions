import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

//Componentes
import { AguardeCarregandoComponent } from "../aguarde-carregando/aguarde-carregando.component";
import { ApiErrorCollection } from "../../api-error/api-error-collection";

//Serviços
import {
  GridPesquisaPersisteEstadoService,
  FiltroPersistido,
} from "../grid-pesquisa/grid-pesquisa-persiste-estado.service";
import { ConfigEmpresaService } from "../../modulos/config/api/config-empresa.service";
import { TelaPrincipalService } from '../../modulos/principal/tela-principal/tela-principal.service';

@Component({
  selector: "app-operacao-barra-acao",
  templateUrl: "./operacao-barra-acao.component.html",
  styleUrls: ["./operacao-barra-acao.component.scss"],
})
export class OperacaoBarraAcaoComponent implements OnInit {
  /**
   * Form Group dos campos de pesquisa para manter a
   * persistência deles ao retornar ao grid
   */
  @Input() formGroupPesquisa: FormGroup;

  /**
   * Instância do api que vai executar a consulta
   */
  @Input() apiService: any;
  /**
   * Nome do método a ser invocado da api
   */
  @Input() nomeMetodoApi: string;
  /**
   * Instância do objeto que receberá em suas propriedades os
   * valores do formulário de pesquisa e será enviado pra api
   */
  @Input() apiSearchObject: any;

  /**
   * Nomes separados por pipe dos modelos de relatórios
   */
  @Input() modeloRelatorioNames: string;
  /**
   * Códigos separados por pipe correspondentes a cada nome
   * indicado na propriedade modeloRelatorioNames
   */
  @Input() modeloRelatorioCodigos: string;

  /**
   * * Não é obrigatório.
   *
   * * Informe o nome do método a ser executado para exibição do relatório.
   *
   * * Para esse campo é obrigatório que ao menos um código de relatório
   * tenha sido informado na propriedade "modeloRelatorioCodigos"
   *
   */
  @Input() metodoPreprocessamento: string;

  /**
   * Define que a opção de exibição em arquivo está disponível
   */
  @Input() modoExibicao_arquivo: boolean = false;
  /**
   * Define que a opção de exibição em relatório está disponivel
   */
  @Input() modoExibicao_relatorio: boolean = false;

  @Input() tipoExecucao_online: boolean = false;
  @Input() tipoExecucao_batch: boolean = false;

  @Input() arquivoSaida_csv: boolean = true;
  @Input() arquivoSaida_excel: boolean = true;
  @Input() arquivoSaida_word: boolean = false;

  @Output() exibirErros: EventEmitter<ApiErrorCollection> = new EventEmitter<ApiErrorCollection>();

  @ViewChild("aguardeCarregando", { static: true })
  aguardeCarregando: AguardeCarregandoComponent;

  @ViewChild("traducaoOptOnLine", { static: true })
  traducaoOptOnLine: ElementRef;
  @ViewChild("traducaoOptBatch", { static: true })
  traducaoOptBatch: ElementRef;
  @ViewChild("traducaoOptExportarParaArquivo", { static: true })
  traducaoOptExportarParaArquivo: ElementRef;
  @ViewChild("traducaoOptExportarParaRelatorio", { static: true })
  traducaoOptExportarParaRelatorio: ElementRef;
  @ViewChild("traducaoOptArquivoSaida01", { static: true })
  traducaoOptArquivoSaida01: ElementRef;
  @ViewChild("traducaoOptArquivoSaida02", { static: true })
  traducaoOptArquivoSaida02: ElementRef;
  @ViewChild("traducaoOptArquivoSaida03", { static: true })
  traducaoOptArquivoSaida03: ElementRef;

  @ViewChild("barraAcao", { static: true }) barraAcao: ElementRef;

  public formGroupOpcoes: FormGroup;
  public opcoesSelecinadasDoRelatorio = {
    inTipoExecucao: 0,
    inTipoSaida: 0,
    inTipoArqSaida: 1,
    codRelatorio: "",
  };

  /** online, batch */
  public optionsTipoExecucao = [];
  /** Arquivo, Relatório */
  public optionsModoExibicao = [];
  /** CSV, Excell */
  public optionsTipoArquivoSaida = [];
  /** Modelos fornecidos pelo usuário */
  public optionsModelosRelatorios = [];

  public larguraBarraAcao = "100%";

  public urlDownload: string = "";
  public urlExibirLog: string = "";

  public apiErrorCollection: ApiErrorCollection;

  /** Controla exibição da mensagem de erro */
  public openedDialogError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private gridPesquisaPersisteEstadoService: GridPesquisaPersisteEstadoService,
    private route: Router,
    private configEmpresaService: ConfigEmpresaService,
    private telaPrincipalService: TelaPrincipalService,
  ) {
    this.nomeMetodoApi = this.nomeMetodoApi || "listar";
    this.iniciarErrorCollection();

    telaPrincipalService.notificadorLarguraSplitter.subscribe((largura) => {
      this.calcularLarguraBarraAcao(largura);
    })
  }

  private iniciarErrorCollection() {
    this.apiErrorCollection = new ApiErrorCollection();
  }

  ngOnInit(): void {
    //Validações de implementações desse componente pelos DEVs
    this.validarParametrosDadosPreprocessamento();
    this.validarParametrosTipoExecucao();

    this.popularFiltrosPersistidos();
    this.carregarTraducoesParaListasDropdown();
    this.criarForm();
    this.carregarListaModelosRelatorio();
    this.calcularLarguraBarraAcao(null);
  }

  public exibirAguarde() {
    this.aguardeCarregando.exibir();
  }

  public esconderAguarde() {
    this.aguardeCarregando.esconder();
  }

  private criarForm() {
    this.formGroupOpcoes = this.formBuilder.group({
      inTipoExecucao: [this.opcoesSelecinadasDoRelatorio.inTipoExecucao],
      inTipoSaida: [this.opcoesSelecinadasDoRelatorio.inTipoSaida],
      inTipoArqSaida: [this.opcoesSelecinadasDoRelatorio.inTipoArqSaida],
      codRelatorio: [this.opcoesSelecinadasDoRelatorio.codRelatorio],
    });
  }

  public getTraducao(elem: ElementRef): string {
    return elem?.nativeElement?.innerText;
  }

  private modeloRelatorioInformado(): boolean {
    const arrayCodigos = this.modeloRelatorioCodigos
      ? this.modeloRelatorioCodigos.split("|")
      : [];
    const lenCodigos = arrayCodigos.length;

    return lenCodigos > 0;
  }

  private carregarTraducoesParaListasDropdown() {
    //Tipo de execução
    if (this.tipoExecucao_online) {
      this.optionsTipoExecucao.push({
        texto: this.getTraducao(this.traducaoOptOnLine),
        id: 0,
      });
    }
    if (this.tipoExecucao_batch) {
      this.optionsTipoExecucao.push({
        texto: this.getTraducao(this.traducaoOptBatch),
        id: 1,
      });
    }

    // Opções de modo de exibição
    if (this.modoExibicao_arquivo) {
      this.optionsModoExibicao.push({
        texto: this.getTraducao(this.traducaoOptExportarParaArquivo),
        id: 0,
      });
    }
    if (this.modoExibicao_relatorio && this.modeloRelatorioInformado()) {
      this.optionsModoExibicao.push({
        texto: this.getTraducao(this.traducaoOptExportarParaRelatorio),
        id: 1,
      });
    }

    // Tipos de arquivo de saída
    if(this.arquivoSaida_csv){
      this.optionsTipoArquivoSaida.push({
        texto: this.getTraducao(this.traducaoOptArquivoSaida01),
        id: 0,
      });
    }
    if(this.arquivoSaida_excel){
      this.optionsTipoArquivoSaida.push({
        texto: this.getTraducao(this.traducaoOptArquivoSaida02),
        id: 1,
      });
    }
    if(this.arquivoSaida_word){
      this.optionsTipoArquivoSaida.push({
        texto: this.getTraducao(this.traducaoOptArquivoSaida03),
        id: 2,
      });
    }
    if(this.optionsTipoArquivoSaida.length === 1){
      this.opcoesSelecinadasDoRelatorio.inTipoArqSaida = this.optionsTipoArquivoSaida[0].id
    }
  }

  private carregarListaModelosRelatorio() {
    const arrayNomes = this.modeloRelatorioNames
      ? this.modeloRelatorioNames.split("|")
      : [];
    const arrayCodigos = this.modeloRelatorioCodigos
      ? this.modeloRelatorioCodigos.split("|")
      : [];
    const lenNomes = arrayNomes.length;
    const lenCodigos = arrayCodigos.length;

    if (lenNomes != lenCodigos && lenCodigos > 1) {
      console.error(
        `relatario-barra-acao.component deve ter a mesma quantidade de nomes 
        e códigos separados por pipe informados nas propriedades: modeloRelatorioNames, 
        modeloRelatorioCodigos, ou ter apenas 1 código informado sem necessidade de 
        informar o nome`
      );
    } else if (lenCodigos == 1) {
      this.opcoesSelecinadasDoRelatorio.codRelatorio = arrayCodigos[0];
    } else if (lenNomes > 0) {
      arrayNomes.forEach((nome, index) => {
        this.optionsModelosRelatorios.push({
          texto: nome,
          id: arrayCodigos[index],
        });
      });
    }
  }

  /**
   * Carrega novamente no formulário os dados filtrados
   * anteriormente
   */
  private popularFiltrosPersistidos(): boolean {
    var filtroGravado: FiltroPersistido;

    filtroGravado =
      this.gridPesquisaPersisteEstadoService.getCompositeFilterDescriptor(
        this.route.url
      );
    if (filtroGravado) {
      if (this.formGroupPesquisa) {
        this.formGroupPesquisa.setValue(filtroGravado.formGroupPesquisaData);
      }

      return true;
    }

    return false;
  }

  /**
   * Enviar os dados de filtros do form group para serem persistidos
   * de forma a serem usados na próxima vez que a tela for recarregada.
   */
  private persistirDadosFiltro() {
    var formGroupPesquisaData = {};
    if (this.formGroupPesquisa) {
      formGroupPesquisaData = this.formGroupPesquisa.value;
    }
    this.gridPesquisaPersisteEstadoService.adicionar(
      this.route.url,
      0,
      null,
      formGroupPesquisaData
    );
  }

  /**
   * Retorna um objeto preenchido com os valores informados no form group
   * @param formGroup
   * @returns
   */
  private getValues(formGroup: FormGroup): any {
    let objDados = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const formControl = <FormControl>formGroup.get(key);
      console.log(`key = [${key}], formControl`, formControl);
      let valor = formControl.value
      // Valores de multiselect (ou seja, em array) são transformados em uma string separando itens por vírgula
      if(formControl.value instanceof Array){
        valor = valor.join()
      }
      objDados[key] = valor;
    });
    return objDados;
  }

  btnExecutarConsulta(): void {
    this.persistirDadosFiltro();

    let dadosPesquisa = this.getValues(this.formGroupPesquisa);
    const opcoesPesquisa = this.getValues(this.formGroupOpcoes);

    dadosPesquisa = {
      ...this.apiSearchObject,
      ...dadosPesquisa,
      ...opcoesPesquisa,
    };

    this.exibirAguarde();

    this.apiService[this.nomeMetodoApi](dadosPesquisa).then(
      (resposta) => {
        this.esconderAguarde();
        this.iniciarErrorCollection();
        this.urlDownload = resposta.chNomArqSaida;
        this.urlExibirLog = resposta.chNomArqLog;

        if (this.metodoPreprocessamento) {
          this.exibirRelatorio();
        }
      },
      (erro) => {
        console.error("erro", erro);
        this.esconderAguarde();
        this.apiErrorCollection = erro;
        this.openedDialogError = true;
        this.exibirErros.emit(this.apiErrorCollection)
      }
    );
  }

  closeDialogEerror(): void {
    this.openedDialogError = false;
  }

  exibirRelatorio() {
    const metodo = this.metodoPreprocessamento;
    const codigoRelatorio = this.opcoesSelecinadasDoRelatorio.codRelatorio;
    const filter = this.getFiltrosExibicaoRelatorio();
    this.configEmpresaService.get().then((config) => {
      window.open(
        config.serverApiUrl +
        `AGLReport/${metodo}/${codigoRelatorio}?${filter}`,
        "_blank"
      );
    });
  }

  /**
   * Retorna string de filtros a serem passados pro relatório
   * baseado no objeto de filtros
   * @returns
   */
  private getFiltrosExibicaoRelatorio(): string {
    let filtros = "";
    let novoValor = "";
    for (let key in this.apiSearchObject) {
      novoValor = `${key}~eq~${this.apiSearchObject[key]}`;
      if (filtros.length > 0) {
        filtros += "~and~";
      }
      filtros += novoValor;
    }
    return `?filter=${filtros}`;
  }

  onResize(evento: any) {
    this.calcularLarguraBarraAcao(null);
  }

  calcularLarguraBarraAcao(largura: number | null) {
    const left = largura ?? this.barraAcao.nativeElement.offsetLeft;
    const larguraWindow = window.innerWidth;
    const larguraNova = larguraWindow - left;
    setTimeout(() => {
      this.larguraBarraAcao = larguraNova + "px";
    }, 10);
  }

  btnDownload(): void { }

  btnExibirLog(): void { }

  private validarParametrosDadosPreprocessamento() {
    if (this.metodoPreprocessamento) {
      if (!this.modeloRelatorioCodigos) {
        console.error(`
        É obrigatório informar ao menos um código de relatório 
        na proprieade "modeloRelatorioCodigos" quando a propriedade
        "metodoPreprocessamento" tiver sido informada
        `);
      }
    }
  }

  private validarParametrosTipoExecucao() {
    if (
      this.tipoExecucao_batch === false &&
      this.tipoExecucao_online === false
    ) {
      this.tipoExecucao_online = true;
    } else if (
      this.tipoExecucao_online === true &&
      this.tipoExecucao_batch === false
    ) {
      this.opcoesSelecinadasDoRelatorio.inTipoExecucao = 0;
    } else if (
      this.tipoExecucao_online === false &&
      this.tipoExecucao_batch === true
    ) {
      this.opcoesSelecinadasDoRelatorio.inTipoExecucao = 1;
    }
  }

  tipoSaidaAlterado(valor) {
    // console.log("valor alterado = ", valor);
    this.opcoesSelecinadasDoRelatorio.inTipoSaida = valor;
  }

  selecaoSaidaAlterado(evento) {
    // console.log("valor seleção alterado = ", evento);
  }
}
