import { TestBed } from '@angular/core/testing';

import { ApiSituacaoDocCrService } from './api-situacao-doc-cr.service';

describe('ApiSituacaoDocCrService', () => {
  let service: ApiSituacaoDocCrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSituacaoDocCrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
