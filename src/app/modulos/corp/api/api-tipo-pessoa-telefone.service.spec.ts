import { TestBed } from '@angular/core/testing';

import { ApiTipoDocumentoPessoaTelefoneService } from './api-tipo-pessoa-telefone.service';

describe('ApiTipoDocumentoPessoaTelefoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoDocumentoPessoaTelefoneService = TestBed.get(ApiTipoDocumentoPessoaTelefoneService);
    expect(service).toBeTruthy();
  });
});
