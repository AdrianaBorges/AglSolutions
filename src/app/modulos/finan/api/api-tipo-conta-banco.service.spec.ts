import { TestBed } from '@angular/core/testing';

import { ApiTipoContaBancoService } from './api-tipo-conta-banco.service';

describe('ApiTipoContaBancoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoContaBancoService = TestBed.get(ApiTipoContaBancoService);
    expect(service).toBeTruthy();
  });
});
