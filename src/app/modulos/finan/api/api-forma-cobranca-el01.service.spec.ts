import { TestBed } from '@angular/core/testing';
import { ApiFormaCobrancaEL01Service } from './api-forma-cobranca-el01.service';

describe('ApiFormaCobrancaEL01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiFormaCobrancaEL01Service = TestBed.get(ApiFormaCobrancaEL01Service);
    expect(service).toBeTruthy();
  });
});
