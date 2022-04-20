import { TestBed } from '@angular/core/testing';

import { ApiTipoCteService } from './api-tipo-cte.service';

describe('ApiTipoCteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoCteService = TestBed.get(ApiTipoCteService);
    expect(service).toBeTruthy();
  });
});
