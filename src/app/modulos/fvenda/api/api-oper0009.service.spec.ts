import { TestBed } from '@angular/core/testing';

import { ApiOper0009Service } from './api-oper0009.service';

describe('ApiOper0009Service', () => {
  let service: ApiOper0009Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOper0009Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
