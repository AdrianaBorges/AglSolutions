import { TestBed } from '@angular/core/testing';

import { ApiRamoSeguroService } from './api-ramo-seguro.service';

describe('ApiRamoSeguroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiRamoSeguroService = TestBed.get(ApiRamoSeguroService);
    expect(service).toBeTruthy();
  });
});
