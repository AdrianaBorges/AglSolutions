import { TestBed } from '@angular/core/testing';

import { ApiSituacaoCteService } from './api-situacao-cte.service';

describe('ApiSituacaoCteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSituacaoCteService = TestBed.get(ApiSituacaoCteService);
    expect(service).toBeTruthy();
  });
});
