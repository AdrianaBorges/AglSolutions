import { TestBed, inject } from '@angular/core/testing';

import { ApiGrauInstrucaoService } from './api-grau-instrucao.service';

describe('ApiPessoaGrauInstrucaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiGrauInstrucaoService]
    });
  });

  it('should be created', inject([ApiGrauInstrucaoService], (service: ApiGrauInstrucaoService) => {
    expect(service).toBeTruthy();
  }));
});
