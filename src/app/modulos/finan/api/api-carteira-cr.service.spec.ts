import { TestBed } from '@angular/core/testing';

import { ApiCarteiraCrService } from './api-carteira-cr.service';

describe('ApiCarteiraCrService', () => {
  let service: ApiCarteiraCrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCarteiraCrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
