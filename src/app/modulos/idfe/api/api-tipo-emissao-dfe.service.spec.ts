import { TestBed } from '@angular/core/testing';

import { ApiTipoEmissaoDfeService } from './api-tipo-emissao-dfe.service';

describe('ApiTipoEmissaoDfeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoEmissaoDfeService = TestBed.get(ApiTipoEmissaoDfeService);
    expect(service).toBeTruthy();
  });
});
