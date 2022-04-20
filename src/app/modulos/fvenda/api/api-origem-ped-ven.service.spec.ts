import { TestBed } from '@angular/core/testing';

import { ApiOrigemPedVenService } from './api-origem-ped-ven.service';

describe('ApiOrigemPedVenService', () => {
  let service: ApiOrigemPedVenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOrigemPedVenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
