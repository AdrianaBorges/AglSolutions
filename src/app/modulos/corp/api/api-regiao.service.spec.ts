import { TestBed } from '@angular/core/testing';

import { ApiRegiaoService } from './api-regiao.service';

describe('ApiRegiaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiRegiaoService = TestBed.get(ApiRegiaoService);
    expect(service).toBeTruthy();
  });
});
