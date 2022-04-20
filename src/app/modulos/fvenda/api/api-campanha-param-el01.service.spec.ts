import { TestBed } from '@angular/core/testing';

import { ApiCampanhaParamEL01Service } from './api-campanha-param-el01.service';

describe('ApiCampanhaParamEL01Service', () => {
  let service: ApiCampanhaParamEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCampanhaParamEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
