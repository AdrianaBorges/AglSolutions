import { TestBed } from '@angular/core/testing';

import { ApiPedVendaEL01Service } from './api-ped-venda-el01.service';

describe('ApiPedVendaEL01Service', () => {
  let service: ApiPedVendaEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPedVendaEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
