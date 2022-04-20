import { TestBed, inject } from '@angular/core/testing';

import { ApiSexoService } from './api-sexo.service';

describe('ApiPessoaSexoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiSexoService]
    });
  });

  it('should be created', inject([ApiSexoService], (service: ApiSexoService) => {
    expect(service).toBeTruthy();
  }));
});
