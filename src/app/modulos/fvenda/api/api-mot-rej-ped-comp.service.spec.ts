import { TestBed } from '@angular/core/testing';

import { ApiMotRejPedCompService } from './api-mot-rej-ped-comp.service';

describe('MotRejPedCompService', () => {
  let service: ApiMotRejPedCompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMotRejPedCompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
