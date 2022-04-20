import { TestBed } from '@angular/core/testing';

import { ApiMotRejSolAprPvService } from './api-mot-rej-sol-apr-pv.service';

describe('ApiMotRejSolAprPvService', () => {
  let service: ApiMotRejSolAprPvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMotRejSolAprPvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
