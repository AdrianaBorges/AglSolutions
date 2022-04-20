import { TestBed } from '@angular/core/testing';

import { ApiMotivoRejeitaService } from './api-motivo-rejeita.service';

describe('ApiMotivoRejeitaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiMotivoRejeitaService = TestBed.get(ApiMotivoRejeitaService);
    expect(service).toBeTruthy();
  });
});
