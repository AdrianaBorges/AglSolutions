import { TestBed } from '@angular/core/testing';

import { ApiTipoLogradouroService } from './api-tipo-logradouro.service';

describe('ApiTipoLogradouroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoLogradouroService = TestBed.get(ApiTipoLogradouroService);
    expect(service).toBeTruthy();
  });
});
