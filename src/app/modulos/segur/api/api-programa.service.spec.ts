import { TestBed } from '@angular/core/testing';

import { ApiProgramaService } from './api-programa.service';

describe('ApiProgramaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiProgramaService = TestBed.get(ApiProgramaService);
    expect(service).toBeTruthy();
  });
});
