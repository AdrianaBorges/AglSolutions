import { TestBed } from '@angular/core/testing';

import { ApiFamComService } from './api-fam-com.service';

describe('ApiFamComService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiFamComService = TestBed.get(ApiFamComService);
    expect(service).toBeTruthy();
  });
});
