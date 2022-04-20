import { TestBed } from '@angular/core/testing';

import { ApiSequeciaValorService } from './api-sequecia-valor.service';

describe('ApiSequeciaValorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSequeciaValorService = TestBed.get(ApiSequeciaValorService);
    expect(service).toBeTruthy();
  });
});
