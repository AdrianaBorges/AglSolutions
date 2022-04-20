import { TestBed } from '@angular/core/testing';

import { ApiRepresVendaEL01Service } from './api-repres-venda-el01.service';

describe('ApiRepresVendaEL01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiRepresVendaEL01Service = TestBed.get(ApiRepresVendaEL01Service);
    expect(service).toBeTruthy();
  });
});
