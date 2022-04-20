import { TestBed } from '@angular/core/testing';

import { ApiProdSegCoberturaService } from './api-prod-seg-cobertura.service';

describe('ApiProdSegCoberturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiProdSegCoberturaService = TestBed.get(ApiProdSegCoberturaService);
    expect(service).toBeTruthy();
  });
});
