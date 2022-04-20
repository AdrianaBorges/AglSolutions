import { TestBed } from '@angular/core/testing';

import { ApiAssTecItemDefConstService } from './api-ass-tec-item-def-const.service';

describe('ApiAssTecItemDefConstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAssTecItemDefConstService = TestBed.get(ApiAssTecItemDefConstService);
    expect(service).toBeTruthy();
  });
});
