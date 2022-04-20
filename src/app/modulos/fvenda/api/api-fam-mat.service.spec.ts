import { TestBed } from '@angular/core/testing';

import { ApiFamMatService } from './api-fam-mat.service';

describe('ApiFamMatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiFamMatService = TestBed.get(ApiFamMatService);
    expect(service).toBeTruthy();
  });
});
