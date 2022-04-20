import { TestBed } from '@angular/core/testing';

import { ApiCanalVendaService } from './api-canal-venda.service';

describe('ApiCanalVendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCanalVendaService = TestBed.get(ApiCanalVendaService);
    expect(service).toBeTruthy();
  });
});
