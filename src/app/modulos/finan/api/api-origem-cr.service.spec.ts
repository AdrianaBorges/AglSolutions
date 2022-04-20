import { TestBed } from '@angular/core/testing';

import { ApiOrigemCrService } from './api-origem-cr.service';

describe('ApiOrigemCrService', () => {
  let service: ApiOrigemCrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOrigemCrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
