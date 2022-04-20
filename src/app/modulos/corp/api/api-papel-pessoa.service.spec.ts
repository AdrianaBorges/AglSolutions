import { TestBed } from '@angular/core/testing';

import { ApiPapelPessoaService } from './api-papel-pessoa.service';

describe('ApiPapelPessoaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPapelPessoaService = TestBed.get(ApiPapelPessoaService);
    expect(service).toBeTruthy();
  });
});
