import { TestBed } from '@angular/core/testing';

import { ApiTipoFreteService } from './api-tipo-frete.service';

describe('ApiTipoFreteService', () => {
  let service: ApiTipoFreteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTipoFreteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
