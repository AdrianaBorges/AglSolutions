import { TestBed } from '@angular/core/testing';

import { ApiCidadeService } from './api-cidade.service';

describe('ApiCidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCidadeService = TestBed.get(ApiCidadeService);
    expect(service).toBeTruthy();
  });
});
