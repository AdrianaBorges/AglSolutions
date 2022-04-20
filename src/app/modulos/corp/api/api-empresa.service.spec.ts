import { TestBed } from '@angular/core/testing';

import { ApiEmpresaService } from './api-empresa.service';

describe('ApiEmpresaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiEmpresaService = TestBed.get(ApiEmpresaService);
    expect(service).toBeTruthy();
  });
});
