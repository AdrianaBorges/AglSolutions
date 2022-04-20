import { TestBed } from '@angular/core/testing';

import { ApiSeguradoService } from './api-segurado.service';

describe('ApiSeguradoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSeguradoService = TestBed.get(ApiSeguradoService);
    expect(service).toBeTruthy();
  });
});
