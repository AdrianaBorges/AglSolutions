import { TestBed } from '@angular/core/testing';

import { ApiGrupoUsuarioService } from './api-grupo-usuario.service';

describe('ApiGrupoUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGrupoUsuarioService = TestBed.get(ApiGrupoUsuarioService);
    expect(service).toBeTruthy();
  });
});
