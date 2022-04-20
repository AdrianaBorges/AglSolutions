import { TestBed } from '@angular/core/testing';

import { ApiTipoSeguroService } from './api-tipo-seguro.service';

describe('ApiTipoSeguroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoSeguroService = TestBed.get(ApiTipoSeguroService);
    expect(service).toBeTruthy();
  });
});
