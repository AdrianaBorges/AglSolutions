import { TestBed } from '@angular/core/testing';

import { ApiTipoTomadorCteService } from './api-tipo-tomador-cte.service';

describe('ApiTipoTomadorCteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoTomadorCteService = TestBed.get(ApiTipoTomadorCteService);
    expect(service).toBeTruthy();
  });
});
