import { TestBed, inject } from '@angular/core/testing';

import { GridPesquisaPersisteEstadoService } from './grid-pesquisa-persiste-estado.service';

describe('GridPesquisaPersisteEstadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridPesquisaPersisteEstadoService]
    });
  });

  it('should be created', inject([GridPesquisaPersisteEstadoService], (service: GridPesquisaPersisteEstadoService) => {
    expect(service).toBeTruthy();
  }));
});
