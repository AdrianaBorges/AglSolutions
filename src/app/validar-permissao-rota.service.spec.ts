import { TestBed } from '@angular/core/testing';

import { ValidarPermissaoRotaService } from './validar-permissao-rota.service';

describe('ValidarPermissaoRotaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidarPermissaoRotaService = TestBed.get(ValidarPermissaoRotaService);
    expect(service).toBeTruthy();
  });
});
