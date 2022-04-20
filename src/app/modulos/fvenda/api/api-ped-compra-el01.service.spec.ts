import { TestBed } from '@angular/core/testing';

import { ApiPedCompraEL01Service } from './api-ped-compra-el01.service';

describe('ApiPedCompraEL01Service', () => {
  let service: ApiPedCompraEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPedCompraEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
