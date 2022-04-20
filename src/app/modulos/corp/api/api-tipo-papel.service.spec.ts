import { TestBed } from '@angular/core/testing';

import { ApiTipoPapelService } from './api-tipo-papel.service';

describe('ApiTipoPapelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoPapelService = TestBed.get(ApiTipoPapelService);
    expect(service).toBeTruthy();
  });
});
