import { TestBed } from '@angular/core/testing';

import { ApiProdSegAssistService } from './api-prod-seg-assist.service';

describe('ApiProdSegAssistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiProdSegAssistService = TestBed.get(ApiProdSegAssistService);
    expect(service).toBeTruthy();
  });
});
