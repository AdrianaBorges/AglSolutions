import { TestBed } from '@angular/core/testing';

import { ApiOper0007Service } from './api-oper0007.service';

describe('ApiOper0007Service', () => {
  let service: ApiOper0007Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOper0007Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
