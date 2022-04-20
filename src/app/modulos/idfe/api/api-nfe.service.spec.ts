import { TestBed } from '@angular/core/testing';

import { ApiNfeService } from './api-nfe.service';

describe('ApiNfeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiNfeService = TestBed.get(ApiNfeService);
    expect(service).toBeTruthy();
  });
});
