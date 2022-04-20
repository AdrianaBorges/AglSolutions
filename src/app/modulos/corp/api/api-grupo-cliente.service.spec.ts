import { TestBed } from '@angular/core/testing';

import { ApiGrupoClienteService } from './api-grupo-cliente.service';

describe('ApiGrupoClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGrupoClienteService = TestBed.get(ApiGrupoClienteService);
    expect(service).toBeTruthy();
  });
});
