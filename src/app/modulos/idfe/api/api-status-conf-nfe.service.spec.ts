import { TestBed } from '@angular/core/testing';

import { ApiStatusConfNfeService } from './api-status-conf-nfe.service';

describe('ApiStatusConfNfeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiStatusConfNfeService = TestBed.get(ApiStatusConfNfeService);
    expect(service).toBeTruthy();
  });
});
