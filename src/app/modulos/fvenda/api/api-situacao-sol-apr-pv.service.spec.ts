import { TestBed } from '@angular/core/testing';

import { ApiSituacaoSolAprPvService } from './api-situacao-sol-apr-pv.service';

describe('ApiSituacaoSolAprPvService', () => {
  let service: ApiSituacaoSolAprPvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSituacaoSolAprPvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
