import { TestBed } from '@angular/core/testing';

import { ApiSituacaoVendaService } from './api-situacao-venda.service';

describe('ApiSituacaoVendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSituacaoVendaService = TestBed.get(ApiSituacaoVendaService);
    expect(service).toBeTruthy();
  });
});
