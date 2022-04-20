import { TestBed } from '@angular/core/testing';

import { ApiSituacaoAssTecService } from './api-situacao-ass-tec.service';

describe('ApiSituacaoAssTecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSituacaoAssTecService = TestBed.get(ApiSituacaoAssTecService);
    expect(service).toBeTruthy();
  });
});
