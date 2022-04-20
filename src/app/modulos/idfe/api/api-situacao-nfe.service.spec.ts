import { TestBed } from '@angular/core/testing';

import { ApiSituacaoNfeService } from './api-situacao-nfe.service';

describe('ApiSituacaoNfeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSituacaoNfeService = TestBed.get(ApiSituacaoNfeService);
    expect(service).toBeTruthy();
  });
});
