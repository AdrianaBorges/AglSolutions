import { TestBed } from '@angular/core/testing';

import { ApiSituacaoPedVenService } from './api-situacao-ped-ven.service';

describe('ApiSituacaoPedVenService', () => {
  let service: ApiSituacaoPedVenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSituacaoPedVenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
