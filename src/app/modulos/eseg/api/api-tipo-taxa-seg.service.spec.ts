import { TestBed } from '@angular/core/testing';

import { ApiTipoTaxaSegService } from './api-tipo-taxa-seg.service';

describe('ApiTipoTaxaSegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoTaxaSegService = TestBed.get(ApiTipoTaxaSegService);
    expect(service).toBeTruthy();
  });
});
