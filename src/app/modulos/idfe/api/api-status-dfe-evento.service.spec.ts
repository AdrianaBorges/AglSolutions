import { TestBed } from '@angular/core/testing';

import { ApiStatusDfeEventoService } from './api-status-dfe-evento.service';

describe('ApiStatusDfeEventoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiStatusDfeEventoService = TestBed.get(ApiStatusDfeEventoService);
    expect(service).toBeTruthy();
  });
});
