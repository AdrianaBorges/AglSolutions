import { TestBed } from '@angular/core/testing';

import { ApiSolicAprovPvEL01Service } from './api-solic-aprov-pv-el01.service';

describe('ApiSolicAprovPvEL01Service', () => {
  let service: ApiSolicAprovPvEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSolicAprovPvEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
