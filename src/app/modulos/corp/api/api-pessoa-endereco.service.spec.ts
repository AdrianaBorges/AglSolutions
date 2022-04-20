import { TestBed } from '@angular/core/testing';

import { ApiPessoaEnderecoService } from './api-pessoa-endereco.service';

describe('ApiPessoaEnderecoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPessoaEnderecoService = TestBed.get(ApiPessoaEnderecoService);
    expect(service).toBeTruthy();
  });
});
