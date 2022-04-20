import { TestBed } from '@angular/core/testing';

import { ApiPortadorService } from './api-portador.service';

describe('ApiPortadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPortadorService = TestBed.get(ApiPortadorService);
    expect(service).toBeTruthy();
  });
});
