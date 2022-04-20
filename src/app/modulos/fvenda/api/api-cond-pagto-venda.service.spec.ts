import { TestBed } from '@angular/core/testing';

import { ApiCondPagtoVendaService } from './api-cond-pagto-venda.service';

describe('ApiCondPagtoVendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCondPagtoVendaService = TestBed.get(ApiCondPagtoVendaService);
    expect(service).toBeTruthy();
  });
});
