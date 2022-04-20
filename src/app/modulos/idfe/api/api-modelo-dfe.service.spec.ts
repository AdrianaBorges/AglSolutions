import { TestBed } from '@angular/core/testing';

import { ApiModeloDfeService } from './api-modelo-dfe.service';

describe('ApiModeloDfeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiModeloDfeService = TestBed.get(ApiModeloDfeService);
    expect(service).toBeTruthy();
  });
});
