import { TestBed } from '@angular/core/testing';

import { ApiSituacaoAtenPedService } from './api-situacao-aten-ped.service';

describe('ApiSituacaoAtenPedService', () => {
  let service: ApiSituacaoAtenPedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSituacaoAtenPedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
