import { TestBed } from '@angular/core/testing';

import { ApiTipoCapitalSegService } from './api-tipo-capital-seg.service';

describe('ApiTipoCapitalSegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoCapitalSegService = TestBed.get(ApiTipoCapitalSegService);
    expect(service).toBeTruthy();
  });
});
