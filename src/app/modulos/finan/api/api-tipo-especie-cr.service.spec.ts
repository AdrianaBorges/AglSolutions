import { TestBed } from '@angular/core/testing';

import { ApiTipoEspecieCrService } from './api-tipo-especie-cr.service';

describe('ApiTipoEspecieCrService', () => {
  let service: ApiTipoEspecieCrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTipoEspecieCrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
