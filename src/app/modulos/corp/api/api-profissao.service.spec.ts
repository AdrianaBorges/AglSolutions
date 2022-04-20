import { TestBed, inject } from '@angular/core/testing';

import { ApiProfissaoService } from './api-profissao.service';

describe('ApiProfissaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiProfissaoService]
    });
  });

  it('should be created', inject([ApiProfissaoService], (service: ApiProfissaoService) => {
    expect(service).toBeTruthy();
  }));
});
