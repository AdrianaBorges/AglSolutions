import { TestBed } from '@angular/core/testing';

import { ApiTipoPerContribService } from './api-tipo-per-contrib.service';

describe('ApiTipoPerContribService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoPerContribService = TestBed.get(ApiTipoPerContribService);
    expect(service).toBeTruthy();
  });
});
