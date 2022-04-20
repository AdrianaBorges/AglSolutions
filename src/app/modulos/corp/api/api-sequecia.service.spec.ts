import { TestBed } from '@angular/core/testing';

import { ApiSequeciaService } from './api-sequecia.service';

describe('ApiSequeciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSequeciaService = TestBed.get(ApiSequeciaService);
    expect(service).toBeTruthy();
  });
});
