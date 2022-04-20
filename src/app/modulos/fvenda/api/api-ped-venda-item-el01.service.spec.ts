import { TestBed } from '@angular/core/testing';

import { ApiPedVendaItemEL01Service } from './api-ped-venda-item-el01.service';

describe('ApiPedVendaItemEL01Service', () => {
  let service: ApiPedVendaItemEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPedVendaItemEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
