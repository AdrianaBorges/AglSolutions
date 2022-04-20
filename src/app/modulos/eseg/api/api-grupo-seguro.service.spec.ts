import { TestBed } from '@angular/core/testing';

import { ApiGrupoSeguroService } from './api-grupo-seguro.service';

describe('ApiGrupoSeguroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGrupoSeguroService = TestBed.get(ApiGrupoSeguroService);
    expect(service).toBeTruthy();
  });
});
