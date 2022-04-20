import { TestBed } from '@angular/core/testing';

import { ApiTipoMovtoCrService } from './api-tipo-movto-cr.service';

describe('ApiTipoMovtoCrService', () => {
  let service: ApiTipoMovtoCrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTipoMovtoCrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
