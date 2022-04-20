import { TestBed } from '@angular/core/testing';

import { ApiOrigemAssTecService } from './api-origem-ass-tec.service';

describe('ApiOrigemAssTecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiOrigemAssTecService = TestBed.get(ApiOrigemAssTecService);
    expect(service).toBeTruthy();
  });
});
