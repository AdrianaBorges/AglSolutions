import { TestBed } from '@angular/core/testing';

import { ApiLogradouroService } from './api-logradouro.service';

describe('ApiLogradouroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiLogradouroService = TestBed.get(ApiLogradouroService);
    expect(service).toBeTruthy();
  });
});
