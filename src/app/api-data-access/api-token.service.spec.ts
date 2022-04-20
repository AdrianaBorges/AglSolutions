import { TestBed, inject } from '@angular/core/testing';

import { ApiTokenService } from './api-token.service';

describe('ApiTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTokenService]
    });
  });

  it('should be created', inject([ApiTokenService], (service: ApiTokenService) => {
    expect(service).toBeTruthy();
  }));
});
