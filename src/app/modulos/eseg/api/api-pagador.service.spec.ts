import { TestBed } from '@angular/core/testing';

import { ApiPagadorService } from './api-pagador.service';

describe('ApiPagadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPagadorService = TestBed.get(ApiPagadorService);
    expect(service).toBeTruthy();
  });
});
