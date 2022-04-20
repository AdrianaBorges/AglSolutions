import { TestBed } from '@angular/core/testing';

import { ApiTipoDocumentoPessoaEmailService } from './api-tipo-pessoa-email.service';

describe('ApiTipoDocumentoPessoaEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoDocumentoPessoaEmailService = TestBed.get(ApiTipoDocumentoPessoaEmailService);
    expect(service).toBeTruthy();
  });
});
