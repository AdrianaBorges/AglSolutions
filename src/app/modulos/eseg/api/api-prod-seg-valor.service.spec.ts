import { TestBed } from '@angular/core/testing';

import { ApiProdSegValorService } from './api-prod-seg-valor.service';

describe('ApiProdSegValorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiProdSegValorService = TestBed.get(ApiProdSegValorService);
    expect(service).toBeTruthy();
  });
});
