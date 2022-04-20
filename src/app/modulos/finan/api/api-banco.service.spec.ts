import { TestBed } from '@angular/core/testing';

import { ApiBancoService } from './api-banco.service';

describe('ApiBancoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiBancoService = TestBed.get(ApiBancoService);
    expect(service).toBeTruthy();
  });
});
