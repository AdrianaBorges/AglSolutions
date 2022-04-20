import { TestBed } from '@angular/core/testing';

import { ApiProgramaNivelService } from './api-programa-nivel.service';

describe('ApiProgramaNivelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiProgramaNivelService = TestBed.get(ApiProgramaNivelService);
    expect(service).toBeTruthy();
  });
});
