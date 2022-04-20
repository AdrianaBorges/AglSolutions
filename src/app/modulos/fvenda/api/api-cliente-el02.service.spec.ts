import { TestBed } from '@angular/core/testing';

import { ApiClienteEL02Service } from './api-cliente-el02.service';

describe('ApiClienteEL02Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiClienteEL02Service = TestBed.get(ApiClienteEL02Service);
    expect(service).toBeTruthy();
  });
});
