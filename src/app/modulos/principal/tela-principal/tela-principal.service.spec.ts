import { TestBed } from '@angular/core/testing';

import { TelaPrincipalService } from './tela-principal.service';

describe('TelaPrincipalService', () => {
  let service: TelaPrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelaPrincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
