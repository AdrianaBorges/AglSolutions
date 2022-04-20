import { TestBed } from '@angular/core/testing';

import { ApiSituacaoEnvEmailService } from './api-situacao-env-email.service';

describe('ApiSituacaoEnvEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSituacaoEnvEmailService = TestBed.get(ApiSituacaoEnvEmailService);
    expect(service).toBeTruthy();
  });
});
