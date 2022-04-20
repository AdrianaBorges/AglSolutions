import { TestBed } from '@angular/core/testing';

import { ApiPedCompraItemEL01Service } from './api-ped-compra-item-el01.service';

describe('ApiPedCompraItemEL01Service', () => {
  let service: ApiPedCompraItemEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPedCompraItemEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
