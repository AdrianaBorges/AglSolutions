import { TestBed } from '@angular/core/testing';

import { ApiOper0010Service } from './api-oper0010.service';

describe('ApiOper0010Service', () => {
  let service: ApiOper0010Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOper0010Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
