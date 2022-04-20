import { TestBed } from '@angular/core/testing';

import { ApiOper0012Service } from './api-oper0012.service';

describe('ApiOper0012Service', () => {
  let service: ApiOper0012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOper0012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
