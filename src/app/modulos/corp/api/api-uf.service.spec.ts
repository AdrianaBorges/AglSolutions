import { TestBed } from '@angular/core/testing';

import { ApiUfService } from './api-uf.service';

describe('ApiUfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiUfService = TestBed.get(ApiUfService);
    expect(service).toBeTruthy();
  });
});
