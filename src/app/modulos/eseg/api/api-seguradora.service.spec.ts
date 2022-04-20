import { TestBed } from '@angular/core/testing';

import { ApiSeguradoraService } from './api-seguradora.service';

describe('ApiSeguradoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSeguradoraService = TestBed.get(ApiSeguradoraService);
    expect(service).toBeTruthy();
  });
});
