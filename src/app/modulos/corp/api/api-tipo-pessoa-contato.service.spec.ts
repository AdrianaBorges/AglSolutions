import { TestBed } from '@angular/core/testing';

import { ApiTipoPessoaContatoService } from './api-tipo-pessoa-contato.service';

describe('ApiTipoPessoaContatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoPessoaContatoService = TestBed.get(ApiTipoPessoaContatoService);
    expect(service).toBeTruthy();
  });
});
