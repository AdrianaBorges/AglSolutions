import { TestBed } from '@angular/core/testing';

import { ApiTipoCobrancaService } from './api-tipo-cobranca.service';

describe('ApiTipoCobrancaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoCobrancaService = TestBed.get(ApiTipoCobrancaService);
    expect(service).toBeTruthy();
  });
});
