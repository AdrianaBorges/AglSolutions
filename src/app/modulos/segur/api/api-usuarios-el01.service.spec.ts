import { TestBed } from '@angular/core/testing';

import { ApiUsuariosEL01Service } from './api-usuarios-el01.service';

describe('ApiUsuariosEL01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiUsuariosEL01Service = TestBed.get(ApiUsuariosEL01Service);
    expect(service).toBeTruthy();
  });
});
