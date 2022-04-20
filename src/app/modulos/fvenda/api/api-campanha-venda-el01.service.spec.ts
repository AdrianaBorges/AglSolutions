import { TestBed } from '@angular/core/testing';

import { ApiCampanhaVendaEL01Service } from './api-campanha-venda-el01.service';

describe('ApiCampanhaVendaEL01Service', () => {
  let service: ApiCampanhaVendaEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCampanhaVendaEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
