import { TestBed } from '@angular/core/testing';

import { ApiEstipulanteService } from './api-estipulante.service';

describe('ApiEstipulanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiEstipulanteService = TestBed.get(ApiEstipulanteService);
    expect(service).toBeTruthy();
  });
});
