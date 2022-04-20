import { TestBed } from '@angular/core/testing';

import { ApiTranspEl01Service } from './api-transp-el01.service';

describe('ApiTranspEl01Service', () => {
  let service: ApiTranspEl01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTranspEl01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
