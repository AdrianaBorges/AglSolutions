import { TestBed } from '@angular/core/testing';

import { ApiSolicAprovPVItemEL01Service } from './api-solic-aprov-pv-item-el01.service';

describe('ApiSolicAprovPVItemEL01Service', () => {
  let service: ApiSolicAprovPVItemEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSolicAprovPVItemEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
