import { TestBed } from '@angular/core/testing';

import { ApiCondPagtoService } from './api-cond-pagto.service';

describe('ApiCondPagtoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCondPagtoService = TestBed.get(ApiCondPagtoService);
    expect(service).toBeTruthy();
  });
});
