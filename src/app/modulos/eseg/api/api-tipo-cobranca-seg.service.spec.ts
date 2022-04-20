import { TestBed } from '@angular/core/testing';

import { ApiTipoCobrancaSegService } from './api-tipo-cobranca-seg.service';

describe('ApiTipoCobrancaSegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoCobrancaSegService = TestBed.get(ApiTipoCobrancaSegService);
    expect(service).toBeTruthy();
  });
});
