import { TestBed } from '@angular/core/testing';

import { ApiAssTecItemServService } from './api-ass-tec-item-serv.service';

describe('ApiAssTecItemServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAssTecItemServService = TestBed.get(ApiAssTecItemServService);
    expect(service).toBeTruthy();
  });
});
