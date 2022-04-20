import { TestBed } from '@angular/core/testing';

import { ApiSitAtenPedCompService } from './api-sit-aten-ped-comp.service';

describe('ApiSitAtenPedCompService', () => {
  let service: ApiSitAtenPedCompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSitAtenPedCompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
