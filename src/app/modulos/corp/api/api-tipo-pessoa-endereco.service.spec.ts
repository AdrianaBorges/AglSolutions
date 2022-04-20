import { TestBed } from '@angular/core/testing';

import { ApiTipoDocumentoPessoaEnderecoService } from './api-tipo-pessoa-endereco.service';

describe('ApiTipoDocumentoPessoaEnderecoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoDocumentoPessoaEnderecoService = TestBed.get(ApiTipoDocumentoPessoaEnderecoService);
    expect(service).toBeTruthy();
  });
});
