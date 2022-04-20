import { TestBed } from '@angular/core/testing';

import { ApiUsuariosDoGrupoService } from './api-usuarios-do-grupo.service';

describe('ApiUsuariosDoGrupoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiUsuariosDoGrupoService = TestBed.get(ApiUsuariosDoGrupoService);
    expect(service).toBeTruthy();
  });
});
