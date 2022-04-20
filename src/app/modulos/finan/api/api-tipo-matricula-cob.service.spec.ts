import { TestBed } from '@angular/core/testing';

import { ApiTipoMatriculaCobService } from './api-tipo-matricula-cob.service';

describe('ApiTipoMatriculaCobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoMatriculaCobService = TestBed.get(ApiTipoMatriculaCobService);
    expect(service).toBeTruthy();
  });
});
