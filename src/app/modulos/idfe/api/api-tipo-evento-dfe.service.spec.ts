import { TestBed } from '@angular/core/testing';

import { ApiTipoEventoDfeService } from './api-tipo-evento-dfe.service';

describe('ApiTipoEventoDfeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoEventoDfeService = TestBed.get(ApiTipoEventoDfeService);
    expect(service).toBeTruthy();
  });
});
