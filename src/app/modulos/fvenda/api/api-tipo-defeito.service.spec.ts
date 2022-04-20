import { TestBed } from '@angular/core/testing';

import { ApiTipoDefeitoService } from './api-tipo-defeito.service';

describe('ApiTipoDefeitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoDefeitoService = TestBed.get(ApiTipoDefeitoService);
    expect(service).toBeTruthy();
  });
});
