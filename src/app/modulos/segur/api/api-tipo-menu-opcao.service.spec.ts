import { TestBed } from '@angular/core/testing';

import { ApiTipoMenuOpcaoService } from './api-tipo-menu-opcao.service';

describe('ApiTipoMenuOpcaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTipoMenuOpcaoService = TestBed.get(ApiTipoMenuOpcaoService);
    expect(service).toBeTruthy();
  });
});
