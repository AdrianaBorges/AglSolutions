import {
  CompositeFilterDescriptor,
  FilterDescriptor,
} from "@progress/kendo-data-query";
import { GridPesquisaColumn } from "./Grid/grid-pesquisa-column";
import { enum_formatoColuna } from "./Grid/enum-formato-coluna";

export class GridFilterTranspiller {
  public static toString(
    filterDescriptor: CompositeFilterDescriptor,
    colunasGrid: GridPesquisaColumn[]
  ): string {
    var query: string;

    //monto os filtros recursivamente
    query = this.getTextoFiltro_FromCompositeFilter(
      filterDescriptor,
      filterDescriptor.logic,
      colunasGrid
    );

    //substituo os nomes das propriedades pelo nome do campo que deve ser usado na query
    for (let coluna of colunasGrid) {
      query = query.replace(
        `${coluna.nomePropriedade}~`,
        `${coluna.nomeCampo}~`
      );
      query = query.replace(
        `~${coluna.nomePropriedade}`,
        `~${coluna.nomeCampo}`
      );
    }
    return query;
  }

  private static getTextoFiltro_FromCompositeFilter(
    filterDescriptor: CompositeFilterDescriptor,
    logicOperator: string,
    colunasGrid: GridPesquisaColumn[]
  ): string {
    var query: string = "";
    var partialQuery: string;
    var filtro: any;

    for (filtro of filterDescriptor.filters) {
      //Encontro a coluna correspondente ao filtro pra saber o tipo dela
      const colunaGrid = colunasGrid.find((coluna) => {
        return coluna.nomePropriedade == filtro.field;
      });

      //Adiciono o concatenador lógico
      if (query.length > 0) {
        query += `~${logicOperator}~`;
      }

      if ((filtro as CompositeFilterDescriptor).logic != undefined) {
        partialQuery = this.getTextoFiltro_FromCompositeFilter(
          filtro,
          filtro.logic,
          colunasGrid
        );
        if (logicOperator && filterDescriptor.filters.length > 1) {
          partialQuery = `(${partialQuery})`;
        }
        query += partialQuery;
      } else {
        query += this.getTextoFiltro_FromFilter(filtro, colunaGrid);
      }
    }

    return query;
  }

  private static getTextoFiltro_FromFilter(
    filtro: FilterDescriptor,
    colunaGrid: GridPesquisaColumn
  ): string {
    var bTratarComoTexto: boolean = true;

    if (typeof filtro.value == "string") {
      var strData = filtro.value;
      if (strData.indexOf("(") >= 0) {
        bTratarComoTexto = false;
      }
    }
    if (filtro.value instanceof Date) {
      var data: Date = filtro.value;
      var valorData: string;

      var dtFim: Date;
      if (filtro.operator == "gte" || filtro.operator == "gt") {
        //Se o filtro for de data para os operadores "greater then or equal to" ou "greater then"
        //, então adiciona o horário final como "00:00:00"
        if (colunaGrid.enumFormatoColuna !== enum_formatoColuna.dataHora) {
          valorData = `${filtro.field}~${
            filtro.operator
          }~'${data.getFullYear()}-${(data.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${data
            .getDate()
            .toString()
            .padStart(2, "0")}T00:00:00Z'`;
        } else {
          valorData = `${filtro.field}~${
            filtro.operator
          }~'${data.getFullYear()}-${(data.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${data
            .getDate()
            .toString()
            .padStart(2, "0")}T${data
            .getHours()
            .toString()
            .padStart(2, "0")}:${data
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${data
            .getSeconds()
            .toString()
            .padStart(2, "0")}Z'`;
        }
      } else if (
        (filtro.operator == "lte" || filtro.operator == "lt") &&
        colunaGrid.enumFormatoColuna !== enum_formatoColuna.dataHora
      ) {
        //Se o filtro for de data para os operadores "Less then or equal to" ou "Less then"
        //, então adiciona o horário final como "23:59:59"
        valorData = `${filtro.field}~${
          filtro.operator
        }~'${data.getFullYear()}-${(data.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${data
          .getDate()
          .toString()
          .padStart(2, "0")}T23:59:59Z'`;
      } else {
        valorData = `${filtro.field}~${
          filtro.operator
        }~'${data.getFullYear()}-${(data.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${data
          .getDate()
          .toString()
          .padStart(2, "0")}T${data
          .getHours()
          .toString()
          .padStart(2, "0")}:${data
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${data
          .getSeconds()
          .toString()
          .padStart(2, "0")}Z'`;
      }
      return valorData;
    } else if (bTratarComoTexto) {
      return `${filtro.field}~${filtro.operator}~'${filtro.value}'`;
    } else {
      return `${filtro.field}~${filtro.operator}~${filtro.value}`;
    }
  }
}
