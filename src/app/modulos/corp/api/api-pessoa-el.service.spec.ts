import { TestBed, inject } from '@angular/core/testing';

import { ApiPessoaElService } from './api-pessoa-el.service';

describe('ApiPessoaElService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiPessoaElService]
    });
  });

  it('should be created', inject([ApiPessoaElService], (service: ApiPessoaElService) => {
    expect(service).toBeTruthy();
  }));
});
