import { TestBed, inject } from '@angular/core/testing';

import { ConfigEmpresaService } from './config-empresa.service';

describe('ConfiEmpresaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigEmpresaService]
    });
  });

  it('should be created', inject([ConfigEmpresaService], (service: ConfigEmpresaService) => {
    expect(service).toBeTruthy();
  }));
});
