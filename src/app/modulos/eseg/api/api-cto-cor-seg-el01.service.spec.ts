import { TestBed } from '@angular/core/testing';

import { ApiCtoCorSegEL01Service } from './api-cto-cor-seg-el01.service';

describe('ApiCtoCorSegEL01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCtoCorSegEL01Service = TestBed.get(ApiCtoCorSegEL01Service);
    expect(service).toBeTruthy();
  });
});
