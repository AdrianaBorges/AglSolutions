import { TestBed } from '@angular/core/testing';

import { ApiGrauParentService } from './api-grau-parent.service';

describe('ApiGrauParentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGrauParentService = TestBed.get(ApiGrauParentService);
    expect(service).toBeTruthy();
  });
});
