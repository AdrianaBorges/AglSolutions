import { TestBed } from '@angular/core/testing';

import { ApiParamCorpService } from './api-param-corp.service';

describe('ApiParamCorpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiParamCorpService = TestBed.get(ApiParamCorpService);
    expect(service).toBeTruthy();
  });
});
