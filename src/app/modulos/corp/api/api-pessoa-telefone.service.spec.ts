import { TestBed } from '@angular/core/testing';

import { ApiPessoaTelefoneService } from './api-pessoa-telefone.service';

describe('ApiPessoaTelefoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPessoaTelefoneService = TestBed.get(ApiPessoaTelefoneService);
    expect(service).toBeTruthy();
  });
});
