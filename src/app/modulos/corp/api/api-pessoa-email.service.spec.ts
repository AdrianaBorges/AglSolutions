import { TestBed } from '@angular/core/testing';

import { ApiPessoaEmailService } from './api-pessoa-email.service';

describe('ApiPessoaEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPessoaEmailService = TestBed.get(ApiPessoaEmailService);
    expect(service).toBeTruthy();
  });
});
