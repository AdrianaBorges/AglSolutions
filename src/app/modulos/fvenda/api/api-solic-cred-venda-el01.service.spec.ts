import { TestBed } from '@angular/core/testing';

import { ApiSolicCredVendaEL01Service } from './api-solic-cred-venda-el01.service';

describe('ApiSolicCredVendaEL01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSolicCredVendaEL01Service = TestBed.get(ApiSolicCredVendaEL01Service);
    expect(service).toBeTruthy();
  });
});
