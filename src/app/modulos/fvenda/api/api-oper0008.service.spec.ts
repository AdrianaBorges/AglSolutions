import { TestBed } from '@angular/core/testing';

import { ApiOper0008Service } from './api-oper0008.service';

describe('ApiOper0008Service', () => {
  let service: ApiOper0008Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOper0008Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
