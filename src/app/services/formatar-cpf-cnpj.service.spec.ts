import { TestBed } from '@angular/core/testing';

import { FormatarCpfCnpjService } from './formatar-cpf-cnpj.service';

describe('FormatarCpfCnpjService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormatarCpfCnpjService = TestBed.get(FormatarCpfCnpjService);
    expect(service).toBeTruthy();
  });
});
