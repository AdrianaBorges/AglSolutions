import { TestBed } from '@angular/core/testing';

import { ApiGruposDoUsuarioService } from './api-grupos-do-usuario.service';

describe('ApiGruposDoUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGruposDoUsuarioService = TestBed.get(ApiGruposDoUsuarioService);
    expect(service).toBeTruthy();
  });
});
