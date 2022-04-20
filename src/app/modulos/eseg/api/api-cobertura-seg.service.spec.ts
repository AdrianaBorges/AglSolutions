import { TestBed } from '@angular/core/testing';

import { ApiCoberturaSegService } from './api-cobertura-seg.service';

describe('ApiCoberturaSegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCoberturaSegService = TestBed.get(ApiCoberturaSegService);
    expect(service).toBeTruthy();
  });
});
