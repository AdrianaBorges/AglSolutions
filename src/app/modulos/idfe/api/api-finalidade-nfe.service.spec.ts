import { TestBed } from '@angular/core/testing';

import { ApiFinalidadeNfeService } from './api-finalidade-nfe.service';

describe('ApiFinalidadeNfeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiFinalidadeNfeService = TestBed.get(ApiFinalidadeNfeService);
    expect(service).toBeTruthy();
  });
});
