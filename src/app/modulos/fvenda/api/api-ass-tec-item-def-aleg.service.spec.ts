import { TestBed } from '@angular/core/testing';

import { ApiAssTecItemDefAlegService } from './api-ass-tec-item-def-aleg.service';

describe('ApiAssTecItemDefAlegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAssTecItemDefAlegService = TestBed.get(ApiAssTecItemDefAlegService);
    expect(service).toBeTruthy();
  });
});
