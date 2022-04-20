import { TestBed } from '@angular/core/testing';

import { ApiGrpEstService } from './api-grp-est.service';

describe('ApiGrpEstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGrpEstService = TestBed.get(ApiGrpEstService);
    expect(service).toBeTruthy();
  });
});
