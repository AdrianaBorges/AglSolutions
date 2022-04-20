import { TestBed } from '@angular/core/testing';

import { ApiTabPrecoEL01Service } from './api-tab-preco-el01.service';

describe('ApiTabPrecoEL01Service', () => {
  let service: ApiTabPrecoEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTabPrecoEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
