import { TestBed } from '@angular/core/testing';

import { ApiTipoFaturaCrService } from './api-tipo-fatura-cr.service';

describe('ApiTipoFaturaCrService', () => {
  let service: ApiTipoFaturaCrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTipoFaturaCrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
