import { TestBed } from '@angular/core/testing';

import { ApiSorteioSegService } from './api-sorteio-seg.service';

describe('ApiSorteioSegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSorteioSegService = TestBed.get(ApiSorteioSegService);
    expect(service).toBeTruthy();
  });
});
