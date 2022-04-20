import { TestBed } from '@angular/core/testing';

import { ApiPessoaContatoService } from './api-pessoa-contato.service';

describe('ApiPessoaContatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPessoaContatoService = TestBed.get(ApiPessoaContatoService);
    expect(service).toBeTruthy();
  });
});
