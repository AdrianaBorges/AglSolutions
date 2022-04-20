import { TestBed } from '@angular/core/testing';

import { ApiTipoTecnicoService } from './api-tipo-tecnico.service';

describe('ApiTipoTecnicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoTecnicoService = TestBed.get(ApiTipoTecnicoService);
    expect(service).toBeTruthy();
  });
});
