import { TestBed, inject } from '@angular/core/testing';

import { ApiMenuSistemaService } from './api-menu-sistema.service';

describe('ApiMenuSistemaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiMenuSistemaService]
    });
  });

  it('should be created', inject([ApiMenuSistemaService], (service: ApiMenuSistemaService) => {
    expect(service).toBeTruthy();
  }));
});
