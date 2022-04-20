import { TestBed } from '@angular/core/testing';

import { ApiSituacaoPedCompService } from './api-situacao-ped-comp.service';

describe('ApiSituacaoPedCompService', () => {
  let service: ApiSituacaoPedCompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSituacaoPedCompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
