import { TestBed } from '@angular/core/testing';

import { ApiAssTecnicaEL01Service } from './api-ass-tecnica-el01.service';

describe('ApiAssTecnicaEL01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAssTecnicaEL01Service = TestBed.get(ApiAssTecnicaEL01Service);
    expect(service).toBeTruthy();
  });
});
