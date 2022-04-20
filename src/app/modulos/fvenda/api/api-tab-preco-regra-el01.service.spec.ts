import { TestBed } from '@angular/core/testing';

import { ApiTabPrecoRegraEL01Service } from './api-tab-preco-regra-el01.service';

describe('ApiTabPrecoRegraEL01Service', () => {
  let service: ApiTabPrecoRegraEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTabPrecoRegraEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
