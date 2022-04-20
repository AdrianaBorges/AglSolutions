import { TestBed } from '@angular/core/testing';

import { ApiItemEL01Service } from './api-item-el01.service';

describe('ApiItemEL01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiItemEL01Service = TestBed.get(ApiItemEL01Service);
    expect(service).toBeTruthy();
  });
});
