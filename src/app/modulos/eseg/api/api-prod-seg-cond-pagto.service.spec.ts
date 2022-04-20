import { TestBed } from '@angular/core/testing';

import { ApiProdSegCondPagtoService } from './api-prod-seg-cond-pagto.service';

describe('ApiProdSegCondPagtoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiProdSegCondPagtoService = TestBed.get(ApiProdSegCondPagtoService);
    expect(service).toBeTruthy();
  });
});
