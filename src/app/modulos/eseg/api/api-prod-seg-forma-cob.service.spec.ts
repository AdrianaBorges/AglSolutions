import { TestBed } from '@angular/core/testing';

import { ApiProdSegFormaCobService } from './api-prod-seg-forma-cob.service';

describe('ApiProdSegFormaCobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiProdSegFormaCobService = TestBed.get(ApiProdSegFormaCobService);
    expect(service).toBeTruthy();
  });
});
