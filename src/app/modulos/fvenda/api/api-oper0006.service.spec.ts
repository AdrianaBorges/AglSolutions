import { TestBed } from '@angular/core/testing';

import { ApiOper0006Service } from './api-oper0006.service';

describe('ApiOper0006Service', () => {
  let service: ApiOper0006Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOper0006Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
