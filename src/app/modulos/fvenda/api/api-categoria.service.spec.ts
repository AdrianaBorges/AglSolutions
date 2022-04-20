import { TestBed } from '@angular/core/testing';

import { ApiCategoriaService } from './api-categoria.service';

describe('ApiCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCategoriaService = TestBed.get(ApiCategoriaService);
    expect(service).toBeTruthy();
  });
});
