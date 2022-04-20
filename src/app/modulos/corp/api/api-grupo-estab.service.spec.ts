import { TestBed } from '@angular/core/testing';

import { ApiGrupoEstabService } from './api-grupo-estab.service';

describe('ApiGrupoEstabService', () => {
  let service: ApiGrupoEstabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGrupoEstabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
