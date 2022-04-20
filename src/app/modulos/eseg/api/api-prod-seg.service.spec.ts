import { TestBed } from '@angular/core/testing';

import { ApiProdSegService } from './api-prod-seg.service'

describe('ApiProdSegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiProdSegService = TestBed.get(ApiProdSegService);
    expect(service).toBeTruthy();
  });
});
