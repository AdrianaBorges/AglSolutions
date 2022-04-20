import { TestBed, inject } from '@angular/core/testing';

import { ApiEstadoCivilService } from './api-estado-civil.service';

describe('ApiPessoaEstadoCivilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiEstadoCivilService]
    });
  });

  it('should be created', inject([ApiEstadoCivilService], (service: ApiEstadoCivilService) => {
    expect(service).toBeTruthy();
  }));
});
