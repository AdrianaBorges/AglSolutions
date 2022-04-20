import { TestBed, inject } from '@angular/core/testing';

import { ApiTipoPessoaService } from './api-tipo-pessoa.service';

describe('ApiPessoaTipoPessoaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTipoPessoaService]
    });
  });

  it('should be created', inject([ApiTipoPessoaService], (service: ApiTipoPessoaService) => {
    expect(service).toBeTruthy();
  }));
});
