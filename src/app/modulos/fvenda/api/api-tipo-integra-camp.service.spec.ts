import { TestBed } from '@angular/core/testing';

import { ApiTipoIntegraCampService } from './api-tipo-integra-camp.service';

describe('ApiTipoIntegraCampService', () => {
  let service: ApiTipoIntegraCampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTipoIntegraCampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
