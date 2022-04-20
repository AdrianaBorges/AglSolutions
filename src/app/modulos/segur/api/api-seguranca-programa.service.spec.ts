import { TestBed } from '@angular/core/testing';

import { ApiSegurancaProgramaService } from './api-seguranca-programa.service';

describe('ApiSegurancaProgramaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSegurancaProgramaService = TestBed.get(ApiSegurancaProgramaService);
    expect(service).toBeTruthy();
  });
});
