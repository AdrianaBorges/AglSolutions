import { TestBed } from '@angular/core/testing';

import { ApiTipoRepresentanteService } from './api-tipo-representante.service';

describe('ApiTipoRepresentanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoRepresentanteService = TestBed.get(ApiTipoRepresentanteService);
    expect(service).toBeTruthy();
  });
});
