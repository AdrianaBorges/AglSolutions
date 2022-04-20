import { TestBed } from '@angular/core/testing';

import { ApiDefeitoEL01Service } from './api-defeito-el01.service';

describe('ApiDefeitoEL01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiDefeitoEL01Service = TestBed.get(ApiDefeitoEL01Service);
    expect(service).toBeTruthy();
  });
});
