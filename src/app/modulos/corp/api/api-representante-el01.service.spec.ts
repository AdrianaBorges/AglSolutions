import { TestBed } from '@angular/core/testing';
import { ApiRepresentanteEl01Service } from './api-representante-el01.service';


describe('ApiRepresentanteEl01ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiRepresentanteEl01Service = TestBed.get(ApiRepresentanteEl01Service);
    expect(service).toBeTruthy();
  });
});
