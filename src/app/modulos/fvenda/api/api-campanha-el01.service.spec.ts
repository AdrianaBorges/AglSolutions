import { TestBed } from '@angular/core/testing';

import { ApiCampanhaEL01Service } from './api-campanha-el01.service';

describe('ApiCampanhaEL01Service', () => {
  let service: ApiCampanhaEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCampanhaEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
