import { TestBed } from '@angular/core/testing';

import { ApiMicrorregiaoService } from './api-microrregiao.service';

describe('ApiMicrorregiaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiMicrorregiaoService = TestBed.get(ApiMicrorregiaoService);
    expect(service).toBeTruthy();
  });
});
