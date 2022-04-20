import { TestBed } from '@angular/core/testing';

import { ApiPaisService } from './api-pais.service';

describe('ApiPaisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPaisService = TestBed.get(ApiPaisService);
    expect(service).toBeTruthy();
  });
});
