import { TestBed } from '@angular/core/testing';

import { ApiPessoaDocumentoService } from './api-pessoa-documento.service';

describe('ApiPessoaDocumentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPessoaDocumentoService = TestBed.get(ApiPessoaDocumentoService);
    expect(service).toBeTruthy();
  });
});
