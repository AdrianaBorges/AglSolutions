import { TestBed, inject } from '@angular/core/testing';

import { ApiTipoUsuarioService } from './api-tipo-usuario.service';

describe('TipoUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTipoUsuarioService]
    });
  });

  it('should be created', inject([ApiTipoUsuarioService], (service: ApiTipoUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
