import { TestBed } from '@angular/core/testing';

import { ApiAssistSegService } from './api-assist-seg.service';

describe('ApiAssistSegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAssistSegService = TestBed.get(ApiAssistSegService);
    expect(service).toBeTruthy();
  });
});
