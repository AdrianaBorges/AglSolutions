import { TestBed } from '@angular/core/testing';

import { ApiPessoaContaBancoService } from './api-pessoa-conta-banco.service';

describe('ApiPessoaContaBancoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPessoaContaBancoService = TestBed.get(ApiPessoaContaBancoService);
    expect(service).toBeTruthy();
  });
});
