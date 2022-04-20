import { TestBed } from '@angular/core/testing';

import { ApiTipoAssTecEL01Service } from './api-tipo-ass-tec-el01.service';

describe('ApiTipoAssTecEL01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoAssTecEL01Service = TestBed.get(ApiTipoAssTecEL01Service);
    expect(service).toBeTruthy();
  });
});
