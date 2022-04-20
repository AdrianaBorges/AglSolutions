import { TestBed } from '@angular/core/testing';

import { ApiTipoPedidoEl01Service } from './api-tipo-pedido-el01.service';

describe('ApiTipoPedidoEl01Service', () => {
  let service: ApiTipoPedidoEl01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTipoPedidoEl01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
