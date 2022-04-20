import { TestBed } from '@angular/core/testing';

import { ApiTipoCampanhaService } from './api-tipo-campanha.service';

describe('ApiTipoCampanhaService', () => {
  let service: ApiTipoCampanhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTipoCampanhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
