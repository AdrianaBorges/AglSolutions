import { TestBed } from '@angular/core/testing';

import { ApiSolucAssTecService } from './api-soluc-ass-tec.service';

describe('ApiSolucAssTecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSolucAssTecService = TestBed.get(ApiSolucAssTecService);
    expect(service).toBeTruthy();
  });
});
