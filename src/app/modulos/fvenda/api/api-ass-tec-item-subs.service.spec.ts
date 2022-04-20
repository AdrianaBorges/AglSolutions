import { TestBed } from '@angular/core/testing';

import { ApiAssTecItemSubsService } from './api-ass-tec-item-subs.service';

describe('ApiAssTecItemSubsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAssTecItemSubsService = TestBed.get(ApiAssTecItemSubsService);
    expect(service).toBeTruthy();
  });
});
