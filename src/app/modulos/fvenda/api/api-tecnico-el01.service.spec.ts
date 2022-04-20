import { TestBed } from '@angular/core/testing';

import { ApiTecnicoEL01Service } from './api-tecnico-el01.service';

describe('ApiTecnicoEL01Service', () => {
  let service: ApiTecnicoEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTecnicoEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
