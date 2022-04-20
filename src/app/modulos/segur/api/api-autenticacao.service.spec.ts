import { TestBed, inject } from '@angular/core/testing';

import { ApiAutenticacaoService } from './api-autenticacao.service';

describe('ApiUsuariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiAutenticacaoService]
    });
  });

  it('should be created', inject([ApiAutenticacaoService], (service: ApiAutenticacaoService) => {
    expect(service).toBeTruthy();
  }));
});
