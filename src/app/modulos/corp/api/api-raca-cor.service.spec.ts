import { TestBed, inject } from '@angular/core/testing';

import { ApiRacaCorService } from './api-raca-cor.service';

describe('ApiPessoaRacaCorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRacaCorService]
    });
  });

  it('should be created', inject([ApiRacaCorService], (service: ApiRacaCorService) => {
    expect(service).toBeTruthy();
  }));
});
