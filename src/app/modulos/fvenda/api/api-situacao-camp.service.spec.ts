import { TestBed } from '@angular/core/testing';

import { ApiSituacaoCampService } from './api-situacao-camp.service';

describe('ApiSituacaoCampService', () => {
  let service: ApiSituacaoCampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSituacaoCampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
