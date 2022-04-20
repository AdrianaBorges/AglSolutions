import { TestBed } from '@angular/core/testing';

import { ApiAssTecItemEL01Service } from './api-ass-tec-item-el01.service';

describe('ApiAssTecItemEL01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAssTecItemEL01Service = TestBed.get(ApiAssTecItemEL01Service);
    expect(service).toBeTruthy();
  });
});
