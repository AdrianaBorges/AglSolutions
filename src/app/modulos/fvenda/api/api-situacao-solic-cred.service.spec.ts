import { TestBed } from '@angular/core/testing';

import { ApiSituacaoSolicCredService } from './api-situacao-solic-cred.service';

describe('ApiSituacaoSolicCredService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSituacaoSolicCredService = TestBed.get(ApiSituacaoSolicCredService);
    expect(service).toBeTruthy();
  });
});
