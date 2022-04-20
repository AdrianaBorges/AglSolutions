import { TestBed } from '@angular/core/testing';

import { ApiEstabelecimentoService } from './api-estabelecimento.service';

describe('ApiEstabelecimentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiEstabelecimentoService = TestBed.get(ApiEstabelecimentoService);
    expect(service).toBeTruthy();
  });
});
