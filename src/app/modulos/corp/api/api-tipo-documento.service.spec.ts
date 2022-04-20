import { TestBed, inject } from '@angular/core/testing';

import { ApiTipoDocumentoService } from './api-tipo-documento.service';

describe('ApiTipoDocumentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTipoDocumentoService]
    });
  });

  it('should be created', inject([ApiTipoDocumentoService], (service: ApiTipoDocumentoService) => {
    expect(service).toBeTruthy();
  }));
});
