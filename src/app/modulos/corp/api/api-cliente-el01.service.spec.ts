import { TestBed } from '@angular/core/testing';

import { ApiClienteEl01Service } from './api-cliente-el01.service';

describe('ApiClienteEl01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiClienteEl01Service = TestBed.get(ApiClienteEl01Service);
    expect(service).toBeTruthy();
  });
});
