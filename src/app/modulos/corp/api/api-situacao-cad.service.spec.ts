import { TestBed } from '@angular/core/testing';

import { ApiSituacaoCadService } from './api-situacao-cad.service';

describe('ApiSituacaoCadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSituacaoCadService = TestBed.get(ApiSituacaoCadService);
    expect(service).toBeTruthy();
  });
});
